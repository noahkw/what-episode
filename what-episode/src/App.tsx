import logo from './assets/logo.svg';
import './App.css';
import {Series} from "./components/Series";
import {useLocalStorage} from "./hooks/local-storage.hook.ts";
import {Series as ISeries} from "./models/series.ts";

function App() {
    const [value, setValue] = useLocalStorage<ISeries[]>("series", [])

    return (
        <div className="App">
            <header className="header">
                <img src={logo} className="logo" alt="logo"/>
                <div>My Series</div>
                <Series
                    value={value}
                    setValue={setValue}
                    series={{
                        seriesId: 0,
                        seasons: [
                            {seasonId: 0, episodeCount: 3},
                            {seasonId: 1, episodeCount: 5},
                        ],
                        title: 'Kackserie'
                    }}></Series>
                <Series
                    value={value}
                    setValue={setValue}
                    series={{
                        seriesId: 1,
                        seasons: [
                            {seasonId: 0, episodeCount: 20},
                        ],
                        title: 'Schmackserie'
                    }}></Series>
            </header>
        </div>
    );
}

export default App;
