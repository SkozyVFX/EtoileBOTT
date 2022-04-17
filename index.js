const fs = require("fs");
const { token } = require('./config.json');
const { laadMuziek } = require('./modules/muziek')

const { Client, Intents, Collection } = require("discord.js");

const allIntents = new Intents(32767);
const client = new Client({ intents: allIntents });

client.commands = new Collection();
client.aliases = new Collection();
client.interactions = new Collection();

laadMuziek(client);


fs.readdir("./commands/", async (err, files) => {
  const commandHandler = require("./handler/commandHandler");
  await commandHandler(err, files, client);
});

fs.readdir("./events/", (err, files) => {
  const eventHandler = require("./handler/eventHandler");
  eventHandler(err, files, client);
});

client.login(token);
