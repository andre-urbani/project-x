import React, { useState, useEffect } from 'react'
import ReactMapGL, { GeolocateControl, Marker, Popup } from 'react-map-gl'

const TOKEN = 'pk.eyJ1IjoiZHJlZGl6emxlIiwiYSI6ImNrM2o2d3Q2ODBlbGMzanFsM3RtMG8waGsifQ.y8DoH4fhWbGPzd_VkDHIQg'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzY1N2U4NDMtNDY3YS00NTUzLWFiMmItNTdmODA0NWRiZDA0Iiwia2V5X2lkIjoiZDkwMmM0MzQtY2Y3NS00ZDkzLWEzNWItY2RlZmViZDgxN2ZiIiwiaWF0IjoxNTc0ODgzMzc5fQ.-dEHb4BFuFj6LoV3jf3jnXGlLbFB_N_7bSGxQ7K0CTM'

const Maps = () => {

  const [events, setEvents] = useState([])


  useEffect(() => {
    
    setInterval(() => {
      
      fetch(`https://api.list.co.uk/v1/events?near=${viewport.latitude},${viewport.longitude}/5`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      })
      
        .then(res => res.json())
        .then(res => setEvents(res))
      return () => console.log('Unmounting component')

    }, 1000)
    
  }, [])

  // useEffect(() => {
  //   fetch(`https://api.list.co.uk/v1/events?near=${viewport.latitude},${viewport.longitude}/2`, {
  //     headers: {
  //       'Authorization': `Bearer ${API_KEY}`
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(res => setEvents(res))
  //   return () => console.log('Unmounting component')
  // }, [])

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 51.45523,
    longitude: -2.59665,
    zoom: 13.5

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