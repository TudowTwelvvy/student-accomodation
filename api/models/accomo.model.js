import mongoose from 'mongoose';

const accomoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    singlesPrice: {
      type: Number,
      required: true,
    },
    sharingPrice: {
      type: Number,
      required: true,
    },
    singles: {
      type: Boolean,
      required: true,
    },
    sharings: {
      type: Boolean,
      required: true,
    },
    singleRoomsNo: {
      type: Number,
      required: true,
    },
    sharingRoomsNo: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    swimmingpool: {
      type: Boolean,
      required: true,
    },
    nsfas: {
      type: Boolean,
      required: true,
    },
    otherBursary: {
      type: Boolean,
      required: true,
    },
    cashPaying: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Accomodation = mongoose.model('Accomodation', accomoSchema);

export default Accomodation;