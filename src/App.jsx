
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navebar from './Navebar'; 
import Cards from './Cards';
import AddCardForm from './AddCardForm';
import Home from './Home';
import Login from './login';
import Register from './register';
import UpdateCard from './UpdateCard';

function App() {
  return (
    <Router>
      <div>
        <Navebar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Cards" element={<Cards />} />
          <Route exact path="/create_card" element={<AddCardForm />} />
          <Route exact path="/update_card" element={<UpdateCard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
