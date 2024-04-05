import { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios'; 
function UpdateCard() {
  const { state } = useLocation();
  const cardData = state ? state.cardData : null;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: cardData ? cardData.name : '',
    company: cardData ? cardData.company : '',
    title: cardData ? cardData.title : '',
    email: cardData ? cardData.email : '',
    phone: cardData ? cardData.phone : ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = Cookies.get('token');
    const { id } = cardData; // Extract card ID from cardData

    // Send request to update card data
    axios.post(`http://localhost/api/updateCard/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
     
      navigate('/Cards',response);
     
    })
    .catch(error => {
     
      console.error('Error updating card:', error);
    });
  };


  return (
    <div className="update-card-container">
      <h2>Update Card</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Company:</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} />
        </div>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateCard;
