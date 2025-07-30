from flask import Flask, request, jsonify, render_template 
from spacy import load

nlp = load("pt_core_news_sm")

intencao_horario = {
    "abrir", "abre", "abrem", "aberto", "abertura", "abrimos",
    "funcionar", "funciona", "funcionamento", "horário", "horarios",
    "hora", "fechar", "fecha", "fecham", "fechado", "fechamento",
    "atendimento", "atende", "atendem", "atender", "quando", "dias",
    "dia", "manha", "noite", "tarde", "expediente", "disponível",
    "disponibilidade", "qual horário", "que horas", "que dia",
    "quando abre", "quando fecha"
}

intencao_preco = {
    "preço", "precos", "valor", "valores", "custo", "custos",
    "cobra", "cobram", "cobrar", "tarifa", "taxa", "quanto", "quanto custa",
    "quanto é", "qual valor", "tem desconto", "preçário", "orçamento",
    "cobrança", "caro", "barato", "tabela", "promoção", "grátis", "gratuito"
}

intencao_info = {
    "site", "página", "paginas", "aba", "abas", "menu", "menus",
    "informação", "informações", "dados", "conteúdo", "conteudos",
    "navegar", "local", "localização", "endereços", "serviços",
    "contato", "sobre", "empresa", "quem somos", "ajuda", "faq",
    "suporte", "navegação", "acessar", "procuro", "tem no site",
    "onde", "como encontrar", "buscar", "explorar"
}

referencia_horario = nlp("horário de funcionamento")
referencia_preco = nlp("preço dos serviços")
referencia_info = nlp("informações do site")

### OBS: PODEMOS USAR ESTA FUNCAO DE SIMILARIDADE P FICAR MASI GENERICO A ENTRADA DO USER
### if doc.similarity(nlp("horário de funcionamento")) > 0.75:
###     # resposta

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("chatbot.html") 

@app.route("/pergunta", methods=["POST"])
def responder():
    dados = request.get_json()
    pergunta = dados.get("pergunta", "").lower()
    doc = nlp(pergunta)
    lemas = {token.lemma_ for token in doc if token.is_alpha}

    if lemas & intencao_horario or doc.similarity(referencia_horario) > 0.75:
        resposta = "Funcionamos de segunda a sexta, das 9h às 18h."
    elif lemas & intencao_preco or doc.similarity(referencia_preco) > 0.75:
        resposta = "Nossos preços variam de acordo com o serviço. Consulte nosso WhatsApp."
    elif lemas & intencao_info or doc.similarity(referencia_info) > 0.75:
        resposta = "Nosso site tem as abas: Home, Serviços, Contato e Sobre nós."
    else:
        resposta = "Desculpe, não entendi sua pergunta. Tente reformular."

    return jsonify({"resposta": resposta})

if __name__ == "__main__":
    app.run(debug=True, port=5002)
