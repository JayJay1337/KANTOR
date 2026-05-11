const walletService = require("../services/walletService")
const Wallet = require("../model/walletModel")
const userService = require("../services/userService");

async function getAllWalletsController(req, res) {
    try {
        const wallets = await walletService.displayAllWallets();
        res.json(wallets);
    } catch (err) {
        res.json({message: err.message})
    }
}

async function getWalletController(req, res) {
    try {
        const wallet = await walletService.displaySingleWallet(req.params.id)
        res.json(wallet);
    } catch (err) {
        res.json({message: err.message})
    }
}

async function getWalletsUserController(req, res) {
    const wallets_user = await Wallet.getWalletsUser(req.params.id)
    res.json(wallets_user)
}

async function getWalletsCurrencyController(req, res) {
    const wallets_currency = await Wallet.getWalletsCurrency(req.params.id)
    res.json(wallets_currency)
}

async function updateWalletController(req, res) {
    try {
        await walletService.editWallet(req.body)
        res.json("Wallet updated")
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

async function createWalletController(req, res) {
    try {
        await walletService.addWallet(req.body)
        res.json("Wallet created")
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

async function deleteWalletController(req, res) {
    try {
        await walletService.removeWallet(req.params.id)
        res.json("Wallet deleted")
    } catch (err) {
        res.json({message: err.message})
    }
}
async function walletPaginationController(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize)
        const data = await walletService.walletPagination(page, pageSize);
        res.json(data);
    }catch (err) {
        res.status(400).json({message: err.message})
    }
}

module.exports = {
    getAllWalletsController,
    getWalletController,
    getWalletsCurrencyController,
    getWalletsUserController,
    createWalletController,
    updateWalletController,
    deleteWalletController,
    walletPaginationController
}