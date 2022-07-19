const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

class currency {
	constructor(userID) {
		this.user = require('../dbStructure/currency')(sequelize, Sequelize.DataTypes);
		this.userID = userID;
		this.initBalance = 1000;
		this.perSign = 600;
		this.signDuration = 6;
		this.user.sync();
	}
	async addUser(userID,userTag) {
		await this.user.create({
			user_id: userID,
			user_tag:userTag,
			balance: this.initBalance,
			signTime: Date.now()
		});
	}

	async updateSignTime(userID) {
		await this.user.update({ signTime: Date.now() }, { where: { user_id: userID } });
	}

	async updateUserTag(userID,userTag){
		await this.user.update({user_tag:userTag},{where:{user_id:userID}})
	}

	/*async updateMineTime(userID) {
		await this.user.update({ mineTime: Date.now() }, { where: { user_id: userID } });
	}*/

	async updateBalance(userID, num) {
		//const target = await this.user.findOne({ where: { user_id: userID } });
		await this.user.update({ balance: num }, { where: { user_id: userID } });
	}

	async isUserExist(userID) {
		const user = await this.user.findOne({ where: { user_id: userID } });
		return user ? true : false;
	}

	async getUserStats(userID) {
		const user = await this.user.findOne({ where: { user_id: userID } });
		return user;
	}

	async leaderboard(){
		const board = await this.user.findAll({ where: { user_id: { [Op.not]: '00000000' } }, order: [['balance', 'DESC']] });
		return board;
	}
}

module.exports.currency = currency;