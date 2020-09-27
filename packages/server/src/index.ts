import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from './routes'
import 'reflect-metadata'
import './database'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'
import uploadConfig from './config/upload'
import AppError from './errors/AppError'

const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())
app.use(cors())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(err)
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message
      })
    }
    return response.status(500).json({
      status: 'error',
      message: 'Something is wrong'
    })
  }
)

app.listen(3333, () => {
  console.log('Server running')
})
