module.exports = (sequelize, DataTypes) => {
    return sequelize.define('servers',{
        server_id:{
            type: DataTypes.STRING,
			primaryKey: true
        },
        server_name:{
            type: DataTypes.STRING
        },
        server_members:{
            type: DataTypes.INTEGER
        },
        adminrole:{
            type: DataTypes.STRING
        }
    },{
        freezeTableName: true,
		timestamps: false
    })
}