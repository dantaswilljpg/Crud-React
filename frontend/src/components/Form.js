import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #282c34;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  animation: ${fadeIn} 0.5s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #61dafb;
  }
`;

const Label = styled.label`
  color: #fff;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #61dafb;
  color: white;
  height: 42px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45b5e6;
  }
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.fone;
      user.data_nascimento.value = onEdit.data_nascimento;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.fone.value ||
      !user.data_nascimento.value
    ) {
      return toast.warn("Preencha todos os campos!", { theme: "colored" });
    }

    if (user.nome.value.trim().length < 3) {
      return toast.warn(
        "O campo Nome deve ter no mínimo 3 caracteres!",
        { theme: "colored" }
      );
    }

    if (user.fone.value.replace(/[^\d]/g, "").length !== 11) {
      return toast.warn(
        "O campo Telefone deve conter 11 dígitos!",
        { theme: "colored" }
      );
    }

    const emailRegex = /^[\w-.]+@sptech\.school$/;
    if (!emailRegex.test(user.email.value)) {
      return toast.warn(
        "O campo E-mail deve ser um e-mail válido do domínio @sptech.school!",
        { theme: "colored" }
      );
    }

    const today = new Date();
    const selectedDate = new Date(user.data_nascimento.value);
    const age = today.getFullYear() - selectedDate.getFullYear();

    if (age < 18) {
      return toast.warn(
        "É necessário ter pelo menos 18 anos de idade!",
        { theme: "colored" }
      );
    }

    if (onEdit) {
      await axios
        .put("http://localhost:3000/" + onEdit.id, {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        })
        .then(({ data }) => toast.success(data, { theme: "colored" }))
        .catch(({ data }) => toast.error(data, { theme: "colored" }));
    } else {
      await axios
        .post("http://localhost:3000", {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        })
        .then(({ data }) => toast.success(data, { theme: "colored" }))
        .catch(({ data }) => toast.error(data, { theme: "colored" }));
    }

    user.nome.value = "";
    user.email.value = "";
    user.fone.value = "";
    user.data_nascimento.value ="";

    getUsers();
    setOnEdit(null);
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome:</Label>
        <Input type="text" name="nome"/>
      </InputArea>

      <InputArea>
        <Label>Email:</Label>
        <Input type="email" name="email"/>
      </InputArea>

      <InputArea>
        <Label>Telefone:</Label>
        <Input type="tel" name="fone"/>
      </InputArea>

      <InputArea>
        <Label>Data de Nascimento:</Label>
        <Input type="date" name="data_nascimento"/>
      </InputArea>

      <Button type="submit">{onEdit ? "Editar" : "Salvar"}</Button>
    </FormContainer>
  );
};

export default Form;