import {Season as ISeason} from '../models/series'
import {useContext} from "react"
import {SeriesContext} from "../context/series.context.ts";

interface SeasonProps {
    season: ISeason
    seriesId: number
}

export function Season({season, seriesId}: SeasonProps) {
    const {dispatchSeries} = useContext(SeriesContext)

    const incrementCurrentEpisode = () => {
        const currentEpisode = (season.currentEpisode ?? 0) + 1
        dispatchSeries({
            type: "updateCurrentEpisode",
            seasonId: season.seasonId,
            seriesId: seriesId,
            newValue: currentEpisode,
        })
    }

    const decrementCurrentEpisode = () => {
        const currentEpisode = season.currentEpisode == null || season.currentEpisode === 0 ? 0 : season.currentEpisode - 1

        dispatchSeries({
            type: "updateCurrentEpisode",
            seasonId: season.seasonId,
            seriesId: seriesId,
            newValue: currentEpisode,
        })
    }

    const disableIncrementButton = (): boolean => {
        return season.currentEpisode != null && season.currentEpisode >= season.episodeCount
    }

    const disableDecrementButton = (): boolean => {
        return season.currentEpisode == null || season.currentEpisode === 0;
    }

    return (
        <div className="season">
            <span>I am season with {season.episodeCount} episodes</span>
            <span>You have watched {season.currentEpisode ?? 0} episodes</span>
            <button disabled={disableIncrementButton()} onClick={incrementCurrentEpisode}>+</button>
            <button disabled={disableDecrementButton()} onClick={decrementCurrentEpisode}>-</button>
        </div>
    )
}
