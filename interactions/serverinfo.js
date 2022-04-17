const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Geef informatie over de server'),
    async execute(interaction) {

        const server = interaction.guild;
        let naam = server.name;
        const eigenaar = `<@${server.ownerId}>`;
        const icon = server.iconURL();
        const memberCount = String(server.memberCount);
        const boosts = String(server.premiumSubscriptionCount);



        const embed = new MessageEmbed()
            .setAuthor({ name: naam, iconURL: icon })
            .setColor("#ff0000")
            .addFields(
                { name: 'Eigenaar 👑', value: eigenaar, inline: true },
                { name: 'Aantal leden 👥', value: memberCount, inline: true },
                { name: 'Boosts 🔮', value: boosts, inline: true },
            )
            .setTimestamp()

        interaction.reply({ embeds: [embed] });


    },
};