import logo from './assets/logo.svg';
import './App.css';
import {Series} from "./components/Series";
import {Series as ISeries} from "./models/series.ts";
import {useEffect, useReducer} from "react";
import {seriesReducer} from "./reducers/series.reducer.ts";
import {SeriesContext} from "./context/series.context.ts";
import {useLocalStorage} from "./hooks/local-storage.hook.ts";
import {AddSeries} from "./components/AddSeries.tsx";

function App() {
    const [initialSeries, persistSeries] = useLocalStorage<ISeries[]>("series", []);

    const [seriesState, dispatchSeries] = useReducer(seriesReducer, {
        series: initialSeries,
    })

    useEffect(() => {
        persistSeries(seriesState.series)
    }, [persistSeries, seriesState.series])

    return (
        <div className="App">
            <header className="header">
                <img src={logo} className="logo" alt="logo"/>
                <AddSeries dispatchSeries={dispatchSeries} />
                <div>My Series</div>
                <div>
                    Total episodes watched:
                    {
                        seriesState.series.reduce((prev, cur) => {
                            return prev + cur.seasons.reduce((prev, cur) => {
                                return prev + (cur.currentEpisode ?? 0)
                            }, 0)
                        }, 0)
                    }
                </div>

                <SeriesContext.Provider value={{dispatchSeries}}>
                    {
                        seriesState.series.map((s: ISeries) =>
                            <Series key={s.seriesId} series={s}></Series>)
                    }
                </SeriesContext.Provider>
            </header>
        </div>
    );
}

export default App;
