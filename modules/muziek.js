const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { MessageEmbed } = require("discord.js");

const laadMuziek = (client) => {
    client.distube = new DisTube(client, {
        leaveOnStop: false,
        emitNewSongOnly: true,
        emitAddSongWhenCreatingQueue: false,
        emitAddListWhenCreatingQueue: false,
        plugins: [
            new SpotifyPlugin({
                emitEventsAfterFetching: true,
            }),
            new SoundCloudPlugin(),
            new YtDlpPlugin(),
        ],
        youtubeDL: false,
    });



    client.distube

        .on("playSong", (queue, song) => {
            const playEmbed = new MessageEmbed()
                .setTitle(song.name)
                .setURL("https://discord.js.org/")
                .setAuthor({
                    name: "Aan het spelen",
                    iconURL: song.user.displayAvatarURL(),
                })
                .setThumbnail(song.thumbnail)
                .addFields(
                    { name: "Duur:", value: song.formattedDuration, inline: true },
                    { name: "Kanaal:", value: song.uploader.name, inline: true },
                    {
                        name: "Wachtrij duur:",
                        value: `${queue.formattedDuration}`,
                        inline: true,
                    },
                    {
                        name: "Positie in queue:",
                        value: `${queue.songs.length}`,
                        inline: true,
                    }
                )
                
            client.distube.interactie.editReply({ embeds: [playEmbed] });
        })



        .on("addSong", (queue, song) => {
            const toegevoegdEmbed = new MessageEmbed()
                .setTitle(song.name)
                .setURL("https://discord.js.org/")
                .setColor("#ff0000")
                .setAuthor({
                    name: "Toegevoegd aan wachtrij",
                    iconURL: song.user.displayAvatarURL(),
                })
                .setThumbnail(song.thumbnail)
                .addFields(
                    { name: "Duur:", value: song.formattedDuration, inline: true },
                    { name: "Kanaal:", value: song.uploader.name, inline: true },
                    {
                        name: "Wachtrij duur:",
                        value: `${queue.formattedDuration}`,
                        inline: true,
                    },
                    {
                        name: "Positie in queue:",
                        value: `${queue.songs.length}`,
                        inline: true,
                    }
                )
            client.distube.interactie.editReply({ embeds: [toegevoegdEmbed] });
        })




        .on("addList", (queue, playlist) => {
            playlist.source = playlist.source.charAt(0).toUpperCase() + playlist.source.slice(1);
            const playlistEmbed = new MessageEmbed().setTitle(playlist.name).setURL(playlist.url).setAuthor({ name: "Toegevoegd aan wachtrij", iconURL: playlist.user.displayAvatarURL() }).setThumbnail(playlist.thumbnail)
                .addFields(
                    {
                        name: "Bron:",
                        value: `${playlist.source}`,
                        inline: true,
                    },
                    {
                        name: "Duur:",
                        value: `${playlist.formattedDuration}`,
                        inline: true,
                    },
                    {
                        name: "Positie in wachtrij:",
                        value: `${queue.songs.length - queue.songs.length + 1}`,
                        inline: true,
                    },
                    {
                        name: "Nummers:",
                        value: `${playlist.songs.length}`,
                        inline: true,
                    })
            client.distube.interactie.editReply({ embeds: [playlistEmbed] });
        }
        )


        .on("error", (channel, error) => {
            const errorEmbed = new MessageEmbed().setDescription('Er is een fout opgetreden!').setColor('#ff0000')
            client.distube.interactie.editReply({ embeds: [errorEmbed], ephemeral: true });
            console.log(error);
        })


        .on("empty", (channel) => {
            const kanaalLeeg = new MessageEmbed().setDescription('Spraakkanaal is leeg. Kanaal verlaten...').setColor('#ff0000')
            channel.send({ embeds: [kanaalLeeg] });
        }

        )
        .on("searchNoResult", (message, query) => {
            const kanaalLeeg = new MessageEmbed().setDescription(`Geen resulaten gevonden voor **${query}`).setColor('#ff0000')
            client.distube.interactie.editReply({ embeds: [kanaalLeeg] });
        }

        )
        .on("finish", (queue) => {
            const embed = new MessageEmbed().setDescription('Alle nummers in de queue zijn afgespeeld.').setColor('#ff0000')
            queue.textChannel.send({ embeds: [embed] });
        });
};

module.exports = {
    laadMuziek
}
