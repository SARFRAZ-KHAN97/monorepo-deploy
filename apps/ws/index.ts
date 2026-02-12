import { prismaClient } from 'db/client';



 Bun.serve({
    port: 8081,
    fetch(req, server) {
        if(server.upgrade(req)) {
            return new Response("upgraded", { status: 101 });
        }
        return new Response("upgrade failed", { status: 400 } );
    },
    websocket: {
        message: async (ws, message) => {
            await prismaClient.user.create({
                data: {
                    username: Math.random().toString(),
                    password: "defaultPassword"
                }
            })
            ws.send("User created. " + message);
        }
    }
 })