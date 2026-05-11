const Wallet = require("../model/walletModel")
const User = require("../model/userModel")
const Currency = require("../model/currencyModel")

async function addWallet(data) {
    const user = await User.getUser(data.Uzytkownik_ID)
    if (!user) {
        throw new Error("Użytkownik nie istnieje")
    }
    const currency = await Currency.getCurrency(data.Waluta_ID)
    if (!currency) {
        throw new Error("Waluta nie istnieje")
    }
    if (!data.Saldo) {
        throw new Error("Saldo  jest wymagane")
    } else if (isNaN(data.Saldo) || Number(data.Saldo) < 0) {
        throw new Error("Saldo musi być liczbą większą lub równą 0")
    }
    const openingDate = new Date(data.Data_Otwarcia)
    const dateNow = new Date();
    if (openingDate > dateNow) {
        throw new Error("Data otwarcia nie może być poźniejsza niż obecna data")
    }
    try {
        await Wallet.createWallet(data.Waluta_ID, data.Uzytkownik_ID, data.Saldo, data.Data_Otwarcia)
    } catch (err) {
        if (err.message === "SQLITE_CONSTRAINT: UNIQUE constraint failed: Portfel.Waluta_ID, Portfel.Uzytkownik_ID") {
            throw new Error("Portfel dla takiej waluty i użytkownika już istnieje")
        }
        throw new Error(err.message)
    }
}

async function editWallet(data) {
    const user = await User.getUser(data.Uzytkownik_ID)
    if (!user) {
        throw new Error("Użytkownik nie istnieje")
    }
    const currency = await Currency.getCurrency(data.Waluta_ID)
    if (!currency) {
        throw new Error("Waluta nie istnieje")
    }
    if (!data.Saldo) {
        throw new Error("Saldo  jest wymagane")
    } else if (isNaN(data.Saldo) || Number(data.Saldo) < 0) {
        throw new Error("Saldo musi być liczbą większą lub równą 0")
    }
    const openingDate = new Date(data.Data_Otwarcia)
    const dateNow = new Date();
    if (openingDate > dateNow) {
        throw new Error("Data otwarcia nie może być poźniejsza niż obecna data")
    }
    try {
        await Wallet.updateWallet(data.Uzytkownik_ID, data.Waluta_ID, data.Saldo, data.Data_Otwarcia, data.ID)
    } catch (err) {
        if (err.message === "SQLITE_CONSTRAINT: UNIQUE constraint failed: Portfel.Waluta_ID, Portfel.Uzytkownik_ID") {
            throw new Error("Portfel dla takiej waluty i użytkownika już istnieje")
        }
        throw new Error(err.message)
    }
}

async function displayAllWallets() {
    return await Wallet.getAllWallets();
}

async function displaySingleWallet(id) {
    if (!id) {
        throw new Error("Brak id")
    }
    return await Wallet.getWallet(id)
}
async function walletPagination(page = 1, pageSize = 5 ){
    const {wallets, total} = await Wallet.getWalletsPagination(page, pageSize)
    return {
        wallets,
        total,
    }
}
async function removeWallet(id) {
    if(!id){
        throw new Error("Brak id")
    }
    await Wallet.deleteWallet(id)
}

module.exports = {addWallet, editWallet, displayAllWallets, displaySingleWallet, removeWallet, walletPagination}