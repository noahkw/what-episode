import { Dispatch, FormEvent, useEffect, useState } from "react"
import { SeriesAction } from "../reducers/series.reducer.ts"
import { Combobox } from "react-widgets/cjs/index"

interface ImageResult {
  medium: string
}

interface TVShowResult {
  show: {
    id: number
    name: string
    premiered: string | null
    image: ImageResult
  }
}

interface SeasonResult {
  id: number
  episodeOrder: number | null
  image: ImageResult
}

interface AddSeriesProps {
  dispatchSeries: Dispatch<SeriesAction>
}

export function AddSeries({ dispatchSeries }: AddSeriesProps) {
  const [query, setQuery] = useState("")
  const [shows, setShows] = useState<TVShowResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim()) {
        void fetchShows()
      }
    }, 2000)

    return () => {
      clearTimeout(handler)
    }
  }, [query])

  const fetchShows = async () => {
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

  const fetchSeasons = async (show: TVShowResult) => {
    setIsLoading(true)
    setError(false)
    try {
      const response = await fetch(
        `https://api.tvmaze.com/shows/${show.show.id.toString()}/seasons`,
      )
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return (await response.json()) as SeasonResult[]
    } catch (error: unknown) {
      console.warn(error)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!query) {
      return
    }

    setQuery("")

    dispatchSeries({
      type: "create",
      series: {
        seriesId: crypto.randomUUID(),
        seasons: [],
        title: query,
        imageUrl: null,
      },
    })
  }

  async function setShow(id: number) {
    const show = shows.find(item => item.show.id === id)

    if (show) {
      const seasons = await fetchSeasons(show)

      if (!seasons) {
        alert("Failed loading seasons... :(")
        return
      }

      dispatchSeries({
        type: "create",
        series: {
          title: show.show.name,
          imageUrl: show.show.image.medium,
          seriesId: crypto.randomUUID(),
          seasons: seasons.map(season => ({
            seasonId: season.id.toString(),
            episodeCount: season.episodeOrder ?? 0,
            currentEpisode: 0,
          })),
        },
      })
    }

    setQuery("")
  }

  return (
    <div>
      <form className="input-group" onSubmit={onSubmit}>
        <Combobox
          busy={isLoading}
          data={shows}
          value={query}
          filter={() => true}
          onChange={value => {
            if (typeof value === "string") {
              setQuery(value)
            } else {
              void setShow(value.show.id)
            }
          }}
          renderListItem={({ item }) => (
            <span>
              {item.show.name} ({item.show.premiered?.substring(0, 4) ?? "N/A"})
            </span>
          )}
        ></Combobox>
        <button className="btn btn-primary btn-sm" type="submit">
          Add
        </button>
      </form>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  )
}
