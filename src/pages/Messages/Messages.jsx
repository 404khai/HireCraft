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
import ClientSideNav from '../../components/ClientSideNav/ClientSideNav'; // Assuming you might use this
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { AuthContext } from '../../context/AuthContext'; // Assuming AuthContext provides user role or ID

const Messages = () => {
    const { user } = useContext(AuthContext); // Get user info from context to determine senderType (Client/Provider)
    const images = import.meta.glob('../../assets/*', { eager: true });
    const messagesEndRef = useRef(null); // Ref for auto-scrolling chat

    const [currentBookingId, setCurrentBookingId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessageContent, setNewMessageContent] = useState('');
    const [activeChatUser, setActiveChatUser] = useState(null); // To display the name of the person you're chatting with
    const [userBookings, setUserBookings] = useState([]); // To store the list of bookings for the user

    const stompClientRef = useRef(null); // Ref to store the STOMP client instance

    const getImage = (filename) => {
        const entry = Object.entries(images).find(([key]) => key.includes(filename));
        return entry ? entry[1].default : '';
    };

    // --- Fetch User Bookings (Chats) ---
    // This will fetch all bookings a user (client or provider) has,
    // which then serve as the list of available chats.
    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                // You'll need an endpoint to get bookings for the logged-in user.
                // This is a placeholder; adjust the URL and logic based on your backend.
                // Assuming client/provider can see their respective bookings.
                const token = localStorage.getItem('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                let response;
                if (user && user.userType === 'CLIENT') {
                    // Example: endpoint to get client's bookings
                    response = await axios.get('http://localhost:9090/api/v1/bookings/client/me', config);
                } else if (user && user.userType === 'PROVIDER') {
                    // Example: endpoint to get provider's bookings
                    response = await axios.get('http://localhost:9090/api/v1/bookings/provider/me', config);
                } else {
                    return; // Or handle unauthorized access
                }
                setUserBookings(response.data);
                if (response.data.length > 0 && !currentBookingId) {
                    // Automatically select the first booking if available
                    handleChatSelect(response.data[0].id, response.data[0].providerFullName || response.data[0].clientFullName);
                }
            } catch (error) {
                console.error("Error fetching user bookings:", error);
                // Handle error (e.g., show a toast)
            }
        };

        if (user) { // Only fetch if user is logged in
            fetchUserBookings();
        }
    }, [user, currentBookingId]); // Refetch if user changes or if currentBookingId is not set initially


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
            setMessages([]); // Clear messages on error
            // Handle error (e.g., show a toast)
        }
    };

    // --- WebSocket Connection and Subscription ---
    useEffect(() => {
        if (!currentBookingId) return;

        const connectWebSocket = () => {
            const socket = new SockJS('http://localhost:9090/ws'); // Your WebSocket endpoint
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, (frame) => {
                console.log('Connected: ' + frame);
                // Subscribe to a topic for new messages for this booking
                stompClient.subscribe(`/topic/messages/${currentBookingId}`, (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                });
            }, (error) => {
                console.error("WebSocket connection error:", error);
                // Handle reconnection logic here if needed
                setTimeout(connectWebSocket, 5000); // Attempt to reconnect after 5 seconds
            });

            stompClientRef.current = stompClient;
        };

        connectWebSocket();

        // Cleanup function for WebSocket when component unmounts or booking changes
        return () => {
            if (stompClientRef.current && stompClientRef.current.connected) {
                stompClientRef.current.disconnect(() => {
                    console.log('Disconnected from WebSocket');
                });
            }
        };
    }, [currentBookingId]); // Reconnect WebSocket if currentBookingId changes

    // --- Scroll to bottom of messages ---
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]); // Scroll whenever messages update


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
            // You might need to add senderType and senderId here if your backend doesn't derive it from the token
            // senderType: user.userType, // Example
            // senderId: user.id, // Example
        };

        try {
            const token = localStorage.getItem('token');
            // Sending via REST API first, then backend should push to WebSocket
            await axios.post('http://localhost:9090/api/v1/messages/send', messagePayload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNewMessageContent(''); // Clear input after sending
            // The message will be added to state via WebSocket subscription,
            // so no need to manually add it here unless you want immediate local update.
            // If you want immediate local update without waiting for WebSocket, you can do:
            // setMessages((prevMessages) => [...prevMessages, {
            //     senderType: user.userType,
            //     senderFullName: user.fullName, // Assuming user has fullName
            //     content: newMessageContent,
            //     dateStamp: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            //     timeSent: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            // }]);

        } catch (error) {
            console.error("Error sending message:", error);
            // Handle error (e.g., show a toast)
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
                        <Breadcrumbs firstLink="Dashboard" link={user && user.userType === 'CLIENT' ? "/ClientDashboard" : "/ProviderDashboard"} secondLink="Messages" link2={user && user.userType === 'CLIENT' ? "/ClientDashboard/Messages" : "/ProviderDashboard/Messages"} />
                    </div>

                    <div className="messagesGroup">
                        <div className="messagePeople">
                            {userBookings.length === 0 && <p className="no-bookings-message">No active chats.</p>}
                            {userBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className={`messageUser ${currentBookingId === booking.id ? 'active-chat' : ''}`}
                                    onClick={() => handleChatSelect(booking.id, user.userType === 'CLIENT' ? booking.providerFullName : booking.clientFullName)}
                                >
                                    {/* You'll need to figure out how to get the image for the other user */}
                                    {/* <img src={getImage(message.image)} alt="" /> */}
                                    <div className="messageUser-avatar">
                                        {/* Placeholder for avatar initials or generic icon */}
                                        {user.userType === 'CLIENT' && booking.providerFullName ? booking.providerFullName.charAt(0).toUpperCase() : booking.clientFullName.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="messageTxt">
                                        <p>{user.userType === 'CLIENT' ? booking.providerFullName : booking.clientFullName}</p>
                                        {/* You might want to display the last message here if available in booking data */}
                                        <p>{booking.description.substring(0, 30)}...</p>
                                    </div>

                                    {/* Badge for unread messages - requires backend support */}
                                    {/* <div className='messageBadge'>
                                        <p>8</p>
                                    </div> */}
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
                                        <div ref={messagesEndRef} /> {/* For auto-scrolling */}
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