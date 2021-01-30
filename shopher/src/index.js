import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthContext from './components/AuthContext';

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
