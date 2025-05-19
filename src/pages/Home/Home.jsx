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
import modernHouse from '../../assets/modernHouse.png'
import { Link } from 'react-router-dom'

import popularServices from '../../json/popularServices.json'

const Home = () => {
    const images = import.meta.glob('../../assets/*', { eager: true });

  const getImage = (filename) => {
    const entry = Object.entries(images).find(([key]) => key.includes(filename));
    return entry ? entry[1].default : '';
  };

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
            <div className="sectionHeadTxts">
                <h2>Global Talent Source trusted by Top Companies</h2>
            </div>
            

            <div className="topCompaniesCarousel">

            </div>
        </div>

        <div className="best">
            <h2 className='sectionHeadTxts'>The best Service Marketplace Site</h2>
            <div className="heroSecStats">
                <div className='flexUserStats'>
                    <div className="userStats">
                        <p>Over <span className='homeTxtSpan'><b>100</b></span> service providers</p>
                        <div className="userStatsImgs">
                            <img src={tomHolland} alt="" className='tomHolland'/>
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

        <div className="popularServices">
            <h2 className='sectionHeadTxts'>Popular Services</h2>
            <div className="popularServicesScrollBox">
                {popularServices.map((popularService, key) => (
                    <div className="popularServicesBox" key={key}>
                        <p>{popularService.name}</p>
                        <img src={getImage(popularService.image)} alt="" />
                    </div>
                ))}
            </div>
        </div>

        <div className="instantResults">
            <div className="instantResultsTxt">
                <h2>Instant results, Top Talents</h2>

                <p>At HireCraft, we connect you with top-tier professionals—fast. Whether you need a skilled developer, a reliable designer, or a seasoned project manager, our platform delivers instant access to a curated network of verified experts.  Hire with confidence, knowing every candidate is pre-vetted for quality, experience, and performance. With HireCraft, top talent isn’t hard to find—it’s just a click away.</p>
                <button className='getStarted'>
                    <Link to=''>Get Started</Link>  
                </button>
            </div>
            <div className="instantResultsImg">
                <img src={modernHouse} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Home