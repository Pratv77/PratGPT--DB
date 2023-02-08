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

const BOT_CHANNEL = "673222218456629263";
const PAST_MESSAGES = 4;

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== BOT_CHANNEL) return;

  if(message.author.id == "192720478031314944") {
			await message.react('🇬');
			await message.react('🇦');
			await message.react('🇾');
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

      let prompt = `You will act as if you are a 21 year old male in university and you live in Brampton. Your name is PratGPT. Follow these instructions very strictly.
      Be sarcastic when possible, and try to be a bit laid back as a young adult in their 20's would be, avoid using punctuation in your responses
      and do not use exclamation marks at all, you are rank 1 zed in the world (league of legends), don't act childish, have proper sentence structure and
      don't incorporate too much slang in one response, if you think a message is too inappropriate or insulting then try to 
      be positive. Don't end your response in a follow up question. Use the word bro in your responses whenever possible. 

      The following is a conversation between ${users.join(
        ", "
      )}, and ${lastUser}. \n\n`;

      for (let i = messages.length - 1; i >= 0; i--) {
        const m = messages[i];
        prompt += `${m.member.displayName}: ${m.content}\n`;
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
    message.channel.send("Yoo relax I need some time to read everything.")
  }
});
