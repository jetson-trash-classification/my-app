import React, { PureComponent } from "react";
import ReactEcharts from "echarts-for-react";
import Paper from '@mui/material/Paper';
import axios from 'axios'
import { typeZhMap } from '../public'


class Pie extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    axios.get('http://192.168.50.1:3001/analysis', {
      params: {
        type: 'pie'
      }
    }).then(
      (res) => {
        this.setState({
          ...this.state,
          data: [...res.data].map((dataObj) => {
            console.log(`${typeZhMap[dataObj.name]}垃圾`)
            return { ...dataObj, name: `${typeZhMap[dataObj.name]}垃圾` }
          })
        })
      },
      (err) => {
        console.log(err)
      }
    )
  }

  getOption = () => ({
    title: {
      text: "垃圾种类占比",
      x: "center"
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        name: "垃圾分类占比",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        animationDuration: 5000,
        data: this.state.data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  });

  render() {
    return (
      <ReactEcharts
        option={this.getOption()}
        style={{ height: "200px", width: "100%" }}
      />
    );
  }

}

class Bar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [{}]
    }
  }

  componentDidMount() {
    axios.get('http://192.168.50.1:3001/analysis', {
      params: {
        type: 'bar'
      }
    }).then(
      (res) => {
        this.setState({ ...this.state, data: [...res.data] })
      },
      (err) => {
        console.log(err)
      }
    )
  }
  getOption = () => ({
    title: {
      text: "垃圾投放量分析"
    },
    tooltip: {
      trigger: "axis"
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: "category",
      data: this.state.data ? this.state.data.map((dataObj) => {
        return dataObj.day
      }) : [],
    },
    yAxis: {
      type: "value"
    },
    series:
      Object.keys(typeZhMap).map((typeObj) => {
        return {
          name: `${typeZhMap[typeObj]}垃圾数量`,
          type: "line",
          data: this.state.data ? this.state.data.map((dataObj) => {
            return dataObj[typeObj]
          }) : [],
          animationDuration: 5000
        }
      })
  });

  render() {
    return (
      <ReactEcharts
        option={this.getOption()}
        style={{ height: "250px", width: "100%" }}
      />
    );
  }
}


export default function Analysis() {

  return (
    <React.Fragment>
      <Paper style={{ margin: "20px" }}>
        <Pie />
      </Paper>
      <Paper style={{ margin: "20px" }}>
        <Bar />
      </Paper>
    </React.Fragment>
  )
};
