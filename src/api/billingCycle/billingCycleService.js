//é o model la do billingCycle
const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')


BillingCycle.methods(['get', 'post', 'put', 'delete'])

//para put
//para retornar o objeto atual da alteração - sem isso ele retorna a versão anterior // roda as validações
BillingCycle.updateOptions({new: true, runValidators: true })

//interceptar uma requisição depois de ter realizado -> POST e PUT
BillingCycle.after('post', errorHandler).after('put', errorHandler)

BillingCycle.route('count', (req, resp, next) => {
    BillingCycle.count((error, value) => {
        if (error) {
            console.log(error)
            resp.status(500).json({errors: [error]})
        } else {
            resp.json({value})
        }
    })
})

BillingCycle.route('summary', (req, resp, next) => {
    //parece uma especie de sql mas para o mongodb
    //
    BillingCycle.aggregate([{
        //1° passo
        //projetar
        //apenas extrair determinados atributos
        //atribui a soma dos creditos de cada registro e coloca no credit
        //idem ao debt so que com os debitos
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"} }
    },
    {
        //2° passo
        //extrair o credit e o debit /\
        //_id: null -> o group exige o _id
        //agrupar por criterio. tipo o group by
        //$credit referencia do credit acima
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"} }
      },
      {
        //3° passo
        //remover o id// 0 -> false 1 -> true //por causa do _id: null e como era obrigatorio colocar acima...
        //
        $project: {_id: 0, credit: 1, debt: 1}  
      }]).exec((error, result) => {
            if(error) {
                resp.status(500).json({errors: [error]})
            } else {
                resp.json(result[0] || { credit: 0, debt: 0 })
            }
        })
    
})

module.exports = BillingCycle