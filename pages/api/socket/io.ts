import { NextApiResponseServerIo } from "@/types";
import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO, Socket } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

let io: ServerIO;

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });

    io.on("connection", (socket: Socket) => {
      console.log("Socket.io: Client connected -", socket.id);

      socket.on("disconnect", () => {
        console.log("Socket.io: Client disconnected -", socket.id);
      });
    });
    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
