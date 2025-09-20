import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userName: String,
    rating: { type: Number, min: 1, max: 5 },
    title: String,
    body: String,
    helpful: { type: Date, default: Date.now },
});

const CostSchema = new mongoose.Schema(
    {
        rent: Number, // Monthly rent in USD
        food: Number, // Monthly food cost in USD
        transport: Number,
        utilities: Number,
        other: Number,
    },
    { _id: false }
);

const ConnectivitySchema = new mongoose.Schema(
    {
        avgDownloadMbps: Number,
        avgUploadMbps: Number,
        mobileCoverage: String, // e.g., "4G", "5G" or "Good", "Fair"
        coworkingSpaces: Number,
    },
    { _id: false }
);

const VisaSchema = new mongoose.Schema(
    {
        visaNeeded: { type: Boolean, default: false },
        visaTypes: [String], // e.g., ["Tourist", "Business", "Digital Nomad"]
        notes: String,
    },
    { _id: false }
);

const CitySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, index: true },
        country: { type: String, index: true },
        region: String,
        slug: { type: String, index: true },
        description: String,
        featuredImage: String,
        images: [String],
        tags: [{ type: String, index: true }],
        cost: CostSchema,
        connectivity: ConnectivitySchema,
        safetyRating: { type: Number, min: 0, max: 10 },
        healthcareRating: { type: Number, min: 0, max: 10 },
        weatherSummary: String,
        visa: VisaSchema,
        currency: String,
        localSimInfo: String,
        population: Number,
        location: {
            lat: Number,
            lng: Number,
        },
        // community features
        reviews: [ReviewSchema],
        averageRating: { type: Number, min: 0, max: 5, default: 0 },
        reviewCount: { type: Number, default: 0 },
        bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

        // Admin metadata
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

        // approval workflow fields
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
        approvedAt: { type: Date, default: null },
    },
    { timestamps: true }
);

// Text index for search across name, country, region, description, tags
CitySchema.index({ name: "text", country: "text", description: "text", tags: "text" });

// helper to recalc average rating
CitySchema.methods.recalculateRating = function () {
    if (!this.reviews || this.reviews.length === 0) {
        this.averageRating = 0;
        this.reviewCount = 0;
        return;
    }
    // sum ratings correctly and compute average
    const sum = this.reviews.reduce((s, r) => s + (r.rating || 0), 0);
    this.averageRating = Math.round((sum / this.reviews.length) * 10) / 10;
    this.reviewCount = this.reviews.length;
};

export default mongoose.models.City || mongoose.model("City", CitySchema);