from spacy import load

nlp = load('pt_core_news_sm')

doc = nlp('Raphael foi ao estadio. O cruzeiro ganhou. Kaio marcou 2 gols!')
i = 0

for sent in doc.sents:
    print(sent)
    i = i+1

##print(i)

for t in doc:
    print('{:10} | {:10} | {:25} | {:2}'.format(t.text, t.shape_, t.shape, t.is_alpha))