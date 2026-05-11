const express = require('express')
const router = express.Router();
const currency = require("../controllers/currencyController")
const wallet = require('../controllers/walletController')
const authMiddleware = require("../Middlewares/authMiddleware");
router.get('/pagination', currency.getCurrencyPaginationController)
router.get('/', currency.getAllCurrenciesController)
router.get('/:id', currency.getCurrencyController)
router.post('/',authMiddleware, currency.createCurrencyController)
router.delete('/:id',authMiddleware, currency.deleteCurrencyController)
router.put('/:id', authMiddleware, currency.updateCurrencyController)
router.get('/:id/wallets', wallet.getWalletsCurrencyController)
module.exports = router;