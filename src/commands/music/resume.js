const { SlashCommandBuilder } = require('discord.js');
const { handleQueue } = require('../../utils/handleQueue');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resumes the music'),
  async execute(interaction) {
    const queue = handleQueue(interaction.guild.id);

    if (!queue.songs.length) {
      return interaction.reply({ content: 'There are no songs in the queue!', ephemeral: true });
    }

    if (!queue.connection) {
      return interaction.reply({ content: 'The bot is not connected to a voice channel!', ephemeral: true });
    }

    if (queue.connection.dispatcher.paused) {
      try {
        queue.connection.dispatcher.resume();
        await interaction.reply({ content: 'Resumed the music!', ephemeral: true });
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while resuming the music!', ephemeral: true });
      }
    } else {
      return interaction.reply({ content: 'The music is not paused!', ephemeral: true });
    }
  },
};