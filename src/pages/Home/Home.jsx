import React from 'react'
import './Home.css'
import { IoSearch } from "react-icons/io5";
import { MdHomeRepairService } from "react-icons/md";
import { FaStar, FaStarHalf } from "react-icons/fa";
import jobSearchGlobe from '../../assets/jobSearchGlobe.png'
import artisan from '../../assets/heroSec.jpg'
import explore from '../../assets/explore.png'
import tomHolland from '../../assets/tomHolland.jpg'
import girl from '../../assets/girl.jpeg'
import OIF from '../../assets/OIF.jpeg'
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
            <h2>The best Service Marketplace Site</h2>
            <div className="heroSecStats">
                <div className='flexUserStats'>
                    <div className="userStats">
                        <p>Over <span className='homeTxtSpan'><b>100</b></span> service providers</p>
                        <div className="userStatsImgs">
                            <img src={tomHolland} alt="" />
                            <img src={girl} alt="" className='girl'/>
                            <img src={OIF} alt="" className='OIF'/>
                        </div>

                        <div className="heroSecRating">
                            <p>4.5</p>
                            <div className="heroSecRatingIcons">
                                <i><FaStar /></i>
                                <i><FaStar /></i>
                                <i><FaStar /></i>
                                <i><FaStar /></i>
                                <i><FaStarHalf /></i>
                            </div>
                        </div>
                        
                    </div>

                    <div className="availableServices">
                        <i><MdHomeRepairService /></i>
                        <p className='tenk'>10<span className="homeTxtSpan">K+</span></p>
                        <p className='availServicesTxt'>Available Services</p>
                    </div>
                </div>
                
                <div className="exploreServices">
                    <div className="exploreServicesTxt">
                        <p>Choose from a variety of diverse services and hire a pro</p>
                        <Link to="/Services">Explore featured services</Link>
                    </div>
                    
                    <img src={explore} alt="" className='exploreImg'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home