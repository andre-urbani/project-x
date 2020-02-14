import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

const Home = (props) => {

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



  return <section >

    <div className='home-container'>
      <div className="main-title">Event Finder</div>
      <h2 >How to use</h2>
      <div className="homepage-guide">
        <div>Event finder is a tool that helps you find upcoming events in your local area. </div>
        <br />
        <div>By submitting a postcode in the box below, you will be navigated to the Events page, which displays all events (signified by the letter E) within a 5 mile radius of the submitted postcode. </div>
        <br />
        <div>By clicking on these events, a popup will be displayed, showing the name, time and date of the event. </div>
        <br />
        <div>In the side panel to the right, further information regarding the selected event will also be displayed. </div>
        <br />
        <div>If you wish to search for events in a different area, you can move the map around (by clicking and dragging) and click on your desired location on the map. </div>
        <br />
        <div>This will then update the events to those within the clicked-on location. Alternatively, you can click on New Search (bottom of side panel) which will take you back to this page. </div>
        <br />
        <div>Start by entering a postocode in the box below</div>
      </div>
      <form className="form" onSubmit={fetchRequest}>
        <input className="input" type="text" placeholder="Enter Your Postcode" onChange={handleChange} />
        <br />
        <button>Submit Postcode</button>
      </form>

    </div>

  </section>

}

export default Home