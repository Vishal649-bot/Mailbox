import  { useState } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import NavBar from '../components/Navbar';

const Compose = () => {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const loggedInEmail = localStorage.getItem('email');

    const handleToChange = (event) => {
        setTo(event.target.value);
    };

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleContentChange = (value) => {
        setContent(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const emailData = {
            to: to,
            subject: subject,
            content: content,
            email: loggedInEmail
        };
        try {
            await axios.post('https://mail-box-8b3cd-default-rtdb.firebaseio.com/emails.json', emailData);
            console.log('Email sent successfully.');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <div>
            <NavBar />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="to">To:</label>
                    <input
                        type="text"
                        id="to"
                        value={to}
                        onChange={handleToChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={handleSubjectChange}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <JoditEditor
                        value={content}
                        onChange={handleContentChange}
                    />
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Compose;
