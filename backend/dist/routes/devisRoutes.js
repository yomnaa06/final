"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const devisController_1 = require("../controllers/devisController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const uploadMiddleware_1 = require("../middlewares/uploadMiddleware");
const router = (0, express_1.Router)();
// routes admin
router.get('/admin', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdmin, devisController_1.DevisController.listAll);
router.get('/admin/stats', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdmin, devisController_1.DevisController.getStats);
router.put('/admin/:id/validate', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdmin, uploadMiddleware_1.upload.single('devisFile'), devisController_1.DevisController.validate);
router.put('/admin/:id/refuse', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdmin, devisController_1.DevisController.refuse);
router.delete('/admin/:id', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdmin, devisController_1.DevisController.delete);
// routes client
router.post('/', authMiddleware_1.authenticateToken, authMiddleware_1.requireClient, devisController_1.DevisController.create);
router.get('/my', authMiddleware_1.authenticateToken, authMiddleware_1.requireClient, devisController_1.DevisController.getClientHistory);
router.get('/:id', authMiddleware_1.authenticateToken, authMiddleware_1.requireClient, devisController_1.DevisController.getOne);
exports.default = router;
