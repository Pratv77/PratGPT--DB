const { Client, Events, GatewayIntentBits, ClientUser } = require("discord.js");
require("dotenv/config");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (ClientUser) => {
  console.log(`Logged in as ${ClientUser.user.tag}`);
});

client.login(process.env.BOT_TOKEN);
