const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("seek")
        .setDescription("Stel de positie van de track in op de opgegeven tijd")
        .addNumberOption(option => option.setName('seconden').setDescription('volume die je wilt aanpassen').setRequired(true)),
    async execute(interaction, client) {
        const seconden = interaction.options.getNumber('seconden');
        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({ content: 'Er word momenteel niks afgespeeld.', ephemeral: true });
        queue.seek(seconden);
    }
};
