const Discord = require("discord.js")


module.exports = 
{
    name:"clear",
    aliases:[""],


    run: async(client,message,args)=>
    {
        if(!message.member.permissions.has("MANAGE_MESSAGES"))
        return message.reply("Boa tarde gostaria de lhe informar que vossa senhoria não tem permissão para utilizar tal comando. Visto isso, eu peço encarecidamente que pare de me encher o saco");

        const deleteCount = parseInt (args[0],10) 
        if(!deleteCount||deleteCount<1||deleteCount>100)
        return message.reply("Insira um número de 1 até 100, só não vale 22");

        const fetched = await message.channel.messages.fetch({
            limit: deleteCount + 1
          });
          message.channel.bulkDelete(fetched);

        message.channel.send(`${args[0]}Caiu q nem bosta essas praga`).then(msg=> msg.delete({tineout :5000}))
        .catch(error=> console.log(`Nao foi possivel limpar o chat, programador burro`));

    }
}