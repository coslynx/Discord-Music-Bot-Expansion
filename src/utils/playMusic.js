const { log } = require('./log');
const { formatTime } = require('./formatTime');
const { joinVoiceChannel } = require('./joinVoiceChannel');
const ytdl = require('ytdl-core');

/**
 * Plays music in a Discord voice channel.
 *
 * @param {Discord.Message | Discord.Interaction} interaction The Discord interaction or message object.
 * @param {{ title: string; duration: number; url: string; stream: ReadableStream; type: string; }} musicData The music data to play.
 * @param {{ songs: Array<{ title: string; duration: number; url: string; stream: ReadableStream; type: string; }>; connection: Discord.VoiceConnection; loop: boolean; dispatcher: Discord.StreamDispatcher; }} queue The music queue object.
 */
const playMusic = async (interaction, musicData, queue) => {
  try {
    if (!queue.connection) {
      const voiceChannel = interaction.member.voice.channel;
      if (!voiceChannel) {
        return interaction.reply({ content: 'You need to be in a voice channel to play music!', ephemeral: true });
      }
      queue.connection = await joinVoiceChannel(voiceChannel, interaction.client);
    }

    if (!queue.dispatcher) {
      const stream = musicData.stream || ytdl(musicData.url, { filter: 'audioonly' });
      queue.dispatcher = queue.connection.play(stream, {
        volume: 0.5, // Set default volume (can be customized)
        bitrate: 128000,
      });

      queue.dispatcher.on('finish', () => {
        log.info(`Finished playing: ${musicData.title}`);
        if (queue.loop) {
          queue.songs.push(musicData);
          log.info(`Looping: ${musicData.title}`);
          playMusic(interaction, musicData, queue);
        } else {
          queue.songs.shift();
          log.info(`Next song in queue: ${queue.songs[0]?.title || 'Queue is empty'}`);
          if (queue.songs.length) {
            playMusic(interaction, queue.songs[0], queue);
          } else {
            log.info('Ending playback');
            queue.dispatcher = null;
            // Optionally, disconnect from the voice channel if the queue is empty
            // queue.connection.disconnect();
          }
        }
      });

      queue.dispatcher.on('error', (error) => {
        log.error(`Error playing music: ${error.message}`);
        if (queue.songs.length) {
          queue.songs.shift();
          playMusic(interaction, queue.songs[0], queue);
        } else {
          queue.dispatcher = null;
          // Optionally, disconnect from the voice channel if the queue is empty
          // queue.connection.disconnect();
        }
      });

      log.info(`Playing: ${musicData.title} (${formatTime(musicData.duration * 1000)})`);
      interaction.reply({ content: `Now playing: **${musicData.title}**`, ephemeral: true });
    }
  } catch (error) {
    log.error(`Error playing music: ${error.message}`);
    errorHandler(error);
    interaction.reply({ content: 'There was an error while playing the music!', ephemeral: true });
  }
};

module.exports = { playMusic };