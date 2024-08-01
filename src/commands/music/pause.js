const { SlashCommandBuilder } = require('discord.js');
const { handleQueue } = require('../../utils/handleQueue');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses the music'),
  async execute(interaction) {
    const queue = handleQueue(interaction.guild.id);

    if (!queue.songs.length) {
      return interaction.reply({ content: 'There are no songs in the queue!', ephemeral: true });
    }

    if (!queue.connection) {
      return interaction.reply({ content: 'The bot is not connected to a voice channel!', ephemeral: true });
    }

    try {
      queue.connection.dispatcher.pause();
      await interaction.reply({ content: 'Paused the music!', ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while pausing the music!', ephemeral: true });
    }
  },
};