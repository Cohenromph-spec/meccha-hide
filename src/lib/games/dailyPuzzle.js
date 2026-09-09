import { generatePuzzle } from './patternLogic.js';
import { mulberry32 } from '../seededRandom.js';
import { todaySeed } from '../date.js';

/** The same puzzle for every visitor, every device, for the whole calendar day. */
export function getTodaysPuzzle() {
  return generatePuzzle(0, mulberry32(todaySeed()));
}
