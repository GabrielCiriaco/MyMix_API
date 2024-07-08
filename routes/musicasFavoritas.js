const express = require('express');
const router = express.Router();
const { addMusicaFavorita, findMinhasFavoritas, deleteMusicaFavorita } = require('../controllers/musicasFavoritasController');

router.get('/minhasFavoritas', async (req, res) => {
  const { usuario } = req.query;

  if (!usuario) {
    return res.json({ message: 'O campo usuario é obrigatório', status: 400 });
  }

  const musicasFavoritas = findMinhasFavoritas(usuario);
  res.json({ musicasFavoritas, status: 200 });

});

router.post('/favoritarMusica', async (req, res) => {
  const { usuario, artista, musica } = req.body;

  if (!usuario || !artista || !musica) {
    return res.json({ message: 'Os campos usuario, artista e musica são obrigatórios', status: 400 });
  }

  addMusicaFavorita(usuario, artista, musica);
  res.json({ message: 'Música favorita adicionada com sucesso', status: 201 });
});

router.delete('/desfavoritarMusica', async (req, res) => {
  const { usuario, artista, musica } = req.body;

  
  if (!usuario || !artista || !musica) {
    return res.json({ message: 'Os campos usuario, artista e musica são obrigatórios', status: 400 });
  }
  const resp = deleteMusicaFavorita(usuario, artista, musica);
  res.json(resp);
  
});


module.exports = router;
