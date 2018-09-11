const _ = require('lodash')

module.exports = (req, resp, next) => {
    //lista de erros
    
    const bundle = resp.locals.bundle

    if (bundle.errors) {
        const errors = parseErrors(bundle.errors)
        resp.status(500).json({errors})
    } else {
        //vá para o proximo middleware da cadeia
        next()
    }
}

const parseErrors = (nodeRestfulErrors) => {
    const errors = []
    //percorrer todos os atributos e pegar a message de erro
    //ao dar erro aparece muitos campos e como só interesse o campo message é realizado abaixo \/
    _.forIn(nodeRestfulErrors, error => errors.push(error.message))
    return errors;
}