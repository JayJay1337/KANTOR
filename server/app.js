const express = require('express')
const cors = require('cors');
const app = express();
const userRouter = require('./routes/userRouter')
const walletRouter = require('./routes/walletRouter')
const currencyRouter = require('./routes/currencyRouter')
app.use(cors({
    origin : "http://localhost:5173"
}));
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/wallets', walletRouter)
app.use('/api/currencies', currencyRouter)

app.listen(3000, ()=> console.log("Serwer cdziała na http://localhost:3000"));