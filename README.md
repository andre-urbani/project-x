# Project X - Event Finder

![Event Finder Home Page](https://user-images.githubusercontent.com/41396233/74654846-25810700-5183-11ea-8950-4cdc95350021.png)

## Introduction

Event Finder is my first side project, worked on periodically during my time on, and following completion of, the General Assembly Software Engineering Immersive course. Event finder is a tool that helps you find upcoming events in your local area (data sourced from The List API), and was developed primarily using React.js and Mapbox. By submitting a postcode, the user will be navigated to the Events page which displays all events within a 5 mile radius of the submitted postcode. By clicking on these events, a popup will be displayed, showing the name, time and date of the event, with additional information (including a link to purchase tickets and organisers website) displayed in the right-hand panel.

You can try it out yourself [here]()

## Technologies used

- JavaScript
- React.js
- React-Map-GL (a suite of React components for Mapbox GL)
- The List API
- Postcode to lat/long API
- Route, Switch, Link from 'react-router-dom'
- HTML5
- CSS
- GitHub

## Process

Having researched various potential ideas for a side-project, I came across a public API called The List, which provides a database for upcoming events throughout the UK. I felt that this would be an interesting project to pursue as it would allow me to learn the implementation of maps into React apps via Mapbox, and it is something that I thought would be useful and I would use myself.

### Features

- Home page where user enters and submits a postcode, including guidance on how to use
- A map which shows events within a 5 mile radius of the submitted postcode
- Popups integrated into the map, which when clicked on will display the name and time/date of event
- A side panel with addition information regarding the event
- User is able to move around the map to any location, and when an area on the map is clicked, all events within a 5 mile radius of the clicked-on area will be displayed

### Functionality

In order to find events located within a specific area, The List API uses endpoints based upon latitude and longitude. Having decided upon the idea to allow users to find events based on a postcode of their choice, the first step was to find an API that converts postcodes to lat/long which would then be used to fetch data from The List API.

This was achieved by adding an event listener to a form on the home page where users entered a postcode, setting state with this data and then pushing this data via props to the maps page. Code shown below -

```
const [postCode, setPostcode] = useState({
    pCode: ''
  })

  const fetchRequest = useCallback((e) => {
    e.preventDefault()
    fetch(`https://api.postcodes.io/postcodes/${postCode.pCode}`)
      .then(res => res.json())
      .then(res => {
        const test = res
        props.history.push('/maps', test)
      })
  }, [{ ...postCode }])

  const handleChange = (e) => {
    setPostcode({ ...postCode, pCode: e.target.value })
  }
```

This then brings the user to the Maps page where all event information is displayed.

![Event Finder Home Page](https://user-images.githubusercontent.com/41396233/74657276-ca9dde80-5187-11ea-941e-cb242d1c6f26.png)

Liberal use of ternary operators was required to allow for the correct information to be displayed when the user clicks on an event. Ternary operators were used to allow for a popup to be displayed on click, and also for the information in the right-hand panel, as depending on the event clicked on, the API may or may not have JSON data in a number of object keys (such as tickets, which were not always available as JSON data). Therefore, this would cause the page to break if a ternary operator was not used.

Example of Popup ternary code - 

```
{selectedEvent ? (
  <Popup
    latitude={selectedEvent.schedules[0].place.lat}
    longitude={selectedEvent.schedules[0].place.lng}
    onClose={() => {
      setSelectedEvent(null)
    }}
  >
    <div id="popup">
      <h2 id="popup-marker">{selectedEvent.name}</h2>
    </div>
    <div id="popup-marker">{moment(selectedEvent.schedules[0].performances[0].ts).format('MMM Do YYYY, h:mma')}</div>
  </Popup>
) : null}
```

Example of event info ternary code - 

```
<div>
  {selectedEvent ? (
    selectedEvent.schedules[0].performances[0].tickets ? (
      <div id="description">£{selectedEvent.schedules[0].performances[0].tickets[0].min_price}</div>
    ) : <div></div>
  ) : null}
</div>
```

## Result

I was very happy with the overall result, as again it improved my overall understanding of React, along with helping me to understand correct usage of ternary operators.

I was also very pleased with the implemantion of Mapbox, as this was a technology that I had no previous experience with.

### Wins

- Further solidifying my knowledge of React and JavaScript
- Implementation of Mapbox GL
- Improving my understanding of ternary operators and in what situations they are best utilised
- Improving my CSS and flexbox knowledge

### Challenges

- Finding a solution to prevent the page breaking when specific JSON data was not provided by the API
- Succesfully converting the postcode submitted by user into lat/long via the postcode API, and then passing this data to a seperate route via props
