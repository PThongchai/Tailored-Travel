// Get the user's coordinates:  
let pos = []

// Get the user's coordinates:                                                              
async function getCoords() {
  pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
  return [pos.coords.latitude, pos.coords.longitude]
}


window.onload = async () => {

  const myMap = L.map('map', {
    center: await getCoords(),
    // [40.9864266, -75.1901783],
    zoom: 12,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '15',
  }).addTo(myMap)

  // create and main add geolocation marker
  const marker = L.marker(await getCoords())
  marker
    .addTo(myMap)
    .bindPopup('<p1><b>You are here</b><br></p1>')
    .openPopup()

  let submitBtn = document.querySelector('#submit')
  submitBtn.addEventListener('click', async function (e) {
    e.preventDefault()

    let businessType = document.querySelector('#business').value

    debugger
    let searchResult = await placeSearch(businessType);

    //this line log as Hotel, 40.9864071, -75.1901845, undefined
    console.log(`${businessType}, ${pos.coords.latitude}, ${pos.coords.longitude}, ${searchResult}`)

    Array.from(searchResult).forEach((blue) => {
      console.log(blue.geocodes.main + " " + blue.geocodes.main.latitude + " " + blue.geocodes.main.latitude)
    })


  })
}



async function placeSearch(business) {
  try {
    const searchParams = new URLSearchParams({
      query: business,
      ll: `${pos.coords.latitude},${pos.coords.longitude}`,
      open_now: 'true',
      sort: 'DISTANCE',
      limit: 5,
    });

    fetch(
      `https://api.foursquare.com/v3/places/search?${searchParams}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'fsq363IgbTxTGyD+WBtO4gReIrqp1GgfT6wUtvvB1JGW8h8=',
        }
      }
    )
      .then((results) => results.json())
      .then((results) => {
        //this log result as below, see one object eample
      //   [
      //     {
      //         "fsq_id": "4c393578edba95219d47d625",
      //         "categories": [
      //             {
      //                 "id": 17033,
      //                 "name": "Department Store",
      //                 "icon": {
      //                     "prefix": "https://ss3.4sqi.net/img/categories_v2/shops/departmentstore_",
      //                     "suffix": ".png"
      //                 }
      //             },
      //             {
      //                 "id": 17034,
      //                 "name": "Discount Store",
      //                 "icon": {
      //                     "prefix": "https://ss3.4sqi.net/img/categories_v2/shops/discountstore_",
      //                     "suffix": ".png"
      //                 }
      //             }
      //         ],
      //         "chains": [
      //             {
      //                 "id": "ab4b9fa0-d68a-012e-5619-003048cad9da",
      //                 "name": "Walmart"
      //             }
      //         ],
      //         "distance": 554,
      //         "geocodes": {
      //             "main": {
      //                 "latitude": 40.99007,
      //                 "longitude": -75.183025
      //             },
      //             "roof": {
      //                 "latitude": 40.99007,
      //                 "longitude": -75.183025
      //             }
      //         },
      //         "link": "/v3/places/4c393578edba95219d47d625",
      //         "location": {
      //             "address": "355 Lincoln Ave",
      //             "census_block": "420893007002023",
      //             "country": "US",
      //             "dma": "Wilkes Barre-Scranton",
      //             "formatted_address": "355 Lincoln Ave, East Stroudsburg, PA 18301",
      //             "locality": "East Stroudsburg",
      //             "neighborhood": [
      //                 "Foxtown Hill"
      //             ],
      //             "postcode": "18301",
      //             "region": "PA"
      //         },
      //         "name": "Walmart Supercenter",
      //         "related_places": {
      //             "children": [
      //                 {
      //                     "fsq_id": "5843d3f34bafb714700614f0",
      //                     "name": "SmartStyle"
      //                 },
      //                 {
      //                     "fsq_id": "5c4b7eb5018cbb002c83d3b7",
      //                     "name": "Walmart Grocery Pickup & Delivery"
      //                 },
      //                 {
      //                     "fsq_id": "5248882f11d2ac6b9834e319",
      //                     "name": "Walmart Pharmacy"
      //                 }
      //             ]
      //         },
      //         "timezone": "America/New_York"
      //     },
          
      // ]
         console.log(results)
        return results
      })
      .catch(err => console.error(err));
  } catch (err) {
    console.error(err);
  }
}


