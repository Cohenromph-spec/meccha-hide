/**
 * Nexus Cloud Functions — entry point.
 *
 * This exists for exactly one reason: GitHub Pages (where the app is
 * hosted) is static hosting and can't hold a secret. An Anthropic API key
 * embedded in client-side code is public the instant it ships — anyone
 * could open devtools and drain it. Cloud Functions is the piece that
 * holds the real key server-side and only ever exposes generated content,
 * never the key itself.
 */
export { generateDailyDiscovery } from './generateDailyDiscovery';
