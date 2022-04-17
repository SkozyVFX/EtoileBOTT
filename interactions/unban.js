const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Select a member and ban them (but not really).')
		.addStringOption(option => option.setName('id').setDescription('Unabn een gebruiker').setRequired(true)),
	async execute(interaction) {

		const userId = interaction.options.getString('id');
        interaction.guild.members.unban(userId)

        interaction.reply({ content: "De gebruiker is unbanned!", ephemeral: true})
	},
};