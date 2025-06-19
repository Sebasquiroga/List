import { ModelLista } from '../Schemas/mongooseModels.js'
// import mongoconection from '../Database/mongo.js'

export async function insertar (req, res) {
  await ModelLista.findOne().then((data) => {
    if (data.estadoLista === 1) { res.send('hay una lista en ejecucion, no se puede insertar otra lista') } else if (data.estadoLista === 2) { res.send('hay una lista pendiente de compra')/* crear funcion para permitir crear una nueva lista */ } else {
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
  })
}

export async function forzar () {
  await ModelLista.create({
    idTienda: 12,
    listaReal: [{
      productName: '1aa2',
      calidadProduct: 'Buena',
      providerName: 'Juan',
      cantidadCompra: 1
    }]

  }).then((data) => {
    console.log(data)
  })
    .catch((err) => {
      console.error('Error al actualizar el estado de las listas:', err.message)
    })
}
