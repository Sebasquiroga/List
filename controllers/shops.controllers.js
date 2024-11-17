import { connection } from '../Database/mysql.js'

export async function createShop (req, res) {
  const entry = req.body
  console.log(entry)
  await connection.query('INSERT INTO list.shops (shopName, Tel, address) VALUES (?,?,? )', [entry.shopname, entry.Tel, entry.address]).then(data => res.status(201).send(data)).catch(err => res.status(406).send(err))
}

export async function updateShop (req, res) {
  const entry = req.body
  await connection.query(`UPDATE list.shops SET Tel = '${entry.Tel}', address = '${entry.address} ' WHERE shopName = '${req.params.shopname}'`).then(([rows]) => res.status(202).send(rows)).catch(err => res.send(err))
}

export async function deleteShop (req, res) {
  console.log(req.params)
  await connection.query(`DELETE FROM list.shops WHERE shopName = '${req.params.shopname}'`).then(([rows, field]) => res.status(201).send(rows)).catch(err => res.status(406).send(err))
}

export async function findAllShop (req, res) {
  await connection.query('SELECT * FROM list.shops').then(data =>
    res.status(201).send(data[0])).catch(err => res.status(406).send(err))
}

export async function findShop (req, res) {
  const shop = req.body
  await connection.query(`SELECT idShop FROM list.shops WHERE shopName = '${shop}'`).then(data =>
    res.status(201).send(data[0])).catch(err => res.status(406).send(err))
}
