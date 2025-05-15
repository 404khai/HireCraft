import React from 'react'
import './Home.css'
import { IoSearch } from "react-icons/io5";
import jobSearchGlobe from '../../assets/jobSearchGlobe.png'
import artisan from '../../assets/heroSec.jpg'
// import artisan from '../../assets/employer2.jpg'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
        <div className="heroSection">
            <div className="homeTxt">
                <p>Hire <span className='homeTxtSpan'>skilled workers</span> you can rely on, <span className='homeTxtSpan'>Grow your service</span> and find jobs easily - All in One</p>

                <div className="ctaBtns">
                    <button className='animated-hover-button'>
                        <div className="btn-content">
                            Hire a Pro <i className='hireProIcon'><IoSearch /></i>
                        </div>  
                    </button>
                    <Link to="/Login">
                        <button className='becomeProvider'>Become a Service Provider</button>
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