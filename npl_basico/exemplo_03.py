from spacy import load, displacy

nlp = load('pt_core_news_sm')
doc = nlp("Raphael faz códigos em Minas Gerais no Brasil.")

displacy.serve(doc, auto_select_port=True)