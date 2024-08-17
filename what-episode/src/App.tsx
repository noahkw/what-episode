import logo from './assets/logo.svg';
import './App.css';
import {Series} from "./components/Series";

function App() {
    return (
        <div className="App">
            <header className="header">
                <img src={logo} className="logo" alt="logo"/>
                <div>My Series</div>
                <Series series={{
                    seasons: [
                        {seasonId: 0, episodeCount: 3},
                        {seasonId: 1, episodeCount: 5},
                    ],
                    title: 'Kackserie'
                }}></Series>
            </header>
        </div>
    );
}

export default App;
