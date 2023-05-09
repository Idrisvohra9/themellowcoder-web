import express from "express";
import openai from "openai";

const router = express.Router();

const openaiAPI = new openai(process.env.OPENAI_API_KEY);