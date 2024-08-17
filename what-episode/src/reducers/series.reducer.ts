import {Season, Series} from "../models/series.ts";

interface SeriesState {
    series: Series[]
}

type UpdateSeriesAction = {
    type: "update"
    series: Series
}

type CreateSeriesAction = {
    type: "create"
    series: Series
}

type DeleteSeriesAction = {
    type: "delete"
    seriesId: Series["seriesId"]
}

type UpdateCurrentEpisodeAction = {
    type: "updateCurrentEpisode"
    seriesId: Series["seriesId"]
    seasonId: Season["seasonId"]
    newValue: number
}

export type SeriesAction = UpdateSeriesAction | CreateSeriesAction | DeleteSeriesAction | UpdateCurrentEpisodeAction

export function seriesReducer(state: SeriesState, action: SeriesAction): SeriesState {
    switch (action.type) {
        case "create":
            return {
                ...state,
                series: [...state.series, action.series],
            }
        case "update":
            return {
                ...state,
                series: state.series.map(s => s.seriesId === action.series?.seriesId ? action.series : s),
            }
        case "delete":
            return {
                ...state,
                series: state.series.filter(s => s.seriesId !== action.seriesId),
            }
        case "updateCurrentEpisode":
            console.log('updateCurrentEp', action.newValue)
            return {
                ...state,
                series: state.series.map(s => s.seriesId === action.seriesId ? {
                    ...s,
                    seasons: s.seasons.map(season => season.seasonId === action.seasonId ? {
                        ...season,
                        currentEpisode: action.newValue
                    } : season)
                } : s)
            }
    }
}

