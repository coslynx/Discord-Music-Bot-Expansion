const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const { log } = require('./log');
const { formatTime } = require('./formatTime');
const { searchSpotify } = require('./searchSpotify');
const { searchSoundCloud } = require('./searchSoundCloud');

/**
 * Retrieves music data for a given song, including title, duration, URL, and stream.
 *
 * @param {string} song The song to retrieve data for.
 * @returns {Promise<{ title: string; duration: number; url: string; stream: ReadableStream; type: string; }> | null} An object containing music data if found, otherwise null.
 */
const getMusicData = async (song) => {
  let musicData = null;

  try {
    // Check if the song is a YouTube URL
    if (ytdl.validateURL(song)) {
      const info = await ytdl.getInfo(song);
      musicData = {
        title: info.videoDetails.title,
        duration: info.videoDetails.lengthSeconds,
        url: info.videoDetails.video_url,
        stream: ytdl(song, { filter: 'audioonly' }),
        type: 'youtube',
      };
    } else {
      // Search YouTube if not a valid URL
      const searchResults = await ytsr(song, { limit: 1 });
      if (searchResults.items.length > 0) {
        const video = searchResults.items[0];
        musicData = {
          title: video.title,
          duration: video.duration,
          url: video.url,
          stream: ytdl(video.url, { filter: 'audioonly' }),
          type: 'youtube',
        };
      } else {
        // Search Spotify if not found on YouTube
        const spotifyData = await searchSpotify(song);
        if (spotifyData) {
          musicData = {
            title: spotifyData.name,
            duration: spotifyData.duration_ms / 1000,
            url: spotifyData.external_urls.spotify,
            stream: null,
            type: 'spotify',
          };
        } else {
          // Search SoundCloud if not found on Spotify
          const soundcloudData = await searchSoundCloud(song);
          if (soundcloudData) {
            musicData = {
              title: soundcloudData.title,
              duration: soundcloudData.duration,
              url: soundcloudData.permalink_url,
              stream: null,
              type: 'soundcloud',
            };
          }
        }
      }
    }

    if (musicData) {
      log.info(`Retrieved music data for "${musicData.title}" (${formatTime(musicData.duration * 1000)})`);
    } else {
      log.warn(`Could not find music data for "${song}"`);
    }
  } catch (error) {
    log.error(`Error retrieving music data: ${error.message}`);
  }

  return musicData;
};

module.exports = { getMusicData };