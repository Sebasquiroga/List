import { connection } from '../Database/mysql.js'

export async function findProviders (req, res) {
  const provider = req.body.provider
  await connection.query(`SELECT provider FROM list.providers WHERE provider LIKE "%${provider}%" `).then((result) => {
    if (result[0].length > 0) { res.status(201).send(result[0]) } else { res.status(406).send('proveedor no encontrado') }
  }).catch(err => res.status(406).send(err))
}

export async function createProvider (req, res) {
  const provider = req.body
  await connection.query('INSERT INTO `list`.`providers` (`provider`, `DIT`, `address`, `local`) VALUES (?,?,?,?)', [provider.provider, provider.dit, provider.address, provider.local])
    .then((result) => {
      if (result[0].affectedRows === 1) { res.status(201).send('provider create successfull') } else {
        res.status(406).send('Error al crear el proveedor')
        console.log(result)
      }
    }).catch(err => res.status(406).send(err))
}

export async function updateviders (req, res) {

}
