/* EXPRESS SERVER */
import express from 'express'
import bodyParser, { json } from 'body-parser'

/* LOGGER */
// import logger from 'morgan';
// import fs from 'fs';
// import path from 'path'

/* SESSION */
import session from 'express-session';

import {generateToken, checkToken} from './libs/token';

/* ROUTER */
import api from './routes'

/* SERVER */
const app = express();
const PORT = process.env.PORT || 4000;
// const token = generateToken({_id:'id', profile:'profile'});

/* LOG */
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), {
//     flags: 'a'
// })

/* applyMiddleware */
// app.use(logger('combined', {
//     stream: accessLogStream
// }))
app.use(express.static('public'))
app.use(session({
    secret: 'mw',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('jwt-secret', 'asc978dsjhv$#')

/*addRouter */
app.use('/api', api);
app.get('/test/:name', async (req,res)=>{
    const { name } = req.params;
    const payload = {
        _id : name,
        name
    }
    console.log('payload > ', payload)
    const token = await generateToken(payload);
    console.log('token >', req.headers['x-access-token'], token);

    res.json({token})
})

app.get('/check/:name', async (req, res) => {
    const secret = app.get('jwt-secret');
    const token = req.headers['x-access-token'] || req.query.token;

    checkToken(token, secret)
    .then(decoded=>{
        console.log('decoded > ', decoded)
        res.json({decoded})
    })
    .catch(err =>{
        console.log('err 34324>> ', err);
        res.json({err})
    });
})

app.get('delete/:name',  async (req, res) => {
    const secret = app.get('jwt-secret');
    const token = req.headers['x-access-token'] || req.query.token;

})
app.listen(PORT, (req, res) => {
    console.log(`http://127.0.0.1:${PORT} start!`)
})