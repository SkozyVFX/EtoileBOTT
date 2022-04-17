const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get from the bot.')
        .addUserOption(option => option.setName('gebruiker').setDescription('The bot info')),
    async execute(interaction) {

        const user = interaction.options.getUser('gebruiker') || interaction.user;

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("**Bot Info**")
            .setDescription("Bot gemaakt door Skozy#9999")
            .setFields(
                { name: '↓ Bot naam ↓', value: 'Étoile'},
                { name: '↓ Prefix ↓', value: '/' },
                { name: '↓ Bot gemaakt op ↓', value: '17-04-2022' },
            )
            .setTimestamp()

        interaction.reply({ embeds: [embed] });
    },
};