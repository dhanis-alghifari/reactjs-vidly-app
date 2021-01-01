import React, { Component } from "react";

export default class LikeButton extends Component {
  render() {
    const { liked, onClick } = this.props;
    let classes = "fa fa-heart";
    if (!liked) classes += "-o";
    return (
      <i
        onClick={onClick}
        style={{ cursor: "pointer" }}
        className={classes}
        aria-hidden="true"
      />
    );
  }
}
