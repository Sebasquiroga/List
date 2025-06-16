import { connection } from '../Database/mysql.js'

export async function createShop (req, res) {
  const entry = req.body
  console.log(entry)
  await connection.query('INSERT INTO list.shops (shopName, Tel, address) VALUES (?,?,? )', [entry.shopname, entry.tel, entry.address])
    .then((data) => {
      if (data[0].affectedRows > 0) { res.status(201).send('shop create succesfull') } else { res.status(406).send('shop not created, duplicate entry') }
    })
    .catch(err => res.status(406).send(err))
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
  await connection.query('SELECT * FROM list.shops').then((data) => {
    if (data[0].length > 0) { res.status(201).send(data[0]) } else { res.status(406).send('Tiendas no encontrada') }
  }).catch(err => res.status(406).send(err))
}

export async function findShop (req, res) {
  const shop = req.body.shopname
  await connection.query(`SELECT shopName, tel, address FROM list.shops WHERE shopName LIKE '%${shop}%'`).then((data) => {
    if (data[0].length > 0) { res.status(201).send(data[0]) } else { res.status(406).send('Tienda no encontrada') }
  }).catch(err => res.status(406).send(err))
}
