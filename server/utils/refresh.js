const { getPups } = require('./petfinder');
const { Pupper } = require('./../models/pupper');
const { mongoose } = require('./../db/mongoose');

const savePuppers = async () => {
  try {
    const pups = await getPups();

    if (!pups) {
      throw new Error();
    }

    await Pupper.remove({});
    await Pupper.insertMany(pups);
  } catch (e) {
    throw new Error(e);
  }
};

const refresh = setInterval(() => { savePuppers(); }, 900000);

module.exports = {
  savePuppers,
  refresh,
};
