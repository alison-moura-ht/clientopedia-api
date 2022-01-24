require("dotenv").config() // Carrega o arquivo .env
const api = require("./server.js")
const PORT = process.env.PORT || 3000

api.listen(PORT, () => {
    console.log("API rodando na porta " + PORT)
})