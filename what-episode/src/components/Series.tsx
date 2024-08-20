import { Series as ISeries } from "../models/series"
import { Season } from "./Season"
import { ToggleButton } from "./ToggleButton"
import { useContext, useState } from "react"
import { SeriesContext } from "../context/series.context.ts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBan, faPlus } from "@fortawesome/free-solid-svg-icons"
import { UndoableButton } from "./UndoableButton.tsx"

const UNDO_DELAY = 5000

export function Series({
  series,
  forceUpdate,
}: {
  series: ISeries
  forceUpdate: () => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { dispatchSeries } = useContext(SeriesContext)
  const [isBeingDeleted, setIsBeingDeleted] = useState(false)

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
            currentEpisode: 0,
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

  const children =
    series.seasons.length === 0 ? (
      <p>No seasons added bitch</p>
    ) : (
      series.seasons.map((season, idx) => (
        <Season
          key={season.seasonId}
          seriesId={series.seriesId}
          season={season}
          index={idx}
        ></Season>
      ))
    )

  return (
    !isBeingDeleted && (
      <div className="card bg-base-100 w-11/12 shadow-xl rounded-lg">
        <div
          onClick={() => {
            setIsExpanded(!isExpanded)
          }}
          className="card-title grid grid-cols-12 justify-items-start cursor-pointer"
        >
          <figure className="lg:col-span-1 md:col-span-2 col-span-3 h-32 items-center rounded-l-lg">
            <img
              className="h-full"
              src={series.imageUrl ?? "https://placehold.co/228x320"}
              alt={series.title}
            />
          </figure>
          <div className="lg:col-span-9 md:col-span-8 col-span-7 flex w-full">
            <ToggleButton toggled={isExpanded}></ToggleButton>
            <span className="ml-2 truncate text-ellipsis series-title">
              {series.title}
            </span>
          </div>
          <div className="card-actions justify-end col-span-2 w-full pr-1">
            <button
              className="btn btn-primary btn-icon"
              onClick={e => {
                e.stopPropagation()
                addSeason()
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <UndoableButton
              timeout={UNDO_DELAY}
              icon={faBan}
              callback={deleteSeries}
              onClick={() => {
                setIsBeingDeleted(true)
              }}
              undoCallback={() => {
                setIsBeingDeleted(false)
              }}
              undoMessage={`Series ${series.title} has been deleted...`}
              forceUpdate={forceUpdate}
            />
          </div>
        </div>

        {!isExpanded ? null : <div className="card-body">{children}</div>}
      </div>
    )
  )
}
