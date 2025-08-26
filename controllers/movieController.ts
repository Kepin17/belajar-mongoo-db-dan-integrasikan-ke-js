import type { Request, Response } from "express";
const Movie = require("../models/movie");

export const addMovie = async (req: Request, res: Response) => {
  try {
    const { title, year, ages, team = [], category: categoryIds = [], isPublished, rating } = req.body;

    const newMovie = new Movie({
      title,
      year,
      ages,
      team,
      category: categoryIds,
      isPublished,
      rating,
    });

    await newMovie.save();
    res.status(201).json({
      message: "Movie added successfully",
      movie: newMovie,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find().populate("category");
    res.status(200).json({
      message: "Movies retrieved successfully",
      movies,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};
