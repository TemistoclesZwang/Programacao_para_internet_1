import requests
import requests_cache
from bs4 import BeautifulSoup
import json

requests_cache.install_cache('banco')

def response_and_soup(link):
   response = requests.get(link,verify=False)
   soup = BeautifulSoup(response.text, 'html.parser')
   return soup


def atv_1():
# 1) Baixe uma página e exiba seus links. Para isso, extraia o atributo href das tags <a>. 
   
   soup = response_and_soup('https://pypi.org/project/beautifulsoup4/')
   cabecalhos = soup.find_all('a',href=True)

   for cabecalho in cabecalhos:
      # texto = cabecalho.get_text()
      print(" - ", cabecalho['href'])


def atv_2():
   # Baixe uma página e exiba o conteúdo de uma determinada tag lida pelo teclado.

   tag_input = input('Insira uma tag:')
   soup = response_and_soup('https://pypi.org/project/beautifulsoup4/')
   return_f_all = soup.find_all(tag_input)

   for i in return_f_all:
      texto = i.get_text()
      print(" - ", texto)


def atv_3():
# 3) Receba uma página como entrada e um termo a ser buscado e liste as 
# ocorrências dentro dessa página. Atente para extrair o texto da página sem as 
# tags e, ao encontrar uma ocorrência do termo, exiba os 20 caracteres antes e 
# 20 caracteres depois.

   # url_input = 'https://pypi.org/project/beautifulsoup4/'
   # termo = 'Help'
   url_input = input('Insira uma url:')
   termo = input('Insira o termo:')
   
   soup = response_and_soup(url_input)


   def chars_antes(termo):
      index = lista.index(termo)
      lista_do_comeco_ao_termo = (lista[:index])
      lista_do_comeco_ao_termo.reverse()
      #inverter lista para contar os itens que vem antes do termo
      juntar = ''.join(lista_do_comeco_ao_termo)
      lista_vinte_antes = (juntar[:20])
      return lista_vinte_antes

   def chars_depois(termo):
      index = lista.index(termo)
      juntar = ''.join(lista[index:index+20])
      #junta o index do termo aos próximos 20 char
      lista_vinte_depois = (juntar[:20])
      return lista_vinte_depois


   lista = [text for text in soup.stripped_strings]
   checar_termo = termo in lista
   
   if checar_termo:
      print(chars_antes(termo))
      print(chars_depois(termo))

   else:
      print('termo nao encontrado')


def atv_4():
# Dado um endereço de uma imagem na internet, baixe o arquivo e salve-o localmente.

   url_input = input('Insira uma url:')

   response = requests.get(url_input)
   with open("download.jpg", 'wb') as local_Download:
      local_Download.write(response.content)


def atv_5():
#5) Crie um script que busque no google. Utilize a url: 
# http://www.google.com/search. Além disso, passe um parâmetro 
# chamado “q” com o valor a ser buscado. 
   buscar = input('Insira o que quer buscar:')
   soup = response_and_soup(f'https://www.google.com/search?q={buscar}')

   for frase in soup:
      texto = frase.get_text("\n", strip=True)
      print(texto)

def atv_6():
# 6)Pesquise alguma página com uma tabela de classificação e extraia dessa 
# página a tabela. Um exemplo desse tipo de tabela segue abaixo:
   soup = response_and_soup(f'https://pt.wikipedia.org/wiki/%C3%81lbuns_mais_vendidos_do_mundo')
   table = soup.find('table', class_='wikitable sortable')
   print(table.prettify())



def atv_7():
# 7) Crie um script que lê um CEP e pesquise o endereço completo em alguma API aberta. 
   # cep = input('Insira um CEP:')

   # cep = '64006-520'
   cep = input('insira seu cep:')
   if '-' not in cep:
      print('É necessário incluir o traço no cep, exemplo 64006-520')
   else:
      r = requests.get(f'https://cdn.apicep.com/file/apicep/{cep}.json')
      saida = json.loads(r.content)
      if saida["code"] == 'not_found':
         print('Esse cep não existe')
      else:
         print(f'{saida["code"]}\n{saida["state"]}\n{saida["city"]}\n{saida["district"]}\n{saida["address"]}')

