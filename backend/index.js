const connectToMongo = require('./db');

const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

connectToMongo();

app.use(cors());
app.use(express.json());
// app.get('/',(req,res)=>{
//     res.send('Hello Linal');
// })

// Available routes
app.use(require('./routes/auth'));
app.use(require('./routes/notes'));

app.listen(port,()=>{
    console.log(`App is Listening at Port ${port}`);
})