import requests
import requests_cache
from bs4 import BeautifulSoup
import re

requests_cache.install_cache('banco') #! bug desativar para localhost
requests_cache.install_cache('banco', expire_after= 60)

################### ORGANIZADORES ###################
ranking = {}
def response_and_soup(link):
   response = requests.get(link,verify=False)
   soup = BeautifulSoup(response.text, 'html.parser')
   return soup

#


def separa_verde_vermelho():
   verde = {}
   vermelho = {}

   for site in list(ranking):
      if '🟢' in site:
         valor = ranking.pop(site)
         verde.update({site: valor})
      else:
         valor = ranking.pop(site)
         vermelho.update({site: valor})
   
   print('\n👍 MAISrelevantes')
   organizar_ranking_online (verde)

   print('\n👎 MENOS relevantes')
   organizar_ranking_online (vermelho)


def organizar_ranking_online (dicionario):
   organizar = dict(sorted(dicionario.items(), \
      key=lambda x: x[1], reverse=True))
   
   # print('\n🏆 Ranking 🏆:')
   [print(f"{site}: {ocorrencia}") \
      for site, ocorrencia in organizar.items()]
      

def organizar_ranking_local_host ():
   organizar = dict(sorted(ranking.items(), \
      key=lambda x: x[1], reverse=True))
   
   print('\n🏆 Ranking 🏆:')
   [print(f"{site}: {ocorrencia}") \
      for site, ocorrencia in organizar.items()]


controle_de_loop = []
tmp = 0 
links_teste = []

################### PROFUNDIDADES ###################
def profundidade_padrao(keyword,link,limitar_resultados=0):
   
   if link not in controle_de_loop:
      print('\n🔎 procurando termo em:',link)
      se_tem_keyword(keyword,link)
      soup = response_and_soup(link)
      #retorna os links dentro do link passado
      todos_os_links = soup.find_all('a',href=True,limit=limitar_resultados)#!
      
      for link_da_lista in todos_os_links:
         link_extraido = link_da_lista['href']
         if link_extraido.startswith('http'): 
            print('        links encontrados',link_extraido)
            links_teste.append(link_da_lista)
            links_referencias.append(link)
   else:
      links_referencias.append(link)


links_referencias=[]
def profundidade_recursiva(keyword,tmp,prof):
   print('         ⏫ profundidade:',tmp)
   for numero in range(0,prof):
      if len(links_teste) > 0:
         link = links_teste[0] 
         profundidade_padrao(keyword,link['href'])
         links_referencias.append(link['href'])
         links_teste.remove(link)
         #breakpoint aqui em cima se quiser mostrar todos links coletados
      else:
         print('\n🖊 Todos os links já foram verificados')
         
   if tmp < prof:
      tmp += 1
      profundidade_recursiva(keyword,tmp,prof)


################### CRITERIOS ###################

def criterio_auto_citacao(link_inicial):
   #se tiver o site original, pinta vermelho e no fim
   padrao = r"(https?://)(.*?\.com)"
   extrair_dominio = re.search(padrao, link_inicial)
   dominio = extrair_dominio.group(1)\
         +extrair_dominio.group(2)

   for site in list(ranking):
      if dominio in site:
         #mover para o final
         item_a = ranking.pop(site)
         ranking['🔴'+site] = item_a
      else:
         valor = ranking.pop(site)
         ranking['🟢'+site] = valor
   separa_verde_vermelho()
   
   
def criterio_referencias(links_referencias):
   #como verifica apontamentos só funciona com profundidade > 0
   for item in links_referencias:
      repeticao = links_referencias.count(item) #quantas vezes repetiu
      
      if repeticao > 1:
         # ranking.update({item:repeticao})
         ranking[item]=ranking[item]+1


def verifica_link_existe_no_ranking(link):
   if link not in ranking:
      ranking.update({link:1})


def criterio_add(link):
   verifica_link_existe_no_ranking(link)
   ranking[link]=ranking[link]+1


def criterio_sub(link):
   verifica_link_existe_no_ranking(link)
   if ranking[link] > 1: 
      ranking[link]=ranking[link]-1

################### CHARS ANTERS E DEPOIS ###################
def chars_antes_e_depois(posicao,lista_palavras):
   char_antes = lista_palavras[posicao-30:posicao]
   char_depois = lista_palavras[posicao:posicao+30]
   print('  💬',char_antes,char_depois)

def formatar_lista_palavras(termo,link):
   controle_de_loop.append(link)
   soup = response_and_soup(link)

   lista = [text for text in soup.stripped_strings]
   gerar_string_de_busca = ''.join(lista)
   checar_termo = gerar_string_de_busca.find(termo)

   return checar_termo,gerar_string_de_busca

################### SE TEM O TERMO ###################
def se_tem_keyword(termo,link):
   checar_termo,gerar_string_de_busca = formatar_lista_palavras(termo,link)
   
   if checar_termo != -1:
      print('  ✅ -> termo encontrado')
      chars_antes_e_depois(checar_termo,gerar_string_de_busca)
      criterio_add(link)
      return True

   else:
      print('  ❌ -> termo nao encontrado')
      criterio_sub(link)
      return False


################### INICIO ###################
def search(keyword,url,depth):
   if depth > 4:
      print('insira uma profundidade menor')
   else:
      profundidade_padrao(keyword,url) #limitando resultados
      profundidade_recursiva(keyword,tmp,depth)
      criterio_referencias(links_referencias)
      # organizar_ranking_local_host () 
      criterio_auto_citacao(url)

# search ('Help','http://127.0.0.1:5500/Programacao_para_internet_1/atv_0/pagina1.html',1)

# search ('Lula','https://www.bbc.com/portuguese',4)
search ('Brasil','https://www.infomoney.com.br/',3)
# search ('Brasil','https://www.folha.uol.com.br/',0)


#devido ao não uso de todos os links internos definido na linha 91
   #o código se sai melhor com grandes profundidades 
   #(já que existe um limitador na linha 87)
   #por isso a performance até a profundidade 4 é relativamente boa
#em baixas profundidades a quantidade de links internos é muito grande
#em altas é menor e melhora o ranking final

