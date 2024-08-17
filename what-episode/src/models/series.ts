
export interface Season {
    episodeCount: number;
    currentEpisode?: number;
    seasonId: number;
}

export interface Series {
    title: string
    seasons: Season[]
}
