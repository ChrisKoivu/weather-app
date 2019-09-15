console.log('Client side js file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-one')
const msgTwo = document.querySelector('#msg-two')

function fetchData(location) {
    url = '/weather?location=' + location 

    fetch(url).then((response) => {        
        response.json().then(
            (data) => {
                if(data.error) {
                    msgOne.textContent = data.error                   
                } else {
                    msgOne.textContent = 'For ' + data.location
                    msgTwo.textContent = 'The temperature is ' + data.temperature + ' degrees with ' 
                    + data.precipitation + '% chance of rain. The low temperature for the day is ' + data.temperatureLow + 
                    ' degrees. The high temperature for the day is ' + data.temperatureHigh + ' degrees. '
                    
                }
                
            }
        )
    })
}

weatherForm.addEventListener('submit', (ev) => {
    ev.preventDefault()    
    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''
    fetchData(search.value)   
})