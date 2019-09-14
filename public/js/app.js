console.log('Client side js file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-one')
const msgTwo = document.querySelector('#msg-two')

function fetchData(location) {
    url = 'http://localhost:3000/weather?location=' + location 

    fetch(url).then((response) => {        
        response.json().then(
            (data) => {
                if(data.error) {
                    msgOne.textContent = data.error
                    //console.log(data.error)
                } else {
                    msgOne.textContent = 'For ' + data.location
                    msgTwo.textContent = 'The temperature is ' + data.temperature + ' degrees with ' + data.precipitation + '% chance of rain.'
                    console.log(data.location)
                    console.log(data.temperature)
                    console.log(data.precipitation)
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