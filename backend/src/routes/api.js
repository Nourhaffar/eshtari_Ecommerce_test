import express from 'express';
import { getHomeData } from '../controllers/proxyController.js';

const router = express.Router();

router.get('/home_widgets', getHomeData);

export default router;
