import {Season as ISeason} from '../models/series';

export function Season({season}: {season: ISeason}) {
    return (
        <div>
            <span>I am season with {season.episodeCount} episodes</span>
            <span>You have watched {season.currentEpisode != null ? season.currentEpisode - 1 : 0} episodes</span>
            <button>+</button>
        </div>
    )
}