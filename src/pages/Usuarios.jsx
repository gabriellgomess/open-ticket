import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';

export default function Usuarios() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    phone: '',
    email: '',
    department_id: '',
    is_admin: '',
    access_level: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue;
  
    // Convert specific fields to integer
    if (['access_level', 'is_admin', 'department_id'].includes(name)) {
      finalValue = parseInt(value, 10);
    } else {
      finalValue = value;
    }
  
    setFormData((prevData) => ({ ...prevData, [name]: finalValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://chamados.nexustech.net.br/api-open-ticket/public/api/users', formData);
      console.log('User created:', response.data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Box width="400px" p={4} boxShadow="lg">
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
          <Input type="number" name="is_admin" onChange={handleChange} max={1} min={0} />
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
