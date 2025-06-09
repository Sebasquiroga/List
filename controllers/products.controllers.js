import { connection } from '../Database/mysql.js'

export async function createProduct (req, res) {
  const data = req.body
  connection.query('INSERT INTO `list`.`products` (`product`, `Formato de compra`, `Formato de venta`) VALUES (?,?,?)', [data.product_name, data.formato, data.formato_de_venta]).then(
    res.send('product create sucefull').status(201)).catch(err => {
    res.send(err)
  })
}

export async function findProduct (req, res) {
  const string = req.body.search || '*'
  // eslint-disable-next-line quotes
  const result = await connection.query(`SELECT Product FROM list.products WHERE Product LIKE '${string}%'`).then(([rows]) => {
    return rows
  }).catch(err => console.log(err))
  res.json(result)
}

export async function deleteProduct (req, res) {
  const product = req.params.product
  await connection.query(`DELETE FROM list.products WHERE Product = '${product}'`).then(([rows]) => {
    res.status(201).send(rows)
  }).catch(err => res.status(402).send(err))
}
export async function updateProduct (req, res) {
  const product = req.query
  await connection.query(`UPDATE list.products SET Product = ${product.name} WHERE idProducts = ${product.id}`).then(([rows]) => {
    res.status(201).send(rows)
  }).catch(err => res.status(402).send(err))
}
