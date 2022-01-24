module.exports = {
    verificar: (req, res, next) => {
        const token = req.headers.token
        if(!token) {
            res.status(401).json({ mensagem: "Autenticação é necessária" })
        } else next()
    }
}