const { log } = require('./log');

/**
 * Leaves a Discord voice channel.
 *
 * @param {Discord.VoiceState} oldState The old voice state object.
 * @param {Discord.Client} client The Discord client object.
 */
const leaveVoiceChannel = async (oldState, client) => {
  try {
    const guild = oldState.guild;
    const voiceChannel = oldState.channel;

    // Check if the bot is in the voice channel
    if (guild.me.voice.channelId === voiceChannel.id) {
      // Check if there are no other users in the voice channel
      if (voiceChannel.members.size === 1) {
        log.info(`Leaving voice channel: ${voiceChannel.name}`);
        await voiceChannel.leave();
      }
    }
  } catch (error) {
    log.error(`Error leaving voice channel: ${error.message}`);
  }
};

module.exports = { leaveVoiceChannel };