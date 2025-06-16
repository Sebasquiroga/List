import mongoose from 'mongoose'

export const mongoconection = await mongoose.connect('mongodb://localhost:27017/list').then((data) => console.log('conection sucessfull')).catch(err => console.log(err))
