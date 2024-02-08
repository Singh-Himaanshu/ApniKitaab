import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound, errorHandler } from './src/middleware/errorMiddleware.js'
import connectDB from './src/config/db.js';
import productRoutes from './src/routes/productRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import orderRoutes from './src/routes/orderRoutes.js'
import uploadRoutes from './src/routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send("AQ0fTGFe5X-G7GKer0NHdJaCoj4ruFH1u02RGbGS2-md9pN-E5LIIGsS4x05y38eYzWX4gUQekM62qFZ")
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));
  app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
} else {
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
