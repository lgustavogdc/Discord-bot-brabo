const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if(msg.content === 'Opa'){
      msg.reply('O Brabo tem nome',);
    }
    if(msg.content === 'Romulo é feto?'){
      msg.reply('Com certeza!',);
    }
    if(msg.content === 'Guga é feto?'){
      msg.reply('Nope!',);
    }
});

client.on("guildMemberAdd", (member) => {
  let embed = new Discord.MessageEmbed()
  .setTitle('O Brabo Tem Nome!')
  .setThumbnail(member.user.avatarURL())
  .setDescription(`${member} é brabo demais e entrou no server!`)

  member.roles.add(process.env.INITIALROLE).catch(console.error);

  let welcomeChannel = client.channels.cache.get(process.env.WELCOMECHANNEL);
  welcomeChannel.send(embed);
});

client.login(process.env.BOTTOKEN);