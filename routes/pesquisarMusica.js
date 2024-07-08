const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();
const { getMusics } = require('../controllers/pesquisarMusicaController');

router.post('/pesquisarMusica', authenticateToken, async (req, res) => {
  const { artist, music } = req.body;

  const artistCode = encodeURIComponent(artist);
  const musicCode = encodeURIComponent(music);

  if (!artist || !music) {
    return res.status(400).json({ message: 'Os campos artista e música são obrigatórios' });
  }

  const results = await getMusics(artistCode, musicCode);
  res.status(results.status).json(results);
});

module.exports = router;
