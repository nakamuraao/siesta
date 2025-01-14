const good = [
  "Costco凱撒沙拉",
  "Costco烤雞",
  "Costco鮭魚壽司",
  "Subway",
  "三寶飯",
  "下水湯",
  "丹丹漢堡",
  "丼飯",
  "乾麵",
  "便當",
  "優酪乳配餅乾棍",
  "全家",
  "八方雲集",
  "剩飯",
  "吉祥如意燉大鴨",
  "咖哩飯，一定要拌！",
  "咖哩飯，不准拌！",
  "咖哩飯",
  "哈根大師",
  "四海遊龍",
  "四神湯",
  "土魠魚羹",
  "壽司，但只吃醋飯",
  "壽司",
  "大腸麵線",
  "太陽餅",
  "奶酥吐司",
  "宜蘭蔥油餅",
  "家庭餐廳",
  "小七",
  "小火鍋",
  "巧克力",
  "巧克力卡拉雞",
  "彩慶檸檬龍虎班",
  "復活蛋",
  "披薩",
  "拉麵",
  "排骨酥麵（湯）",
  "排骨飯",
  "控肉飯",
  "提拉米蘇",
  "提拉米蘇雞排（就表面被麻辣粉淹沒的雞排）",
  "摩斯",
  "擔仔麵",
  "新疆切糕，一刀一套房",
  "早餐店",
  "梅干扣肉飯",
  "椰子",
  "榨菜肉絲麵",
  "榴槤",
  "櫻花肉刺身",
  "油雞飯",
  "泡菜炒豬豬煙肉",
  "泡菜炒飯",
  "泡麵",
  "泰式香蕉煎餅",
  "海鮮麵",
  "涼拌豬耳豬頭皮",
  "港式點心",
  "湯咖哩",
  "湯麵",
  "滷肉飯",
  "滿福堡",
  "漢堡王",
  "烏龍麵",
  "烤火雞",
  "烤肉",
  "烤飯團",
  "焗烤",
  "無菜單料理",
  "煙囪捲",
  "燉飯",
  "燒花枝",
  "營多",
  "爆米花",
  "牛排",
  "牛肉湯麵",
  "牛肉炒飯",
  "牛肉麵",
  "玉子燒",
  "玉米濃湯",
  "甜甜圈",
  "當歸鴨肉麵線",
  "白吐司",
  "白子刺身",
  "皮蛋",
  "皮蛋瘦肉粥",
  "章魚燒",
  "米線",
  "米血湯",
  "粥",
  "紅燒肉飯",
  "紅豆年糕湯",
  "總匯三明治",
  "義大利麵",
  "肉",
  "肯德基",
  "胖老爹",
  "胡椒餅",
  "腳庫飯",
  "自助餐",
  "花生捲冰淇淋",
  "花膠鮑魚千貝佛跳牆",
  "草莓和牛捲",
  "草莓蛋糕",
  "荷包蛋",
  "菜",
  "菜脯蛋",
  "萊爾富",
  "葡撻",
  "蒜苖烏魚子油飯",
  "蒸蛋",
  "蘿蔔排骨湯",
  "蘿蔔糕",
  "蚵仔泡飯",
  "蚵仔煎",
  "蚵仔酥",
  "蚵仔麵線",
  "蛋包飯",
  "蛋撻",
  "蛋花湯",
  "蝦味先",
  "蝴蝶酒香東坡肉",
  "豆花",
  "豆芽菜",
  "豬腳飯",
  "豬腳麵線",
  "豬血湯",
  "貢丸湯",
  "起司火鍋",
  "酸辣湯",
  "金莎配花生醬或果醬",
  "金針排骨湯",
  "鍋貼",
  "鐵板燒",
  "陽春乾麵",
  "陽春麵",
  "隔間肉湯",
  "雙棗藥膳海鮮蝦",
  "雞(鴨)肉飯",
  "雞絲麵",
  "雞胸肉",
  "雞腿飯",
  "雞蛋湯",
  "雞蛋餅",
  "飯團",
  "餃子",
  "養生蜂蜜龜苓膏",
  "餛飩麵",
  "饅頭",
  "香菜",
  "馬卡龍",
  "高麗菜湯",
  "魚皮粥",
  "魚皮飯",
  "魚肚飯",
  "魚蛋粉",
  "魷魚羹",
  "鮪魚罐頭",
  "鰻魚飯",
  "鳳梨披薩",
  "鳳梨酥",
  "鴨肉冬粉",
  "鴨血",
  "鷄排",
  "鹹水雞",
  "鹹豆漿",
  "鹹酥雞",
  "麥當當",
  "麻婆豆腐",
  "麻辣燙",
  "麻辣豆花",
  "麻醬麵",
  "黯然銷魂飯",
];

const strange = [
  "...尖尖哇嘎乃！",
  "1UP蘑菇",
  "2號電池",
  "Ex咖哩棒",
  "MINTIA飯（可選擇泡可樂吃）",
  "三色豆",
  "三色豆冰棒",
  "三色豆燒賣",
  "不要吃",
  "中部粽",
  "中間有蛋塔的披薩",
  "二氧化碳，進行光合作用",
  "仰望星空派",
  "包裝氮氣裡贈送的洋芋片",
  "吃什麼自己想啦",
  "咖啡豆",
  "哈利波特怪味糖",
  "哈密哈",
  "嗚啦呀哈呀哈嗚啦！",
  "嘉頓雜餅",
  "噴水雞肉飯",
  "土",
  "地道印度料理。你一定要吃，不能請朋友吃",
  "士力架配維力炸醬麵",
  "大宇宙燒賣",
  "大家一發超派鐵拳",
  "大蔥炒大蒜",
  "大魔術熊貓豆腐",
  "奧利奧炊飯",
  "奧利給",
  "女僕火鍋",
  "巧克力蛋吐司",
  "布丁泡麵",
  "帕魯",
  "我一發Starlight Breaker！",
  "昆蟲料理",
  "昇龍餃子",
  "普拿疼",
  "月餅料理",
  "木魚柳包",
  "果凍壽司",
  "橘子餃子",
  "河鱧",
  "泡了可樂的蛋糕",
  "泡了水的巧克力或餅乾",
  "洗衣機煮餅乾",
  "湯圓拌42號混凝土",
  "湯圓鮮奶油蛋糕",
  "漢堡沾麵線羹",
  "潮汕雞蛋刨冰",
  "炸三色豆",
  "炸蝦尾",
  "炸豬排蜂蜜蛋糕焗飯",
  "炸面紙",
  "無料理菜單",
  "熱狗奈",
  "營養午餐",
  "營養補充品",
  "牛奶卡樂B",
  "牛糞餅。別被它的名字嚇到，就如老婆餅沒老婆一樣，牛糞餅也沒有餅",
  "牛㿜火鍋",
  "珍奶牛肉麵",
  "生命之水泡麵",
  "白灼餅乾",
  "白飯炒蜂蜜蛋糕",
  "皮皮",
  "章魚風味拉拉蛋糕",
  "糖、香料、還有美好的味道",
  "紅豆蓋飯",
  "紅豆軍艦壽司",
  "美乃滋蓋飯",
  "義大利麵，拌42號混凝土",
  "草莓蛋吐司加小黃瓜加胡椒粉",
  "草莓雞肉餃子",
  "藍色蛋包飯",
  "蜂蜜蛋糕炒飯",
  "蜂蜜蛋糕雞肉飯",
  "蜂蜜黑糖珍珠披薩",
  "螞蟻腸粉",
  "螞蟻蛋撻",
  "螢光咖哩",
  "豬乳頭煲粥",
  "豬肝，記得煮熟再吃",
  "豬豬",
  "軟掉的餅乾",
  "那個吧",
  "醃海雀",
  "釋式薯條",
  "陽光、空氣、水",
  "雀食",
  "雲林縣的紅燒青蛙和清湯青蛙",
  "青豆披薩",
  "餅。來人，餵這位公子吃餅！",
  "香菜聖誕樹",
  "香菜蛋糕",
  "鬆餅配京都念慈菴川貝枇杷糖漿",
  "鯡魚罐頭",
  "鹹湯圓",
  "麻辣芝麻湯圓",
];

module.exports = [...good, ...strange];
module.exports.good = good;
module.exports.strange = strange;
