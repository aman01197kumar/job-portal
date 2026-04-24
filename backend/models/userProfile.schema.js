import mongoose from "mongoose";

/* ---------------- PROJECT SCHEMA ---------------- */
const projectSchema = new mongoose.Schema({
  project_title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    index: true // search projects by title
  },
  project_duration: {
    start_date: {
      type: Date,
      required: true
    },
    completion_date: {
      type: Date,
      validate: {
        validator: function (value) {
          return !value || value >= this.start_date;
        },
        message: "Completion date must be after start date"
      }
    }
  },
  currently_working: {
    type: Boolean,
    default: false
  },
  project_description: {
    type: String,
    maxlength: 1000
  },
  tech_stack_used: [{
    type: String,
    trim: true,
    index: true // filter by tech stack
  }]
});

/* ---------------- RESUME SCHEMA ---------------- */
const resumeSchema = new mongoose.Schema({
  tech_stacks: [{
    type: String,
    trim: true,
    index: true // search candidates by tech
  }],
  // resume_upload: { type: String, required: true },
  headline: { type: String, required: true, maxlength: 120 },
  summary: { type: String, maxlength: 2000 },
  projects: [projectSchema]
});

/* ---------------- EDUCATION SCHEMA ---------------- */
const educationSchema = new mongoose.Schema({
  institution_type: {
    type: String,
    required: true,
    enum: ["School", "College", "University", "Institute"]
  },
  institution_name: {
    type: String,
    required: true,
    trim: true,
    index: true // search by college
  },
  course_name: {
    type: String,
    required: true
  },
  completion_year: {
    type: Number,
    required: true,
    min: 1950,
    max: new Date().getFullYear(),
    index: true // filter by year
  }
});

/* ---------------- EXPERIENCE SCHEMA ---------------- */
const experienceSchema = new mongoose.Schema({
  organization_name: {
    type: String,
    required: true,
    trim: true,
    index: true // search by company
  },
  started_on: { type: Date, required: true },
  currently_working: {
    type: Boolean,
    default: false,
    index: true // filter active employees
  },
  job_profile: {
    type: String,
    required: true,
    index: true // search by role
  },
  job_description: { type: String, maxlength: 1500 }
});

/* ---------------- USER PROFILE SCHEMA ---------------- */
const userProfileSchema = new mongoose.Schema(
  {
    /* -------- BASIC INFO -------- */
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    jobTitle: {
      type: String,
      trim: true,
      maxlength: 100,
      index: true // search by role
    },

   
    website: String,
    github: String,
    linkedIn: String,

    /* -------- IMAGES -------- */
    profile_image: { type: String },
    cover_image: { type: String },

    /* -------- CORE -------- */
    education: [educationSchema],
    experience: [experienceSchema],
    resume: { type: resumeSchema}
  },
  { timestamps: true }
);

/* ---------------- COMPOUND INDEXES ---------------- */

// 1. Search users by role + location (very common)
userProfileSchema.index({ jobTitle: 1, location: 1 });

// 2. Fast sorting by latest profiles
userProfileSchema.index({ createdAt: -1 });

// 3. Text search (global search like LinkedIn)
userProfileSchema.index({
  username: "text",
  jobTitle: "text",
  "resume.headline": "text",
  "resume.summary": "text"
});

export const UserProfile = mongoose.model("UserProfile", userProfileSchema);