module.exports = (sequelize, DataTypes) => {
    return sequelize.define('currency',{
        
        user_id:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        user_tag:{
            type: DataTypes.STRING
        },
        balance:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        /*redTicket:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        blueTicket:{
            type: DataTypes.INTEGER,
            allowNull:false
        },*/
        signTime:{
            type: DataTypes.INTEGER,
            allowNull:false
        }/*,
        mineTime:{
            type: DataTypes.INTEGER,
            allowNull:false
        }*/
    },{
        freezeTableName: true,
		timestamps: false
    })
}