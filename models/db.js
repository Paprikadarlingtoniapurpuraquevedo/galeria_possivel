const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://helioneonargon:KoTgbiGl8BsSJHvY@galeriapossivel.tgkte.mongodb.net/').then(() => {
    console.log('Funciona')
}).catch(err => console.log('Desastre'))