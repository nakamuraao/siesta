const sql = require('sequelize')

const sequelize = new sql('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
})

class ServerDB {
  constructor(guildId) {
    this.guildId = guildId
    this.server = require('../dbStructure/servers.js')(sequelize, sql.DataTypes)
  }

  async addServer(guildId, guildName, adminrole) {
    await this.server.create({
      server_id: guildId,
      server_name: guildName,
      adminrole,
    })
  }

  async updateServer(guildId, guildName, adminrole) {
    await this.server.update({
      server_name: guildName,
      adminrole,
    }, { where: { server_id: guildId } })
  }

  async findServer(guildId) {
    return await this.server.findOne({ where: { server_id: guildId }, raw: true })
  }

  async findAdminRole(guildId) {
    const server = await this.server.findOne({ where: { server_id: guildId } })
    return server.get('adminrole')
  }

  async listServer() {
    let string = ''
    let i
    await this.server.findAll().then((servers) => {
      for (i = 0; i < servers.length; i++) {
        string = string.concat(`\`${servers[i].server_id}\`` + ` \`${servers[i].server_name}\`` + `：` + `\`${servers[i].adminrole}\` ` + `<@&${servers[i].adminrole}>` + `\n`)
      }
    })
    return string
  }

  async allServerId() {
    let i
    const array = []
    await this.server.findAll().then((servers) => {
      for (i = 0; i < servers.length; i++) {
        array.push(servers[i].server_id)
      }
    })
    return array
  }
}

module.exports.ServerDB = ServerDB
