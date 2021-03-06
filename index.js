const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');



mongoose.connect(keys.mongoURI);

console.log('Before app express');
const app = express();

app.use(
	cookieSession({
		maxAge: 30*24*60*60*1000,
		keys: [keys.cookieKey]
	})
);



app.use(passport.initialize());
app.use(passport.session());



require('./routes/authRoutes') (app);

if (process.env.NODE_ENV === 'production'){
//  Express will serve production assets like main.js or main.css

	app.use(express.static('client/build'));

	const path = require('path');

	app.get('*', (req,res) => {
		res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));

	});

}


const PORT = process.env.PORT || 5000;
//app.listen(PORT,'0.0.0.0');

app.listen(PORT);

//console.log('Console app Listen');

console.log(PORT);