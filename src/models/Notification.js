import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        title: { type: String, required: true },
        message: { type: String },
        type: {
            type: String,
            enum: ["city", "blog", "review", "payment", "general"],
            default: "general",
        },
        isRead: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);