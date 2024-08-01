const { SlashCommandBuilder } = require('discord.js');
const { handleQueue } = require('../../utils/handleQueue');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clears the music queue'),
  async execute(interaction) {
    const queue = handleQueue(interaction.guild.id);

    if (!queue.songs.length) {
      return interaction.reply({ content: 'The queue is already empty!', ephemeral: true });
    }

    queue.songs = [];

    await interaction.reply({ content: 'The music queue has been cleared!', ephemeral: true });
  },
};