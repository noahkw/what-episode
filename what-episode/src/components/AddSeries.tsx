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

async function fetchThing<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error("fetch failed; url: " + url)
  }

  return (await response.json()) as T
}

const DEBOUNCE_TIMEOUT = 1000

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
    }, DEBOUNCE_TIMEOUT)

    return () => {
      clearTimeout(handler)
    }
  }, [query])

  const fetchShows = async () => {
    setIsLoading(true)

    try {
      const shows = await fetchThing<TVShowResult[]>(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`,
      )
      setShows(shows)
    } catch (e) {
      console.warn(e)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSeasons = async (show: TVShowResult) => {
    setIsLoading(true)

    try {
      return await fetchThing<SeasonResult[]>(
        `https://api.tvmaze.com/shows/${show.show.id.toString()}/seasons`,
      )
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
          className="w-40 sm:w-52 inline-block"
          busy={isLoading}
          data={shows}
          value={query}
          filter={() => true}
          onChange={value => {
            if (typeof value === "string") {
              setIsLoading(true)
              setQuery(value)
            } else {
              void setShow(value.show.id)
            }
          }}
          renderListItem={({ item }) => (
            <div className="flex gap-2">
              <img
                src={item.show.image.medium}
                alt={item.show.name}
                className="h-full w-8"
              ></img>
              <span>
                {item.show.name} (
                {item.show.premiered?.substring(0, 4) ?? "N/A"})
              </span>
            </div>
          )}
        ></Combobox>
        <button className="btn btn-primary btn-sm" type="submit">
          Add
        </button>
      </form>
      {error && <div>Error: {error}</div>}
    </div>
  )
}
