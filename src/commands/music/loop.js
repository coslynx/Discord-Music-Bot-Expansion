const { SlashCommandBuilder } = require('discord.js');
const { handleQueue } = require('../../utils/handleQueue');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Toggles loop mode for the queue'),
  async execute(interaction) {
    const queue = handleQueue(interaction.guild.id);

    if (!queue.songs.length) {
      return interaction.reply({ content: 'There are no songs in the queue!', ephemeral: true });
    }

    queue.loop = !queue.loop;

    if (queue.loop) {
      await interaction.reply({ content: 'Loop mode enabled!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'Loop mode disabled!', ephemeral: true });
    }
  },
};