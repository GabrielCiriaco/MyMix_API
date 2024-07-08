const fs = require('fs');
const musicasbd = 'bd/musicasFavoritas.json';

const getMusicasFavoritas = () => {
  return JSON.parse(fs.readFileSync(musicasbd, 'utf-8'));
};

function findMinhasFavoritas(usuario) {
  const musicas = getMusicasFavoritas();

  const musicasFavoritas = musicas.filter(musica => musica.usuario === usuario);
  
  return musicasFavoritas;
};

function findMusicaFavorita(usuario, artista, musica) {
  const musicas = getMusicasFavoritas();
  return musicas.find(m => m.usuario === usuario && m.artista === artista && m.musica === musica);
}

function addMusicaFavorita(usuario, artista, musica) {
  const musicas = getMusicasFavoritas();

  // Verifica se a música já está na lista
  if (findMusicaFavorita(usuario, artista, musica)) {
    return { message: 'Música já está favoritada', status: 400 };
  }

  musicas.push({ usuario, artista, musica });

  fs.writeFileSync(musicasbd, JSON.stringify(musicas, null, 2));
  
  return { message: 'Música favorita adicionada com sucesso', status: 201 };
}

function deleteMusicaFavorita(usuario, artista, musica) {
  
  const musicasFavoritas = findMinhasFavoritas(usuario);

  const musicaIndex = musicasFavoritas.findIndex(musicaFavorita => musicaFavorita.artista === artista && musicaFavorita.musica === musica);

  if (musicaIndex === -1) {
    return { message: 'Música não encontrada', status: 404 };
  }

  musicasFavoritas.splice(musicaIndex, 1);

  fs.writeFileSync(musicasbd, JSON.stringify(musicasFavoritas,null, 2));


  return{ message: 'Música favorita removida com sucesso', status: 200 };
}

module.exports = {
  getMusicasFavoritas,
  findMinhasFavoritas,
  addMusicaFavorita,
  deleteMusicaFavorita,
  findMusicaFavorita,
};
