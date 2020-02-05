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
  
    <div className='container'>

      <form className="form" onSubmit={fetchRequest}>
        <input className="input" type="text" placeholder="Text input" onChange={handleChange} />
        <button>submit</button>
      </form>

    </div>

  </section>

}

export default Home