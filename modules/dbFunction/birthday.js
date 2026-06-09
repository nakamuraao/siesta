const sql = require('sequelize');

const sequelize = new sql('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
});

class birthday {
  constructor() {
    this.userBd = require('../dbStructure/birthday.js')(sequelize, sql.DataTypes);
  }

  async addBirthday(userid, bdMonth, bdDay) {
    await this.userBd.create({
      user_id: userid,
      bdMonth,
      bdDay,
    });
  }

  async birthdayToday() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const BD = await this.userBd.findAll({
      where: { bdMonth: month, bdDay: date },
      raw: true,
    });

    let string = '今天沒有人生日～';
    if (BD.length > 0) {
      string = BD.map(d => `:tada: <@${d.user_id}> :tada:`).join('\n');
      string += '\n生日快樂:partying_face:';
    }
    return string;
  }

  async isSomeoneBirthdayToday() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const BD = await this.userBd.findOne({
      where: { bdMonth: month, bdDay: date },
      raw: true,
    });

    return BD !== null;
  }

  async birthdayTodayRaw() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const BD = await this.userBd.findAll({
      where: { bdMonth: month, bdDay: date },
      raw: true,
    });
    return BD;
  }

  async birthdayRecent() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const BD = await this.userBd.findAll({
      where: { bdMonth: { [sql.Op.between]: [month, month + 2] } },
      order: [['bdMonth', 'ASC'], ['bdDay', 'ASC']],
      raw: true,
    });

    let string = '最近沒有人生日～';
    if (BD.length > 0) {
      string = BD.map(d => `<@${d.user_id}> - ${d.bdMonth}月${d.bdDay}日`).join('\n');
    }
    return string;
  }

  async showAllBirthday() {
    const bds = await this.userBd.findAll({
      order: [['bdMonth', 'ASC'], ['bdDay', 'ASC']],
      raw: true,
    });
    return bds;
  }

  async deleteBirthday(userid) {
    await this.userBd.destroy({ where: { user_id: userid } });
  }

  async findBirthday(userid) {
    const date = await this.userBd.findOne({ where: { user_id: userid }, raw: true });
    return date;
  }

  async findFullBirthday(userid) {
    const date = await this.userBd.findOne({ where: { user_id: userid }, raw: true });
    const fullBD = `${date.get('bdMonth')}月${date.get('bdDay')}日`;
    return fullBD;
  }

  async findBirthdayDay(userid) {
    const date = await this.userBd.findOne({ where: { user_id: userid }, raw: true });
    return date.get('bdDay');
  }

  async findBirthdayMonth(userid) {
    const date = await this.userBd.findOne({ where: { user_id: userid }, raw: true });
    return date.get('bdMonth');
  }
}

module.exports.birthday = birthday;
