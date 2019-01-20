import React from "react";
import { connect } from "react-redux";

import "../App.css";

function Overlay(props) {
  return !props.common.overlayShown ? null : <div className="Overlay" />;
}

function mapStateToProps(state) {
  return {
    common: state.common
  };
}

export default connect(mapStateToProps)(Overlay);
