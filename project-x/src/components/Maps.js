import React, { useState, useEffect, useCallback } from 'react'
import ReactMapGL, { GeolocateControl, Marker, Popup } from 'react-map-gl'

const TOKEN = 'pk.eyJ1IjoiZHJlZGl6emxlIiwiYSI6ImNrM2o2d3Q2ODBlbGMzanFsM3RtMG8waGsifQ.y8DoH4fhWbGPzd_VkDHIQg'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWZmNTRlZjEtYWIxZC00MWQzLWE1ZTAtZDE1ZDU1MTE3OWRjIiwia2V5X2lkIjoiNDQ0OTlkZmYtMTFjZS00N2QxLTk0MDEtMWMyNzVkN2RhZDRhIiwiaWF0IjoxNTc1NDU4ODk5fQ.kyAjrIZMZWjk7j6ZSpXp-I4XZrWLKiCgKpUrnGZ986g'

const Maps = () => {

  const [events, setEvents] = useState([])

  const fetchRequest = useCallback(() => {
    setGeoloc({ ...viewport })
    fetch(`https://api.list.co.uk/v1/events?near=${geoLoc.latitude},${geoLoc.longitude}/5`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    })
      .then(res => res.json())
      .then(res => setEvents(res))
    console.log(events)


  }, [{ ...viewport }])

  useEffect(() => {

    fetch(`https://api.list.co.uk/v1/events?near=${geoLoc.latitude},${geoLoc.longitude}/5`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    })
      .then(res => res.json())
      .then(res => setEvents(res))

    console.log(geoLoc.latitude)

    return () => console.log('Unmounting component')

  }, [])

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 51.45523,
    longitude: -2.59665,
    zoom: 13.5

  })

  const [geoLoc, setGeoloc] = useState({
    latitude: 51.45523,
    longitude: -2.59665
  })

  if (events.length === 0) {
    return <div>Loading...</div>
  }

  return <div>
    <ReactMapGL mapboxApiAccessToken={TOKEN}
      mapStyle="mapbox://styles/dredizzle/ck3owxclr138a1cqnzupab2hc"
      {...viewport}
      onViewportChange={viewport => {
        setViewport(viewport)
      }}
      onClick={
        fetchRequest
      }

    >

      {events.map(event => (
        <Popup
          key={event.event_id}
          latitude={event.schedules[0].place.lat}
          longitude={event.schedules[0].place.lng}
        >
        </Popup>
      ))}


      {/* <Popup latitude={51.45523} longitude={-2.59665}>
        <div>event here</div>
      </Popup> */}
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={false}
      />
    </ReactMapGL>
  </div>
}

export default Maps