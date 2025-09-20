/*
Usage:
  Set MONGODB_URI in env or pass via env, then run:
    node scripts/make-admin.js you@example.com

This script updates the given user's role to 'admin'.
*/

require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI not set. Set it in environment variables or in a .env file.');
  process.exit(1);
}

async function main() {
  await mongoose.connect(uri, { dbName: 'remotenest' });
  // require the model from the repo
  const User = require(path.join(process.cwd(), 'src', 'models', 'User')).User;

  const email = process.argv[2];
  if (!email) {
    console.error('Usage: node scripts/make-admin.js you@example.com');
    process.exit(1);
  }

  const u = await User.findOneAndUpdate({ email }, { role: 'admin' }, { new: true });
  if (!u) {
    console.error('No user found with email', email);
    process.exit(2);
  }

  console.log('Updated user:', { email: u.email, role: u.role, _id: u._id });
  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(99);
});
