import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Alert,
  AlertIcon,
  Switch,
  Select
} from '@chakra-ui/react';
import axios from 'axios';
import areas from '../utils/areas.json'

export default function Usuarios() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    password_confirmation: "",
    phone: '',
    email: '',
    department_id: '',
    is_admin: false,
    access_level: '',
  });
  const [feedback, setFeedback] = useState({ status: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'is_admin') {
      setFormData((prevData) => ({ ...prevData, is_admin: value === "1" }));
    } else if (['access_level'].includes(name)) {
      setFormData((prevData) => ({ ...prevData, [name]: parseInt(value, 10) || "" }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = {
      ...formData,
      is_admin: formData.is_admin ? 1 : 0,
      access_level: parseInt(formData.access_level, 10)
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
          <Input type="password" name="password" onChange={handleChange} autocomplete="off" />
        </FormControl>
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" name="password_confirmation" onChange={handleChange} autocomplete="off" />
        </FormControl>
        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input type="tel" name="phone" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" onChange={handleChange} autocomplete="off" />
        </FormControl>
        <Select name="department_id" id='department_id' onChange={handleChange}>
          {areas.map((area) => (
            <option key={area.id} value={area.nome}>
              {area.nome}
            </option>
          ))}
        </Select> 
        <FormControl display='flex' alignItems='center'>
            <FormLabel htmlFor='isAdmin' mb='0'>
                Is Admin?
            </FormLabel>
            <Switch 
                id='is_admin'
                name="is_admin"
                isChecked={formData.is_admin}
                onChange={e => handleChange({ 
                    target: { 
                        name: e.target.name, 
                        value: e.target.checked ? "1" : "0" 
                    } 
                })}
            />
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
