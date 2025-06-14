// import React from 'react'
// import './Messages.css'
// import { IoIosSend } from "react-icons/io";
// import DashboardNav from '../../components/DashboardNav/DashboardNav'
// import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
// import EmployerSideNav from '../../components/ClientSideNav/ClientSideNav'
// import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
// import messages from '../../json/messages.json'

// const Messages = () => {
//     const images = import.meta.glob('../../assets/*', { eager: true });

//   const getImage = (filename) => {
//     const entry = Object.entries(images).find(([key]) => key.includes(filename));
//     return entry ? entry[1].default : '';
//   };

//   return (
//     <div className='messagesBox'>
//       <DashboardNav/>
//       <div className='messagesBodyBox'>
//         {/* <EmployerSideNav/> */}
//         <ProviderSideNav/>
//         <div className="messagesBody">

//             <div className="welcome">
//               <div className="welcomeTxt">
//                 <h2>Messages</h2>
//               </div>

//               <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Messages" link2="/ProviderDashboard/Messages"/>
//             </div>

//             <div className="messagesGroup">
//                 <div className="messagePeople">
//                     {messages.map((message, key) => (
//                         <div key={key} className='messageUser'>
//                             <img src={getImage(message.image)} alt="" />

//                             <div className="messageTxt">
//                                 <p>{message.name}</p>
//                                 <p>{message.txtMessage}</p>
//                             </div>
                            
//                             <div className='messageBadge'>
//                                 <p>8</p>
//                             </div>
//                         </div>
//                     ))}
                                    
//                 </div>
//                 <div className="messageChat">
//                     <div className="sendChat">
//                         <input
//                             type="text"
//                             placeholder="Type to Send"
//                             // value={message}
//                             // onChange={(e) => setMessage(e.target.value)}
//                             // onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                         />
//                         <i><IoIosSend /></i>
//                     </div>
//                 </div>
//             </div>
            
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Messages

import React, { useState, useEffect, useContext, useRef } from 'react';
import './Messages2.css';
import { IoIosSend } from "react-icons/io";
import DashboardNav from '../../components/DashboardNav/DashboardNav';
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav';
import ClientSideNav from '../../components/ClientSideNav/ClientSideNav';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs'; // <--- THIS IS THE UPDATED IMPORT
import { AuthContext } from '../../context/AuthContext';

const Messages = () => {
    const { user } = useContext(AuthContext);
    const images = import.meta.glob('../../assets/*', { eager: true });
    const messagesEndRef = useRef(null);

    const [currentBookingId, setCurrentBookingId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessageContent, setNewMessageContent] = useState('');
    const [activeChatUser, setActiveChatUser] = useState(null);
    const [userBookings, setUserBookings] = useState([]);

    const stompClientRef = useRef(null);

    const getImage = (filename) => {
        const entry = Object.entries(images).find(([key]) => key.includes(filename));
        return entry ? entry[1].default : '';
    };

    // --- Fetch User Bookings (Chats) ---
    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                let response;
                if (user && user.userType === 'ROLE_CLIENT') {
                    response = await axios.get('http://localhost:9090/api/v1/bookings/client/me', config);
                } else if (user && user.userType === 'ROLE_PROVIDER') {
                    response = await axios.get('http://localhost:9090/api/v1/bookings/provider/me', config);
                } else {
                    return;
                }
                setUserBookings(response.data);
                if (response.data.length > 0 && !currentBookingId) {
                    handleChatSelect(response.data[0].id, user.userType === 'ROLE_CLIENT' ? response.data[0].providerFullName : response.data[0].clientFullName);
                }
            } catch (error) {
                console.error("Error fetching user bookings:", error);
            }
        };

        if (user) {
            fetchUserBookings();
        }
    }, [user, currentBookingId]);


    // --- Fetch Messages for the Selected Booking ---
    const fetchMessages = async (bookingId) => {
        if (!bookingId) return;
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:9090/api/v1/messages/booking/${bookingId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
            setMessages([]);
        }
    };

    // --- WebSocket Connection and Subscription ---
    useEffect(() => {
        if (!currentBookingId) return;

        const connectWebSocket = () => {
            // If a client already exists, disconnect it before creating a new one
            if (stompClientRef.current && stompClientRef.current.connected) {
                stompClientRef.current.deactivate();
            }

            const stompClient = new Client({
                webSocketFactory: () => new SockJS('http://localhost:9090/ws'),
                // debug: (str) => { console.log(str); }, // Uncomment for debugging
                // reconnectDelay: 5000,
            });

            // Assign event handlers
            stompClient.onConnect = (frame) => {
                console.log('Connected: ' + frame);
                // Subscribe to a topic for new messages for this booking
                stompClient.subscribe(`/topic/messages/${currentBookingId}`, (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                });
            };

            stompClient.onStompError = (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
                // You might want to attempt reconnection here or show a message to the user
                // setTimeout(connectWebSocket, 5000); // Attempt to reconnect after 5 seconds
            };

            stompClient.onDisconnect = () => {
                console.log('Disconnected from WebSocket');
            };

            // Activate the client to establish the connection
            stompClient.activate();
            stompClientRef.current = stompClient;
        };

        connectWebSocket();

        // Cleanup function for WebSocket when component unmounts or booking changes
        return () => {
            if (stompClientRef.current && stompClientRef.current.connected) {
                stompClientRef.current.deactivate(); // Use deactivate for clean disconnect
            }
        };
    }, [currentBookingId]); // Reconnect WebSocket if currentBookingId changes

    // --- Scroll to bottom of messages ---
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);


    const handleChatSelect = (bookingId, chatPartnerName) => {
        setCurrentBookingId(bookingId);
        setActiveChatUser(chatPartnerName);
        fetchMessages(bookingId);
    };

    const sendMessage = async () => {
        if (!newMessageContent.trim() || !currentBookingId) return;

        const messagePayload = {
            bookingId: currentBookingId,
            content: newMessageContent,
            // senderType and senderId are likely derived from your backend based on the token
        };

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:9090/api/v1/messages/send', messagePayload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNewMessageContent('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className='messagesBox'>
            <DashboardNav />
            <div className='messagesBodyBox'>
                {user && user.userType === 'CLIENT' ? <ClientSideNav /> : <ProviderSideNav />}
                <div className="messagesBody">

                    <div className="welcome">
                        <div className="welcomeTxt">
                            <h2>Messages</h2>
                        </div>
                        <Breadcrumbs firstLink="Dashboard" link={user && user.userType === 'ROLE_CLIENT' ? "/ClientDashboard" : "/ProviderDashboard"} secondLink="Messages" link2={user && user.userType === 'ROLE_CLIENT' ? "/ClientDashboard/Messages" : "/ProviderDashboard/Messages"} />
                    </div>

                    <div className="messagesGroup">
                        <div className="messagePeople">
                            {userBookings.length === 0 && <p className="no-bookings-message">No active chats.</p>}
                            {userBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className={`messageUser ${currentBookingId === booking.id ? 'active-chat' : ''}`}
                                    onClick={() => handleChatSelect(booking.id, user.userType === 'ROLE_CLIENT' ? booking.providerFullName : booking.clientFullName)}
                                >
                                    <div className="messageUser-avatar">
                                        {user.userType === 'ROLE_CLIENT' && booking.providerFullName ? booking.providerFullName.charAt(0).toUpperCase() : booking.clientFullName.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="messageTxt">
                                        <p>{user.userType === 'ROLE_CLIENT' ? booking.providerFullName : booking.clientFullName}</p>
                                        <p>{booking.description.substring(0, 30)}...</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="messageChat">
                            {currentBookingId ? (
                                <>
                                    <div className="chat-header">
                                        <h4>Chat with {activeChatUser}</h4>
                                    </div>
                                    <div className="chat-messages">
                                        {messages.length === 0 && <p className="no-messages">No messages yet. Send one to start the conversation!</p>}
                                        {messages.map((msg, index) => (
                                            <div
                                                key={index}
                                                className={`message-bubble ${msg.senderType === user.userType ? 'sent' : 'received'}`}
                                            >
                                                <div className="message-content">
                                                    <p className="sender-name">{msg.senderFullName}</p>
                                                    <p>{msg.content}</p>
                                                    <span className="timestamp">{msg.dateStamp} {msg.timeSent}</span>
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>
                                    <div className="sendChat">
                                        <input
                                            type="text"
                                            placeholder="Type to Send"
                                            value={newMessageContent}
                                            onChange={(e) => setNewMessageContent(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                        />
                                        <i onClick={sendMessage}><IoIosSend /></i>
                                    </div>
                                </>
                            ) : (
                                <div className="no-chat-selected">
                                    <h3>Select a chat to start messaging</h3>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Messages;