export const isP1 = (record, player) => record[0] === player;

export const isP2 = (record, player) => record[1] === player;

// match record = [p1, p2, score, timestamp]
export const getScore = (record) => record[2];
