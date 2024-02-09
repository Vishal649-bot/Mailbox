import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar';
import '../style/inbox.css';

const Inbox = () => {
    const [emails, setEmails] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const loggedInEmail = localStorage.getItem('email');

    // Function to fetch emails from the backend API
    const fetchEmails = async () => {
        try {
            const response = await axios.get("https://mail-box-8b3cd-default-rtdb.firebaseio.com/emails.json");
            const data = response.data || {};
            const emailList = Object.entries(data).map(([id, email]) => ({ id, ...email }));
            setEmails(emailList);
        } catch (error) {
            console.error('Error fetching emails:', error);
        }
    };

    useEffect(() => {
        // Fetch emails initially when the component mounts
        fetchEmails();

        // Set up interval to fetch emails every 2 seconds
        const intervalId = setInterval(fetchEmails, 7000);

        // Clear interval on component unmount to prevent memory leaks
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        // Calculate the unread count based on fetched emails
        const unread = emails.filter(email => !email.read && email.to === loggedInEmail).length;
        setUnreadCount(unread);
    }, [emails, loggedInEmail]);

    const markAsRead = async (id) => {
        try {
            await axios.patch(`https://mail-box-8b3cd-default-rtdb.firebaseio.com/emails/${id}.json`, { read: true });
            const updatedEmails = emails.map(email => {
                if (email.id === id) {
                    return { ...email, read: true };
                }
                return email;
            });
            setEmails(updatedEmails);
        } catch (error) {
            console.error('Error marking email as read:', error);
        }
    };

    const deleteEmail = async (id) => {
        try {
            await axios.delete(`https://mail-box-8b3cd-default-rtdb.firebaseio.com/emails/${id}.json`);
            const updatedEmails = emails.filter(email => email.id !== id);
            setEmails(updatedEmails);
        } catch (error) {
            console.error('Error deleting email:', error);
        }
    };

    return (
        <div>
            <NavBar />
            <div className='inbox-container'>
                <div className="unread-count">{unreadCount} Unread</div>
                {emails.map(email => (
                    email.to === loggedInEmail && (
                        <div key={email.id} className={`email-item ${email.read ? 'read' : 'unread'}`} onClick={() => markAsRead(email.id)}>
                            <Link to={`/Inbox/${email.id}`}>
                                <p className='email-sender'>From: {email.email}</p>
                                <h3 className='email-subject'>Subject: {email.subject}</h3>
                                <hr className='email-divider' />
                                {!email.read && <div className="blue-dot"></div>}
                            </Link>
                            <button onClick={() => deleteEmail(email.id)}>Delete</button>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Inbox;
