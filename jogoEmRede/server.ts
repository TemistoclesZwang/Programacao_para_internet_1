import * as net from 'net';

interface Cliente {
   chances: number;
   palavraAdvinhar: string;
   socket: net.Socket;
}

function escreverNoSocket(socket: net.Socket, mensagem: string): void {
   socket.write(`${mensagem}\n`);
}

function verificarLetra(letra: string, cliente: Cliente): string {
   if (cliente.palavraAdvinhar.includes(letra)) {
      return `A letra ${letra} está presente na palavra`;
   } else {
      cliente.chances--;
      return `A letra ${letra} não está presente na palavra`;
   }
}
function principaisEntradas(msgDoCliente: string,clientes: Cliente[],numeroJogador: number) {
   if (msgDoCliente === 'desconectar') {
      escreverNoSocket(clientes[numeroJogador].socket, 'Desconectado');
      clientes[numeroJogador].socket.end();
      console.log(`Cliente desconectado: ${clientes[numeroJogador].socket.remoteAddress}:${clientes[numeroJogador].socket.remotePort}`);

   }else if (msgDoCliente.length === 1) {
      const resultado = verificarLetra(msgDoCliente, clientes[numeroJogador]);
      escreverNoSocket(clientes[numeroJogador].socket, `RESULT:${resultado}`);
      const placarIndividual = gerarPlacarIndividual(clientes[numeroJogador]);
      escreverNoSocket(clientes[numeroJogador].socket, `CHANCES:${placarIndividual.chances}`);
   }
}

function infosIniciais(clientes: Cliente[]){
   escreverNoSocket(clientes[0].socket, 'Você é o jogador 1');
   escreverNoSocket(clientes[1].socket, 'Você é o jogador 2');
   escreverNoSocket(clientes[0].socket, `Você tem ${clientes[0].chances} chances iniciais. Digite uma letra:`);
   escreverNoSocket(clientes[1].socket, `Você tem ${clientes[1].chances} chances iniciais. Digite uma letra:`);
}

function gerarPlacarIndividual(cliente: Cliente): { chances: number; palavraAdvinhar: string } {
   return {
      chances: cliente.chances,
      palavraAdvinhar: cliente.palavraAdvinhar,
   };
}

export function minhaSala(): void {
   const sockets: net.Socket[] = [];
   let contador = 0;

   const server = net.createServer((socket: net.Socket) => {
      if (contador === 2) {
         // . se uma terceira pessoa entrar precisa ser enviada
         // .para uma sala de espera
         escreverNoSocket(socket, 'A sala está cheia');
         socket.end();
         
      } else {
         console.log(`Cliente conectado: ${socket.remoteAddress}:${socket.remotePort}`);
         sockets.push(socket);
         contador++;
         escreverNoSocket(socket, `Você é o ${contador}º cliente na sala.\n Aguarde...`);

         if (contador === 2) {
            const clientes: Cliente[] = sockets.map((s) => {
               return {
                  chances: 8,
                  palavraAdvinhar: 'teste',
                  socket: s,
               };
            });

            infosIniciais(clientes)
// .R
            clientes[0].socket.on('data', (data: Buffer) => {
               const msgDoCliente = data.toString().trim();
               principaisEntradas(msgDoCliente,clientes,0)
            });

            clientes[1].socket.on('data', (data: Buffer) => {
               const msgDoCliente = data.toString().trim();
               principaisEntradas(msgDoCliente,clientes,1)
            });
         };
      };
   });
   server.on('error', (err: Error) => {
      console.error(`Ocorreu um erro no servidor: ${err.message}`);
   });

   server.listen(3000, () => {
      console.log('Servidor inicializado na porta 3000');
   });
}
minhaSala()
