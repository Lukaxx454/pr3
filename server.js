
const express = require('express'); 
const cors = require('cors'); 
require('dotenv').config(); 
const { getConnection } = require('./db'); 
 
const app = express(); 
app.use(cors()); 
app.use(express.json()); 
 
// Rotas 
const authRoutes = require('./routes/auth'); 
const produtosRoutes = require('./routes/produtos'); 
const usuariosRoutes = require('./routes/usuarios'); 
const alugueisRoutes = require('./routes/alugueis'); 
const favoritosRoutes = require('./routes/favoritos'); 
 
app.use('/api/auth', authRoutes); 
app.use('/api/produtos', produtosRoutes); 
app.use('/api/usuarios', usuariosRoutes); 
app.use('/api/alugueis', alugueisRoutes); 
app.use('/api/favoritos', favoritosRoutes); 
 
// Teste de conexão 
app.get('/api/test', async (req, res) => { 
    try { 
        await getConnection(); 
        res.send('Conectado ao banco!'); 
    } catch (err) { 
        res.status(500).send('Erro de conexão'); 
    } 
}); 
 
const PORT = process.env.PORT || 3000; 
app.get('/', (req, res) => {
    res.send('API Soulfore funcionando!');
});
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)); 