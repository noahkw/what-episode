import { Season as ISeason, Series } from "../models/series"
import { useContext } from "react"
import { SeriesContext } from "../context/series.context.ts"
import { EditableSpan } from "./EditableSpan.tsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"

interface SeasonProps {
  season: ISeason
  seriesId: Series["seriesId"]
}

export function Season({ season, seriesId }: SeasonProps) {
  const { dispatchSeries } = useContext(SeriesContext)

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
    const currentEpisode =
      season.currentEpisode == null || season.currentEpisode === 0
        ? 0
        : season.currentEpisode - 1

    dispatchSeries({
      type: "updateCurrentEpisode",
      seasonId: season.seasonId,
      seriesId: seriesId,
      newValue: currentEpisode,
    })
  }

  const disableIncrementButton = (): boolean => {
    return (
      season.currentEpisode != null &&
      season.currentEpisode >= season.episodeCount
    )
  }

  const disableDecrementButton = (): boolean => {
    return season.currentEpisode == null || season.currentEpisode === 0
  }

  function setEpisodeCount(episodeCount: number) {
    dispatchSeries({
      type: "updateSeason",
      seriesId: seriesId,
      season: {
        ...season,
        episodeCount,
      },
    })
  }

  function setCurrentEpisode(currentEpisode: number) {
    dispatchSeries({
      type: "updateSeason",
      seriesId: seriesId,
      season: {
        ...season,
        currentEpisode,
      },
    })
  }

  return (
    <div className="season">
      <EditableSpan
        initialValue={season.currentEpisode ?? 0}
        onValueChange={setCurrentEpisode}
        parseValue={(value: string) => Number.parseInt(value)}
      />
      <span>/</span>
      <EditableSpan
        initialValue={season.episodeCount}
        onValueChange={setEpisodeCount}
        parseValue={(value: string) => Number.parseInt(value)}
      />
      <button
        className="btn"
        disabled={disableIncrementButton()}
        onClick={incrementCurrentEpisode}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <button
        className="btn"
        disabled={disableDecrementButton()}
        onClick={decrementCurrentEpisode}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
    </div>
  )
}
