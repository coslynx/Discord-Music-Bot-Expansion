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

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    return interaction.reply({ content: 'Invalid command!', ephemeral: true });
  }

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

// Join and Leave Voice Channels
client.on('voiceStateUpdate', async (oldState, newState) => {
  try {
    if (newState.member.user.bot) return;
    const voiceChannel = await getVoiceChannel(newState);
    if (voiceChannel) {
      await joinVoiceChannel(voiceChannel, client);
    } else {
      await leaveVoiceChannel(oldState, client);
    }
  } catch (error) {
    errorHandler(error);
  }
});

// Handle music queue
client.on('messageCreate', async message => {
  try {
    if (message.author.bot) return;
    if (!message.content.startsWith(process.env.PREFIX)) return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (!command) return;

    try {
      const queue = createQueue(message.guild.id);

      // Handle queue commands
      if (['play', 'pause', 'resume', 'stop', 'skip', 'queue', 'nowplaying', 'loop', 'clear'].includes(commandName)) {
        await command.execute(message, args, queue);
      }

      // Play Music if Queue is not empty
      if (queue.songs.length > 0) {
        const currentSong = queue.songs[0];
        const musicData = await getMusicData(currentSong);

        // Play music
        await playMusic(message, musicData, queue);
      }
    } catch (error) {
      errorHandler(error);
    }
  } catch (error) {
    errorHandler(error);
  }
});

client.login(token);