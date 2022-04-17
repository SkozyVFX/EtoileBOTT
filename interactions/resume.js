const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Hervat de speler."),
    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction)
        if (!queue) {
            return interaction.reply({ content: 'Er word momenteel niks afgespeeld.', ephemeral: true });
        } else {
            if (queue.paused) {
                queue.resume();
                const embed = new MessageEmbed().setDescription('Huidige nummer succesvol hervat.')
                return interaction.reply({ embeds: [embed] });
            } else {
                const embed = new MessageEmbed().setDescription('Huidige nummer word al afgespeeld.')
                return interaction.reply({ embeds: [embed] });
                
            }
        }
    }
};


