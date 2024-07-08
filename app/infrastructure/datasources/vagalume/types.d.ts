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
interface ApiResponse {
    response: ResponseData;
    highlighting: HighlightingData;
}

interface ResponseData {
    numFound: number;
    start: number;
    numFoundExact: boolean;
    docs: Doc[];
}

interface Doc {
    id: string;
    langID?: number;
    url: string;
    title?: string;
    band: string;
    fmRadios?: string[];
}

interface HighlightingData {
}
