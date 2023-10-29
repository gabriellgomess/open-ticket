import { useContext, useState, useEffect } from "react";
import { MyContext } from "../contexts/MyContext";
import { Card, CardBody, Box, Input, InputGroup, InputRightElement, Button, useToast, Heading } from '@chakra-ui/react'


function Login() {
  const { loginUser, isLoggedIn, toggleNav } = useContext(MyContext);
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const toast = useToast()

  const initialState = {
    userInfo: {
      email: "",
      password: "",
    },
    errorMsg: "",
    successMsg: "",
  };

  const [state, setState] = useState(initialState);

  const onChangeValue = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const data = await loginUser(state.userInfo);
    if (data.success) {
        setState({
            ...initialState,
        });
        toast({
            title: "Logged in successfully",
            status: "success",
            isClosable: true,
        });
    } else {
        setState({
            ...state,
            successMsg: "",
            errorMsg: data.message,
        });
    }
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
          Login
        </Heading>
        <form onSubmit={submitForm} noValidate>
          <Box display="flex" flexDirection="column" gap={3}>
            <Input placeholder='Email' name="email" type="email" value={state.userInfo.email} onChange={onChangeValue} />
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Digite a senha'
                name="password"
                value={state.userInfo.password}
                onChange={onChangeValue}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Ocultar' : 'Mostrar'}
                </Button>
              </InputRightElement>
            </InputGroup>           
            <Button type="submit" colorScheme='teal' size='md'>
              Entrar
            </Button>
            {/* <Button onClick={toggleNav}>
            Cadastrar
          </Button> */}
          </Box>
        </form>
      </CardBody>
    </Card>

  );
}

export default Login;
