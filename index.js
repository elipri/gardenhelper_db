var express = require('express');
var logger = require('morgan');
var routes = require('./routes');

// Instatiate application instance
var app = express();

// Configure middleware
app.use(logger('dev'));

// Let's add a View Engine - Handlebars
app.set('view engine', 'hbs');

//NB! Järjekord loeb!
app.get('/', routes.index); 
app.get('/api', routes.apiIndex);
app.get('/api/users', routes.users);
app.get('/api/users/:id?', routes.users);
app.get('/api/tasks/:id?', routes.tasks);
app.get('/api/plants/:id?', routes.plants);
app.get('/api/places/:id?/:place?', routes.places);
app.get('/api/about', routes.about);
app.get('*', routes.default);

// Serveri initsialiseerimine
var server = app.listen(4000, function() { 
    console.log('Listening on port 4000');
});
