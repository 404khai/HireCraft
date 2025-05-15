import React from 'react'
import './Home.css'
import jobSearchGlobe from '../../assets/jobSearchGlobe.png'
import artisan from '../../assets/heroSec.jpg'
// import artisan from '../../assets/employer2.jpg'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
        <div className="heroSection">
            <div className="homeTxt">
                <p>Hire skilled workers you can rely on, Grow your service and find jobs easily - All in One</p>

                <div className="ctaBtns">
                    <button className='exploreServices'>Hire a Pro</button>
                    <Link to="/Login">
                        <button className='becomeProvider'>Become a Provider</button>
                    </Link>
                </div>
            </div>

            <div className="heroSecImgs">
                <img src={jobSearchGlobe} alt=""  className='jobSearch'/>
                <img src={artisan} alt="" className='artisan'/>
            </div>
            
            {/* <img src={jobSearchGlobe} alt=""  className='jobSearch'/> */}
        </div>
        
        <div className="trusted">

        </div>
    </div>
  )
}

export default Home