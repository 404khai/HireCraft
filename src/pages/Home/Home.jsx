import React from 'react'
import './Home.css'
import jobSearchGlobe from '../../assets/jobSearchGlobe.png'
import artisan from '../../assets/artisan.avif'

const Home = () => {
  return (
    <div className='home'>
        <div className="homeTxt">
            <p>Hire skilled workers you can rely on, Grow your service and find jobs easily - All in One</p>

            <div className="ctaBtns">
                <button className='exploreServices'>Explore Services</button>
                <button className='becomeProvider'>Become a Provider</button>
            </div>
        </div>
        <img src={artisan} alt="" className='homeBanner'/>
        <img src={jobSearchGlobe} alt=""  className='jobSearch'/>
    </div>
  )
}

export default Home