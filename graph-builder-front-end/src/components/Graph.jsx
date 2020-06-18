import * as React from "react";
import * as css from "../css/graph.module.css";
import * as cssParent from "../css/parent.module.css";

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let i;
    const canvas1 = this.refs.canvas
    let context = canvas1.getContext("2d");
    context.beginPath();
    context.lineJoin = "round";
    context.strokeStyle = "black";
    context.moveTo(0, canvas1.height);
    for (i = 1; i < 100; i++) {
      debugger
      context.lineTo(i, canvas1.height - i);
    }
    context.stroke();
  }

  componentDidUpdate() {
  }

  render() {

    return (
        <canvas
            className={css.calculator_graph + ' ' + cssParent.fit_parent_div}
            ref="canvas" width={300} height={300}/>
    );
  }
}

