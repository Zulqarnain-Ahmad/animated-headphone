const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const helmet=require('helmet')
const productRoutes=require('./routes/productRoutes')
const cartRoutes=require('./routes/cartRoutes')
const orderRoutes=require('./routes/orderRoutes')
const userRoutes=require('./routes/userRoutes')
const path=require('path')

const app = express();

app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5500', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/orders', orderRoutes);
app.use('/api/users',userRoutes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use((err,req,res,next)=>{
  console.error(err);

  if(err.name === 'CastError'){
    return res.status(400).json({status:'error',message:'Invalide ID format' })
  }

  if(err.code===11000){
    return res.status(409).json({status:'error',message:'Duplicate value this already exists'})
  }

  if(err.name==='ValidationError'){
    return res.status(400).json({status:'error',message:err.message})
  }

  const statusCode=err.statusCode || 500;

  const message=
  statusCode===500 && process.env.NODE_ENV==='production'
  ? 'Something went wrong.Please try again later.'
  : err.message || 'Something went wrong';

  res.status(statusCode).json({status:'error',message})
})

module.exports = app;