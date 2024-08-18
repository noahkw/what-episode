
export interface Season {
    episodeCount: number;
    currentEpisode?: number;
    seasonId: string;
}

export interface Series {
    title: string
    seasons: Season[]
    seriesId: string;
}
