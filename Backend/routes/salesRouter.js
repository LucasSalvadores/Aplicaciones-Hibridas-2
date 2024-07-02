import express from "express";
import { createSale, getSale, getSaleById } from "../controllers/saleController.js";
const router = express.Router();

router.use( express.json());

// Agregar una Venta
router.post('/', createSale)

// Retorna la lista de Ventas
router.get('/', getSale )

// Retorna la lista de Ventas por id
router.get('/:id', getSaleById )

export default router;