const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows all available commands'),
  async execute(interaction) {
    const commands = interaction.client.commands.map(command => `\`${command.data.name}\``).join(', ');

    await interaction.reply(`Available commands: ${commands}`);
  },
};