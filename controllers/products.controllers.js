import { connection } from '../Database/mysql.js'

export async function createProduct (req, res) {
  const data = req.body
  connection.query('INSERT INTO `list`.`products` (`product`, `Formato de compra`, `Formato de venta`) VALUES (?,?,?)', [data.product_name, data.formato, data.formato_de_venta])
    .then((result) => {
      if (result[0].affectedRows === 1) {
        res.status(201).send({ message: 'Producto creado correctamente' })
      } else if (result[0].errno === 1062) {
        res.status(400).send({ message: 'El producto ya existe' })
      } else {
        res.status(400).send({ message: 'Error al crear el producto' })
      }
    }).catch((err) => {
      if (err.errno === 1062) {
        res.status(402).send({ message: 'El producto ya existe' })
      } else { res.status(402).send({ message: 'Error al crear el producto', error: err }) }
    })
}
export async function findProduct (req, res) {
  const string = req.body.search || ' '
  // eslint-disable-next-line quotes
  await connection.query(`SELECT idProducts, Product FROM list.products WHERE Product LIKE '%${string}%'`).then(
    (result) => {
      if (result[0].length > 0) {
        res.status(201).send(result[0])
      } else {
        res.status(404).send('No se encontraron resultados')
      }
    }
  ).catch(err => res.status(402).send(err))
}
export async function deleteProduct (req, res) {
  const product = req.body.product
  console.log(product)
  await connection.query(`DELETE FROM list.products WHERE Product = '${product}'`).then((result) => {
    if (result[0].affectedRows === 1) {
      res.status(201).send({ message: 'Producto Eliminado correctamente' })
    } else {
      res.status(400).send({ message: 'Error al eliminar el producto' })
    }
  }).catch(err => res.status(402).send(err))
}
export async function updateProduct (req, res) {
  const product = req.body
  await connection.query(`UPDATE list.products SET compra = '${product.compra}', venta = '${product.venta}'  WHERE (Product = '${product.productName}');`)
    .then((result) => {
      if (result[0].affectedRows === 1) {
        res.status(201).send({ message: 'Producto actualizado correctamente' })
      } else {
        res.status(400).send({ message: 'Error al actualizar el producto, asegurese de que el producto este escrito correctamente' })
      }
    })
    .catch(err => res.status(402).send(err))
}
