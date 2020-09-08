const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');
mongoose.connect('mongodb://localhost/starter-code', {
    useNewUrlParser: true
});




const celebrities = [{
        name: "Daniela Poggi",
        occupation: "singer",
        catchPhrase: "Italo disco is the best"
    },
    {
        name: "Phillip Risolo",
        occupation: "comedian",
        catchPhrase: "i Love Tv"
    },
    {
        name: "Sophia Frederike",
        occupation: "singer",
        catchPhrase: "Ca marche"
    },

];

Celebrity.insertMany(celebrities)
.then(data => {
  console.log(`Success! Added ${data.length} celebrities to the database`);
  mongoose.connection.close();
})
.catch(err => {
  console.log(err);
});

