const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Verwijder de momenteel afgespeelde track uit de wachtrij."),
    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: 'Er word momenteel niks afgespeeld.', ephemeral: true })
        else if (queue.songs.length === 1) {
            await queue.stop()
            const embed = new MessageEmbed().setDescription('Huidige nummer succesvol geskipt.')
            return interaction.reply({ embeds: [embed] });
        } else {
            try {
                await queue.skip()
                const embed = new MessageEmbed().setDescription('Huidige nummer succesvol geskipt.')
                return interaction.reply({ embeds: [embed] });
            } catch (e) {
                const errorEmbed = new MessageEmbed().setDescription('Er is een fout opgetreden!').setColor('#ff0000')
                console.error(e);
                return interaction.reply({ embeds: [errorEmbed] });
            }
        }
    }
};
