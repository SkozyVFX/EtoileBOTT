const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stop huidige wachtrij"),
    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction)
        if (!queue) {
            return interaction.reply({ content: 'Er zit momenteel niks in de wachtrij.', ephemeral: true });
        } else {
            queue.stop()
            const embed = new MessageEmbed().setDescription(`Wachtrij succesvol gestopt.`)
            return interaction.reply({ embeds: [embed] });
        }
    }
};
