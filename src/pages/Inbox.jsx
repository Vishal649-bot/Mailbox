import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar';
import '../style/inbox.css';

const Inbox = () => {
    const [emails, setEmails] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const loggedInEmail = localStorage.getItem('email');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://mail-box-8b3cd-default-rtdb.firebaseio.com/emails.json");
                const data = response.data || {};
                const emailList = Object.entries(data).map(([id, email]) => ({ id, ...email }));
                setEmails(emailList);
            } catch (error) {
                console.error('Error fetching emails:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
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

    return (
        <div>
            <NavBar />
            <div className='inbox-container'>
                <div className="unread-count">{unreadCount} Unread</div>
                {emails.map(email => (
                    email.to === loggedInEmail && (
                        <Link to={`/Inbox/${email.id}`} key={email.id}>
                            <div className={`email-item ${email.read ? 'read' : 'unread'}`} onClick={() => markAsRead(email.id)}>
                                <p className='email-sender'>From: {email.email}</p>
                                <h3 className='email-subject'>Subject: {email.subject}</h3>
                                <hr className='email-divider' />
                                {!email.read && <div className="blue-dot"></div>}
                            </div>
                        </Link>
                    )
                ))}
            </div>
        </div>
    );
};

export default Inbox;
