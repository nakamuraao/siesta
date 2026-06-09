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
    const BD = await this.userBd.findAll({ where: { bdMonth: month, bdDay: date }, raw: true });
    if (BD.length === 0) {
      const string = '今天沒有人生日～';
      return string;
    } else {
      let string = '';
      for (let i = 0; i < BD.length; i++) {
        string = string.concat(`:tada: <@${(await BD)[i].user_id}> :tada:\n`);
      };
      string = string.concat('生日快樂:partying_face:');
      return string;
    }
  }

  async birthdayTodayRaw() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const BD = await this.userBd.findAll({ where: { bdMonth: month, bdDay: date }, raw: true });
    return BD;
  }

  async birthdayRecent() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const BD = await this.userBd.findAll({ where: { bdMonth: { [sql.Op.between]: [month, month + 2] } }, order: [['bdMonth', 'ASC'], ['bdDay', 'ASC']], raw: true });
    let string = '';
    if (BD.length === 0) {
      const string = '最近沒有人生日～';
      return string;
    } else {
      for (let i = 0; i < BD.length; i++) {
        string = string.concat(`<@${(await BD)[i].user_id}> - ${(await BD)[i].bdMonth}月${(await BD)[i].bdDay}日\n`);
      };
      return string;
    }
  }

  async showAllBirthday() {
    const bds = await this.userBd.findAll({ order: [['bdMonth', 'ASC'], ['bdDay', 'ASC']], raw: true });
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
    const date = await this.userBd.findOne({ where: { user_id: userid } });
    const fullBD = `${date.get('bdMonth')}月${date.get('bdDay')}日`;
    return fullBD;
  }

  async findBirthdayDay(userid) {
    const date = await this.userBd.findOne({ where: { user_id: userid } });
    return date.get('bdDay');
  }

  async findBirthdayMonth(userid) {
    const date = await this.userBd.findOne({ where: { user_id: userid } });
    return date.get('bdMonth');
  }
}

module.exports.birthday = birthday;
