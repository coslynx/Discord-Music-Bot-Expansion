const { SlashCommandBuilder } = require('discord.js');
const { handleQueue } = require('../../utils/handleQueue');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Shows the music queue'),
  async execute(interaction) {
    const queue = handleQueue(interaction.guild.id);

    if (!queue.songs.length) {
      return interaction.reply({ content: 'There are no songs in the queue!', ephemeral: true });
    }

    const queueString = queue.songs
      .map((song, index) => `${index + 1}. ${song.title}`)
      .join('\n');

    await interaction.reply({ content: `**Music Queue:**\n${queueString}`, ephemeral: true });
  },
};