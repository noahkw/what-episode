import { Dispatch, SyntheticEvent, useState } from "react"
import { SeriesAction } from "../reducers/series.reducer.ts"

interface AddSeriesProps {
  dispatchSeries: Dispatch<SeriesAction>
}

export function AddSeries({ dispatchSeries }: AddSeriesProps) {
  const [seriesName, setSeriesName] = useState("")

  const onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

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
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={seriesName}
        onChange={e => {
          setSeriesName(e.target.value)
        }}
      />
      <button type="submit">Add</button>
    </form>
  )
}
