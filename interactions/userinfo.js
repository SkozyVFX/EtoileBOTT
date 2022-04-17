const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const timestampToDate = require('timestamp-to-date');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Geef informatie over jezelf of iemand weer')
        .addUserOption(option => option.setName('gebruiker').setDescription('De gebruiker waarvan je de info wilt ophalen.').setRequired(false)),
	async execute(interaction, client) {
        
        console.log(interaction.guild.name)
        const user = interaction.options.getMember('gebruiker') || interaction.member;

		let gemaaktOp = timestampToDate(user.user.createdTimestamp, 'dd-MM-yyyy HH:mm')
		let gejoinedOp = timestampToDate(user.joinedTimestamp, 'dd-MM-yyyy HH:mm');
	
		let rollen = user._roles;
		let rollenTekst = '';

		rollen.forEach(element => {
			rollenTekst += `${interaction.guild.roles.cache.find(r => r.id === element)}`
		});

		const embed = new MessageEmbed()
		.setAuthor({ name: user.user.tag, iconURL: user.user.displayAvatarURL()})
		.setThumbnail(user.user.displayAvatarURL())
		.setColor("#ff0000")
		.addFields(
			{ name: 'Naam', value: user.user.username, inline: true},
			{ name: 'Tag', value: user.user.tag, inline: true},
			{ name: 'ID', value: user.user.id, inline: true},
			{ name: 'Account gemaakt op', value: gemaaktOp, inline: true},
			{ name: 'Server gejoinned', value: gejoinedOp, inline: true},
			{ name: 'Rollen', value: `${rollenTekst}`, inline: true},
		)

		interaction.reply({ embeds: [embed] });

	},
};