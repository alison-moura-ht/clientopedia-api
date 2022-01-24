const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")

let mongod
let uri
let db

module.exports = {
    connect: async () => {
        mongod = await MongoMemoryServer.create()
        uri = mongod.getUri()
        db = await mongoose.connect(uri)
    },
    closeDatabase: async () => {
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close()
        await mongod.stop()
    },
    clearDatabase: async () => {
        const collections = mongoose.connection.collections
        for(const key in collections) {
            await collections[key].deleteMany()
        }
    },
    getDB: () => {
        return db
    }
}