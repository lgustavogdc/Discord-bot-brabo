const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require('./config.json')

require('dotenv').config();

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === 'opa'){
      message.reply('O Brabo tem nome',);
    }
    if(command === 'romulo'){
      message.reply('Super feto',);
    }
    if(command === 'guga'){
      message.reply('Brabo demais',);
    }
    if(command === 'play'){
      client.commands.get('play').execute(message, args)
    }
    if(command === 'leave'){
      client.commands.get('leave').execute(message, args)
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