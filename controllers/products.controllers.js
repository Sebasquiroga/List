import { productsSchema } from '../Schemas/validateInputs.js'
import { connection } from '../Database/mysql.js'

export async function createProduct (req, res) {
  const validate = productsSchema.safeParse(req.body)
  if (validate.success !== true) { res.send(' error en entrada de datos ') } else {
    console.log(validate)
    try {
      await connection.query('INSERT INTO `list`.`products` (`product_name`, `formato`, `formato-de-venta`) VALUES (?,?,?,,?)', [validate.data.product_name, validate.data.formato, validate.data.formato_de_venta]).then(
        res.send('product create sucefull').status(201))
    } catch (err) {
      res.send(err).status(500)
    }
  }
}

export async function findProduct (object) {
  const reqProd = object
  let resultado = {}
  if (!reqProd.product) { return ('valor no es valido') } else {
    try {
      await connection.query(`SELECT idProducts , product_name FROM list.products WHERE product_name LIKE "%${reqProd.product}%"`).then((datos) => {
        resultado = datos[0]
      })
    } catch (err) { return err }
  }
  return resultado
}
