const express = require('express');
const router = express.Router();
const { getMusics } = require('../controllers/pesquisarMusicaController');

router.post('/pesquisarMusica', async (req, res) => {
  const { artist, music } = req.body;

  const artistCode = encodeURIComponent(artist);
  const musicCode = encodeURIComponent(music);

  if (!artist || !music) {
    return res.json({ message: 'Os campos artist e music são obrigatórios', status: 400 });
  }

  const results = await getMusics(artistCode, musicCode);
  res.json(results);
});

module.exports = router;
