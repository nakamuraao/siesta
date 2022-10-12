const sql = require('sequelize');

const sequelize = new sql('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
});

class log {
  constructor(serverId) {
    this.serverId = serverId;
    this.server = require('../dbStructure/log.js')(sequelize, sql.DataTypes);
  }

  async addLogChannel(serverId, serverName, channelId) {
    await this.server.create({
      server_id : serverId,
      server_name : serverName,
      channel_id : channelId
    });
  }

  async findLogChannel(serverId) {
    const server = await this.server.findOne({ where: { server_id: serverId }, raw: true });
    // console.log(channel)
    return server;
  }

  async logChannelId(serverId) {
    const server = await this.server.findOne({ where: { server_id: serverId } });
    return server.get('channel_id');
  }

  async deleteLogChannel(serverId) {
    await this.server.destroy({ where: { server_id: serverId } });
  }
}

module.exports.log = log;
