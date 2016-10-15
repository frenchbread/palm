import mongoose from '../../config/mongoose';

const schema = new mongoose.Schema({
  isBank: {
    type: Boolean,
    required: true,
  },
  eur: {
    type: Number,
    required: true,
  },
  rub: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Bank', schema);
