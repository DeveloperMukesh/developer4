const express = require("express");
const { body, validationResult } = require("express-validator");
const Project = require("../models/Project");

const router = express.Router();

// Validation middleware
const validateProject = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),
  body("description")
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage("Description must be between 1 and 1000 characters"),
  body("techStack")
    .isArray({ min: 1 })
    .withMessage("At least one technology is required"),
  body("techStack.*")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Technology names cannot be empty"),
  body("category")
    .optional()
    .isIn(["Web App", "Mobile App", "Desktop App", "API", "Other"])
    .withMessage("Invalid category"),
  body("status")
    .optional()
    .isIn(["Completed", "In Progress", "Planning"])
    .withMessage("Invalid status")
];

// GET all projects with filtering and pagination
router.get("/", async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      status, 
      featured,
      search 
    } = req.query;

    const filter = {};
    
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (featured !== undefined) filter.featured = featured === 'true';
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const projects = await Project.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Project.countDocuments(filter);

    res.json({
      projects,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET featured projects
router.get("/featured", async (req, res) => {
  try {
    const featuredProjects = await Project.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6);
    res.json(featuredProjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ error: "Invalid project ID" });
    }
    res.status(500).json({ error: err.message });
  }
});

// POST add a new project
router.post("/", validateProject, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a project
router.put("/:id", validateProject, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(updatedProject);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ error: "Invalid project ID" });
    }
    res.status(400).json({ error: err.message });
  }
});

// DELETE a project
router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    
    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ error: "Invalid project ID" });
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;