import React, { Dispatch, useState } from "react"
import { SeriesAction } from "../reducers/series.reducer.ts"

interface TVShowResult {
  show: {
    id: number
    name: string
    premiered: string | null
  }
}

interface AddSeriesProps {
  dispatchSeries: Dispatch<SeriesAction>
}

export function AddSeries({ dispatchSeries }: AddSeriesProps) {
  const [query, setQuery] = useState("")
  const [shows, setShows] = useState<TVShowResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<boolean>(false)

  const fetchShows = async () => {
    if (!query.trim()) return
    setIsLoading(true)
    setError(false)
    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`,
      )
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = (await response.json()) as TVShowResult[]
      setShows(data)
    } catch (error: unknown) {
      console.warn(error)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetchShows()
  }

  return (
    <div>
      <form className="input-group" onSubmit={onSubmit}>
        <input
          required
          className="input w-24 md:w-32 input-sm"
          type="text"
          value={query}
          placeholder="New series..."
          onChange={e => {
            setQuery(e.target.value)
          }}
          list="shows"
        />
        <datalist id="shows">
          {shows.map(item => (
            <option
              key={item.show.id}
              value={`${item.show.name} (${item.show.premiered?.substring(0, 4) ?? "N/A"})`}
            />
          ))}
        </datalist>
        <button className="btn btn-primary btn-sm" type="submit">
          Add
        </button>
      </form>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {/*<div className="dropdown">*/}
      {/*<ul className="menu bg-base-200 rounded-box w-56 z-[1]">*/}
      {/*  {shows.map(item => (*/}
      {/*    <li key={item.show.id}>{item.show.name}</li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
      {/*</div>*/}
    </div>
  )
}
