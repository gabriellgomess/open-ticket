import React, { useContext, useState } from "react";
import { MyContext } from "../contexts/MyContext";
import { Card, CardBody, Box, Input, Button, useToast, Heading } from '@chakra-ui/react'


function Register() {
  const { toggleNav, registerUser } = useContext(MyContext);
  const initialState = {
    userInfo: {
      name: "",
      email: "",
      password: "",
    },
    errorMsg: "",
    successMsg: "",
  };
  const [state, setState] = useState(initialState);
  const toast = useToast()

  // On Submit the Registration Form
  const submitForm = async (event) => {
    event.preventDefault();
    const data = await registerUser(state.userInfo);
    if (data.success) {
      setState({
        ...initialState,
        successMsg: data.message,
      });
    } else {
      setState({
        ...state,
        successMsg: "",
        errorMsg: data.message,
      });
    }
  };

  // On change the Input Value (name, email, password)
  const onChangeValue = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  if (state.errorMsg) {

    toast({
      title: state.errorMsg,
      status: "error",
      isClosable: true,
    });
  }
  if (state.successMsg) {
    toast({
      title: state.successMsg,
      status: "success",
      isClosable: true,
    });
  }

  return (
    <Card w="500px">
      <CardBody>
        <Heading as='h3' size='lg' mb={4}>          
          Cadastro de usuário
        </Heading>
        <form onSubmit={submitForm} noValidate>
          <Box display="flex" flexDirection="column" gap={3}>
            <Input placeholder='Nome Completo' name="name" type="text" value={state.userInfo.name} onChange={onChangeValue} />
            <Input placeholder='Email' name="email" type="email" value={state.userInfo.email} onChange={onChangeValue} />
            <Input placeholder='Senha' name="password" type="password" value={state.userInfo.password} onChange={onChangeValue} />

            <Button type="submit" colorScheme='teal' size='md'>
              Cadastrar
            </Button>
          </Box>
        </form>
        
          <Button w="100%" mt="10px" onClick={toggleNav}>Entrar</Button>
        
      </CardBody>
    </Card>
  );
}

export default Register;
