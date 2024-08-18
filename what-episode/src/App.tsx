import logo from "./assets/logo.svg"
import "./App.css"
import { Series } from "./components/Series"
import { Series as ISeries } from "./models/series.ts"
import { useEffect, useReducer } from "react"
import { seriesReducer } from "./reducers/series.reducer.ts"
import { SeriesContext } from "./context/series.context.ts"
import { useLocalStorage } from "./hooks/local-storage.hook.ts"
import { AddSeries } from "./components/AddSeries.tsx"

function App() {
  const [initialSeries, persistSeries] = useLocalStorage<ISeries[]>(
    "series",
    [],
  )

  const [seriesState, dispatchSeries] = useReducer(seriesReducer, {
    series: initialSeries,
  })

  useEffect(() => {
    persistSeries(seriesState.series)
  }, [persistSeries, seriesState.series])

  return (
    <div className="App h-screen overflow-hidden">
      <header className="flex flex-row header bg-primary-content px-10 items-center">
        <img src={logo} className="logo" alt="logo" />
        <h1 className="h-full text-2xl hidden md:block">What Episode?!</h1>
        <div className="flex-1"></div>
        <div className="add-series-container">
          <AddSeries dispatchSeries={dispatchSeries} />
        </div>
      </header>
      <div className="bg-primary-content h-full">
        <div className="flex flex-col gap-1 items-center h-full">
          Total episodes watched:
          {seriesState.series.reduce((prev, cur) => {
            return (
              prev +
              cur.seasons.reduce((prev, cur) => {
                return prev + (cur.currentEpisode ?? 0)
              }, 0)
            )
          }, 0)}
          <SeriesContext.Provider value={{ dispatchSeries }}>
            {seriesState.series.map((s: ISeries) => (
              <Series key={s.seriesId} series={s}></Series>
            ))}
          </SeriesContext.Provider>
        </div>
      </div>
    </div>
  )
}

export default App
