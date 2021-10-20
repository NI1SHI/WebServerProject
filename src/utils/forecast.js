const request=require('request')
const forecast=(lattitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=207ba324dbc8289cb2fe460cfb00cbe1&query='+lattitude+','+longitude+'&units=m'
    request({url,json:true},(error,{body})=>{
            if(error){
                callback('Unable to connect weather service',undefined)
            }
            else if(body.error){
        
                callback('please provide valid address',undefined)
            }
            else{
            callback(undefined,body.current.weather_descriptions[0]+'. it is currently'+body.current.temperature+'degrees out,there is'+ body.current.precip+'% chance of rain and humidity will be'+body.current.humidity)
            }
        })

}
module.exports=forecast
