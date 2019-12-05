import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {




  
  return <section >
    <div className='container'>
      {/* <form className="form" onSubmit={handleSubmit}>
        <input className="input" type="text" placeholder="Text input"/>

      </form> */}
      <Link className='button' to={{
        pathname: '/maps'
      }}>Map
  
      </Link>
    </div>

  </section>

}

export default Home