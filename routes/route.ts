import { Router } from "express";
import { addMovie, getMovies } from "../controllers/movieController";

export const router = Router();

router.post("/movies", addMovie);
router.get("/movies", getMovies);
