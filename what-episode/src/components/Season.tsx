import {Season as ISeason} from '../models/series'
import {useState} from "react"

interface SeasonProps {
    season: ISeason
}

export function Season(props: SeasonProps) {
    const [season, setSeason] = useState(props.season)

    const incrementCurrentEpisode = () => {
        setSeason({
            ...season,
            currentEpisode: (season.currentEpisode ?? 0) + 1,
        })
    }

    const decrementCurrentEpisode = () => {
        setSeason({
            ...season,
            currentEpisode: season.currentEpisode == null || season.currentEpisode === 0 ? 0 : season.currentEpisode - 1,
        })
    }

    const disableIncrementButton = (): boolean => {
        return season.currentEpisode != null && season.currentEpisode >= season.episodeCount
    }

    const disableDecrementButton = (): boolean => {
        return season.currentEpisode == null || season.currentEpisode === 0;
    }

    return (
        <div>
            <span>I am season with {season.episodeCount} episodes</span>
            <span>You have watched {season.currentEpisode ?? 0} episodes</span>
            <button disabled={disableIncrementButton()} onClick={incrementCurrentEpisode}>+</button>
            <button disabled={disableDecrementButton()} onClick={decrementCurrentEpisode}>-</button>
        </div>
    )
}
