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
