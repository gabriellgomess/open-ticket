import React, { useState, useContext } from "react";
import {
    Box,
    Text,
    Divider,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    FormErrorMessage,
    InputGroup,
    InputRightAddon,
    useToast,
    List,
    ListItem,
    Tag, TagLabel, TagCloseButton 
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { MyContext } from '../contexts/MyContext';
import axios from "axios";

function OpenTicket() {
    const { rootState, logoutUser } = useContext(MyContext);
    const { isAuth, theUser } = rootState;
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const removeFile = (indexToRemove) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, idx) => idx !== indexToRemove));
    };

    const onSubmit = async (values) => {
        const formData = new FormData();
    
        // Anexar campos do chamado
        formData.append('title', values.title);
        formData.append('description', values.description);
    
        // Se houver arquivos selecionados, adicione-os ao formData
        if (selectedFiles.length) { // Mudando de values.file para selectedFiles
            selectedFiles.forEach(file => {
                formData.append('files[]', file);
            });
        }
    
        // Anexar informações do usuário
        formData.append('user_id', theUser.id);
        formData.append('email', theUser.email);
        formData.append('department_id', theUser.department_id);
        formData.append('status', 'aberto');
    
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/lrv-chamados-api/public/api/chamados`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.data.success) {
                // Handle success
            }
        } catch (error) {
            // Handle error
        }       
            
    };
    

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length) {
            setSelectedFiles(Array.from(files)); // Armazenando os objetos File diretamente
        }
    };
    


    return (
        <Box w="100%" maxW="500px" borderWidth="1px" borderRadius="lg" p="6" overflow="hidden">
            <Text fontSize="2xl">Abertura de chamado</Text>
            <Divider my="4" />
            <form style={{display: 'flex', flexDirection: 'column', gap: "10px"}} onSubmit={handleSubmit(onSubmit)}>
                <FormControl w="100%" isInvalid={errors.title} mb="4">
                    <FormLabel htmlFor="title">Título do chamado</FormLabel>
                    <Input
                        id="title"
                        {...register("title", {
                            required: "Este campo é obrigatório",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.title && errors.title.message}
                    </FormErrorMessage>
                </FormControl>                

                <FormControl w="100%" isInvalid={errors.description} mb="4">
                    <FormLabel htmlFor="description">Descrição</FormLabel>
                    <Textarea
                        id="description"
                        {...register("description", {
                            required: "Este campo é obrigatório",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.description && errors.description.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl w="100%" isInvalid={errors.file} mb="4">
                    <FormLabel htmlFor="file">Anexar arquivos</FormLabel>
                    <InputGroup>
                        <Input
                            id="file"
                            type="file"
                            multiple // permite múltiplos arquivos
                            {...register("file")}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <Input
                            placeholder="Nenhum arquivo escolhido"
                            value={selectedFiles.length ? `${selectedFiles.length} arquivos selecionados` : ""}
                            isReadOnly
                            pr="4.5rem"
                        />
                        <InputRightAddon>
                            <label htmlFor="file">
                                <Button as="span" colorScheme="blue" size="sm">
                                    Escolher arquivos
                                </Button>
                            </label>
                        </InputRightAddon>
                    </InputGroup>
                    {selectedFiles.length > 0 && (
                    <Box mt={2} display="flex" flexWrap="wrap" gap="2">
                        {selectedFiles.map((file, idx) => (
                            <Tag key={idx} borderRadius="full" variant="solid" colorScheme="blue" size="md">
                                <TagLabel>{file.name}</TagLabel>
                                <TagCloseButton onClick={() => removeFile(idx)} />
                            </Tag>
                        ))}
                    </Box>
                )}

                    <FormErrorMessage>
                        {errors.file && errors.file.message}
                    </FormErrorMessage>
                </FormControl>

                <Button colorScheme="blue" type="submit" mt="4">
                    Salvar chamado
                </Button>
            </form>
        </Box>
    );
}

export default OpenTicket;
