// models/BlogPost.js
import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        content: { type: Object, required: true }, // TipTap stores JSON object here
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

// Create a text index on fields for MongoDB full-text search
BlogPostSchema.index({ title: "text", content: "text", excerpt: "text" });

export default mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);