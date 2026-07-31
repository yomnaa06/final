"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const uploadMiddleware_1 = require("../middlewares/uploadMiddleware");
const router = (0, express_1.Router)();
// Admin Dashboard et Management
router.get('/clients', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdmin, adminController_1.AdminController.getClients);
router.get('/stats', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdmin, adminController_1.AdminController.getStats);
router.get('/dashboard', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdmin, adminController_1.AdminController.getDashboard);
router.get('/notifications', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdmin, adminController_1.AdminController.getNotifications);
// Devis Management
router.put('/devis/:id/validate', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdmin, uploadMiddleware_1.upload.single('file'), adminController_1.AdminController.validateDevis);
router.put('/devis/:id/refuse', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdmin, adminController_1.AdminController.refuseDevis);
// Reclamation Management
router.put('/reclamations/:id/process', authMiddleware_1.authenticateToken, authMiddleware_1.requireAdmin, adminController_1.AdminController.processReclamation);
exports.default = router;
