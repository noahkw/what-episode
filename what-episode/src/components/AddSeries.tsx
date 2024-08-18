import { Dispatch, SyntheticEvent, useState } from "react"
import { SeriesAction } from "../reducers/series.reducer.ts"

interface AddSeriesProps {
  dispatchSeries: Dispatch<SeriesAction>
}

export function AddSeries({ dispatchSeries }: AddSeriesProps) {
  const [seriesName, setSeriesName] = useState("")

  const onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!seriesName) {
      return
    }

    dispatchSeries({
      type: "create",
      series: {
        seriesId: crypto.randomUUID(),
        seasons: [],
        title: seriesName,
      },
    })
  }

  return (
    <form className="input-group" onSubmit={onSubmit}>
      <input
        required
        className="input w-24 md:w-32 input-sm"
        type="text"
        value={seriesName}
        placeholder="New series..."
        onChange={e => {
          setSeriesName(e.target.value)
        }}
      />
      <button className="btn btn-primary btn-sm" type="submit">
        Add
      </button>
    </form>
  )
}
