import type { Request, Response } from "express";
const categories = require("../models/categoryMovie");
const { Movie } = require("../models/movie");

export const getCategories = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const offset = (page - 1) * limit;
    const movies = await Movie.find().skip(offset).limit(limit);

    const total = await Movie.countDocuments();

    res.status(200).json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data: movies,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (name === "") return res.status(400).json({ message: "Name is required" });

    const newCategory = new categories({
      name,
    });
    await newCategory.save();
    res.status(201).json({
      message: "Category added successfully",
      category: newCategory,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const { name }: { name: string } = req.body;

    if (name === "") return res.status(400).json({ message: "Name is required" });

    const updatedCategory = await categories.findByIdAndUpdate(_id, { name }, { new: true });
    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    const deletedCategory = await categories.findByIdAndDelete(_id);
    if (!deletedCategory) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({
      message: "Category deleted successfully",
      category: deletedCategory,
    });
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};
