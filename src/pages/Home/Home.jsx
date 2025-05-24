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
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
                    <Link to="/Dashboard">
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
            <h2>Global Talent Source trusted by Top Companies</h2>

            <div className="topCompaniesCarousel">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWx_E-0G-NHsVInfrP0xUrYvY-YFhmI8iasw&s" alt="" />
                <img src="https://images.credly.com/images/cc2c9a21-84a0-4f80-bcda-eb9dea7aa35c/blob.png" alt="" />
                {/* <img src="https://static.wikia.nocookie.net/logopedia/images/7/7f/RedbubbleLogo2012.png/revision/latest?cb=20190716174345" alt="" /> */}
                <img src="https://support.substack.com/hc/theming_assets/01HZPCAPDV5H31C2F6C9262Q6H" alt="" />
                <img src="https://upload.wikimedia.org/wikipedia/en/f/ff/DreamWorks_Animation_SKG_logo_with_fishing_boy.svg" alt="" />
                <img src="https://i.pinimg.com/736x/72/c8/d3/72c8d31d8779299857123e1966c4a710.jpg" alt="" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Blizzard_Entertainment_Logo_2015.svg/2560px-Blizzard_Entertainment_Logo_2015.svg.png" alt="" />
                <img src="https://cdn.worldvectorlogo.com/logos/netflix-4.svg" alt="" className='netflix'/>
            </div>
        </div>

        <div className="best">
            <h2>The best Service Marketplace Site</h2>
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
            <h2>Popular Services</h2>
            {/* <div className="popularServicesScrollBox"> */}
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className="carousel"
                containerClass="container"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite={false}
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1230
                        },
                        items: 5,
                        partialVisibilityGutter: 40
                    },
                    ipad: {
                        breakpoint: {
                            max: 1230,
                            min: 1000
                        },
                        items: 4,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                            max: 1000,
                            min: 760
                        },
                        // centerMode : true,
                        items: 3,
                        partialVisibilityGutter: 30
                    },
                    mobile: {
                        breakpoint: {
                            max: 760,
                            min: 500
                        },
                        items: 2,
                        partialVisibilityGutter: 30
                    },
                    miniMobile: {
                        breakpoint: {
                            max: 500,
                            min: 0
                        },
                        items: 1,
                        partialVisibilityGutter: 30
                    }
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >

                {popularServices.map((popularService, key) => (
                    <div className="popularServicesBox" key={key}>
                        <p>{popularService.name}</p>
                        <img src={getImage(popularService.image)} alt="" />
                    </div>
                ))}
            </Carousel>
            {/* </div> */}
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