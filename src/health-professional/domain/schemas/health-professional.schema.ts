import mongoose from 'mongoose';

export const HealthProfessionalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  cellPhoneNumber: { type: String, required: false },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: false },
});
