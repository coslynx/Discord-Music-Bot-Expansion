const { SlashCommandBuilder } = require('discord.js');
const { searchMusic } = require('../../utils/searchMusic');
const { handleQueue } = require('../../utils/handleQueue');
const { playMusic } = require('../../utils/playMusic');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a song from YouTube, Spotify, or SoundCloud')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('The song or playlist to play')
        .setRequired(true)
    ),
  async execute(interaction) {
    const searchQuery = interaction.options.getString('query');
    const queue = handleQueue(interaction.guild.id);

    try {
      const musicData = await searchMusic(searchQuery);

      if (!musicData) {
        return interaction.reply({ content: 'Could not find any music matching your query!', ephemeral: true });
      }

      if (musicData.type === 'playlist') {
        const songs = musicData.songs;
        queue.songs.push(...songs);
        await interaction.reply({ content: `Added ${songs.length} songs to the queue!`, ephemeral: true });
      } else {
        queue.songs.push(musicData);
        await interaction.reply({ content: `Added ${musicData.title} to the queue!`, ephemeral: true });
      }

      // Play music if the queue is empty
      if (queue.songs.length === 1) {
        await playMusic(interaction, musicData, queue);
      }
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while playing the music!', ephemeral: true });
    }
  },
};