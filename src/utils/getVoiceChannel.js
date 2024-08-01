const { log } = require('./log');

/**
 * Retrieves the voice channel the user is in.
 * 
 * @param {Discord.VoiceState} newState The new voice state object.
 * @returns {Promise<Discord.VoiceChannel | null>} The voice channel the user is in, or null if not in a channel.
 */
const getVoiceChannel = async (newState) => {
  try {
    const voiceChannel = newState.channel;
    if (voiceChannel) {
      log.info(`User joined voice channel: ${voiceChannel.name}`);
      return voiceChannel;
    } else {
      log.info(`User left voice channel.`);
      return null;
    }
  } catch (error) {
    log.error(`Error retrieving voice channel: ${error.message}`);
    throw error;
  }
};

module.exports = { getVoiceChannel };