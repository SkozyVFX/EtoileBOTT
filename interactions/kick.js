const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kickt een gebruiker')
        .addUserOption(option => option.setName('gebruiker').setDescription('The member to kick').setRequired(true))
        .addStringOption(option => option.setName('reden').setDescription('Reden van kick').setRequired(false)),
    async execute(interaction) {

        const user = interaction.options.getMember('gebruiker');
        const reden = interaction.options.getString('reden');
        user.kick(reden)

        const embed = new MessageEmbed()
            .setTitle("**KICKED!**")
            .setDescription(` ${user} is gekickt door ${interaction.user}`)
            .setColor("#ff0000")

        interaction.reply({ embeds: [embed] });
    },
};