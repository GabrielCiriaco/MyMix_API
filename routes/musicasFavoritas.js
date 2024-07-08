const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();
const { addMusicaFavorita, findMinhasFavoritas, deleteMusicaFavorita, findMusicaFavorita } = require('../controllers/musicasFavoritasController');

router.get('/minhasFavoritas',authenticateToken, async (req, res) => {
  const { usuario } = req.query;

  if (!usuario) {
    return res.status(400).json({ message: 'O campo usuario é obrigatório'});
  }

  const musicasFavoritas = findMinhasFavoritas(usuario);
  res.status(200).json(musicasFavoritas);

});

router.post('/favoritarMusica', authenticateToken, async (req, res) => {
  const { usuario, artista, musica } = req.body;

  if (!usuario || !artista || !musica) {
    return res.status(400).json({ message: 'Os campos usuario, artista e musica são obrigatórios'});
  }

  const respostaAdd = addMusicaFavorita(usuario, artista, musica);
  res.status(respostaAdd.status).json(respostaAdd);
  
});

router.delete('/desfavoritarMusica', authenticateToken, async (req, res) => {
  const { usuario, artista, musica } = req.query;

  if (!usuario || !artista || !musica) {
    return res.status(400).json({ message: 'Os campos usuario, artista e musica são obrigatórios'});
  }

  const resp = deleteMusicaFavorita(usuario, artista, musica);
  res.status(resp.status).json(resp.message);
});

router.get('/verificarFavorito', authenticateToken, async (req, res) => {
  const { usuario, artista, musica } = req.query;

  if (!usuario || !artista || !musica) {
    return res.json({ message: 'Os campos usuario, artista e musica são obrigatórios', status: 400 });
  }

  const musicaFavorita = findMusicaFavorita(usuario, artista, musica);
  if (musicaFavorita) {
    return res.json({ message: 'Música favoritada', status: 200 });
  }
  return res.json({ message: 'Música não favoritada', status: 404 });
});


module.exports = router;
