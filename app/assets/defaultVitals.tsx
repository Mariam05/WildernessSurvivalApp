import { Vital, Reading } from "../../schemas";

const temperatureVital = new Vital({
    periodicity: 60,
    name: "Heat Check",
    type: "Numerical",
    description: "Temp Desc",
    data: [new Reading({
        timestamp: "1640705088",
        value: 42,
        url: ""
    }),
    new Reading({
        timestamp: "1640708857",
        value: 145,
    }),
    new Reading({
        timestamp: "1640712857",
        value: 21,
    })],
    categories: [],
    timeElapsed: 10,
})

const generalVital = new Vital({
    periodicity: 60,
    name: "General",
    type: "Special",
    description: "General notes",
    data: [new Reading({
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
    })],
})

const photosVital = new Vital({
    periodicity: 60,
    name: "Photos",
    type: "Special",
    description: "Photo notes",
    data: [new Reading({
        timestamp: "1640705088",
        value: "Patient eyes",
        url: "https://georgiaeyephysicians.com/wp-content/uploads/2013/10/Treating-Your-Eye-Condition-with-Specialized-Surgery-300x238.jpg",
    })
    ],
})

const defaultVitals = [photosVital, generalVital, temperatureVital];
export default defaultVitals