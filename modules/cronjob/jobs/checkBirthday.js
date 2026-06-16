const fs = require('node:fs');
const path = require('node:path');
const { oid, miaomi, miaomiCh, BDrole } = require('../../../config.json');
const taskScheduler = require('../task-scheduler.js');

/**
 * The birthday tasks for miaomi180 group
 * @param {object} client - The Discord.js client instance
 * @returns {void}
 */
async function handleMiaomiBdTasks(client) {
  const guilds = client.guilds;
  const users = client.users;
  const channels = client.channels;

  // #region : Miaomi 生日身份組
  const Birthday = require('../../../modules/dbFunction/birthday.js');
  const BDObj = new Birthday();

  const miaomiGuild = guilds.cache.get(miaomi);
  const miaomiMember = await miaomiGuild.members.fetch();
  const channel180 = channels.cache.get(miaomiCh);

  // 刪除身份組
  miaomiMember.forEach((member) => {
    if (member.roles.cache.some(role => role.id === BDrole)) {
      member.roles.remove(BDrole).catch(() => {
        users.fetch(oid).then(owner =>
          owner.send('生日身份出問題'),
        );
      });
    }
  });

  // 加入身份組
  const bd = await BDObj.birthdayTodayRaw();
  if (bd.length > 1) {
    await miaomiGuild.roles.fetch();
    const role = miaomiGuild.roles.cache.find(role => role.id === BDrole);
    bd.forEach((d) => {
      const member = miaomiGuild.members.cache.get(d.user_id);
      member.roles.add(role);
    });
    channel180.send({
      embeds: [{
        color: 0xFAD241,
        title: '今日壽星',
        description: await BDObj.birthdayToday(),
      }],
    });
  }
}

async function showRecentBd(client) {
  const channels = client.channels;
  const channel180 = channels.cache.get(miaomiCh);

  const Birthday = require('../../../modules/dbFunction/birthday.js');
  const BDObj = new Birthday();
  channel180.send({
    embeds: [{
      color: 0xFFFFFF,
      title: '這3個月內生日的人：',
      description: await BDObj.birthdayRecent(),
    }],
  });
}

async function announceMiaomiBd(client) {
  const channels = client.channels;
  const channel180 = channels.cache.get(miaomiCh);
  channel180.send({
    content: [
      '# 大家請注意！今天是我們的IQ180群主<@730621367333945354>的生日！',
      '# 請大家祝她生日大快樂😁',
    ].join('\n'),
    files: [{
      attachment: path.join(__dirname, '../../../assets/images/miaomi_bd.jpg'),
    }],
  });
}

taskScheduler.addTask('daily', {
  name: 'Miaomi180 birdthday tasks',
  task: handleMiaomiBdTasks,
});

taskScheduler.addTask('month', {
  name: 'Miaomi180 monthly announce birthday',
  task: showRecentBd,
});

taskScheduler.addTask('other', {
  name: 'Announce 5/5 Miaomi birthday',
  period: '0 0 5 5 *',
  task: announceMiaomiBd,
});
