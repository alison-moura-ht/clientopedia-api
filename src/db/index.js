const NODE_ENV = process.env.NODE_ENV

if(NODE_ENV == "test") {
    module.exports = require("./test")
} else {
    module.exports = require("./main")
}