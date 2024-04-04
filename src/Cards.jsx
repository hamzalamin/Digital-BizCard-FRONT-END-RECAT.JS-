import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import navigate from React Router DOM

function Cards() {
  const [cardsData, setCardsData] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = () => {
      const token = Cookies.get('token');
      axios.get('http://localhost/api/getCards', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const fetchedCardsData = response.data;
        setCardsData(fetchedCardsData); 
      })
      .catch(error => {
        console.error('Error fetching cards:', error);
      });
    };

    fetchCards(); 
  }, []); 

  const handleUpdate = (card) => {
    // Navigate to update page with card data
    navigate('/update_card', { state: { cardData: card } });
  };

  const handleDelete = (cardId) => {
    const token = Cookies.get('token');
    axios.delete(`http://localhost/api/delete_card/${cardId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Card deleted successfully',response);
      setCardsData(cardsData.filter(card => card.id !== cardId));
    })
    .catch(error => {
      console.error('Error deleting card:', error);
    });
  };

  return (
    <div className="cards-container">
      <div>
        <Link to="/create_card">
          <button className='btn'>Create</button>
        </Link>
      </div>
      <table className="cards-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Title</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cardsData.map((card, index) => (
            <tr key={index}>
              <td>{card.name}</td>
              <td>{card.company}</td>
              <td>{card.title}</td>
              <td>{card.email}</td>
              <td>{card.phone}</td>
              <td>
                <button onClick={() => handleUpdate(card)}>Update</button>
                <button onClick={() => handleDelete(card.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cards;
