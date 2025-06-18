import { ModelLista } from '../Schemas/mongooseModels.js'
// import mongoconection from '../Database/mongo.js'

export async function insertar (req, res) {
  const { idTienda, listaReal } = req.body
  ModelLista.create({
    idTienda,
    listaReal
  })
    .then((data) => {
      res.status(201).json({
        message: 'Lista insertada correctamente',
        data
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error al insertar la lista',
        error: err.message
      })
    })
}
