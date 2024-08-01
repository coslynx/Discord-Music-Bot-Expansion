const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');
const { log } = require('./log');

/**
 * Joins a Discord voice channel.
 *
 * @param {Discord.VoiceChannel} voiceChannel The voice channel to join.
 * @param {Discord.Client} client The Discord client object.
 * @returns {Promise<Discord.VoiceConnection>} The voice connection object.
 */
const joinVoiceChannel = async (voiceChannel, client) => {
  try {
    log.info(`Joining voice channel: ${voiceChannel.name}`);
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    // Create audio player and resource for playback
    // (This is a placeholder for actual music playback implementation)
    const player = createAudioPlayer();
    const resource = createAudioResource('path/to/your/audio.mp3', {
      inputType: StreamType.Arbitrary,
    });

    // Play the audio
    player.play(resource);

    // Subscribe to the audio player to the voice connection
    connection.subscribe(player);

    return connection;
  } catch (error) {
    log.error(`Error joining voice channel: ${error.message}`);
    throw error;
  }
};

module.exports = { joinVoiceChannel };