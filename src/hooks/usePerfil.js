import { useEffect, useState } from "react";
import {
  buscarPerfil,
  atualizarEmail as atualizarEmailAPI,
  atualizarSenha as atualizarSenhaAPI,
} from "../services/perfilService";

export default function usePerfil() {
  const [perfil, setPerfil] = useState({});
  const [mostraEmail, setMostraEmail] = useState(false);
  const [mostraSenha, setMostraSenha] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  useEffect(() => {
    carregarPerfil();
  }, []);

  useEffect(() => {
    if (mensagemSucesso) {
      const timer = setTimeout(() => setMensagemSucesso(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensagemSucesso]);

  const carregarPerfil = async () => {
    const res = await buscarPerfil();
    setPerfil(res);
  };

  const atualizarEmail = async (novoEmail) => {
    try {
      await atualizarEmailAPI(novoEmail);
      setMensagemSucesso("Email atualizado com sucesso!");
      setErroEmail("");
      setMostraEmail(false);
      carregarPerfil();
    } catch (err) {
      if (err.response?.status === 400) {
        setErroEmail("Este e-mail já está em uso.");
      } else {
        setErroEmail("Erro ao atualizar email. Tente novamente.");
      }
    }
  };

  const atualizarSenha = async (senhaAtual, novaSenha) => {
    if (novaSenha.length < 8) {
      setErroSenha("A nova senha deve ter no mínimo 8 caracteres.");
      return;
    }
    try {
      await atualizarSenhaAPI(senhaAtual, novaSenha);
      setMensagemSucesso("Senha atualizada com sucesso!");
      setErroSenha("");
      setMostraSenha(false);
    } catch (err) {
      if (err.response?.status === 400) {
        setErroSenha("Senha atual incorreta.");
      } else {
        setErroSenha("Erro ao atualizar senha. Tente novamente.");
      }
    }
  };

  const atualizarFoto = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("fotoPerfil", reader.result);
      setMensagemSucesso("Foto de perfil atualizada com sucesso!");
    };
    reader.readAsDataURL(file);
  };

  return {
    perfil,
    mostraEmail,
    mostraSenha,
    mensagemSucesso,
    erroEmail,
    erroSenha,
    setMostraEmail,
    setMostraSenha,
    atualizarEmail,
    atualizarSenha,
    atualizarFoto,
  };
}
