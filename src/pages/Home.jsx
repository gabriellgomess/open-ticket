import {useContext, useEffect} from 'react'
import {MyContext} from '../contexts/MyContext'
import {useNavigate} from 'react-router-dom'

// Importing the Login & Register Component
import Login from '../components/Login'
import Register from '../components/Register'

import { Box } from '@chakra-ui/react'

function Home(){

    const {rootState} = useContext(MyContext);
    const {isAuth,showLogin} = rootState;

    // Hook from react-router-dom
    const navigate = useNavigate();

    useEffect(() => {
      // If user Logged in
      if(isAuth)
      {
          // Navigate to Dashboard
          navigate(`${import.meta.env.VITE_REACT_APP_PATH}/dashboard`);
      }
    }, [isAuth, navigate]);

    // Showing Login Or Register Page According to the condition
    if(showLogin){
        return (
            <Box width="100%" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">                
                <Login/>
            </Box>
        
        );
    }
    else{
        return (
            <Box width="100%" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">                
               <Register/> 
            </Box>
        
        );
    }
}

export default Home;
