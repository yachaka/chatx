
import { createSelector } from 'reselect'

export const selectGlobal = (state) => state.global
export const selectViewer = createSelector(
  selectGlobal,
  (global) => global.viewer
)

export const selectRooms = (state) => state.rooms