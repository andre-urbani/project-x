import React, { useState, useEffect, useCallback } from 'react'
import ReactMapGL, { GeolocateControl, Marker, Popup } from 'react-map-gl'

const TOKEN = 'pk.eyJ1IjoiZHJlZGl6emxlIiwiYSI6ImNrM2o2d3Q2ODBlbGMzanFsM3RtMG8waGsifQ.y8DoH4fhWbGPzd_VkDHIQg'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODU0NzlhNzItZmZmZi00MWIwLWFkOGEtOWY2N2ViY2Y3MGI4Iiwia2V5X2lkIjoiYWNkY2I2NzAtY2Y5My00M2FmLThhZWYtMzUwNjU3MTIwYjMyIiwiaWF0IjoxNTc2MTg0NTgzfQ.lnIfptwPKNwU72QmkIsKsdr2Aen08hqATcjfdkoi3tU'

const Maps = (props) => {

  const [events, setEvents] = useState([])

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

    return () => console.log('Unmounting component')

  }, [])

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: props.location.state.result.latitude,
    longitude: props.location.state.result.longitude,
    zoom: 12

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