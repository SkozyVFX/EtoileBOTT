const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauzeer de speler."),
    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction)
        if (!queue) {
            return interaction.reply({ content: 'Er word momenteel niks afgespeeld.', ephemeral: true });
        } else {
            if (queue.paused) {
                const embed = new MessageEmbed().setDescription('Huidige nummer is al gepauzeerd.')
                return interaction.reply({ embeds: [embed] });
            } else {
                queue.pause();
                const embed = new MessageEmbed().setDescription('Huidige nummer succesvol gepauzeerd')
                return interaction.reply({ embeds: [embed] });
            }
        }
    }
};


