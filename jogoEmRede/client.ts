import * as net from 'net';
import readline from 'readline';


function escolherNomeJogador(): Promise<string> {
   return new Promise((resolve) => {
      const rl = readline.createInterface({
         input: process.stdin,
         output: process.stdout,
      });
      rl.question('Digite seu nome: ', (id) => {
         rl.close();
         resolve(id);
      });
   });
}

const receberResultadoJogada = (id: string, data: Buffer): void => {
   const msgDoServidor = data.toString().trim();
   if (msgDoServidor.startsWith('RESULT:')) {
      const result = msgDoServidor.slice('RESULT:'.length);
      console.log(`> ${result}`);
   } else {
      console.log(`> Mensagem do servidor para cliente ${id}: ${msgDoServidor}`);
   }
};

const tratarPrincipaisEntradas = (input: string, client: net.Socket): void => {
   const letra = input.trim().split('');
   if (letra.length === 1) {
      client.write(`${letra[0]}`);

   } else if(input === 'desconectar') {
      client.write(input)

   }else {
      console.log('> Digite apenas uma letra');
   }
};



export async function meuClient(): Promise<void> {
   const id = await escolherNomeJogador();
   const client: net.Socket = new net.Socket();

   client.connect(4000, 'localhost', () => {
      // console.log(`Conectado ao servidor como cliente ${id}`);
      client.write(`ID:${id}`);
   });

   client.on('data', (data: Buffer) => {
      receberResultadoJogada(id, data);
   });

   client.on('error', (err) => {
      console.error(`Erro ao conectar ao servidor: ${err.message}`);
   });

   const lerEntrada = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
   });

   lerEntrada.on('line', (input: string) => {
      tratarPrincipaisEntradas(input, client);
   });

   client.on('close', () => {
      console.log(`Conexão com o servidor encerrada para o cliente ${id}`);
      process.exit();
   });
}

meuClient()
