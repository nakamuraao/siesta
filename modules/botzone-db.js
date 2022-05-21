const sql = require('sequelize');

const sequelize = new sql('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});


class botzone {
	constructor(channelId){
		this.channelId = channelId;
		this.channel = require('./botzone.js')(sequelize, sql.DataTypes);
	}

	async addBotZone(channelId){
		await this.channel.create({
			channel_id : channelId,
		})
	}

	async findChannel(channelId){
		return await this.channel.findOne({ where: { channel_id: channelId }, raw: true });
		
	}

	async deleteChannel(channelId){
		await this.channel.destroy({ where: { channel_id: channelId } });
	}
}


module.exports.botzone = botzone;