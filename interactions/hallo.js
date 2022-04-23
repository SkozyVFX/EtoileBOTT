const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hallo')
		.setDescription('Zeg hallo tegen de bot.')
		.addUserOption(option => option.setName('gebruiker').setDescription('Bot zegt hallo')),
	async execute(interaction) {

		const user = interaction.options.getUser('gebruiker') || interaction.user;

		const embed = new MessageEmbed()
        .setTitle("Hou je bek a slet")
        .setColor("#ff0000")

		interaction.reply({ embeds: [embed]});
	},
};