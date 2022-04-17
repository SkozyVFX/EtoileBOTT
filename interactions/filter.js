const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("filter")
        .setDescription("Pas een filter toe aan de huidige wachtrij")
        .addStringOption(option =>
            option.setName('filter')
                .setDescription('De filter die je wilt toepassen')
                .setRequired(true)
                .addChoice('off', 'off')
                .addChoice('3d', '3d')
                .addChoice('bassboost', 'bassboost')
                .addChoice('echo', 'echo')
                .addChoice('karaoke', 'karaoke')
                .addChoice('nightcore', 'nightcore')
                .addChoice('vaporwave', 'vaporwave')
                .addChoice('flanger', 'flanger')
                .addChoice('gate', 'gate')
                .addChoice('haas', 'haas')
                .addChoice('reverse', 'reverse')
                .addChoice('surround', 'surround')
                .addChoice('mcompand', 'mcompand')
                .addChoice('phaser', 'phaser')
                .addChoice('tremolo', 'tremolo')
                .addChoice('earwax', 'earwax')),

    async execute(interaction, client) {
        const filter = interaction.options.getString('filter');
        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({ content: 'Er word momenteel niks afgespeeld.', ephemeral: true });
        if (filter === 'off' && queue.filters?.length) {
            queue.setFilter(false);
            const embed = new MessageEmbed().setDescription('Filter(s) succesvol uitgeschakeld.');
            return interaction.reply({ embeds: [embed] });
        }
        else if (Object.keys(client.distube.filters).includes(filter)) {
            queue.setFilter(filter);
            const embed = new MessageEmbed().setDescription(`Huidige wachtrij filter(s): \`${queue.filters.join(', ')}\``)
            return interaction.reply({ embeds: [embed] });
        } else {
            const embed = new MessageEmbed().setDescription(`Er is een fout opgetreden!`).setColor('red')
            return interaction.reply({ embeds: [embed] }); 
        } 
    }
};


