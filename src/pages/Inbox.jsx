import axios from 'axios';
import { useEffect, useState } from 'react';
import HTMLComponent from '../components/HTMLCOMPONENT';
import NavBar from '../components/Navbar';
import '../style/inbox.css'
import { Link } from 'react-router-dom';
const Inbox = () => {
    const [data, setData] = useState([]);
    const loggedInEmail = localStorage.getItem('email'); // Assuming you stored the logged-in user's email in localStorage

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://mail-box-8b3cd-default-rtdb.firebaseio.com/emails.json/");
                // console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching emails:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
        <NavBar/>
        <div className='inbox-container'>
        
            {Object.keys(data).map((props,idx) => {
                const emailData = data[props];
                console.log('====================================');
                console.log(props);
                console.log('====================================');
                // Add filter based on the 'to' field
                if (emailData.to === loggedInEmail) {
                    return (
                        <Link to={props} key={idx}>
                        <div className='email-item' key={props}> 
                            <p className='email-sender'>From: {emailData.email}</p> 
                            <h3 className='email-subject'>Subject-{emailData.subject}</h3> 
                            <hr className='email-divider' /> 
                        </div>
                        </Link>
                    );
                } else {
                    return null; 
                }
            })}
        </div>
        </div>
    );      
};

export default Inbox;
