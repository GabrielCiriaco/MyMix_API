const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();
const { addMusicaFavorita, findMinhasFavoritas, deleteMusicaFavorita, findMusicaFavorita } = require('../controllers/musicasFavoritasController');

router.get('/minhasFavoritas',authenticateToken, async (req, res) => {
  const { usuario } = req.query;

  if (!usuario) {
    return res.json({ message: 'O campo usuario é obrigatório', status: 400 });
  }

  const musicasFavoritas = findMinhasFavoritas(usuario);
  res.json({ musicasFavoritas, status: 200 });

});

router.post('/favoritarMusica', authenticateToken, async (req, res) => {
  const { usuario, artista, musica } = req.body;

  if (!usuario || !artista || !musica) {
    return res.json({ message: 'Os campos usuario, artista e musica são obrigatórios', status: 400 });
  }

  addMusicaFavorita(usuario, artista, musica);
  res.json({ message: 'Música favorita adicionada com sucesso', status: 201 });
});

router.delete('/desfavoritarMusica', authenticateToken, async (req, res) => {
  const { usuario, artista, musica } = req.query;

  if (!usuario || !artista || !musica) {
    return res.status(400).json({ message: 'Os campos usuario, artista e musica são obrigatórios', status: 400 });
  }

  const resp = deleteMusicaFavorita(usuario, artista, musica);
  res.json(resp);
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
