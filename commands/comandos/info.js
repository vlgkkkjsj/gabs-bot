const { EmbedBuilder } = require("@discordjs/builders")
const Discord = require ("discord.js")


module.exports=
{

    name : "info",
    aliases:[""],

    run: async(client,message,args)=>
    {
        let embed = new Discord.EmbedBuilder()

        .setColor("Random")
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
        .setDescription(`Oii ${message.author},voce pediu as informações então estarei carregando elas para voce: \`carregando.....\`.`);

        let embed2 = new Discord.EmbedBuilder()

        .setColor("Random")
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
        .setTitle("Infos uteis")
        .setDescription(`\n**Utilize sempre o prefixo (g!)**\nabraco(voce necessariamente precisa mencionar alguem) \n ping(serve para voce ver o seu ms atual)\n clear(insira um numero de 1 a 100, **NECESSITA DE PERMISSOES**).`);

        message.reply({embeds:[embed]}).then(msg=>{ 
            setTimeout(()=>{
                msg.edit ({embeds: [embed2]})
            },2000)
        })
            
    }


}