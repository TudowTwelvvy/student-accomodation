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

export const getAccomodation = async (req, res, next) => {
  try {
    const accomodation = await Accomodation.findById(req.params.id);
    if (!accomodation) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(accomodation);
  } catch (error) {
    next(error);
  }
};

export const getAccomodations = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    
    let university = req.query.university;
    if (university === undefined || university === 'false') {
      university = { $in: [false, true] };
    }

    let city = req.query.city;
    if (city === undefined || city === 'false') {
      city = { $in: [false, true] };
    }

    let nsfas = req.query.nsfas;
    if (nsfas === undefined || nsfas === 'false') {
      nsfas = { $in: [false, true] };
    }

    let cashPaying = req.query.cashPaying;
    if (cashPaying === undefined || cashPaying === 'false') {
      cashPaying = { $in: [false, true] };
    }

    let otherBursary = req.query.otherBursary;
    if (otherBursary === undefined || otherBursary === 'false') {
      otherBursary = { $in: [false, true] };
    }

    let sharing = req.query.sharing;
    if (sharing === undefined || sharing === 'false') {
      sharing = { $in: [false, true] };
    }

    let singles = req.query.singles;
    if (singles === undefined || singles === 'false') {
      singles = { $in: [false, true] };
    }

    let female = req.query.female;
    if (female === undefined || female === 'false') {
      female = { $in: [false, true] };
    }

    let male = req.query.male;
    if (male === undefined || male === 'false') {
      male = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let swimmingpool = req.query.swimmingpool;
    if (swimmingpool === undefined || swimmingpool === 'false') {
      swimmingpool = { $in: [false, true] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const accomodation = await Accomodation.find({
      name: { $regex: searchTerm, $options: 'i' },
      university,
      city,
      nsfas,
      cashPaying,
      otherBursary,
      female,
      male,
      swimmingpool,
      furnished,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(accomodation);
  } catch (error) {
    next(error);
  }
};