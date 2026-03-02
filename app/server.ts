const jsonServer = require("json-server")
const auth = require("json-server-auth")
const cors = require("cors")
const path = require("path")

const server = jsonServer.create()
const router = jsonServer.router("db.json")

server.use(jsonServer.bodyParser)
server.use(router)

const PORT = 3001
server.listen(PORT, () => {
  console.log(`JSON Server with auth running on http://localhost:${PORT}`)
})