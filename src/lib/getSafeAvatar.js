// src/utils/getSafeAvatar.js
export default function getSafeAvatar(avatarUrl) {
    // ✅ Only block obviously broken or malformed URLs
    if (
        !avatarUrl ||
        !avatarUrl.startsWith("http") ||
        avatarUrl.includes("ibb.co.com") // <-- very specific check
    ) {
        return "/default-avatar.png";
    }

    return avatarUrl;
}