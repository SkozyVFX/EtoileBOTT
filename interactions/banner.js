const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banner')
        .setDescription('Get the avatar URL of the selected user, or your own avatar.')
        .addUserOption(option => option.setName('gebruiker').setDescription('The user\'s avatar to show')),
    async execute(interaction, client) {

        let user = interaction.options.getUser('gebruiker') || interaction.user;
        user = await client.users.cache.get(user.id)
        await user.fetch()
        if (!user.banner) return interaction.reply({ content: 'Deze gebruiker heeft geen profielbanner', ephemeral: true })

        const embed = new MessageEmbed()
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
            .setImage(user.bannerURL({ size: 4096, dynamic: true }))
            .setColor("#ff0000")
            .setTimestamp()

        interaction.reply({ embeds: [embed] });
    },
};