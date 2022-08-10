import React from 'react'
import './Header.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function Header() {
  let navigate = useNavigate()
  return (
    <header>
        <div className="logoContainer" onClick={() => navigate('/home')}>
            <p className="logoText">Dashboard</p>
        </div>
        <div className="prfileContainer" onClick = {() => navigate('/profile')}>
            <div className='logoOuter'>
                <AccountCircleIcon/>
            </div>
        </div>
    </header>
  )
}

export default Header