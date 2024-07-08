const fs = require('fs');
const musicasbd = 'bd/musicasFavoritas.json';

const getMusicasFavoritas = () => {
  return JSON.parse(fs.readFileSync(musicasbd, 'utf-8'));
};

function findMinhasFavoritas(usuario) {
  const musicas = getMusicasFavoritas();

  const musicasFavoritas = musicas.findall(musica => musica.usuario === usuario);
  
  return musicasFavoritas;
};

function addMusicaFavorita(usuario, artista, musica) {
  const musicas = getMusicasFavoritas();

  musicas.push({ usuario, artista, musica });

  fs.writeFileSync(musicasbd, JSON.stringify(musicas));
  
}

function deleteMusicaFavorita(usuario, artista, musica) {
  
  const musicasFavoritas = findMinhasFavoritas(usuario);

  const musicaIndex = musicasFavoritas.findIndex(musicaFavorita => musicaFavorita.artista === artista && musicaFavorita.musica === musica);

  if (musicaIndex === -1) {
    return { message: 'Música não encontrada', status: 404 };
  }

  musicasFavoritas.splice(musicaIndex, 1);

  fs.writeFileSync(musicasbd, JSON.stringify(musicasFavoritas));


  return{ message: 'Música favorita removida com sucesso', status: 200 };
}