import { Router } from "express";
import { addMovie, getMovies } from "../controllers/movieController";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../controllers/categoriesController";

export const router = Router();

// Movie
router.post("/movies", addMovie);
router.get("/movies", getMovies);

// Category
router.post("/categories", addCategory);
router.get("/categories", getCategories);
router.delete("/categories/:_id", deleteCategory);
router.put("/categories/:_id", updateCategory);
