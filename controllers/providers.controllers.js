import { connection } from '../Database/mysql.js'
import { providerSchema } from '../Schemas/validateInputs.js'

export async function findProviders (req, res) {
  const provider = req.body.provider
  await connection.query(`SELECT provider FROM list.providers WHERE provider LIKE "%${provider}%" `).then((datos) => {
    console.log(datos[0][0])
  })
}

export async function createProvider (req, res) {
  const validate = providerSchema.safeParse(req.body)
  if (validate.success !== true) { res.send(' error en entrada de datos ') } else {
    console.log(validate)
    try {
      await connection.query('INSERT INTO `list`.`providers` (`provider`, `DIT`, `address`, `local`) VALUES (?,?,?,?)', [validate.data.provider, validate.data.DIT, validate.data.address, validate.data.local])
      res.send('user create sucefull')
    } catch (err) { res.send(err) }
  }
}
