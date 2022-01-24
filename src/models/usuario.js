const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")
const { Schema } = mongoose

const usuarioSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true }
}, {
    timestamps: true
})

usuarioSchema.plugin(mongooseDelete, { overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'] })

module.exports = mongoose.model("Usuario", usuarioSchema) // cria a collecion "usuarios"
