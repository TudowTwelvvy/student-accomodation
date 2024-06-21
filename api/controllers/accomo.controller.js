import Accomodation from "../models/accomo.model.js"

export const createAccomo = async(req,res,next)=>{
  try {
    const accomodation = await Accomodation.create(req.body);
    return res.status(201).json(accomodation);
  } catch (error) {
    next(error)
  }
};

export const deleteAccomodation = async (req, res, next) => {
  const accomodation = await Accomodation.findById(req.params.id);

  if (!accomodation) {
    return next(errorHandler(404, 'Accomodation not found!'));
  }

  if (req.user.id !== accomodation.userRef) {
    return next(errorHandler(401, 'You can only delete your own accomodation!'));
  }

  try {
    await Accomodation.findByIdAndDelete(req.params.id);
    res.status(200).json('accomodation has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateAccomodation = async (req, res, next) => {
  const accomodation = await Accomodation.findById(req.params.id);
  if (!accomodation ) {
    return next(errorHandler(404, 'accomodation not found!'));
  }
  if (req.user.id !== accomodation.userRef) {
    return next(errorHandler(401, 'You can only update your own accomodation!'));
  }

  try {
    const updatedAccomodation = await Accomodation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedAccomodation);
  } catch (error) {
    next(error);
  }
};
