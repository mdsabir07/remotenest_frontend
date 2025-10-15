// src/model/BlogPost.js
import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: Object, required: true },
    excerpt: { type: String },
    coverImage: { type: String },
    category: {
      type: String,
      enum: ["remote work", "tax/legal", "travel tips", "lifestyle", "other"],
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    approvedAt: { type: Date },
  },
  { timestamps: true }
);

BlogPostSchema.index({ title: "text", content: "text", excerpt: "text" });

export const getBlogPostModel = () =>
  mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
