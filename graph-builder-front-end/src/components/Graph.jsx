import * as React from "react";
import * as css from "../css/graph.module.css";
import * as cssParent from "../css/parent.module.css";

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
  }

  drawAxis = (context, canvas) => {
    context.beginPath();
    context.strokeStyle = "#000000";
    context.lineWidth = 1;
    context.moveTo(canvas.width / 2 + 0.5, 0.5);
    context.lineTo(canvas.width / 2 + 0.5, canvas.height + 0.5);
    context.stroke();

    context.beginPath();
    context.moveTo(0, (canvas.height / 2) + 0.5);
    context.lineTo(canvas.width, (canvas.height / 2) + 0.5);
    context.stroke();
  }

  componentDidMount() {
    this.buildGraph()
  }

  componentDidUpdate() {
    this.buildGraph()
  }

  buildGraph() {
    let i;
    const canvas = this.refs.canvas
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height)
    this.drawAxis(context, canvas)
    context.beginPath();
    context.lineJoin = "round";
    context.strokeStyle = "black";
    let data = this.props.data
    if (data && data.length > 0) {
      context.moveTo((data[0].x + canvas.width / 2) + 0.5,
          (canvas.height / 2 - data[0].y) + 0.5);
      for (i = 1; i < data.length; i++) {
        context.lineTo((data[i].x + canvas.width / 2) + 0.5,
            (canvas.height / 2 - data[i].y) + 0.5);
        context.stroke();
      }
    }
  }

  render() {

    return (
        <canvas
            className={css.calculator_graph + ' ' + cssParent.fit_parent_div}
            ref="canvas" width={300} height={300}/>
    );
  }
}

