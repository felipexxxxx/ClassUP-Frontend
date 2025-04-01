import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import imagemFelipe from "../assets/imagem-felipe.jpg";

export default function TelaQuemSomos() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header
        titulo="ClassUP"
        acoesExtra={[]}
        exibirSala={false} 
        mostrarPerfil={false} 
        onTituloClick={() => window.location.href = "/"} 
      />

      <main className="flex flex-col md:flex-row items-center justify-center flex-grow px-8 py-12 gap-12">
        <motion.img
          src={imagemFelipe}
          alt="Foto do criador"
          className="w-80 h-80 object-cover rounded-full border-4 border-indigo-500 shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        <motion.div
          className="max-w-xl text-gray-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-indigo-300 mb-4">Quem sou eu?</h2>
          <p className="text-justify text-xl leading-relaxed">
            Olá! Me chamo <strong className="text-white">Felipe de Paula</strong> e sou o idealizador do <strong className="text-white">ClassUP</strong>. 
            Sempre acreditei no poder de transformação da <strong className="text-white">educação</strong> para construir uma sociedade mais justa, acessível e conectada com as necessidades de cada aluno.
            <br /><br />
            Pensando nisso, desenvolvi o ClassUP com o objetivo de facilitar o acompanhamento de <strong>atividades especiais</strong>, oferecendo aos alunos uma experiência moderna, intuitiva e que fortaleça o vínculo com o aprendizado.
            <br /><br />
            Com uma interface prática e intuitiva, o sistema permite que os alunos acompanhem suas atividades, recebam lembretes e confirmem presença com facilidade, garantindo um controle integrado e eficiente para instituições e educadores.
          </p>

          <div className="flex gap-4 mt-6">
            <a
              href="https://www.linkedin.com/in/felipeplins/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-indigo-400 text-4xl"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/felipeplins/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-pink-500 text-4xl"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>

          <p className="mt-3 text-md text-gray-400">
            Email para contato: <span className="text-indigo-300">felipe.classup@gmail.com</span>
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
