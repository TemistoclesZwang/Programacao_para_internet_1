import requests
import requests_cache
from bs4 import BeautifulSoup
import re
import sqlite3

# requests_cache.install_cache('banco') #! desativar para localhost

def banco():
   con = sqlite3.connect('/home/temiszwang/Desktop/codigos/temp web 1/banco.sqlite')
   cur = con.cursor()
   return cur.fetchall()


def auto_cita(link):
   print('')


ranking = {}
def response_and_soup(link):
   response = requests.get(link,verify=False)
   soup = BeautifulSoup(response.text, 'html.parser')
   return soup


def organizar_ranking ():
   organizar = dict(sorted(ranking.items(), \
      key=lambda x: x[1], reverse=True))
   print('\n🏆 Ranking 🏆:')
   [print(f"{site}: {ocorrencia}") \
      for site, ocorrencia in organizar.items()]


def criterio_google(link,keyword):
   #procura pela palavra no google, se o site estiver entre os primeiros
   #resultados então ganha ponto
   soup = response_and_soup(f'https://www.google.com/search?q={keyword}')
   todos_os_links = soup.find_all('a',href=True)#!

   for link_da_lista in todos_os_links:
      link_extraido = link_da_lista['href']
      if 'http' in link_extraido:
         nome_do_site = re.compile(r'www\.(\w+)\.com')
         match = nome_do_site.search(link_extraido)

         if match:
            ranking.update({link:1})
            #breakpoint em cima para ver nome do site
            return 0

controle_de_loop = []
tmp = 0 
links_teste = []

def profundidade_padrao(keyword,link):
   if link not in controle_de_loop:
      print('\n🔎 procurando termo em:',link)
      se_tem_keyword(keyword,link)
   
      soup = response_and_soup(link)
      #retorna os links dentro do link passado
      todos_os_links = soup.find_all('a',href=True)#!
      
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


def criterio_referencias(links_referencias):
   #como verifica apontamentos só funciona com profundidade >0
   for item in links_referencias:
      repeticao = links_referencias.count(item) #quantas vezes repetiu
      if repeticao > 1 and item not in ranking:
         ranking.update({item:repeticao})


def chars_antes_e_depois(posicao,lista_palavras):
   char_antes = lista_palavras[posicao-20:posicao]
   char_depois = lista_palavras[posicao:posicao+20]
   print('  💬',char_antes,char_depois)


def se_tem_keyword(termo,link):
   controle_de_loop.append(link)
   soup = response_and_soup(link)

   lista = [text for text in soup.stripped_strings]
   gerar_string_de_busca = ''.join(lista)
   checar_termo = gerar_string_de_busca.find(termo)

   if checar_termo != -1:

      print('  ✅ -> termo encontrado')
      chars_antes_e_depois(checar_termo,gerar_string_de_busca)
      return True

   else:
      print('  ❌ -> termo nao encontrado')
      return False


def search(keyword,url,depth):
   if depth > 2:
      print('insira uma profundidade menor')
   else:
      profundidade_padrao(keyword,url)
      profundidade_recursiva(keyword,tmp,depth)
      criterio_referencias(links_referencias)
      organizar_ranking () 

# search ('Help','http://127.0.0.1:5500/Programacao_para_internet_1/atv_0/pagina1.html',2)
search ('Brasil','https://news.google.com/home?hl=pt-BR&gl=BR&ceid=BR:pt-419',1)
