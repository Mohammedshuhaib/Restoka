
import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Form from './pages/Form';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={<Form/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
