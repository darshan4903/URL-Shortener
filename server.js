const express = require('express')
const app = express()
const mongoose = require('mongoose')
const shortUrl = require('./models/shortUrl')
const ShortUrl = require('./models/shortUrl')
const dbURL = 'mongodb+srv://darshan:darshan@short-url.mtkrz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
app.use('/assets',express.static('assets'));
mongoose.connect(dbURL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((result)=> console.log('connected'))
.catch((err)=>console.log(err))
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: false }))
app.get('/',async (req,res)=>{
    const shortUrls = await ShortUrl.find()
    res.render('index',{ shortUrls: shortUrls})
})

app.post('/shortUrls',async (req,res)=>{
    await ShortUrl.create ({ full: req.body.fullUrl })
    res.redirect('/')
})
app.get('/:shortUrl',async(req,res)=>{
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if(shortUrl == null)return res.sendStatus(404)
    shortUrl.clicks++
    shortUrl.save()
    res.redirect(shortUrl.full)
    
})

app.listen(process.env.PORT || 3000)