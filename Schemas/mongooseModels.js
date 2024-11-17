import { Schema, model } from 'mongoose'
// eslint-disable-next-line no-unused-vars
import { mongoconection } from '../Database/mongo.js'

const schemaLista = new Schema({
  idTienda: Number,
  fecha: { type: Date, default: Date.now },
  listaReal: [],
  estadoLista: Number
})

const ModelLista = model('listillo', schemaLista)

async function nueve () {
  const modelo = ModelLista({
    idTienda: 11,
    fecha: '06/12/12',
    listaReal: ['1', '2', 3]
  })
  console.log(modelo)
  await modelo.save().then(data => console.log(data)).catch(err => console.log(err))
}

nueve()
