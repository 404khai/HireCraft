import React from 'react'
import './Reviews.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import ReviewCard from '../../components/ReviewCard/ReviewCard'

const Reviews = () => {
  return (
    <div className='dashboardBox'>
      <DashboardNav/>
      <div className='dashboardBody'>
          <ProviderSideNav/>
          {/* <EmployerSideNav/> */}
          <div className="dashboard">
            <div className="welcome">
              <div className="welcomeTxt">
                <h2>Reviews</h2>
              </div>

              <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Reviews" link2="/ProviderDashboard/Reviews"/>
            </div>

            <div className="reviewsBox">
                <ReviewCard/>
                <ReviewCard/>
                <ReviewCard/>
            </div>
            
          </div>
          
      </div>
    </div>
  )
}


export default Reviews