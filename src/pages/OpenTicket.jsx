import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

function OpenTicket() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const onSubmit = (values) => {
        console.log(values);
    };

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length) {
            setSelectedFiles(Array.from(files).map(file => file.name));
        }
    };


    return (
        <Box maxW="md" borderWidth="1px" borderRadius="lg" p="6" overflow="hidden">
            <Text fontSize="2xl">Abertura de chamado técnico</Text>

            <Divider my="4" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.title} mb="4">
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

                <FormControl isInvalid={errors.name} mb="4">
                    <FormLabel htmlFor="name">Nome do solicitante</FormLabel>
                    <Input
                        id="name"
                        {...register("name", {
                            required: "Este campo é obrigatório",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.email} mb="4">
                    <FormLabel htmlFor="email">E-mail do solicitante</FormLabel>
                    <Input
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "Este campo é obrigatório",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.email && errors.email.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.phone} mb="4">
                    <FormLabel htmlFor="phone">Telefone do solicitante</FormLabel>
                    <Input
                        id="phone"
                        {...register("phone", {
                            required: "Este campo é obrigatório",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.phone && errors.phone.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.description} mb="4">
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
                <FormControl isInvalid={errors.file} mb="4">
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
                        <List mt={2} spacing={1}>
                            {selectedFiles.map((fileName, idx) => (
                                <ListItem key={idx}>{fileName}</ListItem>
                            ))}
                        </List>
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
