import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
// import "./convert";
import echarts from "echarts";
import geojson from "./geojson";

console.log("geojson", geojson);

function randomValue() {
  const value = Math.round(Math.random() * 10);
  console.log("value", value);
  return value;
}

class App extends Component {
  componentDidMount() {
    // var dom = document.getElementById("container");
    console.log("container", document.getElementById("container"));
    console.log(this.container);
    // document.lastModified()
    if (!this.container) return;
    this.shipChart = echarts.init(this.container, {}, {
      // renderer: "svg"
    });
    echarts.registerMap("ship", geojson);

    var option = {
      // title: {
      //   // text: "自定义地图",
      //   // subtext: "我的自定义地图",
      //   sublink: "",
      //   left: "right"
      // },
      tooltip: {
        trigger: "item",
        showDelay: 0,
        transitionDuration: 0.2,
        // formatter: function(params) {
        //   // console.log('params',params);
        //   var value = (params.value + "").split(".");
        //   value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,");
        //   return (
        //     params.seriesName + "<br/>" + params.name + ": " + params.dataIndex
        //   );
        // }
      },
      // geo: {
      //   map: "ship",
      //   roam: true,
      //   label: {
      //     normal: {
      //       show: true,
      //       textStyle: {
      //         color: "rgba(0,0,0,0.4)"
      //       }
      //     }
      //   },
      //   itemStyle: {
      //     normal: {
      //       show: true,
      //       borderColor: "rgba(0, 0, 0, 0.2)"
      //     },
      //     emphasis: {
      //       show: true,
      //       areaColor: null,
      //       shadowOffsetX: 0,
      //       shadowOffsetY: 0,
      //       shadowBlur: 20,
      //       borderWidth: 0,
      //       shadowColor: "rgba(0, 0, 0, 0.5)"
      //     }
      //   }
      // },
      // toolbox: {
      //   show: true,
      //   orient: "vertical",
      //   left: "right",
      //   top: "center",
      //   feature: {
      //     dataView: { readOnly: false },
      //     restore: {},
      //     saveAsImage: {}
      //   }
      // },
      // legend: {
      //   type: "scroll",
      //   bottom: 10,
      //   data: ["sdsdasd","sdasdfa"]
      // },
      visualMap: {
        top: "top",
        left: "center",
        type: "piecewise",
        // align:"left",
        orient:"horizontal",
        // show: false,
        // min: 0,
        // max: 1,
        // range:[0,1],
        // text: ["High", "Low"],
        // realtime: false,
        // calculable: true,
        // categories: ["严重污染", "重度污染"],
        // inRange: {

        //   color: ["#ffffff", "#ffffff", "#5de496"]
        // },
        pieces: [
          { value: 0, label: "未完成", color: "#dddddd" },
          { value: 1, label: "已完成", color: "#5de496" }
        ]
        // inRange: {
        //   symbolSize: 30,
        //   symbol: {
        //     严重污染: "diamond",
        //     "": "circle"
        //   }
        // }

        // formatter: function(value) {
        //   return value;
        // }
      },
      // visualMap: {
      //     left: 'right',
      //     min: 500000,
      //     max: 38000000,
      //     inRange: {
      //         color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      //     },
      //     text:['High','Low'],           // 文本，默认为数值文本
      //     calculable: true
      // },
      // toolbox: {
      //     show: true,
      //     //orient: 'vertical',
      //     left: 'left',
      //     top: 'top',
      //     feature: {
      //         dataView: {readOnly: false},
      //         restore: {},
      //         saveAsImage: {}
      //     }
      // },
      series: [
        {
          name: "完成状态",
          type: "map",
          roam: true,
          mapType: "ship", // 自定义扩展图表类型
          itemStyle: {
            normal: { label: { show: true } },
            emphasis: { label: { show: true } }
          },
          data: [
            { name: "915", value: 0 },
            { name: "914", value: 0 },
            { name: "923", value: 1 },
            { name: "913", value: 0 },
            { name: "922", value: 0 },
            { name: "912", value: 0 },
            { name: "932", value: 0 },
            { name: "921", value: 0 },
            { name: "931", value: 0 },
            { name: "911", value: 1 },
            { name: "301", value: 1 },
            { name: "203", value: 1 },
            { name: "202", value: 1 },
            { name: "111", value: 1 },
            { name: "101", value: 1 },
            { name: "112", value: 1 },
            { name: "102", value: 1 },
            { name: "201", value: 1 },
            { name: "810", value: 1 }
            // { "24": "914" },
            // { "15": "923" },
            // { "16": "913" },
            // { "17": "922" },
            // { "18": "912" },
            // { "19": "932" },
            // { "20": "921" },
            // { "21": "931" },
            // { "22": "911" },
            // { "23": "23" },
            // { "13": "301" },
            // { "14": "203" },
            // { "12": "202" },
            // { "2": "111" },
            // { "3": "101" },
            // { "5": "112" },
            // { "4": "102" },
            // { "10": "201" },
            // { "11": "810" }
            // { name: "中西区", value: 20057.34 },
            // { name: "湾仔", value: 15477.48 },
            // { name: "东区", value: 31686.1 },
            // { name: "南区", value: 6992.6 },
            // { name: "油尖旺", value: 44045.49 },
            // { name: "深水埗", value: 40689.64 },
            // { name: "九龙城", value: 37659.78 },
            // { name: "黄大仙", value: 45180.97 },
            // { name: "观塘", value: 55204.26 },
            // { name: "葵青", value: 21900.9 },
            // { name: "荃湾", value: 4918.26 },
            // { name: "屯门", value: 5881.84 },
            // { name: "元朗", value: 4178.01 },
            // { name: "北区", value: 2227.92 },
            // { name: "大埔", value: 2180.98 },
            // { name: "沙田", value: 9172.94 },
            // { name: "西贡", value: 3368 },
            // { name: "离岛", value: 806.98 }
          ],
          // 自定义名称映射
          nameMap: {
            "7": "",
            "8": "",
            "9": "",
            "6": "915",
            "24": "914",
            "15": "923",
            "16": "913",
            "17": "922",
            "18": "912",
            "19": "932",
            "20": "921",
            "21": "931",
            "22": "911",
            "23": "23",
            "13": "301",
            "14": "203",
            "12": "202",
            "2": "111",
            "3": "101",
            "5": "112",
            "4": "102",
            "10": "201",
            "11": "810"
          }
        }
        // {
        //   name: "Part",
        //   type: "map",

        //   label: {
        //     normal: {
        //       show: true
        //     },
        //     emphasis: {
        //       show: true
        //     }
        //   },
        //   itemStyle: {
        //     normal: { label: { show: true } },
        //     emphasis: { label: { show: true } }
        //   },
        //   // geoIndex: 0,
        //   // tooltip: {show: true},

        //   data: [
        //     { name: "1", value: randomValue() },
        //     { name: "2", value: randomValue() },
        //     { name: "3", value: randomValue() },
        //     { name: "4", value: randomValue() },
        //     { name: "5", value: randomValue() },
        //     { name: "6", value: randomValue() },
        //     { name: "7", value: randomValue() },
        //     { name: "8", value: randomValue() },
        //     { name: "9", value: randomValue() },
        //     { name: "10", value: randomValue() },
        //     { name: "11", value: randomValue() },
        //     { name: "12", value: randomValue() },
        //     { name: "13", value: randomValue() },
        //     { name: "14", value: randomValue() },
        //     { name: "15", value: randomValue() },
        //     { name: "16", value: randomValue() },
        //     { name: "17", value: randomValue() },
        //     { name: "18", value: randomValue() },
        //     { name: "19", value: randomValue() },
        //     { name: "20", value: randomValue() },
        //     { name: "21", value: randomValue() },
        //     { name: "22", value: randomValue() },
        //     { name: "23", value: randomValue() },
        //     { name: "24", value: randomValue() }
        //   ],
        //   nameMap: { "6": "915","24":"四大发明" }
        // }
      ]
    };
    console.log(option);
    this.shipChart.setOption(option, true);
  }

  render() {
    return (
      <div
        id="container"
        className="app"
        style={{
          height: "100vh",
          width: "100%",
          // border: "1px solid red",
          position: "relative"
        }}
        ref={el => {
          console.log("el", el);
          this.container = el;
        }}
      />
    );
  }
}

export default App;
