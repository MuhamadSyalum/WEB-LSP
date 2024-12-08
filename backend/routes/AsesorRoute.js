import express from "express";
import {
    getAsesors,
    getAsesorById,
    saveAsesor,
    updateAsesor,
    deleteAsesor
} from "../controllers/Asesors.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/asesors', getAsesors);
router.get('/asesors/:id', getAsesorById);
router.post('/asesors', verifyUser, saveAsesor);
router.patch('/asesors/:id', verifyUser, updateAsesor);
router.delete('/asesors/:id', verifyUser, deleteAsesor);

export default router;
