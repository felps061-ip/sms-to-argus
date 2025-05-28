const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/sms-resposta', async (req, res) => {
  const { telefone, mensagem } = req.body;

  console.log('Recebido:', telefone, mensagem);

  if (mensagem.toLowerCase().includes("sim")) {
    try {
      await axios.post('https://api.argus.com.br/webhook', {
        telefone: telefone,
        campanha: "1" // Substitua pelo ID real da campanha ARGUS
      });

      console.log(`Cliente ${telefone} enviado para ARGUS`);
    } catch (error) {
      console.error('Erro ao enviar para ARGUS:', error.message);
    }
  }

  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
