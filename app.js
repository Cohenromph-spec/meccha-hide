import { auth, db, storage } from "./firebase-config.js";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

let map;
let pendingLatLng = null;
let selectedHideId = null;
const markers = {};

function initMap() {
  if (map) return; // already initialized

  // Neutral fallback view (center of contiguous US) until/unless we get the user's location
  map = L.map('map').setView([39.8, -98.6], 4);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        map.setView([pos.coords.latitude, pos.coords.longitude], 13);
      },
      () => {
        // user declined or it failed — just stay on the neutral fallback view
      }
    );
  }

  map.on('click', (e) => {
    pendingLatLng = e.latlng;
    document.getElementById('hide-lat').value = e.latlng.lat;
    document.getElementById('hide-lng').value = e.latlng.lng;
    document.getElementById('post-btn').textContent = 'Post Hide at Selected Spot';

    if (window._tempMarker) map.removeLayer(window._tempMarker);
    window._tempMarker = L.marker(e.latlng).addTo(map).bindPopup("New hide goes here").openPopup();
  });

  listenForHides();
}

function listenForHides() {
  const hidesRef = collection(db, "hides");
  onSnapshot(hidesRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const data = change.doc.data();
      const id = change.doc.id;

      if (change.type === "removed") {
        if (markers[id]) {
          map.removeLayer(markers[id]);
          delete markers[id];
        }
        return;
      }

      if (markers[id]) {
        map.removeLayer(markers[id]);
      }

      const marker = L.marker([data.lat, data.lng]).addTo(map);
      marker.on('click', () => showHideDetails(id, data));
      markers[id] = marker;
    });
  });
}

function showHideDetails(id, data) {
  selectedHideId = id;
  document.getElementById('selected-hide').style.display = 'block';
  document.getElementById('selected-name').textContent = data.name;
  document.getElementById('selected-clue').textContent = data.clue;
  document.getElementById('selected-photo').src = data.photoUrl;
  const findCount = data.finds ? data.finds.length : 0;
  document.getElementById('selected-finds').textContent = `${findCount} hunter${findCount === 1 ? '' : 's'} found this`;
  document.getElementById('confirm-status').textContent = '';
}

const postForm = document.getElementById('post-form');
if (postForm) {
  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('post-status');

    if (!pendingLatLng) {
      status.textContent = "Click a spot on the map first to set the location.";
      return;
    }

    const name = document.getElementById('hide-name').value;
    const clue = document.getElementById('hide-clue').value;
    const photoFile = document.getElementById('hide-photo').files[0];
    const lat = parseFloat(document.getElementById('hide-lat').value);
    const lng = parseFloat(document.getElementById('hide-lng').value);

    if (!photoFile) {
      status.textContent = "Please add a photo of your hide.";
      return;
    }

    status.textContent = "Uploading...";

    try {
      const photoRef = ref(storage, `hides/${Date.now()}_${photoFile.name}`);

      const timeout = (ms) => new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timed out after " + (ms/1000) + "s")), ms)
      );

      await Promise.race([uploadBytes(photoRef, photoFile), timeout(15000)]);
      status.textContent = "Photo uploaded, saving hide details...";

      const photoUrl = await Promise.race([getDownloadURL(photoRef), timeout(15000)]);

      await Promise.race([
        addDoc(collection(db, "hides"), {
          name,
          clue,
          lat,
          lng,
          photoUrl,
          creatorId: auth.currentUser.uid,
          creatorEmail: auth.currentUser.email,
          finds: [],
          createdAt: serverTimestamp()
        }),
        timeout(15000)
      ]);

      status.textContent = "Hide posted! It's live on the map.";
      postForm.reset();
      pendingLatLng = null;
      document.getElementById('post-btn').textContent = 'Drop Pin to Set Location';
      if (window._tempMarker) map.removeLayer(window._tempMarker);
    } catch (err) {
      console.error("POST HIDE FAILED:", err);
      status.textContent = "Error: " + err.message;
      status.style.color = "#ff5f5f";
    }
  });
}

const confirmBtn = document.getElementById('confirm-btn');
if (confirmBtn) {
  confirmBtn.addEventListener('click', async () => {
    const status = document.getElementById('confirm-status');
    const photoFile = document.getElementById('confirm-photo').files[0];

    if (!selectedHideId) return;
    if (!photoFile) {
      status.textContent = "Add a photo proving you found it first.";
      return;
    }

    status.textContent = "Uploading proof...";

    try {
      const proofRef = ref(storage, `finds/${Date.now()}_${photoFile.name}`);
      await uploadBytes(proofRef, photoFile);
      const proofUrl = await getDownloadURL(proofRef);

      const hideRef = doc(db, "hides", selectedHideId);
      await updateDoc(hideRef, {
        finds: arrayUnion({
          userId: auth.currentUser.uid,
          userEmail: auth.currentUser.email,
          proofUrl,
          foundAt: new Date().toISOString()
        })
      });

      status.textContent = "Nice! Confirmed as found.";
    } catch (err) {
      status.textContent = "Error: " + err.message;
    }
  });
}

// Initialize the map once the user is actually logged in and app-section is visible
const observer = new MutationObserver(() => {
  const appSection = document.getElementById('app-section');
  if (appSection.style.display !== 'none') {
    setTimeout(initMap, 100); // slight delay so the container has dimensions
  }
});
observer.observe(document.getElementById('app-section'), { attributes: true, attributeFilter: ['style'] });
