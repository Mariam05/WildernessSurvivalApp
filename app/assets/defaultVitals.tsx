import { Vital, Reading } from "../../schemas";

const avpuVital = new Vital({
    periodicity: 60,
    name: "AVPU",
    type: "Categorical",
    description: "Awake Verbal Pain Unresponsive",
    data: [],
    categories: [],
    timeElapsed: 0,
});

const skinVital = new Vital({
    periodicity: 60,
    name: "Skin",
    type: "Categorical",
    description: "warm, pink, blue, or white",
    data: [],
    categories: [],
    timeElapsed: 0,
});

const pulseVital = new Vital({
    periodicity: 60,
    name: "Pulse",
    type: "Numerical",
    description: "Beats per min",
    data: [],
    categories: [],
    timeElapsed: 0,
});

const respirationVital = new Vital({
    periodicity: 60,
    name: "Respiration",
    type: "Numerical",
    description: "breaths per minute",
    data: [
        new Reading({
            timestamp: "1640705088",
            value: 42,
            url: "",
        }),
    ],
    categories: [],
    timeElapsed: 0,
});

const temperatureVital = new Vital({
    periodicity: 60,
    name: "Temperature",
    type: "Numerical",
    description: "Temp Desc",
    data: [],
    categories: [],
    timeElapsed: 10,
});

const generalVital = new Vital({
    periodicity: 60,
    name: "General",
    type: "Special",
    description: "General notes",
    data: [
        new Reading({
            timestamp: "1640705088",
            value: "Patient has exhibited signs of hypothermia.",
        }),
        new Reading({
            timestamp: "1640708857",
            value: "Patient has fainted.",
        }),
        new Reading({
            timestamp: "1640712857",
            value: "Someone get help",
        }),
    ],
});

const photosVital = new Vital({
    periodicity: 60,
    name: "Photos",
    type: "Special",
    description: "Photo notes",
    data: [
        new Reading({
            timestamp: "1640705088",
            value: "Patient eyes",
            url: "https://georgiaeyephysicians.com/wp-content/uploads/2013/10/Treating-Your-Eye-Condition-with-Specialized-Surgery-300x238.jpg",
        }),
    ],
});


const quickVitals = [avpuVital.name, pulseVital.name, respirationVital.name, skinVital.name, temperatureVital.name];
const defaultVitals = [
    avpuVital,
    pulseVital,
    respirationVital,
    skinVital,
    photosVital,
    generalVital,
    temperatureVital,
];

export default defaultVitals
export { quickVitals }
