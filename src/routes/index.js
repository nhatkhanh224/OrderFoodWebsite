const homeRouter=require('./home');
const restaurantRouter=require('./restaurant');
function route(app) { 
  app.use('/',homeRouter);
  app.use('/restaurant',restaurantRouter);
}

module.exports = route;