import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const PREFIX = '♟️';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const m = (msg) => `${PREFIX} ${msg}`;

export const formatDate = (date) => {
  if (Number.isInteger(date)) date = new Date(date);
  return date.toLocaleDateString(undefined, { dateStyle: 'medium' });
};

export const getWinRate = (wins, losses) => {
  const wr = wins / (wins + losses);
  return isNaN(wr) ? null : Math.round((wr + Number.EPSILON) * 100);
};
