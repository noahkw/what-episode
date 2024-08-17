import {createContext} from "react";
import {SeriesAction} from "../reducers/series.reducer.ts";

interface SeriesContextType {
    dispatchSeries: (action: SeriesAction) => void
}

export const SeriesContext = createContext<SeriesContextType>({
    dispatchSeries: () => {
        console.log('I am useless')
    }
})
