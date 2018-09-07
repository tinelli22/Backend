//é o model la do billingCycle
const BillingCycle = require('./billingCycle')

BillingCycle.methods(['get', 'post', 'put', 'delete'])

//para put
//para retornar o objeto atual da alteração - sem isso ele retorna a versão anterior // roda as validações
BillingCycle.updateOptions({new: true, runValidators: true })

BillingCycle.route('count', (req, resp, next) => {
    BillingCycle.count((error, value) => {
        if (error) {
            resp.status(500).json({errors: [error]})
        } else {
            resp.json({value})
        }
    })
})

module.exports = BillingCycle