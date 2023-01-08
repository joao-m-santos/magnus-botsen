import path from 'path';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

import { __dirname } from '../util.js';
import { getScore, isP1, isP2 } from './util.js';

const file = path.join(__dirname, 'db.json');

// Configure lowdb to write to JSONFile
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();

db.data ||= { matches: [] };

// matches
// 0 - first player won
// 1 - draw
// 2 - second player won

export async function logMatch(p1, p2, score) {
  db.data.matches.push([p1, p2, score, Date.now()]);
  await db.write();
}

export function getHistory(p1, p2) {
  return db.data.matches
    .reduce(
      (history, match) => {
        if (isP1(match, p1) && isP2(match, p2)) history[getScore(match)] += 1;

        if (isP2(match, p1) && isP1(match, p2))
          history[2 - getScore(match)] += 1;

        return history;
      },
      [0, 0, 0]
    )
    .join('-');
}

export function getStandings() {
  const standings = db.data.matches.reduce((standings, match) => {
    const [p1, p2, score] = match;

    if (!standings[p1]) standings[p1] = [0, 0, 0];
    if (!standings[p2]) standings[p2] = [0, 0, 0];

    standings[p1][score] += 1;
    standings[p2][2 - score] += 1;

    return standings;
  }, {});
  return standings;
}
