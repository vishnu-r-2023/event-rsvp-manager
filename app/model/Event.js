import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: String,
  date: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  guests: [
    {
      email: { type: String, required: true },
      rsvp: { type: String, enum: ['Yes', 'No', 'Maybe'], default: 'Maybe' },
    },
  ],
}, { timestamps: true });
export default mongoose.models.Event || mongoose.model('Event', EventSchema);
