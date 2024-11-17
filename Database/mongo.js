import mongoose from 'mongoose'
process.loadEnvFile('../.env')

console.log(process.env.URIMONGO)

export const mongoconection = await mongoose.connect(process.env.URIMONGO).then(() => console.log('Conected succesful to MongoDB')).catch(err => console.log(err))
