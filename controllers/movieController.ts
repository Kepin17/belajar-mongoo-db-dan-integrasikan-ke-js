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
      data: newMovie,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getMovies = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const offset = (page - 1) * limit;
    const movies = await Movie.find().populate("category").skip(offset).limit(limit);
    const total = await Movie.countDocuments();

    res.status(200).json({
      message: "Movies retrieved successfully",
      data: movies,
      page,
      limit,
      totalPage: Math.ceil(total / limit),
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const { title, year, ages, team = [], category: categoryIds = [], isPublished, rating } = req.body;

    const updateCategory = categoryIds.map((id: string) => ({ _id: id }));

    await Movie.findByIdAndUpdate(_id, {
      title,
      year,
      ages,
      team,
      category: updateCategory,
      isPublished,
      rating,
    });
    res.status(200).json({
      message: "Movie updated successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    const deletedMovie = await Movie.findByIdAndDelete(_id);

    if (!deletedMovie) return res.status(400).json({ message: "Movie not found" });
    res.status(200).json({
      message: "Movie deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};
