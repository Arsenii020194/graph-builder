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

    let data = this.props.data
    for (i = 1; i < data.length; i++) {
      context.lineTo(data[i].x, canvas1.height - data[i].y);
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

