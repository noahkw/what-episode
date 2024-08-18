import {Season as ISeason, Series} from '../models/series'
import {useContext} from "react"
import {SeriesContext} from "../context/series.context.ts";
import {EditableSpan} from "./EditableSpan.tsx";

interface SeasonProps {
    season: ISeason
    seriesId: Series["seriesId"]
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

    function setEpisodeCount(episodeCount: number) {
        dispatchSeries({
            type: "updateSeason",
            seriesId: seriesId,
            season: {
                ...season,
                episodeCount,
            }
        })
    }

    return (
        <div className="season">
            <span>I am a season with episodes</span>
            <EditableSpan initialValue={season.episodeCount} onValueChange={setEpisodeCount} parseValue={(value: string) => Number.parseInt(value)} />
            <span>episodes</span>
            <span>You have watched {season.currentEpisode ?? 0} episodes</span>
            <button disabled={disableIncrementButton()} onClick={incrementCurrentEpisode}>+</button>
            <button disabled={disableDecrementButton()} onClick={decrementCurrentEpisode}>-</button>
        </div>
    )
}
