const { log } = require('./log');

const queues = new Map();

/**
 * Handles the music queue for a given guild.
 *
 * @param {string} guildId The ID of the guild.
 * @returns {{ songs: Array<{ title: string; duration: number; url: string; stream: ReadableStream; type: string; }>; connection: Discord.VoiceConnection; loop: boolean; dispatcher: Discord.StreamDispatcher; }} The music queue object.
 */
const handleQueue = (guildId) => {
  if (!queues.has(guildId)) {
    log.info(`Creating new music queue for guild: ${guildId}`);
    queues.set(guildId, {
      songs: [],
      connection: null,
      loop: false,
      dispatcher: null,
    });
  }

  return queues.get(guildId);
};

module.exports = { handleQueue };