const Discord =require("discord.js");
const client =  new Discord.Client({intents:[1,512,32768,2,128]});
const fs = require("fs");
const config = require('./config.json');

client.login(config.token)


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync(`./commands/`);

fs.readdirSync('./commands/').forEach(local => {
    const comandos = fs.readdirSync(`./commands/${local}`).filter(arquivo => arquivo.endsWith('.js'))

    for(let file of comandos) {
        let puxar= require(`./commands/${local}/${file}`)

        if(puxar.name) {
            client.commands.set(puxar.name, puxar)
        } 
        if(puxar.aliases && Array.isArray(puxar.aliases))
        puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
    } 
});

client.on("messageCreate", async (message) => {

    let prefix = config.prefix;
  
    if (message.author.bot) return;
    if (message.channel.type === Discord.ChannelType.DM) return;     
  
    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  
    if(!message.content.startsWith(prefix)) return;
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
    let cmd = args.shift().toLowerCase()
    if(cmd.length === 0) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd)) 
    
  try {
      command.run(client, message, args)
  } catch (err) { 
 
     console.error('Erro:' + err); 
  }
      });
      client.on("ready", ()=>{
        console.log(`💀 Estou online em ${client.user.username}💀`)
      })


      client.on("guildMemberAdd", (member) =>{
        let canal_logs = "1021599562961526816";
        if(!canal_logs) return;

        let embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`Bem vindo ao crime pit ${member.user.username}....`)
        .setDescription(`${member},cuidado pra nao ir pro tribunal do crime a ${member.guild.name} te da as boas vindas`);
    
        member.guild.channels.cache.get(canal_logs).send({embeds:[embed], content:`${member}`})
      })

      client.on("guildMemberRemove", (member) => {
        let canal_logs = "1021599616199831583"; 
        if (!canal_logs) return;
      
        let embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`Adeus ${member.user.username}....`)
        .setDescription(`> O usuário ${member} saiu do mundo do crime!\n> \`${member.guild.memberCount}\` membros.`);
      
        member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}` })  
      })