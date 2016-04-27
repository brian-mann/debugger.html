"use strict";

/* Selectors */
function getSources(state) {
  return state.sources.get("sources");
}

function getSourcesText(state) {
  return state.sources.get("sourcesText");
}

function getSelectedSource(state) {
  return state.sources.get("selectedSource");
}

function getSelectedSourceOpts(state) {
  return state.sources.get("selectedSourceOpts");
}

function getBreakpoint(state, location) {
  return state.breakpoints.getIn(["breakpoints", makeLocationId(location)]);
}

function getBreakpoints(state) {
  return state.breakpoints.get("breakpoints");
}

function getBreakpointsForSource(state, sourceActor) {
  return state.breakpoints.get("breakpoints").filter(bp => {
    return bp.getIn(["location", "actor"]) === sourceActor;
  });
}

function getTabs(state) {
  return state.tabs.get("tabs");
}

function getSelectedTab(state) {
  return state.tabs.get("selectedTab");
}

function getPause(state) {
  return state.pause.get("pause");
}

/* selectors */
function getSource(state, actor) {
  return getSources(state).get(actor);
}

function getSourceCount(state) {
  return getSources(state).size;
}

function getSourceByURL(state, url) {
  return getSources(state).find(source => source.get("url") == url);
}

function getSourceByActor(state, actor) {
  return getSources(state).find(source => source.get("actor") == actor);
}

function getSourceText(state, actor) {
  return getSourcesText(state).get(actor);
}

function isCurrentlyPausedAtBreakpoint(state, breakpoint) {
  const pause = getPause(state);

  if (!pause || pause.get("isInterrupted")) {
    return false;
  }

  const breakpointLocation = makeLocationId(breakpoint.get("location").toJS());
  const pauseLocation = makeLocationId(pause.getIn(["frame", "where"]).toJS());

  return breakpointLocation == pauseLocation;
}

/**
 * @param object - location
 */
function makeLocationId(location) {
  return location.actor + ":" + location.line.toString();
}

module.exports = {
  getSource,
  getSources,
  getSourceCount,
  getSourceByURL,
  getSourceByActor,
  getSelectedSource,
  getSelectedSourceOpts,
  getSourceText,
  getBreakpoint,
  getBreakpoints,
  getBreakpointsForSource,
  getTabs,
  getSelectedTab,
  getPause,
  makeLocationId,
  isCurrentlyPausedAtBreakpoint
};
