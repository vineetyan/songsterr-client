export interface Song {
    title: string;
    artist: Artist[];
}

export interface Artist {
    nameWithoutThePrefix: string[];
    name: string[];
}