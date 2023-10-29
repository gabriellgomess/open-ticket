import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Select,
    Badge
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, faFileCircleXmark, faPaperclip } from '@fortawesome/free-solid-svg-icons';

const Estatistics = () => {
    const [chamados, setChamados] = useState([]);
    const [update, setUpdate] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedChamado, setSelectedChamado] = useState(null);

    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedStatus, setEditedStatus] = useState('');

    const [fileList, setFileList] = useState([]);
    const [isFileModalOpen, setIsFileModalOpen] = useState(false);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/lrv-chamados-api/public/api/chamados`);
                setChamados(response.data);
            } catch (error) {
                console.error('Erro ao buscar chamados:', error);
            }
        };

        fetchData();
    }, [update]);

    const handleDel = (id) => {
        axios.delete(`${import.meta.env.VITE_REACT_APP_URL}/lrv-chamados-api/public/api/chamados/${id}`)
            .then(response => {
                console.log(response.data.message);
                setUpdate(!update);
            })
            .catch(error => {
                console.error('Erro ao excluir chamado:', error);
            });
    }

    const handleEdit = (chamado) => {
        setSelectedChamado(chamado);
        setEditedTitle(chamado.title);
        setEditedDescription(chamado.description);
        setEditedStatus(chamado.status);
        setIsEditing(true);
    };
    

    const handleClose = () => {
        setSelectedChamado(null);
        setIsEditing(false);
    }

    const handleSave = () => {
        axios.put(`${import.meta.env.VITE_REACT_APP_URL}/lrv-chamados-api/public/api/chamados/${selectedChamado.id}`, {
            title: editedTitle,
            description: editedDescription,
            status: editedStatus
        })
        .then(response => {
            console.log(response.data.message);
            setUpdate(!update);
            setIsEditing(false);
        })
        .catch(error => {
            console.error('Erro ao atualizar chamado:', error);
        });
    };

    const handleFiles = async (path_file) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/lrv-chamados-api/public/api/chamados/files`, {
                params: { path_file: path_file }
            });
            setFileList(response.data);
            setIsFileModalOpen(true);
        } catch (error) {
            console.error('Erro ao buscar arquivos:', error);
        }
    };
    

    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Lista de Chamados</TableCaption>
                <Thead>
                <Tr>
                        <Th>ID</Th>
                        <Th>Título</Th>
                        <Th>Descrição</Th>
                        <Th>Email</Th>
                        <Th>Departamento</Th>
                        <Th>Data de Criação</Th>
                        <Th>Status</Th>
                        <Th>Arquivo</Th>
                        <Th>Ação</Th>
                     </Tr>
                </Thead>
                <Tbody>
                    {chamados.map(chamado => (
                        <Tr key={chamado.id}>
                            <Td>{chamado.id}</Td>
                            <Td>{chamado.title}</Td>
                            <Td>{chamado.description}</Td>
                            <Td>{chamado.email}</Td>
                            <Td>{chamado.department_id}</Td>
                            <Td>{new Date(chamado.created_at).toLocaleDateString()}</Td>
                            <Td>{chamado.status == 'aberto'? <Badge colorScheme='green'>Aberto</Badge>:chamado.status == 'encerrado'? <Badge colorScheme='red'>Encerrado</Badge>: <Badge colorScheme='yellow'>Pendente</Badge>}</Td>
                            <Td>
                                {chamado.path_file !== null ? 
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <FontAwesomeIcon 
                                            style={{color: '#6B46C1', cursor: 'pointer'}} 
                                            icon={faPaperclip} 
                                            onClick={() => handleFiles(chamado.path_file)} 
                                        />
                                    </div> 
                                    : 
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <FontAwesomeIcon style={{color: 'grey', cursor: 'not-allowed'}} icon={faFileCircleXmark} />
                                    </div>
                                }
                            </Td>

                            <Td style={{display: 'flex', gap: '10px'}}>
                                <Button colorScheme='blue' size='xs' onClick={() => handleEdit(chamado)}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </Button>
                                <Button colorScheme='red' variant='outline' size='xs' onClick={()=>handleDel(chamado.id)}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </Button>
                            </Td>                            
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            {isEditing && selectedChamado && (
                <Modal isOpen={isEditing} onClose={handleClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Editar Chamado</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                        <Input placeholder="Título" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} mb={3} />
                        <Input placeholder="Descrição" value={editedDescription} onChange={e => setEditedDescription(e.target.value)} mb={3} />
                        <Select placeholder='Status' value={editedStatus} onChange={e => setEditedStatus(e.target.value)}>
                                <option value='aberto'>Aberto</option>
                                <option value='pendente'>Pendente</option>
                                <option value='encerrado'>Encerrado</option>
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={handleSave}>
                                Salvar
                            </Button>
                            <Button variant="ghost" onClick={handleClose}>Cancelar</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
            {isFileModalOpen && (
                <Modal isOpen={isFileModalOpen} onClose={() => setIsFileModalOpen(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Arquivos</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {fileList.map(file => (
                                <div key={file}>
                                    <a href={`${import.meta.env.VITE_URL_DOWNLOAD_FILE}`+file.split('/')[2]+'/'+file.split('/')[3]}>Arquivos</a>
                                    
                                </div>
                            ))}
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="ghost" onClick={() => setIsFileModalOpen(false)}>Fechar</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}

        </TableContainer>
    );
}

export default Estatistics;

