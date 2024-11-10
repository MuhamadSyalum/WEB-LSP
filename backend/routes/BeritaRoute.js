import express from "express";
import {
    getBeritas,
    getBeritaById,
    createBerita,
    updateBerita,
    deleteBerita
} from "../controllers/Beritas.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/beritas',verifyUser, getBeritas);
router.get('/beritas/:id',verifyUser, getBeritaById);
router.post('/beritas',verifyUser, createBerita);
router.patch('/beritas/:id',verifyUser, updateBerita);
router.delete('/beritas/:id',verifyUser, deleteBerita);

export default router;