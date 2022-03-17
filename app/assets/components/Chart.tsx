import {
    VictoryLine,
    VictoryChart,
    VictoryTheme,
    VictoryAxis,
    VictoryContainer,
    VictoryLabel,
    VictoryVoronoiContainer
} from "victory-native";

import React, { useState } from "react";

import {
    View,
    
} from "react-native";


class Group extends React.Component {
    render() {
        console.log(this.props);
        return <g> {this.props.children} </g>
    }
}




export default function FullChart() {



    const styles = getStyles();
    const dataSetOne = getDataSetOne();
    const dataSetTwo = getDataSetTwo();
    const tickValues = getTickValues();



    return (
        <View style={{ height: 200, width: 100 }}>
            <Group>
                
                <VictoryAxis
                    scale="time"
                    standalone={false}
                    style={{
                        axis: { stroke: "black", strokeWidth: 1 },
                        ticks: {
                            size: ({ tick }) => {
                                const tickSize =
                                    tick.getFullYear() % 5 === 0 ? 10 : 5;
                                return tickSize;
                            },
                            stroke: "black",
                            strokeWidth: 1
                        },
                        tickLabels: {
                            fill: "black",
                            fontFamily: "inherit",
                            fontSize: 16
                        }
                    }}
                    tickValues={tickValues}
                    tickFormat={
                        (x) => {
                            if (x.getFullYear() === 2000) {
                                return x.getFullYear();
                            }
                            if (x.getFullYear() % 5 === 0) {
                                return x.getFullYear().toString().slice(2);
                            }
                        }
                    }
                />

               
                <VictoryLine
                    data={[
                        { x: new Date(1999, 1, 1), y: 10 },
                        { x: new Date(2014, 6, 1), y: 10 }
                    ]}

                    scale={{ x: "time", y: "linear" }}
                    standalone={false}
                    style={styles.lineThree}
                />

               
                <VictoryLine
                    data={dataSetOne}

                    interpolation="monotoneX"
                    scale={{ x: "time", y: "linear" }}
                    standalone={false}
                    style={styles.lineOne}
                />

         
                <VictoryLine
                    data={dataSetTwo}
                    interpolation="monotoneX"
                    scale={{ x: "time", y: "linear" }}
                    standalone={false}
                    style={styles.lineTwo}
                />
            </Group>
        </View>
        )
    }


      
    function getDataSetOne() {
        return [
            { x: new Date(2000, 1, 1), y: 12 },
            { x: new Date(2000, 6, 1), y: 10 },
            { x: new Date(2000, 12, 1), y: 11 },
            { x: new Date(2001, 1, 1), y: 5 },
            { x: new Date(2002, 1, 1), y: 4 },
            { x: new Date(2003, 1, 1), y: 6 },
            { x: new Date(2004, 1, 1), y: 5 },
            { x: new Date(2005, 1, 1), y: 7 },
            { x: new Date(2006, 1, 1), y: 8 },
            { x: new Date(2007, 1, 1), y: 9 },
            { x: new Date(2008, 1, 1), y: -8.5 },
            { x: new Date(2009, 1, 1), y: -9 },
            { x: new Date(2010, 1, 1), y: 5 },
            { x: new Date(2013, 1, 1), y: 1 },
            { x: new Date(2014, 1, 1), y: 2 },
            { x: new Date(2015, 1, 1), y: -5 }
        ];
    }

    function getDataSetTwo() {
        return [
            { x: new Date(2000, 1, 1), y: 5 },
            { x: new Date(2003, 1, 1), y: 6 },
            { x: new Date(2004, 1, 1), y: 4 },
            { x: new Date(2005, 1, 1), y: 10 },
            { x: new Date(2006, 1, 1), y: 12 },
            { x: new Date(2007, 2, 1), y: 48 },
            { x: new Date(2008, 1, 1), y: 19 },
            { x: new Date(2009, 1, 1), y: 31 },
            { x: new Date(2011, 1, 1), y: 49 },
            { x: new Date(2014, 1, 1), y: 40 },
            { x: new Date(2015, 1, 1), y: 21 }
        ];
    }

    function getTickValues() {
        return [
            new Date(1999, 1, 1),
            new Date(2000, 1, 1),
            new Date(2001, 1, 1),
            new Date(2002, 1, 1),
            new Date(2003, 1, 1),
            new Date(2004, 1, 1),
            new Date(2005, 1, 1),
            new Date(2006, 1, 1),
            new Date(2007, 1, 1),
            new Date(2008, 1, 1),
            new Date(2009, 1, 1),
            new Date(2010, 1, 1),
            new Date(2011, 1, 1),
            new Date(2012, 1, 1),
            new Date(2013, 1, 1),
            new Date(2014, 1, 1),
            new Date(2015, 1, 1),
            new Date(2016, 1, 1)
        ];
    }

    function getStyles() {
        const BLUE_COLOR = "#00a3de";
        const RED_COLOR = "#7c270b";

        return {
            parent: {
                background: "#ccdee8",
                boxSizing: "border-box",
                display: "inline",
                padding: 0,
                fontFamily: "'Fira Sans', sans-serif"
            },
            title: {
                textAnchor: "start",
                verticalAnchor: "end",
                fill: "#000000",
                fontFamily: "inherit",
                fontSize: "18px",
                fontWeight: "bold"
            },
            labelNumber: {
                textAnchor: "middle",
                fill: "#ffffff",
                fontFamily: "inherit",
                fontSize: "14px"
            },

            // INDEPENDENT AXIS
            axisYears: {
                axis: { stroke: "black", strokeWidth: 1 },
                ticks: {
                    size: ({ tick }) => {
                        const tickSize =
                            tick.getFullYear() % 5 === 0 ? 10 : 5;
                        return tickSize;
                    },
                    stroke: "black",
                    strokeWidth: 1
                },
                tickLabels: {
                    fill: "black",
                    fontFamily: "inherit",
                    fontSize: 16
                }
            },

            // DATA SET ONE
            axisOne: {
                grid: {
                    stroke: ({ tick }) =>
                        tick === -10 ? "transparent" : "#ffffff",
                    strokeWidth: 2
                },
                axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
                ticks: { strokeWidth: 0 },
                tickLabels: {
                    fill: BLUE_COLOR,
                    fontFamily: "inherit",
                    fontSize: 16
                }
            },
            labelOne: {
                fill: BLUE_COLOR,
                fontFamily: "inherit",
                fontSize: 12,
                fontStyle: "italic"
            },
            lineOne: {
                data: { stroke: BLUE_COLOR, strokeWidth: 4.5 }
            },
            axisOneCustomLabel: {
                fill: BLUE_COLOR,
                fontFamily: "inherit",
                fontWeight: 300,
                fontSize: 21
            },

            // DATA SET TWO
            axisTwo: {
                axis: { stroke: RED_COLOR, strokeWidth: 0 },
                tickLabels: {
                    fill: RED_COLOR,
                    fontFamily: "inherit",
                    fontSize: 16
                }
            },
            labelTwo: {
                textAnchor: "end",
                fill: RED_COLOR,
                fontFamily: "inherit",
                fontSize: 12,
                fontStyle: "italic"
            },
            lineTwo: {
                data: { stroke: RED_COLOR, strokeWidth: 4.5 }
            },

            // HORIZONTAL LINE
            lineThree: {
                data: { stroke: "#e95f46", strokeWidth: 2 }
            }
    }
}





