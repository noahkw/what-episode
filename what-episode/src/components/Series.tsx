import {Series as ISeries} from '../models/series'
import {Season} from "./Season";
import {ToggleButton} from "./ToggleButton";
import {useState} from "react";


export function Series({series}: {series: ISeries}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const seasonComponents = !isExpanded ? null : series.seasons.map(season => {
        return <Season key={season.seasonId} season={season}></Season>
    })

    return (
        <div className="series">
            <span>{series.title}</span>
            <ToggleButton initialState={false} setToggled={setIsExpanded}></ToggleButton>
            {seasonComponents}
        </div>
    )
}
