/**
 * Sets up daily jobs for the Discord bot
 * @param {object} client - The Discord.js client instance
 * @param {object} guilds - Guild data/cache object
 * @param {object} users - User data/cache object
 * @param {object} channels - Channel data/cache object
 * @returns {void}
 */
async function dailyJobs(client, guilds, users, channels) {
  const { oid, miaomi, miaomiCh, BDrole } = require('../../../config.json');

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
  if (BDObj.isSomeoneBirthdayToday()) {
    await miaomiGuild.roles.fetch();
    const role = miaomiGuild.roles.cache.find(role => role.id === BDrole);
    const BD = await BDObj.birthdayTodayRaw();
    BD.forEach((d) => {
      const member = miaomiGuild.members.cache.get(d.user_id);
      member.roles.add(role);
    });
    channel180.send(await BDObj.birthdayToday());
  }
  // #endregion
}

module.exports = {
  /**
   * Sets up daily jobs for the Discord bot
   * @type {Function}
   */
  dailyJobs,
};
