const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Select a member and ban them (but not really).')
        .addUserOption(option => option.setName('gebruiker').setDescription('The member to ban').setRequired(true))
        .addStringOption(option => option.setName('reden').setDescription('Reden van ban').setRequired(true)),
    async execute(interaction, client) {

        const user = interaction.options.getMember('gebruiker');
        const reden = interaction.options.getString('reden');
        user.ban({ reason: reden })

        console.log(client.guilds.cache.get(interaction.guild.id)?.commands)


        const embed = new MessageEmbed()
            .setTitle("**BANNED!**")
            .setDescription(` ${user} is gekickt door ${interaction.user}`)
            .setColor("#ff0000")

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('unban')
                    .setLabel('Unban')
                    .setStyle('DANGER'),
            );
            const userId = interaction.options.getString('id');
            interaction.guild.members.unban(userId)



        interaction.reply({ embeds: [embed], components: [row] });
    },
};