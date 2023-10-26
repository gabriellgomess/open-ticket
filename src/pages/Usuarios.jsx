import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import axios from 'axios';

export default function Usuarios() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    phone: '',
    email: '',
    department_id: '',
    is_admin: false,
    access_level: '',
  });
  const [feedback, setFeedback] = useState({ status: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue;
  
    if (name === 'is_admin') {
      finalValue = value === "1";
    } else if (['access_level', 'department_id'].includes(name)) {
      finalValue = parseInt(value, 10);
    } else {
      finalValue = value;
    }
  
    setFormData((prevData) => ({ ...prevData, [name]: finalValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = {
      ...formData,
      is_admin: formData.is_admin ? 1 : 0
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/lrv-chamados-api/public/api/register`, sendData);
      setFeedback({ status: 'success', message: response.data.message });
    } catch (error) {
      setFeedback({ status: 'error', message: 'Error creating user.' });
      console.error('Error creating user:', error);
    }
  };

  return (
    <Box width="400px" p={4} boxShadow="lg">
      {feedback.status && (
        <Alert status={feedback.status} borderRadius={4} mb={4}>
          <AlertIcon />
          {feedback.message}
        </Alert>
      )}
      <VStack as="form" spacing="4" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input type="tel" name="phone" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Department ID</FormLabel>
          <Input type="number" name="department_id" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Is Admin?</FormLabel>
          <Input type="checkbox" name="is_admin" onChange={e => handleChange({ target: { name: e.target.name, value: e.target.checked ? "1" : "0" } })} />
        </FormControl>
        <FormControl>
          <FormLabel>Access Level</FormLabel>
          <Input type="number" name="access_level" onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Create User
        </Button>
      </VStack>
    </Box>
  );
}
