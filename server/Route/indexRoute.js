
const express = require("express");

const router = express.Router();

const { homePage} = require("../controllers/payController");


router.get("/", homePage);