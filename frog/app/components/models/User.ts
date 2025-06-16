// models/User.ts
import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
});

const User = models.User || model('User', UserSchema);
export default User;
