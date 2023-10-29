import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../contexts/MyContext";
import { Card, CardBody, Box, Input, Button, useToast, Heading } from '@chakra-ui/react'

function Register() {
  const { toggleNav, registerUser } = useContext(MyContext);
  const initialState = {
    userInfo: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "", // add password confirmation field
      phone: "",
      department_id: "",
      is_admin: false,
      access_level: ""
    },
    errorMsg: "",
    successMsg: "",
  };
  const [state, setState] = useState(initialState);
  const toast = useToast()

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

  const onChangeValue = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  useEffect(() => {
    if (state.errorMsg) {
      toast({
        title: state.errorMsg,
        status: "error",
        isClosable: true,
      });
      setState({ ...state, errorMsg: "" });
    }
    if (state.successMsg) {
      toast({
        title: state.successMsg,
        status: "success",
        isClosable: true,
      });
      setState({ ...state, successMsg: "" });
    }
  }, [state]);

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
            <Input placeholder='Confirmar Senha' name="password_confirmation" type="password" value={state.userInfo.password_confirmation} onChange={onChangeValue} />

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
