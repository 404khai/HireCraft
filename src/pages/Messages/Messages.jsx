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











// import React, { useState, useEffect, useContext, useRef } from 'react';
// import './Messages4.css';
// import { IoIosSend } from "react-icons/io";
// import DashboardNav from '../../components/DashboardNav/DashboardNav';
// import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav';
// import ClientSideNav from '../../components/ClientSideNav/ClientSideNav';
// import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
// import axios from 'axios';
// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs'; // <--- THIS IS THE UPDATED IMPORT
// import { AuthContext } from '../../context/AuthContext';
// import { useSearchParams } from 'react-router-dom';

// const Messages = () => {
//     const { user } = useContext(AuthContext);
//     const images = import.meta.glob('../../assets/*', { eager: true });
//     const messagesEndRef = useRef(null);
//     const [searchParams] = useSearchParams();

//     const [currentBookingId, setCurrentBookingId] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessageContent, setNewMessageContent] = useState('');
//     const [activeChatUser, setActiveChatUser] = useState(null);
//     const [userBookings, setUserBookings] = useState([]);

//     const stompClientRef = useRef(null);

//     const getImage = (filename) => {
//         const entry = Object.entries(images).find(([key]) => key.includes(filename));
//         return entry ? entry[1].default : '';
//     };

//     // --- Fetch User Bookings (Chats) ---
//     useEffect(() => {
//         const fetchUserBookings = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const config = {
//                     headers: { Authorization: `Bearer ${token}` }
//                 };

//                 let response;
//                 if (user && user.userType === 'ROLE_CLIENT') {
//                     response = await axios.get('http://localhost:9090/api/v1/bookings/client/me', config);
//                 } else if (user && user.userType === 'ROLE_PROVIDER') {
//                     response = await axios.get('http://localhost:9090/api/v1/bookings/provider/me', config);
//                 } else {
//                     return;
//                 }
//                 setUserBookings(response.data);

//                 // --- NEW LOGIC: Check URL param first, then default to first booking ---
//                 const urlBookingId = searchParams.get('bookingId');
//                 if (urlBookingId) {
//                     const foundBooking = response.data.find(b => b.id.toString() === urlBookingId);
//                     if (foundBooking) {
//                         handleChatSelect(foundBooking.id, user.userType === 'ROLE_CLIENT' ? foundBooking.providerFullName : foundBooking.clientFullName);
//                     }
//                 } else if (response.data.length > 0 && !currentBookingId) {
//                     // If no URL param, and no chat is currently selected, select the first one
//                     handleChatSelect(response.data[0].id, user.userType === 'ROLE_CLIENT' ? response.data[0].providerFullName : response.data[0].clientFullName);
//                 }
//             } catch (error) {
//                 console.error("Error fetching user bookings:", error);
//             }
//         };

//         if (user) {
//             fetchUserBookings();
//         }
//     }, [user, searchParams]);


//     // --- Fetch Messages for the Selected Booking ---
//     const fetchMessages = async (bookingId) => {
//         if (!bookingId) return;
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get(`http://localhost:9090/api/v1/messages/booking/${bookingId}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setMessages(response.data);
//         } catch (error) {
//             console.error("Error fetching messages:", error);
//             setMessages([]);
//         }
//     };

//     // --- WebSocket Connection and Subscription ---
//     useEffect(() => {
//         if (!currentBookingId) return;

//         const connectWebSocket = () => {
//             // If a client already exists, disconnect it before creating a new one
//             if (stompClientRef.current && stompClientRef.current.connected) {
//                 stompClientRef.current.deactivate();
//             }

//             const stompClient = new Client({
//                 webSocketFactory: () => new SockJS('http://localhost:9090/ws'),
//                 // debug: (str) => { console.log(str); }, // Uncomment for debugging
//                 // reconnectDelay: 5000,
//             });

//             // Assign event handlers
//             stompClient.onConnect = (frame) => {
//                 console.log('Connected: ' + frame);
//                 // Subscribe to a topic for new messages for this booking
//                 stompClient.subscribe(`/topic/messages/${currentBookingId}`, (message) => {
//                     const receivedMessage = JSON.parse(message.body);
//                     setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//                 });
//             };

//             stompClient.onStompError = (frame) => {
//                 console.error('Broker reported error: ' + frame.headers['message']);
//                 console.error('Additional details: ' + frame.body);
//                 // You might want to attempt reconnection here or show a message to the user
//                 // setTimeout(connectWebSocket, 5000); // Attempt to reconnect after 5 seconds
//             };

//             stompClient.onDisconnect = () => {
//                 console.log('Disconnected from WebSocket');
//             };

//             // Activate the client to establish the connection
//             stompClient.activate();
//             stompClientRef.current = stompClient;
//         };

//         connectWebSocket();

//         // Cleanup function for WebSocket when component unmounts or booking changes
//         return () => {
//             if (stompClientRef.current && stompClientRef.current.connected) {
//                 stompClientRef.current.deactivate(); // Use deactivate for clean disconnect
//             }
//         };
//     }, [currentBookingId]); // Reconnect WebSocket if currentBookingId changes

//     // --- Scroll to bottom of messages ---
//     useEffect(() => {
//         if (messagesEndRef.current) {
//             messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//         }
//     }, [messages]);


//     const handleChatSelect = (bookingId, chatPartnerName) => {
//         setCurrentBookingId(bookingId);
//         setActiveChatUser(chatPartnerName);
//         fetchMessages(bookingId);
//     };

//     const sendMessage = async () => {
//         if (!newMessageContent.trim() || !currentBookingId) return;

//         const messagePayload = {
//             bookingId: currentBookingId,
//             content: newMessageContent,
//             // senderType and senderId are likely derived from your backend based on the token
//         };

//         try {
//             const token = localStorage.getItem('token');
//             await axios.post('http://localhost:9090/api/v1/messages/send', messagePayload, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setNewMessageContent('');
//         } catch (error) {
//             console.error("Error sending message:", error);
//         }
//     };

//     return (
//         <div className='messagesBox'>
//             <DashboardNav />
//             <div className='messagesBodyBox'>
//                 {user && user.userType === 'ROLE_CLIENT' ? <ClientSideNav /> : <ProviderSideNav />}
//                 <div className="messagesBody">

//                     <div className="welcome">
//                         <div className="welcomeTxt">
//                             <h2>Messages</h2>
//                         </div>
//                         <Breadcrumbs firstLink="Dashboard" link={user && user.userType === 'ROLE_CLIENT' ? "/ClientDashboard" : "/ProviderDashboard"} secondLink="Messages" link2={user && user.userType === 'ROLE_CLIENT' ? "/ClientDashboard/Messages" : "/ProviderDashboard/Messages"} />
//                     </div>

//                     <div className="messagesGroup">
//                         <div className="messagePeople">
//                             {userBookings.length === 0 && <p className="no-bookings-message">No active chats.</p>}
//                             {userBookings.map((booking) => (
//                                 <div
//                                     key={booking.id}
//                                     className={`messageUser ${currentBookingId === booking.id ? 'active-chat' : ''}`}
//                                     onClick={() => handleChatSelect(booking.id, user.userType === 'ROLE_CLIENT' ? booking.senderFullName : booking.clientFullName)}
//                                 >
//                                     <div className="messageUser-avatar">
//                                         {user.userType === 'ROLE_CLIENT' && booking.providerFullName ? booking.providerFullName.charAt(0).toUpperCase() : booking.clientFullName.charAt(0).toUpperCase()}
//                                     </div>

//                                     <div className="messageTxt">
//                                         <p>{user.userType === 'ROLE_CLIENT' ? booking.providerFullName : booking.clientFullName}</p>
//                                         <p>{booking.description.substring(0, 30)}...</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="messageChat">
//                             {currentBookingId ? (
//                                 <>
//                                     <div className="chat-header">
//                                         <h4>Chat with {activeChatUser}</h4>
//                                     </div>
//                                     <div className="chat-messages">
//                                         {messages.length === 0 && <p className="no-messages">No messages yet. Send one to start the conversation!</p>}
//                                         {messages.map((msg, index) => (
//                                             <div
//                                                 key={msg.id || index} // Use msg.id if available, otherwise index
//                                                 className={`message-bubble ${msg.senderType === user.userType ? 'sent' : 'received'}`}
//                                             >
//                                                 <div className="message-content">
//                                                     <p className="sender-name">{msg.senderFullName}</p>
//                                                     <p>{msg.content}</p>
//                                                     <span className="timestamp">{msg.dateStamp} {msg.timeSent}</span>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                         <div ref={messagesEndRef} />
//                                     </div>
//                                     <div className="sendChat">
//                                         <input
//                                             type="text"
//                                             placeholder="Type to Send"
//                                             value={newMessageContent}
//                                             onChange={(e) => setNewMessageContent(e.target.value)}
//                                             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                                         />
//                                         <i onClick={sendMessage}><IoIosSend /></i>
//                                     </div>
//                                 </>
//                             ) : (
//                                 <div className="no-chat-selected">
//                                     <h3>Select a chat to start messaging</h3>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Messages;


// import React, { useState, useEffect, useContext, useRef } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import './Messages2.css';
// import { IoIosSend } from "react-icons/io";
// import DashboardNav from '../../components/DashboardNav/DashboardNav';
// import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav';
// import ClientSideNav from '../../components/ClientSideNav/ClientSideNav';
// import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
// import axios from 'axios';
// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';
// import { AuthContext } from '../../context/AuthContext';

// const Messages = () => {
//     const { user } = useContext(AuthContext);
//     const images = import.meta.glob('../../assets/*', { eager: true });
//     const messagesEndRef = useRef(null);
//     const [searchParams] = useSearchParams();

//     const [currentBookingId, setCurrentBookingId] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessageContent, setNewMessageContent] = useState('');
//     const [activeChatUser, setActiveChatUser] = useState(null);
//     const [userBookings, setUserBookings] = useState([]);
//     const [loadingBookings, setLoadingBookings] = useState(true);
//     const [loadingMessages, setLoadingMessages] = useState(false);
//     const [bookingsError, setBookingsError] = useState(null);
//     const [messagesError, setMessagesError] = useState(null);


//     const stompClientRef = useRef(null);

//     const getImage = (filename) => {
//         const entry = Object.entries(images).find(([key]) => key.includes(filename));
//         return entry ? entry[1].default : '';
//     };

//     // Helper to get simplified user type (CLIENT or PROVIDER)
//     const getSimplifiedUserType = (userType) => {
//         if (!userType) return null;
//         return userType.replace('ROLE_', ''); // Remove "ROLE_" prefix
//     };


//     // --- Fetch User Bookings (Chats) ---
//     useEffect(() => {
//         const fetchUserBookings = async () => {
//             setLoadingBookings(true);
//             setBookingsError(null);
//             console.log("Fetching user bookings...");

//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     setBookingsError("Authentication token not found. Please log in.");
//                     setLoadingBookings(false);
//                     return;
//                 }

//                 const config = {
//                     headers: { Authorization: `Bearer ${token}` }
//                 };

//                 let response;
//                 const simplifiedUserType = getSimplifiedUserType(user?.userType); // Use simplified type for comparison
//                 console.log("User Type:", user?.userType, "Simplified User Type:", simplifiedUserType);

//                 if (user && simplifiedUserType === 'CLIENT') {
//                     response = await axios.get('http://localhost:9090/api/v1/bookings/client/me', config);
//                 } else if (user && simplifiedUserType === 'PROVIDER') {
//                     response = await axios.get('http://localhost:9090/api/v1/bookings/provider/me', config);
//                 } else {
//                     setLoadingBookings(false);
//                     return; // No user or invalid user type
//                 }
//                 setUserBookings(response.data);
//                 console.log("Fetched bookings response:", response.data);

//                 // --- Initial chat selection logic ---
//                 const urlBookingId = searchParams.get('bookingId');
//                 let initialBookingToSelect = null;

//                 if (urlBookingId) {
//                     // Try to find the booking from URL param
//                     initialBookingToSelect = response.data.find(b => b.id.toString() === urlBookingId);
//                     if (initialBookingToSelect) {
//                         console.log("Selecting chat from URL param:", initialBookingToSelect.id);
//                     } else {
//                         console.warn("Booking ID from URL not found in fetched bookings:", urlBookingId);
//                     }
//                 }

//                 // If no URL param or not found, and no current chat, select the first booking
//                 if (!initialBookingToSelect && response.data.length > 0 && !currentBookingId) {
//                     initialBookingToSelect = response.data[0];
//                     console.log("Selecting first chat by default:", initialBookingToSelect.id);
//                 }

//                 if (initialBookingToSelect) {
//                     handleChatSelect(
//                         initialBookingToSelect.id,
//                         simplifiedUserType === 'CLIENT' ? initialBookingToSelect.providerFullName : initialBookingToSelect.clientFullName
//                     );
//                 }

//             } catch (error) {
//                 console.error("Error fetching user bookings:", error.response || error.message || error);
//                 setBookingsError("Failed to load chats. Please ensure you are logged in.");
//             } finally {
//                 setLoadingBookings(false);
//             }
//         };

//         if (user) {
//             fetchUserBookings();
//         }
//     }, [user, searchParams]); // Dependency array: re-run if 'user' object or URL search params change


//     // --- Fetch Messages for the Selected Booking ---
//     const fetchMessages = async (bookingId) => {
//         if (!bookingId) {
//             setMessages([]); // Clear messages if no booking selected
//             return;
//         }
//         setLoadingMessages(true);
//         setMessagesError(null);
//         console.log(`Fetching messages for bookingId: ${bookingId}`);

//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get(`http://localhost:9090/api/v1/messages/booking/${bookingId}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setMessages(response.data);
//             console.log("Fetched messages:", response.data);
//         } catch (error) {
//             console.error(`Error fetching messages for booking ${bookingId}:`, error.response || error.message || error);
//             setMessagesError("Failed to load messages for this chat.");
//             setMessages([]); // Clear messages on error
//         } finally {
//             setLoadingMessages(false);
//         }
//     };

//     // --- WebSocket Connection and Subscription ---
//     useEffect(() => {
//         if (!currentBookingId || !user) return; // Need both booking ID and user to connect

//         const connectWebSocket = () => {
//             console.log(`Attempting to connect WebSocket for bookingId: ${currentBookingId}`);
//             // If a client already exists, disconnect it before creating a new one
//             if (stompClientRef.current && stompClientRef.current.connected) {
//                 console.log("Deactivating existing STOMP client.");
//                 stompClientRef.current.deactivate();
//             }

//             const stompClient = new Client({
//                 webSocketFactory: () => new SockJS('http://localhost:9090/ws'),
//                 // debug: (str) => { console.log(str); }, // Uncomment for debugging
//                 reconnectDelay: 5000,
//             });

//             // Assign event handlers
//             stompClient.onConnect = (frame) => {
//                 console.log('STOMP Connected: ' + frame);
//                 // Subscribe to a topic for new messages for this booking
//                 stompClient.subscribe(`/topic/messages/${currentBookingId}`, (message) => {
//                     const receivedMessage = JSON.parse(message.body);
//                     console.log("Received WebSocket message:", receivedMessage);
//                     setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//                 });
//             };

//             stompClient.onStompError = (frame) => {
//                 console.error('STOMP Broker reported error: ' + frame.headers['message']);
//                 console.error('STOMP Additional details: ' + frame.body);
//                 // No need to manually reconnect here if reconnectDelay is set
//             };

//             stompClient.onDisconnect = () => {
//                 console.log('STOMP Disconnected from WebSocket');
//             };

//             // Activate the client to establish the connection
//             stompClient.activate();
//             stompClientRef.current = stompClient;
//         };

//         connectWebSocket();

//         // Cleanup function for WebSocket when component unmounts or booking changes
//         return () => {
//             if (stompClientRef.current && stompClientRef.current.connected) {
//                 console.log("Cleaning up WebSocket connection.");
//                 stompClientRef.current.deactivate();
//             }
//         };
//     }, [currentBookingId, user]); // Reconnect WebSocket if currentBookingId or user changes

//     // --- Scroll to bottom of messages ---
//     useEffect(() => {
//         if (messagesEndRef.current) {
//             messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//         }
//     }, [messages]);


//     const handleChatSelect = (bookingId, chatPartnerName) => {
//         console.log(`Chat selected: Booking ID ${bookingId}, Partner: ${chatPartnerName}`);
//         if (currentBookingId === bookingId) {
//             // Already selected, no need to re-fetch unless explicitly desired
//             return;
//         }
//         setCurrentBookingId(bookingId);
//         setActiveChatUser(chatPartnerName);
//         fetchMessages(bookingId); // Fetch messages for the newly selected chat
//     };

//     const sendMessage = async () => {
//         if (!newMessageContent.trim() || !currentBookingId || !user) {
//             console.warn("Cannot send message: No content, no booking selected, or user not logged in.");
//             return;
//         }

//         const messagePayload = {
//             bookingId: currentBookingId,
//             content: newMessageContent,
//             // senderType and senderId are likely derived from your backend based on the token
//             // Ensure your backend correctly identifies the sender from the JWT token.
//         };
//         console.log("Attempting to send message:", messagePayload);

//         try {
//             const token = localStorage.getItem('token');
//             await axios.post('http://localhost:9090/api/v1/messages/send', messagePayload, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setNewMessageContent('');
//             // Message will be added to state via WebSocket subscription, no need to manually add it here
//         } catch (error) {
//             console.error("Error sending message:", error.response || error.message || error);
//             alert("Failed to send message. Please try again.");
//         }
//     };

//     // Dynamic Sidenav based on user type
//     const SideNavComponent = user && getSimplifiedUserType(user.userType) === 'CLIENT' ? ClientSideNav : ProviderSideNav;

//     return (
//         <div className='messagesBox'>
//             <DashboardNav />
//             <div className='messagesBodyBox'>
//                 <SideNavComponent /> {/* Dynamic SideNav */}
//                 <div className="messagesBody">

//                     <div className="welcome">
//                         <div className="welcomeTxt">
//                             <h2>Messages</h2>
//                         </div>
//                         <Breadcrumbs
//                             firstLink="Dashboard"
//                             link={user && getSimplifiedUserType(user.userType) === 'CLIENT' ? "/ClientDashboard" : "/ProviderDashboard"}
//                             secondLink="Messages"
//                             link2={user && getSimplifiedUserType(user.userType) === 'CLIENT' ? "/ClientDashboard/Messages" : "/ProviderDashboard/Messages"}
//                         />
//                     </div>

//                     <div className="messagesGroup">
//                         <div className="messagePeople">
//                             {loadingBookings && <p className="loading-message">Loading chats...</p>}
//                             {bookingsError && <p className="error-message">{bookingsError}</p>}
//                             {!loadingBookings && !bookingsError && userBookings.length === 0 && <p className="no-bookings-message">No active chats.</p>}

//                             {!loadingBookings && !bookingsError && userBookings.map((booking) => (
//                                 <div
//                                     key={booking.id}
//                                     className={`messageUser ${currentBookingId === booking.id ? 'active-chat' : ''}`}
//                                     onClick={() => handleChatSelect(
//                                         booking.id,
//                                         getSimplifiedUserType(user.userType) === 'CLIENT' ? booking.providerFullName : booking.clientFullName
//                                     )}
//                                 >
//                                     <div className="messageUser-avatar">
//                                         {getSimplifiedUserType(user.userType) === 'CLIENT' && booking.providerFullName ? booking.providerFullName.charAt(0).toUpperCase() : (booking.clientFullName ? booking.clientFullName.charAt(0).toUpperCase() : '?')}
//                                     </div>

//                                     <div className="messageTxt">
//                                         <p>{getSimplifiedUserType(user.userType) === 'CLIENT' ? booking.providerFullName : booking.clientFullName}</p>
//                                         <p>{booking.description ? booking.description.substring(0, 30) + '...' : 'No description'}</p>
//                                     </div>
//                                     {/* You had a messageBadge here, if you have unread counts, you can put it back */}
//                                     {/* <div className='messageBadge'>
//                                         <p>8</p>
//                                     </div> */}
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="messageChat">
//                             {currentBookingId ? (
//                                 <>
//                                     <div className="chat-header">
//                                         <h4>Chat with {activeChatUser || '...'}</h4>
//                                     </div>
//                                     <div className="chat-messages">
//                                         {loadingMessages && <p className="loading-message">Loading messages...</p>}
//                                         {messagesError && <p className="error-message">{messagesError}</p>}
//                                         {!loadingMessages && !messagesError && messages.length === 0 && (
//                                             <p className="no-messages">No messages yet. Send one to start the conversation!</p>
//                                         )}
//                                         {!loadingMessages && !messagesError && messages.map((msg, index) => (
//                                             <div
//                                                 key={msg.id || index} // Use msg.id if available, otherwise index
//                                                 // CRITICAL FIX: Compare simplified user type
//                                                 className={`message-bubble ${msg.senderType === getSimplifiedUserType(user.userType) ? 'sent' : 'received'}`}
//                                             >
//                                                 <div className="message-content">
//                                                     <p className="sender-name">{msg.senderFullName}</p>
//                                                     <p>{msg.content}</p>
//                                                     <span className="timestamp">{msg.dateStamp} {msg.timeSent}</span>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                         <div ref={messagesEndRef} />
//                                     </div>
//                                     <div className="sendChat">
//                                         <input
//                                             type="text"
//                                             placeholder="Type to Send"
//                                             value={newMessageContent}
//                                             onChange={(e) => setNewMessageContent(e.target.value)}
//                                             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                                             disabled={!user || loadingMessages} // Disable if not logged in or loading
//                                         />
//                                         <i onClick={sendMessage}><IoIosSend /></i>
//                                     </div>
//                                 </>
//                             ) : (
//                                 <div className="no-chat-selected">
//                                     <h3>Select a chat to start messaging</h3>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Messages;


import React, { useState, useEffect, useContext, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Messages4.css';
import { IoIosSend } from "react-icons/io";
import DashboardNav from '../../components/DashboardNav/DashboardNav';
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav';
import ClientSideNav from '../../components/ClientSideNav/ClientSideNav';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { AuthContext } from '../../context/AuthContext'; // Ensure this import is correct

const Messages = () => {
    // Destructure 'user' and 'loadingAuth' from AuthContext
    const { user, loadingAuth } = useContext(AuthContext); // Make sure AuthContext provides loadingAuth

    const images = import.meta.glob('../../assets/*', { eager: true });
    const messagesEndRef = useRef(null);
    const [searchParams] = useSearchParams();

    const [currentBookingId, setCurrentBookingId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessageContent, setNewMessageContent] = useState('');
    const [activeChatUser, setActiveChatUser] = useState(null);
    const [userBookings, setUserBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [bookingsError, setBookingsError] = useState(null);
    const [messagesError, setMessagesError] = useState(null);

    const stompClientRef = useRef(null);

    const getImage = (filename) => {
        const entry = Object.entries(images).find(([key]) => key.includes(filename));
        return entry ? entry[1].default : '';
    };

    // Helper to get simplified user type (CLIENT or PROVIDER)
    // Now uses 'userRole' which is expected from the backend
    const getSimplifiedUserRole = (userRole) => {
        if (!userRole) return null;
        return userRole.replace('ROLE_', ''); // Remove "ROLE_" prefix
    };

    // --- Fetch User Bookings (Chats) ---
    useEffect(() => {
        const fetchUserBookings = async () => {
            setLoadingBookings(true);
            setBookingsError(null);
            console.log("Messages Component: Attempting to fetch user bookings.");

            // Only proceed if AuthContext has finished loading AND user object is available
            if (loadingAuth || !user) {
                console.log("Messages Component: User not available or auth loading, skipping booking fetch.");
                setLoadingBookings(false); // Set loading to false as nothing will be fetched
                return;
            }

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setBookingsError("Authentication token not found. Please log in.");
                    setLoadingBookings(false);
                    return;
                }

                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                let response;
                // Use user.userRole which is now coming from the backend
                const simplifiedUserRole = getSimplifiedUserRole(user.userRole);
                console.log("Messages Component: User Role:", user.userRole, "Simplified User Role:", simplifiedUserRole);

                if (simplifiedUserRole === 'CLIENT') {
                    response = await axios.get('http://localhost:9090/api/v1/bookings/client/me', config);
                } else if (simplifiedUserRole === 'PROVIDER') {
                    response = await axios.get('http://localhost:9090/api/v1/bookings/provider/me', config);
                } else {
                    setBookingsError("Invalid or unrecognized user role for fetching bookings.");
                    setLoadingBookings(false);
                    return;
                }
                setUserBookings(response.data);
                console.log("Messages Component: Fetched bookings response:", response.data);

                // --- Initial chat selection logic ---
                const urlBookingId = searchParams.get('bookingId');
                let initialBookingToSelect = null;

                if (urlBookingId) {
                    initialBookingToSelect = response.data.find(b => b.id.toString() === urlBookingId);
                    if (initialBookingToSelect) {
                        console.log("Messages Component: Selecting chat from URL param:", initialBookingToSelect.id);
                    } else {
                        console.warn("Messages Component: Booking ID from URL not found in fetched bookings:", urlBookingId);
                    }
                }

                // If no URL param or not found, and no current chat, select the first booking
                if (!initialBookingToSelect && response.data.length > 0 && !currentBookingId) {
                    initialBookingToSelect = response.data[0];
                    console.log("Messages Component: Selecting first chat by default:", initialBookingToSelect.id);
                }

                if (initialBookingToSelect) {
                    handleChatSelect(
                        initialBookingToSelect.id,
                        simplifiedUserRole === 'CLIENT' ? initialBookingToSelect.providerFullName : initialBookingToSelect.clientFullName
                    );
                }

            } catch (error) {
                console.error("Messages Component: Error fetching user bookings:", error.response || error.message || error);
                setBookingsError("Failed to load chats. Please ensure you are logged in and your session is active.");
            } finally {
                setLoadingBookings(false);
            }
        };

        // This effect now depends on 'user' and 'loadingAuth' (from AuthContext)
        // It will run when 'user' becomes available/changes or when 'loadingAuth' transitions from true to false.
        if (user && !loadingAuth) { // Only run if user is available AND AuthContext has finished loading
            fetchUserBookings();
        }
    }, [user, searchParams, loadingAuth]); // Dependency array

    // --- Fetch Messages for the Selected Booking ---
    const fetchMessages = async (bookingId) => {
        if (!bookingId) {
            setMessages([]);
            return;
        }
        setLoadingMessages(true);
        setMessagesError(null);
        console.log(`Messages Component: Fetching messages for bookingId: ${bookingId}`);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                 setMessagesError("Authentication token not found. Cannot fetch messages.");
                 setLoadingMessages(false);
                 return;
            }
            const response = await axios.get(`http://localhost:9090/api/v1/messages/booking/${bookingId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(response.data);
            console.log("Messages Component: Fetched messages:", response.data);
        } catch (error) {
            console.error(`Messages Component: Error fetching messages for booking ${bookingId}:`, error.response || error.message || error);
            setMessagesError("Failed to load messages for this chat.");
            setMessages([]);
        } finally {
            setLoadingMessages(false);
        }
    };

    // --- WebSocket Connection and Subscription ---
    useEffect(() => {
        // Condition now checks for user and currentBookingId, and ensures AuthContext is not loading
        if (!currentBookingId || !user || loadingAuth) {
            console.log("Messages Component: Skipping WebSocket connect (no booking, no user, or auth still loading).");
            return;
        }

        const connectWebSocket = () => {
            console.log(`Messages Component: Attempting to connect WebSocket for bookingId: ${currentBookingId}`);
            if (stompClientRef.current && stompClientRef.current.connected) {
                console.log("Messages Component: Deactivating existing STOMP client.");
                stompClientRef.current.deactivate();
            }

            const stompClient = new Client({
                webSocketFactory: () => new SockJS('http://localhost:9090/ws'),
                // debug: (str) => { console.log(str); },
                reconnectDelay: 5000,
            });

            stompClient.onConnect = (frame) => {
                console.log('Messages Component: STOMP Connected: ' + frame);
                stompClient.subscribe(`/topic/messages/${currentBookingId}`, (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    console.log("Messages Component: Received WebSocket message:", receivedMessage);
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                });
            };

            stompClient.onStompError = (frame) => {
                console.error('Messages Component: STOMP Broker reported error: ' + frame.headers['message']);
                console.error('Messages Component: STOMP Additional details: ' + frame.body);
            };

            stompClient.onDisconnect = () => {
                console.log('Messages Component: STOMP Disconnected from WebSocket');
            };

            stompClient.activate();
            stompClientRef.current = stompClient;
        };

        connectWebSocket();

        return () => {
            if (stompClientRef.current && stompClientRef.current.connected) {
                console.log("Messages Component: Cleaning up WebSocket connection.");
                stompClientRef.current.deactivate();
            }
        };
    }, [currentBookingId, user, loadingAuth]); // Add loadingAuth to dependencies

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleChatSelect = (bookingId, chatPartnerName) => {
        console.log(`Messages Component: Chat selected: Booking ID ${bookingId}, Partner: ${chatPartnerName}`);
        if (currentBookingId === bookingId) {
            return;
        }
        setCurrentBookingId(bookingId);
        setActiveChatUser(chatPartnerName);
        fetchMessages(bookingId);
    };

    const sendMessage = async () => {
        if (!newMessageContent.trim() || !currentBookingId || !user) {
            console.warn("Messages Component: Cannot send message: No content, no booking selected, or user not logged in.");
            return;
        }

        const messagePayload = {
            bookingId: currentBookingId,
            content: newMessageContent,
        };
        console.log("Messages Component: Attempting to send message:", messagePayload);

        try {
            const token = localStorage.getItem('token');
             if (!token) {
                 alert("You are not authenticated to send messages.");
                 return;
            }
            await axios.post('http://localhost:9090/api/v1/messages/send', messagePayload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNewMessageContent('');
        } catch (error) {
            console.error("Messages Component: Error sending message:", error.response?.data || error.message || error);
            alert("Failed to send message. Please try again.");
        }
    };

    // --- Conditional Rendering for Loading and User Status ---
    // Show loading spinner or message while AuthContext is determining user status
    if (loadingAuth) {
        return (
            <div className='messagesBox'>
                <DashboardNav />
                <div className='messagesBodyBox' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
                    <p>Loading user session and authentication status...</p>
                    {/* You might add a spinner here */}
                </div>
            </div>
        );
    }

    // If AuthContext finished loading and no user is found (not logged in)
    if (!user) {
        return (
            <div className='messagesBox'>
                <DashboardNav />
                <div className='messagesBodyBox' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
                    <p>Please log in to view your messages.</p>
                    {/* Optionally, add a link to the login page */}
                </div>
            </div>
        );
    }

    // Dynamic Sidenav based on user role from backend
    // Use user.userRole directly now
    const userSimplifiedRole = getSimplifiedUserRole(user.userRole);
    const SideNavComponent = userSimplifiedRole === 'CLIENT' ? ClientSideNav : ProviderSideNav;


    return (
        <div className='messagesBox'>
            <SideNavComponent />
            <div className='messagesBodyBox'>
                < DashboardNav/> {/* Dynamic SideNav */}
                <div className="messagesBody">

                    <div className="welcome">
                        <div className="welcomeTxt">
                            <h2>Messages</h2>
                        </div>
                        <Breadcrumbs
                            firstLink="Dashboard"
                            // Use userSimplifiedRole here
                            link={userSimplifiedRole === 'CLIENT' ? "/ClientDashboard" : "/ProviderDashboard"}
                            secondLink="Messages"
                            // Use userSimplifiedRole here
                            link2={userSimplifiedRole === 'CLIENT' ? "/ClientDashboard/Messages" : "/ProviderDashboard/Messages"}
                        />
                    </div>

                    <div className="messagesGroup">
                        <div className="messagePeople">
                            {loadingBookings && <p className="loading-message">Loading chats...</p>}
                            {bookingsError && <p className="error-message">{bookingsError}</p>}
                            {!loadingBookings && !bookingsError && userBookings.length === 0 && <p className="no-bookings-message">No active chats.</p>}

                            {!loadingBookings && !bookingsError && userBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className={`messageUser ${currentBookingId === booking.id ? 'active-chat' : ''}`}
                                    onClick={() => handleChatSelect(
                                        booking.id,
                                        // Use userSimplifiedRole here
                                        userSimplifiedRole === 'CLIENT' ? booking.providerFullName : booking.clientFullName
                                    )}
                                >
                                    <div className="messageUser-avatar">
                                        {/* Use userSimplifiedRole here */}
                                        <img src={booking.profilePictureUrl} alt="" />
                                        {/* {userSimplifiedRole === 'CLIENT' && booking.providerFullName ? booking.providerFullName.charAt(0).toUpperCase() : (booking.clientFullName ? booking.clientFullName.charAt(0).toUpperCase() : '?')} */}
                                    </div>

                                    <div className="messageTxt">
                                        {/* Use userSimplifiedRole here */}
                                        <p>{userSimplifiedRole === 'CLIENT' ? booking.providerFullName : booking.clientFullName}</p>
                                        <p>{booking.description ? booking.description.substring(0, 30) + '...' : 'No description'}</p>
                                    </div>

                                    {/* <div className="messageTxt">
                                        <p>{userSimplifiedRole === 'CLIENT' ? booking.providerFullName : booking.clientFullName}</p>
                                        <p>
                                            {booking.latestMessage?.content
                                            ? booking.latestMessage.content.length > 30
                                                ? booking.latestMessage.content.substring(0, 30) + '...'
                                                : booking.latestMessage.content
                                            : 'No messages yet'}
                                        </p>
                                    </div> */}
                                </div>
                            ))}
                        </div>

                        <div className="messageChat">
                            {currentBookingId ? (
                                <>
                                    <div className="chat-header">
                                        <button class="deleteBtn">
                                            <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                                        </button>
                                        {/* <h4>Chat with {activeChatUser || '...'}</h4> */}
                                    </div>
                                    <div className="chat-messages">
                                        {loadingMessages && <p className="loading-message">Loading messages...</p>}
                                        {messagesError && <p className="error-message">{messagesError}</p>}
                                        {!loadingMessages && !messagesError && messages.length === 0 && (
                                            <p className="no-messages">No messages yet. Send one to start the conversation!</p>
                                        )}
                                        {!loadingMessages && !messagesError && messages.map((msg, index) => (
                                            <div
                                                key={msg.id || index}
                                                // CRITICAL FIX: Compare simplified user type
                                                // Assuming msg.senderType also comes as "CLIENT" or "PROVIDER" from backend messages
                                                className={`message-bubble ${msg.senderType === userSimplifiedRole ? 'sent' : 'received'}`}
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
                                            disabled={!user || loadingMessages}
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