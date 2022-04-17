const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Speel het nummer af of voeg het toe aan de wachtrij")
    .addStringOption(option => option.setName('nummer').setDescription('Speel het nummer af of voeg het toe aan de wachtrij').setRequired(true)),
  async execute(interaction, client) {

    const gebruiker = interaction.member;
    const nummer = interaction.options.getString('nummer')

    if (!gebruiker.voice.channel) return interaction.reply({ content: "Je moet in een spraakkanaal zitten om dit commando te kunnen gebruiken!", ephemeral: true });
    else {
      client.distube.interactie = interaction;

      const embed = new MessageEmbed()
        .setDescription(`🔍 | **Aan het zoeken...**`)
      interaction.reply({ embeds: [embed] });

      client.distube.play(gebruiker.voice.channel, nummer, {
        member: gebruiker,
        textChannel: interaction.channel,
        interaction
      });
    }
  }
};
