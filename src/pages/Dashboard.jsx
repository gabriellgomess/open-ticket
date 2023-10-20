import React, { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Box, Flex, Button, Spacer } from "@chakra-ui/react";
import { MyContext } from '../contexts/MyContext';

import OpenTicket from './OpenTicket';
import Estatistics from './Estatistics';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTableList, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const { rootState, logoutUser } = useContext(MyContext);
    const { isAuth, theUser } = rootState;

    return (
        <Flex>
            <Flex
                as="nav"
                direction="column"
                pos="fixed"
                top="0"
                left="0"
                zIndex="1"
                h="full"
                w="200px"
                bg="teal.500"
                p="5"
            >
                <Box>
                    {theUser && theUser.name ?
                        <p style={{ color: "white" }}>Olá {theUser.name}</p> :
                        <p style={{ color: "white" }}>Olá</p>
                    }
                  
                    <Link style={{ color: 'white', marginBottom: '5px', display: 'block' }} to="/dashboard/open-ticket"><FontAwesomeIcon icon={faPlus} /> Open Ticket</Link>
                    <Link style={{ color: 'white', marginBottom: '5px', display: 'block' }} to="/dashboard/estatistics"><FontAwesomeIcon icon={faTableList} /> Estatistics</Link>

                </Box>
                <Spacer />
                <Button colorScheme="blackAlpha" onClick={logoutUser}>Sair <FontAwesomeIcon style={{marginLeft: "5px"}} icon={faArrowRightFromBracket} /></Button>
            </Flex>
            <Box ml="200px" p="5" w="full">
                <Routes>
                    <Route index element={<h1>Dashboard Home</h1>} />
                    <Route path="open-ticket" element={<OpenTicket />} />
                    <Route path="estatistics" element={<Estatistics />} />
                </Routes>
            </Box>
        </Flex>
    );
};

export default Dashboard;
