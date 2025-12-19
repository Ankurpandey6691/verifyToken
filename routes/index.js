import express from 'express';
import { mainFn } from '../controller/indexController.js';
const router = express.Router();

/* GET home page. */
router.get('/', mainFn);

export default router;
