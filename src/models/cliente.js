const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete") // soft delete
const { Schema } = mongoose

const clienteSchema = new Schema({ // Novo schema do cliente
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cpf: { type: String, required: true, unique: true },
}, {
    timestamps: true
})

clienteSchema.plugin(mongooseDelete, { overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'] })

module.exports = mongoose.model("Cliente", clienteSchema) // registra o schema
