const Currency = require("../model/currencyModel")
const User = require("../model/userModel");

async function addCurrency(data) {
    const nazwaLower = data.Nazwa.toLowerCase()
    const currencies = await Currency.getAllCurrencies()
    if (currencies.some(c => c.Nazwa.toLowerCase() === nazwaLower)) {
        throw new Error("Waluta o podanej nazwie już istnieje")
    }
    const symbolLower = data.Symbol.toLowerCase()
    if (currencies.some(c => c.Symbol.toLowerCase() === symbolLower)) {
        throw new Error("Waluta o podanym symbolu juz istnieje")
    }
    if (isNaN(data.Kurs) || Number(data.Kurs) <= 0) {
        throw new Error("Kurs musi być liczbą i większy od zera")
    }
    try {
        await Currency.createCurrency(
            data.Nazwa,
            data.Symbol,
            data.Kurs,
            data.ID
        );
    } catch (err) {
        if (err.message === "SQLITE_CONSTRAINT: UNIQUE constraint failed: Waluta.Symbol") {
            throw new Error("Waluta o podanym symbolu już istnieje");
        } else if (err.message === "SQLITE_CONSTRAINT: UNIQUE constraint failed: Waluta.Nazwa") {
            throw new Error("Waluta o podanej nazwie już istnieje")
        }
        throw new Error(err.message)
    }
}

async function editCurrency(data) {
    const nazwaLower = data.Nazwa.toLowerCase()
    const currencies = await Currency.getAllCurrencies()
    if (currencies.some(c => c.Nazwa.toLowerCase() === nazwaLower && c.ID !== data.ID)) {
        throw new Error("Waluta o podanej nazwie już istnieje")
    }
    const symbolLower = data.Symbol.toLowerCase()
    if (currencies.some(c => c.Symbol.toLowerCase() === symbolLower && c.ID !== data.ID)) {
        throw new Error("Waluta o podanym symbolu juz istnieje")
    }
    if (isNaN(data.Kurs) || Number(data.Kurs) <= 0) {
        throw new Error("Kurs musi być liczbą i większy od zera")
    }
    try {
        await Currency.updateCurrency(
            data.Nazwa,
            data.Symbol,
            data.Kurs,
            data.ID
        )
    } catch (err) {
        if (err.message === "SQLITE_CONSTRAINT: UNIQUE constraint failed: Waluta.Symbol") {
            throw new Error("Waluta o podanym symbolu już istnieje");
        } else if (err.message === "SQLITE_CONSTRAINT: UNIQUE constraint failed: Waluta.Nazwa") {
            throw new Error("Waluta o podanej nazwie już istnieje")
        }
        throw new Error(err.message)
    }
}

async function removeCurrency(id) {
    if (!id) {
        throw new Error("Brak ID waluty");
    }
    const currency = await Currency.getCurrency(id);
    if (!currency) {
        throw new Error("Waluta o podanym ID nie istnieje");
    }
    return await Currency.deleteCurrency(id);
}

async function displayMultipleCurrencies() {
    return Currency.getAllCurrencies()
}

async function displaySingleCurrency(id) {
    if (!id) {
        throw new Error("Brak ID waluty");
    }
    return Currency.getCurrency(id)
}
async function getCurrenciesPagination(page=1, pageSize=5) {
    const {currencies, total} = await Currency.getCurrenciesPagination(page, pageSize);
    return {
        currencies,
        total,
    };
}
module.exports = {addCurrency, editCurrency, removeCurrency, displaySingleCurrency, displayMultipleCurrencies, getCurrenciesPagination}