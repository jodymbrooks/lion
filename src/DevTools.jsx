import React from "react";
import LogMonitor from "redux-devtools-log-monitor";
import DockMonitor from "redux-devtools-dock-monitor";
import { createDevTools } from "redux-devtools";

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-x"
    changePositionKey="ctrl-z"
    defaultIsVisible={false}
    defaultPosition="left"
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
);

export default DevTools;
