import express from "express";
import {
    getInfos,
    getInfoById,
    saveInfo,
    deleteInfo
} from "../controllers/Infos.js";

const router = express.Router();

router.get('/infos', getInfos);
router.get('/infos/:id', getInfoById);
router.post('/infos', saveInfo);
router.delete('/infos/:id', deleteInfo);

export default router;
