const { SlashCommandBuilder } = require('discord.js');
const { handleQueue } = require('../../utils/handleQueue');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the current song'),
  async execute(interaction) {
    const queue = handleQueue(interaction.guild.id);

    if (!queue.songs.length) {
      return interaction.reply({ content: 'There are no songs in the queue!', ephemeral: true });
    }

    queue.songs.shift();

    if (queue.songs.length) {
      await interaction.reply({ content: 'Skipped to the next song!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'Skipped the last song in the queue! Ending playback...', ephemeral: true });
    }
  },
};