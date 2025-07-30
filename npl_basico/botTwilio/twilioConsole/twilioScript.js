/* Usamos esse codigo daqui la nos servicos que a gente cria direto do site da twilio: https://console.twilio.com/us1/develop/functions/editor/ZS307238a60ee7638881654bef73e56519/environment/ZE5f5b79524f49442cf12fd9678f897c0f/function/ZHddb24d191afb2de2c2ac54168e099974*/
/* Esse código nao roda local, apenas no site do server deles. */
exports.handler = function(context, event, callback) {
  const userInput = (event.pergunta || "").toLowerCase();
  const palavrasChaveHorario = ["horário", "horas", "hora", "abre", "abrem", "funciona", "funcionamento", "fecha", "fecham", "atendimento", "atende", "quando", "dias", "dia"];
  const intencaoHorarioDetectada = palavrasChaveHorario.some(palavra => userInput.includes(palavra));

  let botResponse;

  if (intencaoHorarioDetectada) {
    botResponse = "Nosso horário de funcionamento é de Segunda a Sexta, das 9h às 18h.";
  } else {
    botResponse = "Desculpe, não entendi. Você pode perguntar sobre nosso horário de funcionamento.";
  }

  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Content-Type', 'application/json');
  response.setBody({ resposta: botResponse });

  return callback(null, response);
};