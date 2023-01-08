import {
  Colors,
  EmbedBuilder,
  SlashCommandBuilder,
  userMention,
} from 'discord.js';
import { getHistory, getStandings, logMatch } from '../db/index.js';
import { formatDate, getWinRate, m } from '../util.js';

const sortFn = (a, b) =>
  getWinRate(a[1][0], a[1][2]) > getWinRate(b[1][0], b[1][2]) ? -1 : 1;

export default {
  data: new SlashCommandBuilder()
    .setName('standings')
    .setDescription('Shows the global standings.'),
  async execute(interaction) {
    const standings = Object.entries(getStandings())
      .sort(sortFn)
      .map(([id, score]) => {
        const wr = getWinRate(score[0], score[2]);
        return `${userMention(id)}: ${score.join('-')} (${
          wr !== null ? wr : '--'
        }%)`;
      });

    const embed = new EmbedBuilder()
      .setTitle(m('Server chess standings'))
      .addFields({
        name: `As of ${formatDate(Date.now())}`,
        value: standings.join('\n'),
      });

    await interaction.reply({ embeds: [embed] });
  },
};
