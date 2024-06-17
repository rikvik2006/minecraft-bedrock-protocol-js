import { createServer, Server, Client, } from "bedrock-protocol";

const TEMP_SERVER_HOST = '0.0.0.0';  // Il server temporaneo ascolta su tutte le interfacce di rete
const TEMP_SERVER_PORT = 19000;      // Porta predefinita di Minecraft Bedrock per il server temporaneo
const MAIN_SERVER_HOST = '217.76.61.208';  // IP del server principale
const MAIN_SERVER_PORT = 19132;      // Porta del server principale  

const server = createServer({
    host: TEMP_SERVER_HOST,
    port: TEMP_SERVER_PORT,
    motd: {
        motd: 'Server LAN Proxy',
        levelName: 'Proxy World'
    },
    maxPlayers: 10
});



server.on('connect', (client) => {
    client.on('join', () => {
        console.log(`${client.profile?.name} è entrato nel mondo`);
        client.queue('transfer', { server_address: MAIN_SERVER_HOST, port: MAIN_SERVER_PORT })
    });
});

console.log(`Server temporaneo in ascolto su ${TEMP_SERVER_HOST}:${TEMP_SERVER_PORT}`);