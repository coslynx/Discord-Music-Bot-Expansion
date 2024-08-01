const { SlashCommandBuilder } = require('discord.js');
const { handleQueue } = require('../../utils/handleQueue');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Shows the currently playing song'),
  async execute(interaction) {
    const queue = handleQueue(interaction.guild.id);

    if (!queue.songs.length) {
      return interaction.reply({ content: 'There are no songs in the queue!', ephemeral: true });
    }

    const currentSong = queue.songs[0];
    await interaction.reply({ content: `Now playing: **${currentSong.title}**`, ephemeral: true });
  },
};