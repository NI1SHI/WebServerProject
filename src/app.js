const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const app= express()
const port=process.env.PORT || 3000
const publicDirectory=path.join(__dirname,'../public')
const viewTemplates=path.join(__dirname,'../Templates/views')
const viewPartial=path.join(__dirname,'../Templates/partials')
app.set('view engine','hbs')
app.set('views',viewTemplates)
app.use(express.static(publicDirectory))
hbs.registerPartials(viewPartial)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'nishika' 
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'nishika',
        title:'About'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        content:'Hai this small paragraph for the page'
    })
})

    



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

   
       geocode(req.query.address,(error,{lattitude,longitude,location}={})=>{
           if(error){
               return res.send({error})
           }
           forecast(lattitude,longitude,(error,forecastData)=>{

            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })

           })
       })
})


app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title:'404',
        name:'Nishika',
        errorMessage:'help page is not found'
    })
})
app.get('/*',(req,res)=>{
    res.render('404page',{
        title:'404',
        name:'Nishika',
        errorMessage:'Page is not found'
    })
})

app.listen(port,()=>
{
    console.log('Server is upon the port 3000')
})
