# PratGPT
A discord bot that simulates your personality and allows users to interact with a version of yourself on Discord.

## Introduction
PratGPT is a discord bot built using discord.js and powered by OpenAI's API. With PratGPT, you can bring a piece of yourself to the virtual world, and let users interact with a simulation of your personality on Discord. Whether you're looking for some fun or just want to make your Discord experience more personal, PratGPT is the perfect companion.

# Example Conversation
![Example](./assets/pratgpt.png)


## Features
- An AI simulation of your personality that is always available for a chat on Discord.
- Interaction with PratGPT using natural language, just like you would with a human.
- An entertaining and unique Discord experience that sets you apart from the rest.
- You can customize the `prompt` in `index.js` to whatever you like so the bot can be tailored to your specific needs, for example, instead of a 25 year old male in university, you can make the bot act as a 20 year old professional gamer or a 45 year old father who can give you life advice and wisdom. (endless possibilities!)

## Requirements
- A Discord account.
- A Discord server where you want to add the bot.
- [Node.js](https://nodejs.org/) installed on your computer.
- An OpenAI API key.
- A Discord bot token for authentication.

## Usage
1. Clone this repository to your computer.
2. Run `npm i discord.js dotenv openai` in the project directory to install the necessary packages.
3. Create a `.env` file in the project directory and add your OpenAI API key to it as `OPENAI_KEY=<your-api-key>` and `DISCORD_TOKEN=<your-discord-bot-token>`.
4. Change  `const BOT_CHANNEL`to the ID of whichever text channel you want to add the bot to, you can do this by right clicking on the text-channel you picked and click "Copy ID". If you don't see this option, you have to enable developer mode in Discord settings.
5. Run `node index.js` to start the bot.
6. Invite the bot to your Discord server and start chatting with PratGPT!

## Contributing
Contributions are always welcome! If you want to contribute, feel free to create a pull request or open an issue.
