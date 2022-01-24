const mongoose = require("mongoose")
const uri = "mongodb+srv://mongodb:Lafj88VjfeXj@cluster0.ssnit.mongodb.net/clientopedia?authSource=admin&replicaSet=atlas-r277ia-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"

let db;

module.exports = {
    connect: async () => {
        db = await mongoose.connect(uri)
        console.log("Conexão com banco de dados com sucesso")
    },
    getDB: () => {
        return db
    }
}