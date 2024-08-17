import logo from './assets/logo.svg';
import './App.css';
import {Series} from "./components/Series";
import {Series as ISeries} from "./models/series.ts";
import {useReducer} from "react";
import {seriesReducer} from "./reducers/series.reducer.ts";
import {SeriesContext} from "./context/series.context.ts";

function App() {
    const [series, dispatchSeries] = useReducer(seriesReducer, {
        series: [{
            seriesId: 0,
            seasons: [
                {seasonId: 0, episodeCount: 3},
                {seasonId: 1, episodeCount: 5},
            ],
            title: 'Kackserie',
        }, {
            seriesId: 1,
            seasons: [
                {seasonId: 0, episodeCount: 20},
            ],
            title: 'Schmackserie',
        }],
    })

    return (
        <div className="App">
            <header className="header">
                <img src={logo} className="logo" alt="logo"/>
                <div>My Series</div>
                <div>
                    Total episodes watched:
                    {
                        series.series.reduce((prev, cur) => {
                            return prev + cur.seasons.reduce((prev, cur) => {
                                return prev + (cur.currentEpisode ?? 0)
                            }, 0)
                        }, 0)
                    }
                </div>

                <SeriesContext.Provider value={{dispatchSeries}}>
                    {
                        series.series.map((s: ISeries) =>
                            <Series key={s.seriesId} series={s}></Series>)
                    }
                </SeriesContext.Provider>
            </header>
        </div>
    );
}

export default App;
