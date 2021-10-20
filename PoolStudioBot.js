/**********************************************************************************/
//Глобальный триггер До - test - пересылка в чат
//1
var msgId = qnext.getValue("update.message.message_id");
var gtEntities = qnext.getValue("localVar.gtEntities", "");
var gtText = qnext.getValue("update.message.text");

var chatId = -1001458086210;
async function run() {
  var body = {};  
  if (gtEntities.lenth == 0) {
    body = {
      chat_id: chatId,
      text: gtText
    };
  } else {
    body = {
      chat_id: chatId,
      text: gtText,
      entities: gtEntities
    };
  }
  exports.body = body;
  var result = await qnext.telegram.api("sendMessage", body);
  exports.result = result;
  qnext.onFinish();
}
run();

/**********************************************************************************/
//Глобальный триггер До - sticker - пересылка в чат
//3
var fileId = qnext.getValue("update.message.sticker.file_id");
var chatId = -1001458086210;
async function run() {
  var body = {
    chat_id: chatId,
    sticker: fileId
  };
  var result = await qnext.telegram.api("sendSticker", body);
  exports.result = result;
  qnext.onFinish();
}
run();

/**********************************************************************************/
//Глобальный триггер До - photo - пересылка в чат
//4
var fileId = qnext.getValue("update.message.photo.0.file_id");
var chatId = -1001458086210;
async function run() {
  var body = {
    chat_id: chatId,
    photo: fileId
  };
  var result = await qnext.telegram.api("sendPhoto", body);
  exports.result = result;
  qnext.onFinish();
}
run();

/**********************************************************************************/
//Глобальный триггер До - animation - пересылка в чат
//5
var fileId = qnext.getValue("update.message.animation.file_id");
var chatId = -1001458086210;
async function run() {
  var body = {
    chat_id: chatId,
    animation: fileId
  };
  var result = await qnext.telegram.api("sendAnimation", body);
  exports.result = result;
  qnext.onFinish();
}
run();

/**********************************************************************************/
//Глобальный триггер До - document - пересылка в чат
//6
var fileId = qnext.getValue("update.message.document.file_id");
var chatId = -1001458086210;
async function run() {
  var body = {
    chat_id: chatId,
    document: fileId
  };
  var result = await qnext.telegram.api("sendDocument", body);
  exports.result = result;
  qnext.onFinish();
}
run();

/**********************************************************************************/
//Глобальный триггер До - voice - пересылка в чат
//7
var fileId = qnext.getValue("update.message.voice.file_id");
var chatId = -1001458086210;
async function run() {
  var body = {
    chat_id: chatId,
    voice: fileId
  };
  var result = await qnext.telegram.api("sendVoice", body);
  exports.result = result;
  qnext.onFinish();
}
run();

/**********************************************************************************/
//Глобальный триггер До - video_note - пересылка в чат
//8
var fileId = qnext.getValue("update.message.video_note.file_id");
var chatId = -1001458086210;
async function run() {
  var body = {
    chat_id: chatId,
    video_note: fileId
  };
  var result = await qnext.telegram.api("sendVideoNote", body);
  exports.result = result;
  qnext.onFinish();
}
run();

/**********************************************************************************/
//Глобальный триггер До - video - пересылка в чат
//9
var fileId = qnext.getValue("update.message.video.file_id");
var chatId = -1001458086210;
async function run() {
  var body = {
    chat_id: chatId,
    video: fileId
  };
  var result = await qnext.telegram.api("sendVideo", body);
  exports.result = result;
  qnext.onFinish();
}
run();

/**********************************************************************************/
//Команды - Reply in Group - Сообщение - answer to user from group
//10
function parseFun(rmt) {
  b = rmt.indexOf("🆔") + 3;
  e = rmt.indexOf("🛗") - 1;
  let rmtStr = rmt.substring(b, e);
  e = rmtStr.indexOf("[") - 1;
  answer.rmtUserId = Number(rmtStr.substring(0, e));
  b = rmt.indexOf("🕒") + 3;
  e = rmt.indexOf("✴️") - 1;
  answer.dateRmt = rmt.substring(b, e);
  b = rmt.indexOf("#️⃣") + 4;
  e = rmt.indexOf("🕒") - 1;
  answer.tegMsg = rmt.substring(b, e);
  b = rmt.indexOf("✴️") + 3;
  rmtBot = rmt.substring(b);
  b = rmtBot.indexOf("👮");
  if (b > -1) {
    b = b + 3;
    answer.adminName = rmtBot.substring(b);
    b = 0;
    e = rmtBot.indexOf("\n");
    tegBot = rmtBot.substring(b, e);
  } else {
    b = rmtBot.indexOf("✴️") + 1;
    tegBot = rmtBot.substring(b);
  }
  return tegBot;
} //function parseFun(rmt)
function actFun(rmt) {
  let act = 0;
  let b = 0;
  let e = rmt.indexOf("\n");
  answer.rmtFS = rmt.substring(b, e);
  switch (answer.rmtFS) {
    case "🆕 User in bot #newUser":
      act = 1;
      break;
    case "⚛️ ReStart bot #reStartBot":
      act = 2;
      break;
    case "♻️ Forward from Bot #forwardFromBot":
      act = 3;
      break;
    default:
      act = 0;
  };
  if (act >= 3) {
    b = rmt.indexOf("🔻");
    e = rmt.indexOf("👤") - 1;
    answer.rmtSS = rmt.substring(b, e);
    b = answer.rmtSS.indexOf("[") + 1;
    e = answer.rmtSS.indexOf("]");
    answer.mbId = Number(answer.rmtSS.substring(b, e));
    b = answer.rmtSS.indexOf("(") + 1;
    e = answer.rmtSS.indexOf(")");
    answer.mcId = Number(answer.rmtSS.substring(b, e));
    b = answer.rmtSS.indexOf("[", e) + 1;
    e = answer.rmtSS.indexOf("]", e);
    let rmbId = answer.rmtSS.substring(b, e);
    answer.rmbId = (rmbId == "⁠") ? 0 : Number(rmbId);
  } else {
    answer.rmtSS = "";
  }
  return act;
} //function actFun(rmt)
function ansFun(mt) {
  let b = 0;
  let e = 3;
  let bmt = mt.substring(b, e);
  if (bmt == "!!!") {
    b = 0;
    e = 3;
    ans = 3;
  } else {
    b = 0;
    e = 2;
    bmt = mt.substring(b, e);
    if (bmt == "!!") {
      b = 0;
      e = 2;
      ans = 2;
    } else {
      b = 0;
      e = 0;
      ans = 0;
    }
  }
  answer.bmt = mt.substring(b, e);
  answer.emt = mt.substring(e);
  return ans;
} //function ansFun(mt)
function mainFun(err) {
  var chat_id = qnext.getValue("update.message.chat.id", 0);
  answer.chat_id = chat_id;
  // id чатов в каких реагировать на reply
  var chatId1 = -1001458086210; // - PoolStudio TG
  if (chat_id != chatId1) {return -1}
  answer.mt = qnext.getValue("update.message.text", "");
  if (answer.mt.length == 0) {return -2}
  answer.ans = ansFun(answer.mt);
  if (answer.ans == 0) {return -3;}
  answer.rmt = qnext.getValue("update.message.reply_to_message.text", "");
  answer.act = actFun(answer.rmt);
  if (answer.act == 0) {return -4;}
  answer.mtId = qnext.getValue("update.message.message_id", 0);
  answer.rmtId = qnext.getValue("update.message.reply_to_message.message_id", 0);
  answer.tegBot = parseFun(answer.rmt);
  if (answer.tegBot != "@PoolStudioBot") {return -5;}
  return err;
} //function mainFun(err)
var answer = {'error': 0};
answer.error = mainFun(0);
exports.answer = answer;

/**********************************************************************************/
//Команды - Reply in Group - Сообщение - answer to user from group
//10+
function parseFun(rmt) {
  b = rmt.indexOf("🆔") + 3;
  e = rmt.indexOf("🛗") - 1;
  let rmtStr = rmt.substring(b, e);
  e = rmtStr.indexOf("[") - 1;
  ans.rmtUserId = Number(rmtStr.substring(0, e));
  b = rmt.indexOf("🕒") + 3;
  e = rmt.indexOf("✴️") - 1;
  ans.dateRmt = rmt.substring(b, e);
  b = rmt.indexOf("#️⃣") + 4;
  e = rmt.indexOf("🕒") - 1;
  ans.tegMsg = rmt.substring(b, e);
  b = rmt.indexOf("✴️") + 3;
  rmtBot = rmt.substring(b);
  b = rmtBot.indexOf("👮");
  if (b > -1) {
    b = b + 3;
    ans.adminName = rmtBot.substring(b);
    b = 0;
    e = rmtBot.indexOf("\n");
    tegBot = rmtBot.substring(b, e);
  } else {
    b = rmtBot.indexOf("✴️") + 1;
    tegBot = rmtBot.substring(b);
  }
  return tegBot;
} //function parseFun(rmt)
function actFun(rmt) {
  let act = 0;
  let b = 0;
  let e = rmt.indexOf("\n");
  ans.rmtFS = rmt.substring(b, e);
  switch (ans.rmtFS) {
    case "🆕 User in bot #newUser":
      act = 1;
      break;
    case "⚛️ ReStart bot #reStartBot":
      act = 2;
      break;
    case "♻️ Forward from Bot #forwardFromBot":
      act = 3;
      break;
    default:
      act = 0;
  };
  if (act >= 3) {
    b = rmt.indexOf("🔻");
    e = rmt.indexOf("👤") - 1;
    ans.rmtSS = rmt.substring(b, e);
    b = ans.rmtSS.indexOf("[") + 1;
    e = ans.rmtSS.indexOf("]");
    ans.mbId = Number(ans.rmtSS.substring(b, e));
    b = ans.rmtSS.indexOf("(") + 1;
    e = ans.rmtSS.indexOf(")");
    ans.mcId = Number(ans.rmtSS.substring(b, e));
    b = ans.rmtSS.indexOf("[", e) + 1;
    e = ans.rmtSS.indexOf("]", e);
    let rmbId = ans.rmtSS.substring(b, e);
    ans.rmbId = (rmbId == "⁠") ? 0 : Number(rmbId);
  } else {
    ans.rmtSS = "";
  }
  return act;
} //function actFun(rmt)
function ansFun(mt) {
  let result = 0;
  let b = 0;
  let e = 3;
  let bmt = mt.substring(b, e);
  if (bmt == "!!!") {
    b = 0;
    e = 3;
    result = 3;
  } else {
    b = 0;
    e = 2;
    bmt = mt.substring(b, e);
    if (bmt == "!!") {
      b = 0;
      e = 2;
      result = 2;
    } else {
      b = 0;
      e = 0;
      result = 0;
    }
  }
  ans.bmt = mt.substring(b, e);
  ans.emt = mt.substring(e);
  if (ans.emt.length == 0) {result = 0;}
  return result;
} //function ansFun(mt)
function mainFun(act) {
  ans.action = act;
  ans.chat_id = qnext.getValue("update.message.chat.id", 0);
  // id чатов в каких реагировать на reply
  ans.chatId1 = -1001458086210; // - PoolStudio TG
  if (ans.chat_id != ans.chatId1) {return -1}
  ans.mt = qnext.getValue("update.message.text", "");
  if (ans.mt.length == 0) {return -2}
  act = ansFun(ans.mt);
  if (act == 0) {return -3;}
  ans.rmt = qnext.getValue("update.message.reply_to_message.text", "");
  ans.act = actFun(ans.rmt);
  if (ans.act == 0) {return -4;}
  ans.mtId = qnext.getValue("update.message.message_id", 0);
  ans.rmtId = qnext.getValue("update.message.reply_to_message.message_id", 0);
  ans.tegBot = parseFun(ans.rmt);
  if (ans.tegBot != "@PoolStudioBot") {return -5;}
  return act;
} //function mainFun(act)
var ans = {};
ans.action = mainFun(0);
//exports.ans = ans;
var answer = {
  "action": ans.action,
  "rmtUserId": ans.rmtUserId,
  "botMsgId": ans.botMsgId,
  "mtId": ans.mtId,
  "mbId": ans.mbId,
  "emt": ans.emt
};
exports.answer = answer;
/**********************************************************************************/
//Команды - Reply in Group - Сообщение - answer to user from group
//10++
//Проверка: update.message.chat.id чата -1001458086210
//Наличия в update.message.reply_to_message.text строки: 🔻 [2871] (948) [⁠]/n👤
//Наличия в update.message.reply_to_message.text строки: 🆔 501071166 [@Alienjoys] 🛗
//Наличия в update.message.text текста 
//Наличия в update.message.text текста начинающегося с !
//Наличия в update.message.caption текста 


function mainFun(action) {
  ans.mci = qnext.getValue("update.message.chat.id", 0);
  // id чатов в каких реагировать на reply
  ans.chatId1 = -1001723379424; // - Feedback PS
  
  if (ans.mci != ans.chatId1) {return -1}
  ans.mrt = qnext.getValue("update.message.reply_to_message.text", "");
  let b = ans.mrt.indexOf("🔻");
  let e = ans.mrt.indexOf("👤") - 1;
  if (b < 0 || e < 0) {return -2}
  ans.mrt2 = ans.mrt.substring(b, e);
  ans.mrt2Len = ans.mrt2.length;
  if (ans.mrt2Len > 2) {
    b = ans.mrt2.indexOf("[") + 1;
    e = ans.mrt2.indexOf("]");
    ans.mbId = Number(ans.mrt2.substring(b, e));
    b = ans.mrt2.indexOf("(") + 1;
    e = ans.mrt2.indexOf(")");
    ans.mcId = Number(ans.mrt2.substring(b, e));
    b = ans.mrt2.indexOf("[", e) + 1;
    e = ans.mrt2.indexOf("]", e);
    let rmbId = ans.mrt2.substring(b, e);
    ans.rmbId = (rmbId == "⁠") ? 0 : Number(rmbId);
  }
  b = ans.mrt.indexOf("🆔") + 3;
  e = ans.mrt.indexOf("🛗") - 1;
    if (b < 0 || e < 0) {return -3}
  ans.mrt3 = ans.mrt.substring(b, e);
  e = ans.mrt3.indexOf("[") - 1;
  ans.rmUserId = Number(ans.mrt3.substring(0, e));
  ans.mtId = qnext.getValue("update.message.message_id", 0);
  ans.mt = qnext.getValue("update.message.text", "");
  if (ans.mt.length == 0) {
    ans.emt = "";
    ans.mc = qnext.getValue("update.message.caption", "");
    action = 3; //forward answer
  } else {
    ans.bmt = ans.mt.substring(0, 1);
    if (ans.bmt == "!") {
      ans.emt = ans.mt.substring(1);
      if (ans.emt.length == 0) {return -4}
      action = 2;
    } else {
      ans.emt = ans.mt;
      action = 1;
    }
  }
  return action;
} //function mainFun(action)

var ans = {};
ans.action = mainFun(0);
exports.ans = ans;
var answer = {
  "action": ans.action,
  "rmUserId": ans.rmUserId,
  "botMsgId": 0,
  "mtId": ans.mtId,
  "mbId": ans.mbId,
  "emt": ans.emt
};
exports.answer = answer;

/**********************************************************************************/
//forward answer to user from group
//11
function actFun(rmt) {
  let b = rmt.indexOf("🆔");
  if (b != -1) {b = b + 3} else {return -2;}
  let e = rmt.indexOf("🛗");
  if (e != -1) {e = e - 1} else {return -3;}
  let amt = rmt.substring(b, e);
  e = amt.indexOf("[") - 1;
  answer.rmUserId = Number(amt.substring(0, e));
  return 3;
} //function actFun(rmt)
function ansFun(mt) {
  let smt = mt.substr(0, 1);
  return (smt == "!") ? -1 : 2;
} //function ansFun(mt)
function mainFun(err) {
  answer.mt = qnext.getValue("update.message.text", "");
  if (answer.mt.length == 0) {
    answer.mt = qnext.getValue("update.message.caption", "");
    if (answer.mt.length == 0) {
      err = 1;
    } else {
      err = ansFun(answer.mt);
    }
  } else {
    err = ansFun(answer.mt);
  }
  return err;
} //function mainFun(err)
var answer = {'error': 0};
answer.error = mainFun(0);
if (answer.error >= 0) {
  answer.rmt = qnext.getValue("update.message.reply_to_message.text", "");
  answer.error = actFun(answer.rmt);
}
exports.answer = answer;

/**********************************************************************************/
//forward answer to user from group
//12
function ansFun(rmt) {
  let b = rmt.indexOf("🆔");
  if (b != -1) {b = b + 3} else {return -3;}
  let e = rmt.indexOf("🛗");
  if (e != -1) {e = e - 1} else {return -4;}
  let amt = rmt.substring(b, e);
  e = amt.indexOf("[") - 1;
  answer.rmtUserId = Number(amt.substring(0, e));
  answer.mtId = qnext.getValue("update.message.message_id", 0);
  return 1;
} //function actFun(rmt)
function mainFun(err) {
  answer.mt = qnext.getValue("update.message.text", "");
  exports.answerLen = answer.mt.length;

  if (answer.mt.length == 0) {
    answer.mt = qnext.getValue("update.message.caption", "");
    if (answer.mt.length == 0) {
      answer.rmt = qnext.getValue("update.message.reply_to_message.text", "");
      err = ansFun(answer.rmt);
    } else {
      err = -1;
    }
  } else {
    err = -2;
  }
  return err;
} //function mainFun(err)
var answer = {'error': 0};
answer.error = mainFun(0);
exports.answer = answer;

/**********************************************************************************/
//Команды - Reply in Group - Сообщение - answer to user from group - answer.act > 0 - takeChat
//Команды - Reply in Group - Сообщение - answer.error < 0 - forward answer - send answer - delMsgGT
//Создание профиля delMsgGT
//13
var delMsgGT = qnext.getValue('localVar.delMsgGT', '');
exports.delMsgGTOLD = delMsgGT;

var delMsgMenuId = qnext.getValue('localVar.delMsgMenuId', 0);
exports.delMsgMenuId = delMsgMenuId;

var arrDelMsgGT = delMsgGT.split(' ').map(Number);
exports.arrDelMsgGT = arrDelMsgGT;

if (arrDelMsgGT[0] == 0) {
  var delEmpty = arrDelMsgGT.shift();
  exports.delEmpty = delEmpty;
}

var arrayLen = arrDelMsgGT.push(delMsgMenuId);
exports.arrayLen = arrayLen;

var delMsgGT = arrDelMsgGT.join(' ');
exports.delMsgGT = delMsgGT;

/**********************************************************************************/
//Расписание - Отложенные действия - delMsgGT
// Удаление из профиля delMsgGT
//14
var delMsgGT = qnext.getValue('localVar.delMsgGT','');
exports.delMsgGTOLD = delMsgGT;

var arrDelMsgGT = delMsgGT.split(' ');
exports.arrayOLD = arrDelMsgGT;

delMsgMenuId = Number(arrDelMsgGT.shift());
exports.delMsgMenuId = delMsgMenuId;

delMsgGT = arrDelMsgGT.join(' ');
exports.delMsgGT = delMsgGT;
exports.arrDelMsgGT = arrDelMsgGT;

/**********************************************************************************/
//GTD - userLog - forwardMessageToChat - delMsgBot
//Создание профиля delMsgBot
//15
var gtd = qnext.getValue('localVar.gtd');
var delMsgBotArray = gtd.delMsgBot.split(' ').map(Number);
if (delMsgBotArray[0] == 0) {
  let delEmpty = delMsgBotArray.shift();
}
let arrayLen = delMsgBotArray.push(gtd.delMsgBotId);
gtd.delMsgBot = delMsgBotArray.join(' ');
exports.gtd = gtd;

/**********************************************************************************/
//Команды - Reply in Group - Сообщение - answer to user from group - answer.action > 0 - takeUsers
//Поиск и удаление из профиля delMsgBot
//16
var answer = qnext.getValue('localVar.answer');
answer.delMsgBotId = answer.mbId + 1;
let arrDelMsgBot = answer.delMsgBot.split(' ').map(Number);
let findDelMsgBotId = arrDelMsgBot.indexOf(answer.delMsgBotId);
if (findDelMsgBotId != -1) {
  arrDelMsgBot.splice(findDelMsgBotId, 1);
  answer.delMsgBot = arrDelMsgBot.join(' ');
} else {
  answer.delMsgBotId = 0;
}
exports.answer = answer;

/**********************************************************************************/
//Команды - Reply in Group - Сообщение - answer to user from group - delMsgTG
//Создание профиля delMsgTG
//17
var answer = qnext.getValue('localVar.answer');
var delMsgTGArray = answer.delMsgTG.split(' ').map(Number);
if (delMsgTGArray[0] == 0) {
  let delEmpty = delMsgTGArray.shift();
}
let arrayLen = delMsgTGArray.push(answer.delMsgTGId);
answer.delMsgTG = delMsgTGArray.join(' ');
exports.answer = answer;

/**********************************************************************************/
//Расписание - Отложенные действия - delMsgTG
// Удаление из профиля delMsgTG
//18
var delMsgTG = qnext.getValue('localVar.delMsgTG','');
var delMsgTGArr = delMsgTG.split(' ').map(Number);
exports.delMsgTGId = delMsgTGArr.shift();
exports.delMsgTG = delMsgTGArr.join(' ');

/**********************************************************************************/
//Глобальный Триггер - Триггер До - userLog - forwardMessageToChat - set Var
//Вырезаю из переменной ссылки имя
//19
var gtd = qnext.getValue('localVar.gtd');
var begSymb = gtd.whereUser.indexOf("@");
if (begSymb < 0) {
  begSymb = gtd.whereUser.indexOf("t.me/");
  if (begSymb < 0) {
    gtd.whereUs = "PoolStudioBot";
  } else {
    gtd.whereUs = gtd.whereUser.substring(5);
  }
} else {
  gtd.whereUs = gtd.whereUser.substring(1);
}
exports.gtd = gtd;

/**********************************************************************************/



