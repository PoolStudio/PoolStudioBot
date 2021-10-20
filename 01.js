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
