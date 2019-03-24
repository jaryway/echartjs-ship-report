import React, { Component } from "react";
import "./convert";

export default class Converter extends Component {
  render() {
    return (
      <div className="app">
        <div class="span4" id="my-gui-container">
          <input id="files" type="file" name="files[]" />
        </div>
        <figure>
          <figcaption>Input Preview (with Paths)</figcaption>
          <div id="svg-original">
            <svg width="200" height="200">
              <rect x="160" y="10" width="30" height="30" />
              <circle cy="60" r="20" cx="140" />
              {/* <polygon fill="#cecece" points={`${points}`} /> */}
              <path fill="#cecece" d="m0,0 100,0 0,100-100 0z" />
              <path
                fill="#cecece"
                d="m100,100c0,0,0,0,100,0,0,0,0,0,0,100,0,0,0,0,-100,0z"
              />
            </svg>
          </div>
        </figure>
        <figure>
          <figcaption>Output Preview (with Polygons)</figcaption>
          <div id="svg-result" />
        </figure>
        <output id="viewbox" />
        <output id="output" />
      </div>
    );
  }
}
