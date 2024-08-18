import { Series as ISeries } from "../models/series"
import { Season } from "./Season"
import { ToggleButton } from "./ToggleButton"
import { useContext, useState } from "react"
import { SeriesContext } from "../context/series.context.ts"

export function Series({ series }: { series: ISeries }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { dispatchSeries } = useContext(SeriesContext)

  function addSeason() {
    dispatchSeries({
      type: "update",
      series: {
        ...series,
        seasons: [
          ...series.seasons,
          {
            seasonId: crypto.randomUUID(),
            episodeCount: 0,
          },
        ],
      },
    })
  }

  function deleteSeries() {
    dispatchSeries({
      type: "delete",
      seriesId: series.seriesId,
    })
  }

  return (
    <div className="series">
      <span>{series.title}</span>
      <ToggleButton
        toggled={isExpanded}
        setToggled={setIsExpanded}
      ></ToggleButton>
      {!isExpanded
        ? null
        : series.seasons.map(season => {
            return (
              <Season
                key={season.seasonId}
                seriesId={series.seriesId}
                season={season}
              ></Season>
            )
          })}
      <button onClick={addSeason}>Add season</button>
      <button onClick={deleteSeries}>-</button>
    </div>
  )
}
