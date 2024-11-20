import { Schema, model } from 'mongoose'
// eslint-disable-next-line no-unused-vars
import { mongoconection } from '../Database/mongo.js'

const schemaLista = new Schema({
  idTienda: Number,
  fecha: { type: Date, default: Date.now },
  listaReal: [{
    productName: { type: String, unique: true, require: false },
    calidadProduct: { type: String, require: false },
    providerName: { type: String, require: false },
    cantidadCompra: { type: String },
    costoDeCompra: { type: Number }
  }],
  estadoLista: { type: Number, default: 1 }
})

const ModelLista = model('listillo', schemaLista)

async function nueve () {
  const modelo = ModelLista({
    idTienda: 11,
    listaReal: []
  })
  console.log(modelo)
  await modelo.save().then(data => console.log(data)).catch(err => console.log(err))
}

nueve()
