import { assign } from "lodash";

// *
// * Colors
// *
const colors = [
    "#252525",
    "#525252",
    "#737373",
    "#969696",
    "#bdbdbd",
    "#d9d9d9",
    "#f0f0f0"
];
const blueGrey50 = "#ECEFF1";
const blueGrey300 = "#90A4AE";
const blueGrey700 = "#455A64";
const grey900 = "#212121";
const charcoal = "#252525";
const grey = "#969696";
// *
// * Typography
// *
const sansSerif = "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif";
const letterSpacing = "normal";
const fontSize = 14;
// *
// * Layout
// *
const baseProps = {
    width: 450,
    height: 300,
    padding: 50,
    colorScale: colors
};
// *
// * Labels
// *
const baseLabelStyles = {
    fontFamily: sansSerif,
    fontSize,
    letterSpacing,
    padding: 10,
    fill: charcoal,
    stroke: "transparent"
};

const centeredLabelStyles = assign({ textAnchor: "middle" }, baseLabelStyles);
// *
// * Strokes
// *
const strokeLinecap = "round";
const strokeLinejoin = "round";

export default {
    axis: assign(
        {
            style: {
                axis: {
                    fill: "transparent",
                    stroke: charcoal,
                    strokeWidth: 1,
                    strokeLinecap,
                    strokeLinejoin
                },
                axisLabel: assign({}, centeredLabelStyles, {
                    padding: 25
                }),
                grid: {
                    fill: "none",
                    stroke: "white",
                    strokeLinecap,
                    strokeLinejoin,
                    pointerEvents: "painted"
                },
                ticks: {
                    fill: "transparent",
                    size: 5,
                    stroke: "black",
                    strokeWidth: 1,
                    strokeLinecap,
                    strokeLinejoin
                },
                tickLabels: baseLabelStyles
            }
        },
        baseProps
    ),
    group: assign(
        {
            colorScale: colors
        },
        baseProps
    ),
    line: assign(
        {
            style: {
                data: {
                    fill: "transparent",
                    stroke: charcoal,
                    strokeWidth: 2
                },
                labels: baseLabelStyles
            }
        },
        baseProps
    ),
    tooltip: {
        style: assign({}, baseLabelStyles, { padding: 0, pointerEvents: "none" }),
        flyoutStyle: {
            stroke: charcoal,
            strokeWidth: 1,
            fill: "#f0f0f0",
            pointerEvents: "none"
        },
        flyoutPadding: 5,
        cornerRadius: 5,
        pointerLength: 10
    },
};