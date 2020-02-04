import React, { useState, useEffect, useCallback } from 'react'
import ReactMapGL, { GeolocateControl, Marker, Popup } from 'react-map-gl'

const TOKEN = 'pk.eyJ1IjoiZHJlZGl6emxlIiwiYSI6ImNrM2o2d3Q2ODBlbGMzanFsM3RtMG8waGsifQ.y8DoH4fhWbGPzd_VkDHIQg'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODU0NzlhNzItZmZmZi00MWIwLWFkOGEtOWY2N2ViY2Y3MGI4Iiwia2V5X2lkIjoiYWNkY2I2NzAtY2Y5My00M2FmLThhZWYtMzUwNjU3MTIwYjMyIiwiaWF0IjoxNTc2MTg0NTgzfQ.lnIfptwPKNwU72QmkIsKsdr2Aen08hqATcjfdkoi3tU'


const Maps = (props) => {

  const [events, setEvents] = useState([])

  const [selectedEvent, setSelectedEvent] = useState(null)

  const fetchRequest = useCallback(() => {

    fetch(`https://api.list.co.uk/v1/events?near=${viewport.latitude},${viewport.longitude}/5`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    })
      .then(res => res.json())
      .then(res => setEvents(res))


  }, [{ ...viewport }])

  useEffect(() => {


    fetch(`https://api.list.co.uk/v1/events?near=${props.location.state.result.latitude},${props.location.state.result.longitude}/5`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    })
      .then(res => res.json())
      .then(res => setEvents(res))
      .then(console.log(props.location))
      .then(console.log(props.geo))

    return () => console.log('Unmounting component')

  }, [])

  const [viewport, setViewport] = useState({
    width: '60vw',
    height: '98vh',
    latitude: props.location.state.result.latitude,
    longitude: props.location.state.result.longitude,
    zoom: 13

  })

  if (events.length === 0) {
    return <div>Loading...</div>
  }

  return <div id="main-container">
    <div id="guide">

    </div>
    <div id="map-container">
      <ReactMapGL mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        {...viewport}
        onViewportChange={viewport => {
          setViewport(viewport)
        }}
        onClick={
          fetchRequest
        }

      >

        {events.map(event => (
          <Marker
            key={event.event_id}
            latitude={event.schedules[0].place.lat}
            longitude={event.schedules[0].place.lng}
          >
            <button onClick={(e) => {
              e.preventDefault()
              setSelectedEvent(event)
              console.log(selectedEvent.schedules[0].place.lat)
            }}>E</button>
          </Marker>
        ))}

        {selectedEvent ? (
          <Popup
            latitude={selectedEvent.schedules[0].place.lat}
            longitude={selectedEvent.schedules[0].place.lng}
            onClose={() => {
              setSelectedEvent(null)
            }}
          >
            <div id="popup">
              <h2>{selectedEvent.name}</h2>
              {selectedEvent.descriptions[0].description ? (
                <p>{selectedEvent.descriptions[0].description}</p>
              ) : <p>No description</p>}
            </div>
          </Popup>
        ) : null}

      </ReactMapGL>
    </div>
    <div id="event-column"></div>
  </div>
}

export default Maps