const { Client, Events, GatewayIntentBits } = require("discord.js");
require("dotenv/config");
const { OpenAIApi, Configuration } = require("openai");

const config = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(config);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (clientUser) => {
  console.log(`Logged in as ${clientUser.user.tag}`);

});

client.login(process.env.BOT_TOKEN);

const PAST_MESSAGES = 1;

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (message.content.includes('@here') || message.content.includes('@everyone')) {
    // Do not respond to messages with @here or @all mentions
    return;
  }
  try {
    if (message.mentions.has(client.user)) {
      message.channel.sendTyping();

      let messages = Array.from(
        await message.channel.messages.fetch({
          limit: PAST_MESSAGES,
          before: message.id,
        })
      );
      messages = messages.map((m) => m[1]);
      messages.unshift(message);

      let users = [
        ...new Set([
          ...messages.map((m) => m.member.displayName),
          client.user.username,
        ]),
      ];

      let lastUser = users.pop(); 
      let prompt = `
    
      The following is a conversation between ${users.join(
        ", "
      )}, and ${lastUser}. \n\n`;

      for (let i = messages.length - 1; i >= 0; i--) {
        const m = messages[i];
        prompt += `${m.member.username}: ${m.content}\n`;
      }
      prompt += `${client.user.username}:`;

      const response = await openai.createCompletion({
        prompt,
        model: "text-davinci-003",
        max_tokens: 400,
        stop: ["\n"],
      });

      await message.channel.send(response.data.choices[0].text);
    }
  } catch (err) {
    console.log("Error: " + err);
    message.channel.send("Yoo relax I need some time to read everything.");
  }
});
