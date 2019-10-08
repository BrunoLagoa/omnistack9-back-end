const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");

// Importando rotas
const routes = require("./routes");

// instaciando o express
const app = express();

// Iniciando servidor web socket
const server = http.Server(app);
const io = socketio(server);

// Conectando ao banco de dados
mongoose.connect(
  "mongodb+srv://omnistack:omnistack@omnistack9-ki5zr.mongodb.net/semana09?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Socketio
const connectedUsers = {};

io.on("connection", socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

// Liberando acesso a api
app.use(cors());

// Informando que os retornos serao em formato json
app.use(express.json());

// Criando a route file virtual
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));

// rotas de acesso
app.use(routes);

// liberando porta de acesso
server.listen(3333);
