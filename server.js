const express = require("express");
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const app = express();
const dbURI = 'mongodb+srv://zahraa:zh123@user.5brn1.mongodb.net/users?retryWrites=true&w=majority';
mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => app.listen(3000))
    .catch((error) => console.log(error))


app.set('view-engine', 'ejs');
app.use(express.urlencoded({
    extended: false
}));

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render('login.ejs', {message: ''});
})
app.get('/login', (req, res) => {
    res.render('login.ejs', {message: ''});
})
app.get('/register', (req, res) => {
    res.render('register.ejs', {message: ''});
})

app.post('/register', async (req, res) => {
    try{
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })
        User.findOne({email:req.body.email})
            .then((result)=>{
                if(result != null){
                    res.render('register.ejs', {message:'Email already exists'})
                }
                else{
                    user.save()
                .then((result) => {
                   
                })
                .catch((error) => {
                    console.log('error');
                })
                res.render('index.ejs', {user: req.body.username})
                }
               
            })
            .catch((error)=>{
                
            })
    }
    catch{
        console.log("Error");
    }
   
    
})
app.post('/login', async (req, res) => {
    User.find({
            email: req.body.email
        })
        .then(async (result) => {
            try{
            await bcrypt.compare(req.body.password, result[0].password) ?
                res.render('index.ejs', {user: result[0].username})
            :
                res.render('login.ejs', {message: 'You entered a wrong password'});
            
        }
        catch{
            console.log('error');
        }
        })
        .catch((error) => {
            res.render('login.ejs', {message: 'You entered wrong information'});
        })
})