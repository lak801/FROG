// models/User.ts
import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true},
  roomCode: { type: String, required: true },
  ready: { type: Boolean, default: false },
  responses: { type: Array, default: [] },
});

const User = models.User || model('User', UserSchema);
export default User;
