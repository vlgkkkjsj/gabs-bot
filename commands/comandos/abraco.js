const Discord = require("discord.js")

module.exports = 
{
    name: "abraco",
    aliases: [""],

    run: async(client,message,args) =>
    {
        var list = [  
            'https://acegif.com/wp-content/gif/anime-hug-59.gif',
            'https://acegif.com/wp-content/gif/anime-hug-86.gif',
            'https://acegif.com/wp-content/gif/anime-hug-50.gif',
            'https://acegif.com/wp-content/gif/anime-hug-98.gif',
            'https://acegif.com/wp-content/gif/anime-hug-75.gif'
            ];
            
        var rand = list[Math.floor(Math.random()*list.length)];
        let user = message.mentions.users.first() || client.users.cache.get(args[0]);
        if(!user){
            return message.reply('menciona alguem ai pobre');
        }

        let embed= new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
        .setDescription(`Oii ${message.author}, voce esta abraçando, aguarde para tirarmos a foto: \`carregando.....\`.`);
        
        
        let embed2= new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
        .setDescription(`${message.author} acaba de abraçar ${user}`)
        .setImage(rand);



        message.reply({embeds:[embed]}).then(msg=>{
            setTimeout(()=>{
                msg.edit ({embeds: [embed2]})
            },2000)
        })
            
    }
}