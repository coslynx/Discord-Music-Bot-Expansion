const { SlashCommandBuilder } = require('discord.js');
const { handleQueue } = require('../../utils/handleQueue');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the music and clears the queue'),
  async execute(interaction) {
    const queue = handleQueue(interaction.guild.id);

    if (!queue.songs.length) {
      return interaction.reply({ content: 'There are no songs in the queue!', ephemeral: true });
    }

    queue.songs = [];
    try {
      await queue.connection.dispatcher.destroy();
      await interaction.reply({ content: 'Stopped the music and cleared the queue!', ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while stopping the music!', ephemeral: true });
    }
  },
};