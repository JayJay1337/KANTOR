const express = require('express')
const router = express.Router();
const wallet = require("../controllers/walletController")
const authMiddleware = require("../Middlewares/authMiddleware");
router.get('/', wallet.getWalletsUserController)
router.get("/pagination", wallet.walletPaginationController)
router.get("/:id", wallet.getWalletController)
router.put("/:id",authMiddleware, wallet.updateWalletController)
router.post("/", authMiddleware,wallet.createWalletController)
router.delete("/:id", authMiddleware,wallet.deleteWalletController)

module.exports = router;
