const { token, oid, miaomi, miaomiCh, BDrole } = require('./config.json');
const { guilds, users, channels } = require('./index.js');
const { dailyCheckBirthday } = require('./modules/dbFunction/birthday.js');

dailyCheckBirthday(guilds, users, channels, oid, miaomi, miaomiCh, BDrole);
