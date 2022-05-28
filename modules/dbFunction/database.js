const sql = require('sequelize');

const sequelize = new sql('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

class ServerDB {
	constructor(guildId) {
		this.guildId = guildId;
		this.server = require('../dbStructure/servers.js')(sequelize, sql.DataTypes);
	}

	async addServer(guildId,guildName,guildMembers,adminrole) {

		await this.server.create({
			server_id: guildId,
			server_name: guildName,
            server_members: guildMembers,
            adminrole: adminrole
		}); 
	}

	async findServer(guildId) {

		return await this.server.findOne({ where: { server_id: guildId },raw:true });
	}
	
	async updateServer(guildId,guildName,guildMembers,adminrole) {

		await this.server.update({ 
            server_name: guildName,
            server_members: guildMembers,
            adminrole:adminrole
         }, { where: { server_id: guildId } });
	}
	
	async findAdminRole(guildId){
		const server = await this.server.findOne({ where: { server_id: guildId } });
		return server.get('adminrole');
	}

	/*async findMuteRole(guildId){
		const server = await this.server.findOne({ where: { server_id: guildId } });
		return server.get('muterole');
	}*/
}


module.exports.ServerDB = ServerDB;

