//using this to fix the address lat long on CSV file.

const ul = document.querySelector('#list')
const api = 'https://geocode.search.hereapi.com/v1/geocode?q='

getData()

fixLongLat()

async function getData() {

    let originalCsv = []

    const response = await fetch('./streets.csv');
    originalCsv = await response.text();
    originalCsv = originalCsv.split('\n');

    for (let i = 0; i <= originalCsv.length; i++) {

        let getData = fetch(api + originalCsv[i] + apiKey)
            .then(res => res.json())
            .then(data => {

                let name = data.items[0].title.split(',')[0]
                let lat = data.items[0].position.lat
                let long = data.items[0].position.lng

                console.log(name + ' ' + lat + ' ' + long)

                let li = document.createElement('li')
                li.innerHTML = i + ', ' + name + ',' + lat + ',' + long
                ul.appendChild(li)

            })
    }
}