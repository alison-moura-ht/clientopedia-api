const api = require("./../../src/server.js")
const usuarioService = require("./../../src/services/usuario-service.js")
const request = require("supertest")
const faker = require("faker-br")
let token
let idCliente

beforeAll(async () => {
  const usuarioCadastrado = await usuarioService.cadastrar({
    nome:  faker.name.findName(),
    email: faker.internet.email(),
    senha: faker.random.number()
  })
  token = await usuarioService.autenticar(usuarioCadastrado)
})

describe('GET /clientes', () => {
  it('Deve responder com JSON e status 200 contendo um vetor', done => {
    request(api)
      .get('/clientes')
      .set('token', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => { 
        expect(response.body).toHaveProperty("length")
        done()
      })
  });
});

describe("POST /clientes", () => {
  it("Deve responder um JSON status 200 contendo um objeto com a propriedade _id", done => {
    request(api)
      .post("/clientes")
      .send({ nome: faker.name.findName(), email: faker.internet.email(), cpf: faker.br.cpf() })
      .set("token", token)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        idCliente = response.body._id
        expect(response.body).toHaveProperty("_id")
        done()
      })
  })
})

describe("PUT /clientes", () => {
  it("Deve responder um JSON status 200 contendo um objeto com modifiedCount igual a 1", done => {
    request(api)
      .put("/clientes/" + idCliente)
      .send({ email: faker.internet.email() })
      .set("token", token)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body.modifiedCount).toBe(1)
        done()
      })
  })
})

describe("DELETE /clientes", () => {
  it("Deve responder um JSON status 200 contendo um objeto com modifiedCount igual a 1", done => {
    request(api)
      .delete("/clientes/" + idCliente)
      .set("token", token)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body.modifiedCount).toBe(1)
        done()
      })
  })
})