const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');
const { joinVoiceChannel, leaveVoiceChannel } = require('./utils/voiceChannel');
const { handleQueue } = require('./utils/handleQueue');
const { playMusic } = require('./utils/playMusic');
const { searchMusic } = require('./utils/searchMusic');
const { createQueue } = require('./utils/createQueue');
const { getMusicData } = require('./utils/getMusicData');
const { log } = require('./utils/log');
const { errorHandler } = require('./utils/errorHandler');
const { getVoiceChannel } = require('./utils/getVoiceChannel');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();

// Load commands
const commandFiles = ['help', 'ping', ...['play', 'pause', 'resume', 'stop', 'skip', 'queue', 'nowplaying', 'loop', 'clear'].map(command => `music/${command}`)].map(command => `./commands/${command}.js`);
for (const file of commandFiles) {
  const command = require(file);
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  // ... (Optional: Set bot's presence/activity)
});

// ... (Rest of the code in the file)