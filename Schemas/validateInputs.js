import { z } from 'zod'

export const userSchema = z.object({
  username: z.string({
    invalid_type_error: 'El nombre de usuario no es un string',
    required_error: 'Usuario Requerido validar el formulario'
  }),
  password: z.string()
})

export const providerSchema = z.object({
  provider: z.string({
    invalid_type_error: 'El nombre de usuario no es un string',
    required_error: 'Usuario Requerido validar el formulario'
  }),
  DIT: z.number({ required_error: 'Debe ingresar un valor numerico', invalid_type_error: 'el valor ingresado debe ser un numero' }).int().min(1000000).max(1500000000),
  address: z.string(),
  local: z.string()
})
