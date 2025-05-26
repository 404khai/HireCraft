import React from 'react'
import './Messages.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
import EmployerSideNav from '../../components/EmployerSideNav/EmployerSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import messages from '../../json/messages.json'

const Messages = () => {
    const images = import.meta.glob('../../assets/*', { eager: true });

  const getImage = (filename) => {
    const entry = Object.entries(images).find(([key]) => key.includes(filename));
    return entry ? entry[1].default : '';
  };

  return (
    <div className='messagesBox'>
      <DashboardNav/>
      <div className='messagesBodyBox'>
        {/* <EmployerSideNav/> */}
        <ProviderSideNav/>
        <div className="messagesBody">

            <div className="welcome">
              <div className="welcomeTxt">
                <h2>Messages</h2>
              </div>

              <Breadcrumbs firstLink="Messages" secondLink="Dashboard"/>
            </div>

            <div className="messagesGroup">
                <div className="messagePeople">
                    {messages.map((message, key) => (
                        <div key={key} className='messageUser'>
                            <img src={getImage(message.image)} alt="" />

                            <div className="messageTxt">
                                <p>{message.name}</p>
                                <p>{message.txtMessage}</p>
                            </div>
                            
                            <div className='messageBadge'>

                            </div>
                        </div>
                    ))}
                                    
                </div>
                <div className="messageChat">

                </div>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default Messages