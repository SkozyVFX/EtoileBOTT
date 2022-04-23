const fs = require("fs");

module.exports = {
  event: "ready",
  once: true,
  execute(client) {
    console.log("Bot ready");

    client.user.setActivity('JOUW KANKER MOEDER', { type: 'PLAYING'});
    fs.readdir("./interactions", (err, files) => {
      const interactionsHandler = require("./../handler/interactionHandler");
      interactionsHandler(err, files, client);
    });
  },
};
