from spacy import blank

nlp = blank("pt") ## onde coloca o modelo

doc = nlp('Raphael foi ao estádio.') ## Doc eh o documento interio do texto
span = doc[0:5] ## Fatia do documento, juncao de varios tokens(palavras)
print(doc[0])
print(span)