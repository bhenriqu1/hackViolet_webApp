import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthContext from './Components/AuthContext';

const AppWrapper = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value = {{loggedIn, setLoggedIn}}>
      <App/>
    </AuthContext.Provider>
  )
}
ReactDOM.render(
  <AppWrapper />,
  document.getElementById('root')
);
