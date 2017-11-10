require('./../config/config');

const axios = require('axios');

const apiKey = process.env.PETFINDER_API_KEY;

const getPups = () => {
  console.log('starting');
  return axios.get(`http://api.petfinder.com/shelter.getPets?format=json&key=${apiKey}&output=full&id=MO706`).then((res) => {
    console.log('got pets');
    return res.data.petfinder.pets.pet.map((pet) => {
      // console.log(pet);
      return {
        name: pet.name.$t,
        age: pet.age.$t,
        description: pet.description.$t,
        sex: pet.sex.$t,
        size: pet.size.$t,
        photo: pet.media.photos.photo[3].$t,
        animal: pet.animal.$t,
        breed: pet.breeds.breed.$t,
        _id: pet.id.$t,
      };
    });
  }).catch((e) => {
    console.log(e);
  });
};

module.exports = { getPups };
