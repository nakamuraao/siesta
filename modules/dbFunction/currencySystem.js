const Sequelize = require('sequelize');
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
		this.perSign = 100;
		this.signDuration = 1;
		this.user.sync();
	}
	async addUser(userID) {
		await this.user.create({
			user_id: userID,
			balance: this.initBalance,
			signTime: Date.now()
		});
	}

	async updateSignTime(userID) {
		await this.user.update({ signTime: Date.now() }, { where: { user_id: userID } });
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
}

module.exports.currency = currency;