const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		.addUserOption(option => option.setName('gebruiker').setDescription('The user\'s avatar to show')),
	async execute(interaction) {

		const user = interaction.options.getUser('gebruiker') || interaction.user;

		const embed = new MessageEmbed().setAuthor({ name: user.tag, iconURL: user.displayAvatarURL()})
		.setImage(user.displayAvatarURL({ format: 'png', size: 512 }))
        .setColor("#ff0000")
        .setTimestamp()

		interaction.reply({ embeds: [embed]});
	},
};