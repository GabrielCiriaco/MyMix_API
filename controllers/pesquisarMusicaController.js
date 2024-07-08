const axios = require('axios');

const API_KEY = 'dc82e630ac6c29d221e29fa35b86afda';

async function getMusics(artistCode, musicCode) {
  const url = `https://api.vagalume.com.br/search.php?art=${artistCode}&mus=${musicCode}&extra=relmus,relart&apikey=${API_KEY}`;

  try {
    const response = await axios.get(url);
    console.log('Resposta da API:', response.data);

    if (response.data.type === 'notfound') {
      return { message: 'Artista não encontrado', status: 404 };
    }

    if (response.data.type === 'song_notfound') {
      return { message: 'Música não encontrada', status: 404 };
    }

    const result = {
      artistId: response.data.art.id,
      artistName: response.data.art.name,
      songId: response.data.mus[0]?.id,
      songName: response.data.mus[0]?.name,
      lyrics: response.data.mus[0]?.text,
    };
    return { data: result, status: 200 };
  } catch (error) {
    console.error('Erro ao fazer a consulta:', error);
    return { message: 'Erro ao fazer a consulta', status: 500, error: error.message };
  }
}

module.exports = {
  getMusics,
};
