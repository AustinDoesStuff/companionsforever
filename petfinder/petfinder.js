const axios = require('axios');

var getPups = async () => {
    try {
        const res = await axios.get(`http://api.petfinder.com/shelter.getPets?format=json&key=${apiKey}&output=full&id=MO706`);

        const pets = res.data.petfinder.pets.pet.map((pet) => {
            return {
                name: pet.name.$t,
                age: pet.age.$t,
                description: pet.description.$t,
                sex: pet.sex.$t,
                size: pet.size.$t,
                photo: pet.media.photos.photo[3].$t,
                animal: pet.animal.$t,
                breed: pet.breeds.breed.$t,
                _id: pet.id.$t
            };
        });

        return pets;
    } catch (e) {
        throw new Error(e);
    }
};

module.exports = {getPups};