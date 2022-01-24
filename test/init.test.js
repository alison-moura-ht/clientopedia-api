function somar(a, b) {
    return a + b
}

test("Soma 2 + 2 com resultado 4", () => {
    const resultado = somar(2, 2)
    expect(resultado).toEqual(4) // validação
})