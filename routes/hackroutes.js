import express from "express";

import {
  getCategories,
  getAmount,
} from "../controllers/hackcontrol.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/amounts/:id", getAmount);
router.get('/', (req, res) => {
  res.render('index', req.query);
});

export default router;