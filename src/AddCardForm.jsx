import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const AddCardForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [title, setTitle] = useState('');
    // const [email, setEmail] = useState('');
    // const [phone, setPhone] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleCompanyChange = (event) => {
        setCompany(event.target.value);
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      const token = Cookies.get('token');
      console.log(token);
        
      try {
          const response = await axios.post('http://localhost/api/createCard', {
              name: name,
              company: company,
              title: title,
            //   email: email,
            //   phone: phone
          }, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
  
          console.log('Card added successfully!');
          console.log(response.data);
  
          navigate("/cards");
      } catch (error) {
          console.error('Error:', error);
      }
  }
  

    return (
        <div>
            <h2>Add New Card</h2>
            <form onSubmit={handleSubmit} className='login-form'>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={name} 
                        onChange={handleNameChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input 
                        type="text" 
                        id="company" 
                        name="company" 
                        value={company} 
                        onChange={handleCompanyChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={title} 
                        onChange={handleTitleChange} 
                        required 
                    />
                </div>
                <button type="submit">Add Card</button>
            </form>
        </div>
    );
}

export default AddCardForm;
