const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/storedb', {
mongoose.connect('mongodb+srv://atlas:atlas@cluster0.i4imy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(db => console.log('Connection establishe successfully'))