import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <section >
    <div>
      <Link className='button' to={{
        pathname: '/maps'
      }}>Map
  
        </Link>
    </div>

  </section>

)

export default Home