import React, { PureComponent } from "react";
import ReactEcharts from "echarts-for-react";
import Paper from '@mui/material/Paper';

class Pie extends PureComponent {

  getOption = () => ({
    title: {
      text: "垃圾种类占比",
      x: "center"
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // legend: {
    //   orient: "vertical",
    //   left: "left",
    //   data: ["有害垃圾", "可回收垃圾", "厨余垃圾", "其他垃圾"]
    // },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        animationDuration: 5000,
        data: [
          { value: 335, name: "有害垃圾" },
          { value: 310, name: "可回收垃圾" },
          { value: 234, name: "其他垃圾" },
          { value: 135, name: "厨余垃圾" },
        ],
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
  getOption = () => ({
    title: {
      text: "垃圾投放量分析"
    },
    tooltip: {
      trigger: "axis"
    },
    // legend: {
    //   data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
    // },
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
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        name: "可回收垃圾",
        type: "bar",
        data: [120, 132, 101, 134, 90, 230, 210],
        animationDuration: 5000
      },
      {
        name: "其他垃圾",
        type: "line",
        data: [220, 182, 191, 234, 290, 330, 310],
        animationDuration: 5000
      }
    ]
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
      <Paper style={{margin:"20px"}}>
        <Pie />
      </Paper>
      <Paper style={{margin:"20px"}}>
        <Bar />
      </Paper>
    </React.Fragment>
  )
};
