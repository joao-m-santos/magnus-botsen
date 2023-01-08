import { SlashCommandBuilder } from 'discord.js';
import { getHistory, logMatch } from '../db/index.js';
import { m } from '../util.js';

export default {
  data: new SlashCommandBuilder()
    .setName('match')
    .setDescription('Logs a match result between two players.')
    .addUserOption((option) =>
      option.setName('player1').setDescription('Player 1').setRequired(true)
    )
    .addUserOption((option) =>
      option.setName('player2').setDescription('Player 2').setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName('score')
        .setDescription('0 for Player 1 wins; 1 for draw; 2 for Player 2 wins')
        .setRequired(true)
    ),
  async execute(interaction) {
    const score = interaction.options.getInteger('score');
    const p1 = interaction.options.getUser('player1');
    const p2 = interaction.options.getUser('player2');
    const winner = score == 1 ? null : score === 0 ? p1 : p2;
    const loser = winner ? (winner === p1 ? p2 : p1) : null;

    await logMatch(p1.id, p2.id, score);

    const history = getHistory(p1.id, p2.id);

    if (!winner) {
      await interaction.reply(
        m(`Match recorded! ${p1} and ${p2} drew! _(${history})_`)
      );
    } else {
      await interaction.reply(
        m(`Match recorded! ${winner} won against ${loser}! _(${history})_`)
      );
    }
  },
};
