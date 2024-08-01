const { log } = require('./log');
const { joinVoiceChannel } = require('./joinVoiceChannel');
const { playMusic } = require('./playMusic');
const { getMusicData } = require('./getMusicData');

const queues = new Map();

/**
 * Creates a new music queue for a given guild ID.
 * 
 * @param {string} guildId The ID of the guild to create the queue for.
 * @returns {{ songs: Array<{ title: string; duration: number; url: string; stream: ReadableStream; type: string; }>; connection: Discord.VoiceConnection; loop: boolean; dispatcher: Discord.StreamDispatcher; }} The newly created queue object.
 */
const createQueue = (guildId) => {
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

module.exports = { createQueue };