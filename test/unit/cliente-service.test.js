const db = require("../../src/db/")
const clienteService = require("../../src/services/cliente-service")

beforeAll(async () => {
    await db.connect()
})

afterEach(async () => {
    await db.clearDatabase()
})

afterAll(async () => {
    await db.closeDatabase()
})

describe("Buscar clientes", () => {
    
    it("Deve buscar todos os clientes cadastrados", async () => {
        const resultado = await clienteService.buscarTodos()
        expect(resultado).toHaveProperty("length")
    })

})

describe("Cadastrar cliente", () => {
    
    it("Deve cadastrar um cliente com sucesso", async () => {
        const cliente = {
            nome: "Josecrindson da Silva",
            email: "josecrison@gmail.com",
            cpf: "4865329"
        }
        
        const resultado = await clienteService.cadastrar(cliente)
        expect(resultado).toHaveProperty("_id")
    })

    it("Deve gerar um erro por falta de email", async () => {
        const cliente = {
            nome: "Josecrindson da Silva",
            cpf: "4865329"
        }

        await expect(clienteService.cadastrar(cliente))
        .rejects.toHaveProperty('mensagem')
    })

})

describe("Atulizar cliente", () => {
    it("Deve atualizar um cliente com sucesso", async () => {
        let cliente = {
            nome: "Jão da Silva",
            email: "jao@gmail.com",
            cpf: "12345678910" 
        }

        cliente = await clienteService.cadastrar(cliente)
        cliente.nome = "Jão da Silva de Souza"
        await clienteService.atualizar(cliente._id, cliente)
        const clienteAtualizado = await clienteService.buscarPorId(cliente._id)

        expect(clienteAtualizado.nome).toBe("Jão da Silva de Souza")
    })
})

describe("Remover cliente", () => {
    it("Deve remover um cliente pelo id com sucesso", async () => {
        let cliente = {
            nome: "Jão da Silva",
            email: "jao@gmail.com",
            cpf: "12345678910" 
        }

        cliente = await clienteService.cadastrar(cliente)
        await clienteService.remover(cliente._id)
        const clienteRemovido = await clienteService.buscarPorId(cliente._id)
        expect(clienteRemovido).toBeNull()
    })
})