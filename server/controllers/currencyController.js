const currencyService = require("../services/currencyService")
const userService = require("../services/userService");
async function getAllCurrenciesController(req, res){
    try {
        const currencies = await currencyService.displayMultipleCurrencies()
        res.json(currencies);
    }catch(err){
        res.json({message: err.message})
    }
}
async function getCurrencyController(req, res){
    try {
        const currency = await currencyService.displaySingleCurrency(req.params.id)
        res.json(currency)
    } catch(err){
        res.json({message: err.message})
    }
}
async function createCurrencyController(req, res) {
    try {
        await currencyService.addCurrency(req.body);
        res.status(201).json({message: "Currency created"})
    }catch(err){
        res.status(400).json({message: err.message})
    }
}
async function deleteCurrencyController(req, res){
    try {
        await currencyService.removeCurrency(req.params.id)
        console.log("USUNIETO WALUTE O ID: " + req.params.id)
        res.json({message: "Currency deleted"})
    }catch(err){
        res.json({message: err.message})
    }
}
async function updateCurrencyController(req, res){
    try {
        await currencyService.editCurrency(req.body)
        res.json({message: "Currency updated"})
    }catch(err){
        res.status(400).json({message: err.message})
    }
}
async function getCurrencyPaginationController(req, res){
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize)
        const data = await currencyService.getCurrenciesPagination(page, pageSize);

        res.json(data);
    }catch (err) {
        res.status(400).json({message: err.message})
    }
}

module.exports = {getAllCurrenciesController, getCurrencyController, createCurrencyController, deleteCurrencyController, updateCurrencyController, getCurrencyPaginationController}