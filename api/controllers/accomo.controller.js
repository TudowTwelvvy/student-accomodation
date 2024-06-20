import Accomodation from "../models/accomo.model.js"

export const createAccomo = async(req,res,next)=>{
  try {
    const accomodation = await Accomodation.create(req.body);
    return res.status(201).json(accomodation);
  } catch (error) {
    next(error)
  }
}