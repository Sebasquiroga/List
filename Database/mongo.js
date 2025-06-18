import mongoose from 'mongoose'

export const mongoconection = await mongoose.connect('mongodb://localhost:27017/list').then((data) => console.log('conection sucessfull')).catch(err => console.log(err))

async function verificarColecciones () {
  const collections = await mongoose.connection.db.listCollections().toArray()
  const collectionNames = collections.map(collection => collection.name)

  if (!collectionNames.includes('lists')) {
    console.log('La colección "lists" no existe. Creando la colección...')
    await mongoose.connection.createCollection('lists')
    console.log('Colección "lists" creada exitosamente.')
  } else {
    console.log('La colección "lists" ya existe.')
  }
}

verificarColecciones().catch(err => console.error('Error al verificar o crear la colección:', err))
