const users = require("../controllers/userController")
const express = require('express')
const router = express.Router();
const wallets = require("../controllers/walletController")
const authMiddleware = require("../Middlewares/authMiddleware");

router.get('/pagination', users.userPaginationController)
router.get('/', users.getAllUsersController)
router.get('/:id', users.getUserController)
router.post('/',authMiddleware, users.createUserController)
router.delete('/:id',authMiddleware, users.deleteUserController)
router.put('/:id',authMiddleware, users.updateUserController)
router.get('/:id/wallets', wallets.getWalletsUserController)
router.post('/register', users.registerUserController)
router.post('/login', users.loginUserController)
module.exports = router;
