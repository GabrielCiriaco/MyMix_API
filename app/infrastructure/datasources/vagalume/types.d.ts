interface GetMusicDTO {
    artistName: string;
    songName: string;
}

interface GetMusicResponse {
    artistId: string;
    artistName: string;
    songId: string;
    songName: string;
    lyrics: string;
}

interface Artista {
    id: string;
    name: string;
    url: string;
}

interface Musica {
    id: string;
    name: string;
    lang: number;
    url: string;
    text: string;
    translate: Traducao[];
}

interface Traducao {
    id: string;
    lang: number;
    url: string;
    text: string;
}

interface Dados {
    type: 'exact';
    art: Artista;
    mus: Musica[];
}