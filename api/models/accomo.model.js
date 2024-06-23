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
    city:{
      type: String,
      required: true
    },
    university:{
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true,
    },
    male:{
      type: Boolean,
    },
    female:{
      type: Boolean,
    },
    singlesPrice: {
      type: Number,
    },
    sharingPrice: {
      type: Number,
      
    },
    singles: {
      type: Boolean,
     
    },
    sharing: {
      type: Boolean,
    
    },
    singleRoomsNo: {
      type: Number,
    },
    sharingRoomsNo: {
      type: Number,
      
    },
    spaceLeftMales:{
      type: Number,
    },
    spaceLeftFemales:{
      type: Number,
    },
    furnished: {
      type: Boolean,
      
    },
    swimmingpool: {
      type: Boolean,
      
    },
    nsfas: {
      type: Boolean,

    },
    otherBursary: {
      type: Boolean,
     
    },
    cashPaying: {
      type: Boolean,
      
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