import { Series as ISeries } from "../models/series"
import { Season } from "./Season"
import { ToggleButton } from "./ToggleButton"
import { useContext, useState } from "react"
import { SeriesContext } from "../context/series.context.ts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBan } from "@fortawesome/free-solid-svg-icons"

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
    <div className="card bg-base-100 w-11/12 shadow-xl">
      <div className="card-body">
        <div className="card-title">
          <ToggleButton
            toggled={isExpanded}
            setToggled={setIsExpanded}
          ></ToggleButton>
          {series.title}
        </div>
        <div>
          {!isExpanded
            ? null
            : series.seasons.map(season => (
                <Season
                  key={season.seasonId}
                  seriesId={series.seriesId}
                  season={season}
                ></Season>
              ))}
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-sm" onClick={addSeason}>
            Add season
          </button>
          <button className="btn btn-secondary btn-sm" onClick={deleteSeries}>
            <FontAwesomeIcon icon={faBan} />
          </button>
        </div>
      </div>
    </div>
  )
}
