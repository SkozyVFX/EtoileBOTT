const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("Stel het volume in")
        .addNumberOption(option => option.setName('volume').setDescription('volume die je wilt aanpassen').setRequired(true)),
    async execute(interaction, client) {
        const volume = interaction.options.getNumber('volume');
        const queue = client.distube.getQueue(interaction)
        if (!queue) {
            return interaction.reply({ content: 'Er word momenteel niks afgespeeld.', ephemeral: true });
        } else {
            queue.setVolume(volume)
            const embed = new MessageEmbed().setDescription(`Volume succesvol aangepast naar **${volume}**.`)
            return interaction.reply({ embeds: [embed] });
        }
    }
};
