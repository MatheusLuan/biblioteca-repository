import React, { useState, useEffect } from 'react';
import './app.css';
import api from './_utils/api'
import moment from 'moment'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Container,
  Table,
  Modal, ModalHeader, ModalBody,
  Button, Form, FormGroup, Input, Label
} from 'reactstrap';

import { FiCheckSquare, FiTrash2 } from 'react-icons/fi'

const App = (props) => {

  //bootstrap
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { className } = props;

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [modalLivro, setModalLivro] = useState(false);
  const toggleModalLivro = () => setModalLivro(!modalLivro);

  //Livros
  const [livros, setLivro] = useState([])
  const [nome, setNome] = useState('')
  const [idAutor, setIdAutor] = useState('')
  const [status, setStatus] = useState('')

  //Autor
  const [autores, setAutores] = useState([])
  const [nomeAutor, setNomeAutor] = useState('')

  async function loadLivros() {

    const response = await api.get('livro')

    setLivro(response.data)    
 
  }

  async function loadAutores() {

    const response = await api.get('autor')

    setAutores(response.data)
 
  }

  async function  addAutor(e) {
    e.preventDefault()

    const response = await api.post('autor', 
    {
      nome: nomeAutor
    })

    setAutores([response.data])

    if (response.status === 201){
      alert("Autor inserido com sucesso!");
    }

    setModal(!modal);
    loadLivros() 
    limparFormAutor()
  }

  async function  addLivro(e) {
    e.preventDefault()

    const response = await api.post('livro', 
    {
      nome: nome,     
      autor_id: idAutor,
      status: status,

    })

    setLivro([response.data])

    if (response.status === 201){
      alert("Livro inserido com sucesso!");
    }

    setModalLivro(!modalLivro);
    loadLivros() 
    limparFormLivro() 
  }

  function limparFormAutor() {
    const inputTitle = document.getElementById('nomeAutor');

    inputTitle.value = ''
    setNomeAutor('')   
  }

  function limparFormLivro() {
    const inputTitle = document.getElementById('nomeLivro');

    inputTitle.value = ''
    setNome('')   

    const inputAutor = document.getElementById('selectAutor');

    inputAutor.value = ''
    setIdAutor('')  

    const inputStatus = document.getElementById('selectStatus');

    inputStatus.value = ''
    setStatus('') 
  }

  async function deleteLivro(id) {

    await api.delete(`livro/${id}`, {
      
    })
    loadLivros()
  }


  async function trocarStatus(id, livroStatus) {

    if(livroStatus === 'disponivel') {
      await api.put(`livro/${id}`,{
        status: 'emprestado'
      })      
    }else if(livroStatus === 'emprestado'){
      await api.put(`livro/${id}`,{
        status: 'disponivel'
      })  
    }

    loadLivros()
  }

  useEffect(() => {
    loadLivros() 
  }, [])

  useEffect(() => {
    loadAutores() 
  }, [])

  return (
    <div>

      <Container id="containerpai" className="themed-container mt-5" fluid="xl">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Biblioteca</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink> <Button color="link" onClick={toggleModal}>Autor</Button></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Button color="link" onClick={toggleModalLivro}>Livro</Button></NavLink>
              </NavItem>
            </Nav>
            <NavbarText>Matheus Luan</NavbarText>
          </Collapse>
        </Navbar>
        <br />
        <Table dark>
          <thead>
            <tr>
              <th id="th-actions">#</th>
              <th>ID</th>
              <th>Livro</th>
              <th>Autor</th>
              <th>Data de Criação</th>
              <th>Status</th>
            </tr>
          </thead>
          {livros.map(livro => (
            <tbody key={livro.id}> 
              <tr>
                <th>
                  <div id="div-actions">
                    <FiCheckSquare color="green"
                     onClick={() => trocarStatus(livro.id, livro.status)}
                    />
                    <FiTrash2 color="#c0392b"
                    onClick={() => deleteLivro(livro.id)}
                    />
                  </div>
                </th>
                <td>{livro.id}</td>
                <td>{livro.nome}</td>
                <td> {livro.nomeAutor}</td>
                <td>{moment(livro.dataCriacao).format('DD/MM/YYYY - HH:mm')}</td>               
                <td>{livro.status}</td>
              </tr>
            </tbody>
          ))}
        </Table>

        <Modal isOpen={modal}  required={false} toggle={toggleModal} className={className}>
          <ModalHeader toggle={toggleModal}><h3>Cadastro de Autor!</h3></ModalHeader>
          <ModalBody>
            <Form  onSubmit={addAutor}>
              <FormGroup>
                <Input required={true} type="text" name="nomeAutor" id="nomeAutor" placeholder="Nome"
                 value={nomeAutor}
                 onChange={e => setNomeAutor(e.target.value)}
                />
              </FormGroup>              
              <hr/>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="danger" onClick={toggleModal}>Close</Button>
            </Form>
          </ModalBody>       
        </Modal>

        <Modal isOpen={modalLivro}  required={false} toggle={toggleModalLivro} className={className}>
          <ModalHeader toggle={toggleModalLivro}><h3>Cadastro de Livro!</h3></ModalHeader>
          <ModalBody>
            <Form  onSubmit={addLivro}>
              <FormGroup>
                <Input required={true} type="text" name="nomeLivro" id="nomeLivro" placeholder="Nome do Livro"
                 value={nome}
                 onChange={e => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Autor</Label>
                <Input type="select" name="select" id="selectAutor" required={true}
                onChange={e => setIdAutor(e.target.value)}
                >
                <option selected disabled>Selecione uma opção</option>
                {autores.map(autor => ( 
                  <option key={autor.id} value={autor.id}>{autor.nome}</option>
                ))}
                
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="status">Status</Label>
                <Input type="select" name="selectStatus" id="selectStatus" required={true}
                 onChange={e => setStatus(e.target.value)}
                >  
                  <option selected disabled>Selecione uma opção</option>            
                  <option value="disponivel">Disponível</option>
                  <option value="emprestado">Emprestado</option>
                </Input>
              </FormGroup>
              <hr/>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="danger" onClick={toggleModalLivro}>Close</Button>
            </Form>
          </ModalBody>       
        </Modal>
      </Container>
    </div>

  );
}

export default App;