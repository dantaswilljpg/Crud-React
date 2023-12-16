
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import GlobalStyle from "./styles/global";
import Form from "./components/Form.js";
import Grid from "./components/Grid";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #282c34;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #ccc;
  animation: fadeIn 0.5s;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h2`
  color: #fff;
  position: relative;
  animation: moveTitle 5s infinite linear, changeColor 5s infinite linear;

  @keyframes moveTitle {
    0% {
      transform: translateX(-20px);
    }
    50% {
      transform: translateX(20px);
    }
    100% {
      transform: translateX(-20px);
    }
  }

  @keyframes changeColor {
    0% {
      color: #ff5722;
    }
    25% {
      color: #00bcd4;
    }
    50% {
      color: #8bc34a;
    }
    75% {
      color: #e91e63;
    }
    100% {
      color: #ff9800;
    }
  }
`;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
        <Title>Crud Will Dantas</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;