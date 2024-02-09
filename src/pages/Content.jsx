import { Link, useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';
import axios from 'axios';
import NavBar from '../components/Navbar';
import HTMLComponent from '../components/HTMLCOMPONENT';
const Content = () => {
   const {content} =  useParams()
//    console.log(content);
   const [data, setData] = useState([]);

   useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("https://mail-box-8b3cd-default-rtdb.firebaseio.com/emails.json/");
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching emails:', error);
        }
    };
    fetchData();
   }, [])
   
  return (
    <div>
       <NavBar/>

       {Object.keys(data).map((props,idx) => {
                const emailData = data[props];
                console.log('====================================');
                console.log(props);
                console.log('====================================');
                // Add filter based on the 'to' field
                if (content === props) {
                    return (
                        
                        <div className='email-item' key={props}> 
                            <p className='email-sender'>From: {emailData.email}</p> 
                            <h3 className='email-subject'>Subject- {emailData.subject}</h3> 
                            <hr />
                           <HTMLComponent htmlString={emailData.content} /> 
                            <hr className='email-divider' /> 
                        </div>
                       
                    );
                } else {
                    return null; 
                }
            })}
    </div>
  )
}

export default Content
