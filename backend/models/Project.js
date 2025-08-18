const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"]
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"]
    },
    techStack: {
      type: [String],
      required: [true, "At least one technology is required"],
      validate: {
        validator: function(v) {
          return v.length > 0;
        },
        message: "Tech stack cannot be empty"
      }
    },
    imageUrl: {
      type: String,
      default: ""
    },
    liveUrl: {
      type: String,
      default: ""
    },
    githubUrl: {
      type: String,
      default: ""
    },
    category: {
      type: String,
      enum: ["Web App", "Mobile App", "Desktop App", "API", "Other"],
      default: "Web App"
    },
    status: {
      type: String,
      enum: ["Completed", "In Progress", "Planning"],
      default: "Completed"
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for formatted date
projectSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

module.exports = mongoose.model("Project", projectSchema);
