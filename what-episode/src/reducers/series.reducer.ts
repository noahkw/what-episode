import { Season, Series } from "../models/series.ts"

interface SeriesState {
  series: Series[]
}

interface UpdateSeriesAction {
  type: "update"
  series: Series
}

interface CreateSeriesAction {
  type: "create"
  series: Series
}

interface DeleteSeriesAction {
  type: "delete"
  seriesId: Series["seriesId"]
}

interface UpdateCurrentEpisodeAction {
  type: "updateCurrentEpisode"
  seriesId: Series["seriesId"]
  seasonId: Season["seasonId"]
  newValue: number
}

interface UpdateSeason {
  type: "updateSeason"
  seriesId: Series["seriesId"]
  season: Season
}

export type SeriesAction =
  | UpdateSeriesAction
  | CreateSeriesAction
  | DeleteSeriesAction
  | UpdateCurrentEpisodeAction
  | UpdateSeason

export function seriesReducer(
  state: SeriesState,
  action: SeriesAction,
): SeriesState {
  switch (action.type) {
    case "create":
      return {
        ...state,
        series: [...state.series, action.series],
      }
    case "update":
      return {
        ...state,
        series: state.series.map(s =>
          s.seriesId === action.series.seriesId ? action.series : s,
        ),
      }
    case "delete":
      return {
        ...state,
        series: state.series.filter(s => s.seriesId !== action.seriesId),
      }
    case "updateSeason":
      return {
        ...state,
        series: state.series.map(s =>
          s.seriesId === action.seriesId
            ? {
                ...s,
                seasons: s.seasons.map(season =>
                  season.seasonId === action.season.seasonId
                    ? {
                        ...season,
                        ...action.season,
                      }
                    : season,
                ),
              }
            : s,
        ),
      }
    case "updateCurrentEpisode":
      return {
        ...state,
        series: state.series.map(s =>
          s.seriesId === action.seriesId
            ? {
                ...s,
                seasons: s.seasons.map(season =>
                  season.seasonId === action.seasonId
                    ? {
                        ...season,
                        currentEpisode: action.newValue,
                      }
                    : season,
                ),
              }
            : s,
        ),
      }
  }
}
