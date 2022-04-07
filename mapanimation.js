const busStops = [
    [-71.093729, 42.359244],
    [-71.094915, 42.360175],
    [-71.0958, 42.360698],
    [-71.099558, 42.362953],
    [-71.103476, 42.365248],
    [-71.106067, 42.366806],
    [-71.108717, 42.368355],
    [-71.110799, 42.369192],
    [-71.113095, 42.370218],
    [-71.115476, 42.372085],
    [-71.117585, 42.373016],
    [-71.118625, 42.374863],
  ];
  
  // TODO: add your own access token
  mapboxgl.accessToken =
    'pk.eyJ1IjoidGVzdHVzZXIxMDAwIiwiYSI6ImNraDkzZ2pkMzAzMHoycnBmMXpvZ3UwZnMifQ.jAE4YsPeAJv50VK92NSpOQ';
  
  // TODO: create the map object using mapboxgl.map() function
  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081, 42.365554],
    zoom: 14,
  });
  
  // TODO: add a marker to the map
  let marker = new mapboxgl.Marker().setLngLat([-71.092761, 42.357575]).addTo(map);
  
  // counter here represents the index of the current bus stop
  let counter = 0;
  function move() {
    // TODO: move the marker on the map every 1000ms. Use the function marker.setLngLat() to update the marker coordinates
    // Use counter to access bus stops in the array busStops
  
    setTimeout(() => {
      if (counter >= busStops.length) return;
      marker.setLngLat(busStops[counter]);
      counter++;
      move();
    }, 1000);
  }

    (async function fetchData(dataArray = []) {
        // Performs a fetch request with the passed URL and returns the data as text asynchronously
        const makeRequest = async function (url) {
          const response = await fetch(url);
          const data = await response.text();
          return data;
        };
      
        // don't change this function, you will need to pass the Lisbon data to it to complete this exercise
        /**
         * @param data - the first parameter for this function should be your variable with the stored Lisbon weather data
         * @param dataArr - the dataArray variable which should hold all four data responses from the given URLs
         */
        const addLisbonDataToDocument = (data, dataArr = []) => {
          // validate data format and data
          data = JSON.parse(data);
          if (data.name !== 'Lisbon') {
            data = null;
          }
      
          // create DOM element for Lisbon Data and add it to document
          let arrayLengthDiv = document.createElement('div');
          arrayLengthDiv.innerHTML = `<div id="array-length-div">Data Items:${dataArr.length}</div>`;
          document.body.appendChild(arrayLengthDiv);
      
          // create DOM element for Lisbon Data and add it to document
          let lisbonDiv = document.createElement('div');
          lisbonDiv.innerHTML = `<div id="lisbon-data-div">Weather:${JSON.stringify(data)}</div>`;
          document.body.appendChild(lisbonDiv);
        };
      
        const urlArray = [
          'https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=7b68bf0910a2a7530b9929d01904bc79',
          'https://api.openweathermap.org/data/2.5/weather?q=Houston&APPID=7b68bf0910a2a7530b9929d01904bc79',
          'https://api.openweathermap.org/data/2.5/weather?q=Lisbon&APPID=7b68bf0910a2a7530b9929d01904bc79',
          'https://api.openweathermap.org/data/2.5/weather?q=Baltimore&APPID=7b68bf0910a2a7530b9929d01904bc79',
        ];
      
        urlArray.forEach(async (url) => {
          makeRequest(url).then(function (result) {
            // STEP 1: Store `result` inside the variable dataArray, this is required to pass this exercise
            dataArray.push(result);
            if (dataArray.length == urlArray.length) {
              // STEP 2: Loop through each item in the `dataArray` and use the logic below by uncommenting the code to see if it is the correct weather data for `Lisbon`
              dataArray.forEach((item) => {
                if (JSON.parse(item).name == 'Lisbon') {
                  // You will need to change the itemInDataArray variable to match your own variable that stores the current item in array that you are checking
      
                  addLisbonDataToDocument(item, dataArray);
                }
              });
              // STEP 3: Return dataArray
              return dataArray;
            }
          });
        });
      })();