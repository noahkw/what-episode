import {Series as ISeries} from '../models/series'
import {Season} from "./Season"
import {ToggleButton} from "./ToggleButton"
import {useState} from "react"
import {useArrayIdStorage} from "../hooks/local-storage.hook.ts";


export function Series({series, value, setValue}: {
    series: ISeries,
    value: ISeries[],
    setValue: (value: ISeries[]) => void
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [seriesState, setSeriesState] = useArrayIdStorage(value, setValue, series.seriesId, (series: ISeries) => series.seriesId, series)

    function saveSeries() {
        console.log('seriesState', seriesState)
        setSeriesState({...seriesState, title: seriesState.title + 'a'})
    }

    return (
        <div className="series">
            <span>{series.title}</span>
            <ToggleButton toggled={isExpanded} setToggled={setIsExpanded}></ToggleButton>
            {!isExpanded
                ? null
                : series.seasons.map(season => {
                    return <Season key={season.seasonId} season={season}></Season>
                })}
            <button onClick={saveSeries}>Save</button>
        </div>
    )
}
