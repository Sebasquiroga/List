import { Schema, model } from 'mongoose'
// import { mongoconection } from '../Database/mongo.js' /* importacion para iniciar la conexion */

const schemaLista = new Schema({
  idTienda: Number,
  fecha: { type: Date, default: Date.now },
  listaReal: [{
    productName: { type: String, unique: false, require: false },
    calidadProduct: { type: String, require: false },
    providerName: { type: String, require: false },
    cantidadCompra: { type: String },
    costoDeCompra: { type: Number }
  }],
  estadoLista: { type: Number, default: 1 }
})

export const ModelLista = model('Lists', schemaLista)
