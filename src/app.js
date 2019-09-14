const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// PORT for heroku deployment or 3000 for local
const port = process.env.PORT || 3000 

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and location for the templates
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Path to assets
app.use(express.static(publicDirPath))

app.get('', (req,res) => {
    res.render('index' , {
        title: 'Welcome to the home page!',
        name: 'Chris Koivu'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'Welcome to the about page!',
        name: 'Chris Koivu'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'This is the help page',
        message:'This is where you go to get more information on this website',
        name: 'Chris Koivu'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.location){
        return res.send({
            error:'You must enter a location!'
        })
    }

    geocode(req.query.location, (error, {latitude, longitude, location} = {}) => {
        if (!error) {          
            forecast({latitude, longitude, location}, (error, data) => {
                if(error) {
                   res.send(
                       {error}
                   )
                   res.send(
                    {error}
                    )
                } else {
                    res.send(
                        data
                    )                   
                }         
            })
        } else {
            res.send(
                {error}
            )
        }
    }
)
    
})

app.get('*', (req,res)=>{
    console.dir(req.path)    
    res.render('404', {
        title: '404'      
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

