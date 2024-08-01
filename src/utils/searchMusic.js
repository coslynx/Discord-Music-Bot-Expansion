const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const { log } = require('./log');
const { searchSpotify } = require('./searchSpotify');
const { searchSoundCloud } = require('./searchSoundCloud');

/**
 * Searches for music across YouTube, Spotify, and SoundCloud.
 *
 * @param {string} query The search query.
 * @returns {Promise<{ title: string; duration: number; url: string; stream: ReadableStream; type: string; } | { songs: Array<{ title: string; duration: number; url: string; stream: ReadableStream; type: string; }>; type: string; } | null>} An object containing music data if found, otherwise null.
 */
const searchMusic = async (query) => {
  let musicData = null;

  try {
    // Check if the query is a YouTube URL
    if (ytdl.validateURL(query)) {
      const info = await ytdl.getInfo(query);
      musicData = {
        title: info.videoDetails.title,
        duration: info.videoDetails.lengthSeconds,
        url: info.videoDetails.video_url,
        stream: ytdl(query, { filter: 'audioonly' }),
        type: 'youtube',
      };
    } else {
      // Search YouTube if not a valid URL
      const searchResults = await ytsr(query, { limit: 1 });
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
        const spotifyData = await searchSpotify(query);
        if (spotifyData) {
          if (spotifyData.type === 'track') {
            musicData = {
              title: spotifyData.name,
              duration: spotifyData.duration_ms / 1000,
              url: spotifyData.external_urls.spotify,
              stream: null,
              type: 'spotify',
            };
          } else if (spotifyData.type === 'playlist') {
            const songs = spotifyData.tracks.items.map((track) => ({
              title: track.name,
              duration: track.duration_ms / 1000,
              url: track.external_urls.spotify,
              stream: null,
              type: 'spotify',
            }));
            musicData = {
              songs,
              type: 'playlist',
            };
          }
        } else {
          // Search SoundCloud if not found on Spotify
          const soundcloudData = await searchSoundCloud(query);
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
      log.info(`Found music data for "${musicData.title}"`);
    } else {
      log.warn(`Could not find music data for "${query}"`);
    }
  } catch (error) {
    log.error(`Error searching music: ${error.message}`);
  }

  return musicData;
};

module.exports = { searchMusic };