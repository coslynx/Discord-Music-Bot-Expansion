# 🌟 Discord Music Bot Project: Comprehensive Expansion 🌟

## 📋 Description

This project aims to create a powerful and versatile Discord music bot that enhances the social experience within Discord servers by providing a seamless and enjoyable music listening experience. The bot will offer a user-friendly interface with a wide range of features, allowing users to search, select, and play music from various platforms directly within Discord. 

**Key Features:**

- **Music Playback:** Play music in Discord voice channels with controls like play, pause, stop, skip, and repeat.
- **Search and Selection:** Search for music using keywords or links, browse results, and add songs to the queue.
- **Playlist Creation:** Create and manage playlists, organizing songs into themed collections.
- **Voice Channel Integration:** Seamlessly join and leave voice channels based on user commands.
- **User Interface:** Intuitive commands with clear syntax and informative messages.
- **Enhancements:**  Advanced search, lyrics display, customizable settings, radio mode, and third-party integrations.

## 📑 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [Hosting](#hosting)
- [API Documentation](#api-documentation)
- [License](#license)
- [Authors and Acknowledgments](#authors-and-acknowledgments)

## 💻 Installation

### 🔧 Prerequisites

- Node.js (v18 or later)
- npm (comes bundled with Node.js)
- Git
- Docker (for optional containerization)

### 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/spectra-ai-codegen/discord-music-bot.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd discord-music-bot
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Create a `.env` file:**
   ```bash
   cp .env.example .env 
   ```
5. **Configure environment variables:**
   - Replace the placeholder values in the `.env` file with your actual Discord bot token, API keys, and any other required credentials.

## 🏗️ Usage

### 🏃‍♂️ Running the Project

1. **Start the development server:**
   ```bash
   npm start
   ```
2. **Invite the bot to your Discord server:**
   - Visit the bot's application page on the Discord Developer Portal ([https://discord.com/developers/applications](https://discord.com/developers/applications)).
   - Navigate to the "OAuth2" tab.
   - Select the "bot" scope and the necessary permissions (e.g., "Connect" and "Speak" for voice channels, "Manage Channels" for joining/leaving channels).
   - Generate an invite link and use it to add the bot to your server.

### ⚙️ Configuration

- **Command Prefix:**
   - The bot's default command prefix is defined in `src/config.json`.
   - You can change this prefix to suit your preferences.
- **Music Sources:**
   - You can configure the bot to use specific music sources (e.g., YouTube, Spotify, SoundCloud) in `src/config.json`.
- **Other settings:**
   - You can customize other bot settings, such as the default volume, song limit, and allowed music sources in `src/config.json`.

## 🔨 Commands

### Music Commands

- **`/play [search query or URL]`:** Plays a song from YouTube, Spotify, or SoundCloud.
- **`/pause`:** Pauses the currently playing song.
- **`/resume`:** Resumes playback of the paused song.
- **`/stop`:** Stops playback and clears the queue.
- **`/skip`:** Skips to the next song in the queue.
- **`/queue`:** Displays the current music queue.
- **`/nowplaying`:** Shows the currently playing song.
- **`/loop`:** Toggles loop mode for the queue.
- **`/clear`:** Clears the music queue.

### Other Commands

- **`/help`:** Displays a list of available commands and their descriptions.
- **`/ping`:** Checks the bot's latency.

## 🌐 Hosting

### 🚀 Deployment Instructions

#### Heroku

1. **Install the Heroku CLI:**
   ```bash
   npm install -g heroku
   ```
2. **Login to Heroku:**
   ```bash
   heroku login
   ```
3. **Create a new Heroku app:**
   ```bash
   heroku create
   ```
4. **Deploy the code:**
   ```bash
   git push heroku main
   ```

### 🔑 Environment Variables

- `DISCORD_TOKEN`: Your Discord bot token (required).
- `SPOTIFY_CLIENT_ID`: Your Spotify client ID (required if using Spotify).
- `SPOTIFY_CLIENT_SECRET`: Your Spotify client secret (required if using Spotify).
- `SOUNDCLOUD_CLIENT_ID`: Your SoundCloud client ID (required if using SoundCloud).
- `SOUNDCLOUD_CLIENT_SECRET`: Your SoundCloud client secret (required if using SoundCloud).

## 📜 API Documentation

### 🔍 Endpoints

- **`/api/v1/search`**: Searches for music across YouTube, Spotify, and SoundCloud.
   - **Parameters:**
      - `q`: The search query.
      - `source`: The music source (e.g., `youtube`, `spotify`, `soundcloud`).
   - **Response:**
      - A list of search results.

### 🔒 Authentication

- The API does not require authentication for general search functionality.
- However, for specific actions like adding or managing playlists, authentication using JWT tokens might be implemented in the future.

### 📝 Examples

```bash
# Search for a song on YouTube
curl -X GET http://localhost:3000/api/v1/search?q=Imagine+Dragons&source=youtube

# Search for an artist on Spotify
curl -X GET http://localhost:3000/api/v1/search?q=Billie+Eilish&source=spotify
```

## 📜 License

This project is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/).

## 👥 Authors and Acknowledgments

- **Spectra.codes** - Initial project development.
- **DRIX10** - Contributions to project development.

## 📚 Additional Resources

- [Discord Music Bot Website (Coming Soon):](https://spectra.codes/projects/discord-music-bot)
- [Project Documentation (Coming Soon):](https://spectra.codes/docs/discord-music-bot)
- [Spectra.codes Website: ](https://spectra.codes)
- [DRIX10 GitHub Profile: ](https://github.com/Drix10)