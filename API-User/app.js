const express= require('express');
const app = express();
const router = require('./src/routes/user-routes.js')
app.use(express.json())
app.use(express.urlencoded({ extended: true}))



app.use('/user',router);







const PORT = 8080;
app.listen(PORT, ()=>{console.log(`Listening on PORT ${PORT}`)})

