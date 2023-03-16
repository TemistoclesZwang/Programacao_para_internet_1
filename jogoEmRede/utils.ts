import * as net from 'net';

export interface Cliente {
   chances: number;
   palavraAdvinhar: string;
   socket: net.Socket;
}


export function escreverNoSocket(socket: net.Socket, mensagem: string): void {
   socket.write(`${mensagem}\n`);
}

export const verificarChances = (cliente: Cliente, socket: net.Socket): string => {
   if (cliente.chances === 1) {
      escreverNoSocket(socket,'Suas chances acabaram, você perdeu')
      return `Game over`;

   } else {
      cliente.chances--;
      return `Você perdeu uma chance. A palavra não tem essa letra`;
   }
}


export function verificarLetra(letra: string, cliente: Cliente,socket: net.Socket, sockets: net.Socket[]): string {
   if (cliente.palavraAdvinhar.includes(letra)) {
      return `A letra ${letra} está presente na palavra`;
   } else {
      return (verificarChances(cliente,socket));
   }
}


export function tratarPrincipaisEntradas(msgDoCliente: string, socket: net.Socket, sockets: net.Socket[], clientes: Cliente[]) {
   let index: number = identificarIndexDoSocket(socket, sockets)

   if (msgDoCliente === 'desconectar') {
      escreverNoSocket(sockets[index], 'Desconectado');
      sockets[index].end();
      console.log(`Cliente desconectado: ${sockets[index].remoteAddress}:${sockets[index].remotePort}`);

   } else if (msgDoCliente.length === 1) {
      const resultado = verificarLetra(msgDoCliente, clientes[index],socket,sockets);
      escreverNoSocket(clientes[index].socket, `RESULT:${resultado}`);
      
      if (resultado === 'Game over') {
         console.log(`Cliente desconectado: ${sockets[index].remoteAddress}:${sockets[index].remotePort}`);
         sockets[index].end();
      
      }else{
         // o bug mais dificil: se tentar mandar msg pra um cliente desconectado a conexão é encerrada para todos
         const placarIndividual = gerarPlacarIndividual(clientes[index]);
         escreverNoSocket(clientes[index].socket, `CHANCES:${placarIndividual.chances}`);
         escreverNoSocket(clientes[index].socket, `Tente novamente uma letra:`);
      }

   }
}


export function encontrarJ1eJ2(socket: net.Socket, sockets: net.Socket[]) {
   let index: number = identificarIndexDoSocket(socket, sockets)

   if (index % 2 !== 0 && index > 1) { //impar
      return index - 1

   } else if (index % 2 == 0 && index > 0) { //par
      return index + 1

   } else if (index === 0) { //se for zero
      return index + 1

   } else if (index === 1) { // se for um
      return index - 1

   }
   return 0
}


export function infoIniciaisParaDupla(clientes: Cliente[], socket: net.Socket, sockets: net.Socket[]) {
   let encontrar = encontrarJ1eJ2(socket,sockets)
   let index: number = identificarIndexDoSocket(socket, sockets)

   escreverNoSocket(socket, `Você tem ${clientes[index].chances} chances iniciais para advinhar a palavra .\n Digite uma letra:`);
   escreverNoSocket(sockets[encontrar], `Você tem ${clientes[encontrar].chances} chances iniciais para advinhar a palavra .\n Digite uma letra:`);

}


export function gerarPlacarIndividual(cliente: Cliente): { chances: number; palavraAdvinhar: string } {
   return {
      chances: cliente.chances,
      palavraAdvinhar: cliente.palavraAdvinhar,
   };
}

export function identificarIndexDoSocket(socket: net.Socket, sockets: net.Socket[]) {
   let index: number = -1;
   for (const s of Object.values(sockets)) {
      index++
      if (s === socket) {
         return index
      }
   }
   return -1 // caso socket não encontrado
};
