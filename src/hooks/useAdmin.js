const importar = async (formData) => {
  setMensagem("");
  setSucesso(false);
  setCarregando(true);

  try {
    const response = await fetch("https://classup-python-converter-production.up.railway.app/converterJson", {
      method: "POST",
      body: formData,
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.erro || "Erro ao converter o arquivo.");
    }

    console.log("Usuários recebidos do Flask:", json);
    await importarUsuarios(json);

    setMensagem("✅ Usuários importados com sucesso!");
    setSucesso(true);
  } catch (error) {
    console.error("Erro na importação:", error);

    if (error.response && error.response.data) {
      const msg = typeof error.response.data === "string"
        ? error.response.data
        : error.response.data.erro || "Erro ao importar usuários.";
      setMensagem(`⚠️ ${msg}`);
    } else {
      setMensagem(`❌ ${error.message || "Erro inesperado ao importar usuários."}`);
    }

    setSucesso(false);
  } finally {
    setCarregando(false);
  }
};
