// models/User.ts
import mongoose, { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  prompt: { type: String, default: ''},
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);
export default Prompt;
