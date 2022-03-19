import { Vital, Reading } from "../../schemas";

const avpuVital = new Vital({
    periodicity: 60,
    name: "AVPU",
    type: "Categorical",
    description: "Awake Verbal Pain Unresponsive",
    data: [new Reading({
        timestamp: "1640705088000",
        value: "Awake",
    }),
    new Reading({
        timestamp: "1640708857000",
        value: "Verbal",
    }),
    new Reading({
        timestamp: "1640712857000",
        value: "Unresponsive",
    })],
    categories: ["Unresponsive", "Pain", "Verbal", "Awake"],
    timeElapsed: 0,
});

const skinVital = new Vital({
    periodicity: 60,
    name: "Skin",
    type: "Categorical",
    description: "warm, pink, blue, or white",
    data: [],
    categories: ["Warm", "Pink", "Blue", "White"],
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
    data: [new Reading({
        timestamp: "1640705088000",
        value: 42,
        url: "",
    }), new Reading({
        timestamp: "1640708857000",
        value: 57,
        url: "",
    }), new Reading({
        timestamp: "1640712857000",
        value: 82,
    })],
    categories: [],
    timeElapsed: 0,
});

const temperatureVital = new Vital({
    periodicity: 60,
    name: "Temperature",
    type: "Numerical",
    description: "Temp Desc",
    data: [new Reading({
        timestamp: "1640705088000",
        value: 42,
        url: "",
    }), new Reading({
        timestamp: "1640708857000",
        value: 57,
        url: "",
    }), new Reading({
        timestamp: "1640712857000",
        value: 61,
    }), new Reading({
        timestamp: "1640713857000",
        value: 65,
    }), new Reading({
        timestamp: "1640714857000",
        value: 67,
    }), new Reading({
        timestamp: "1640715857000",
        value: 82,
    }), new Reading({
        timestamp: "1640716857000",
        value: 90,
    }), new Reading({
        timestamp: "1640718857000",
        value: 54,
    }), new Reading({
        timestamp: "1640719857000",
        value: 49,
    })],
    categories: [],
    timeElapsed: 10,
});

const generalVital = new Vital({
    periodicity: 60,
    name: "General",
    type: "Special",
    description: "General notes",
    data: [new Reading({
        timestamp: "1640705088000",
        value: "Patient has exhibited signs of hypothermia.",
    }),
    new Reading({
        timestamp: "1640708857000",
        value: "Patient has fainted.",
    }),
    new Reading({
        timestamp: "1640712857000",
        value: "Someone get help",
    })],
})


const photosVital = new Vital({
    periodicity: 60,
    name: "Photos",
    type: "Photos",
    description: "Photo notes",
    data: [new Reading({
        timestamp: "1640705088000",
        value: "Patient eyes",
        url: "https://georgiaeyephysicians.com/wp-content/uploads/2013/10/Treating-Your-Eye-Condition-with-Specialized-Surgery-300x238.jpg",
    }), new Reading({
            timestamp: "1640706088000",
            value: "Patient eyes",
            url: "https://www.worldatlas.com/r/w768/upload/62/7f/15/shutterstock-128857243.jpg",
    }), new Reading({
        timestamp: "1640707088000",
        value: "Patient eyes",
        url: "https://media.istockphoto.com/photos/eye-picture-id459969147?k=20&m=459969147&s=612x612&w=0&h=NaVfiez76AnvNr1J4xb4Hdq-y15FQ3AY1r6KQgy02tA=",
    }), new Reading({
        timestamp: "1640708088000",
        value: "Patient eyes",
        url: "https://image.scoopwhoop.com/q30/s3.scoopwhoop.com/anj/eyes/99758749.jpg",
    }), new Reading({
        timestamp: "1640709088000",
        value: "Patient eyes",
        url: "https://www.worldatlas.com/r/w1200/upload/62/7f/15/shutterstock-128857243.jpg",
    }),
    new Reading({
        timestamp: "1640708088000",
        value: "Arm bruise",
        url: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/325525_2200-732x549.jpg",
    }),
    new Reading({
        timestamp: "1640709088000",
        value: "Arm bruise",
        url: "https://images.onhealth.com/images/slideshow/bruises-s1-what-is-bruise.jpg",
    }),
     new Reading({
         timestamp: "1640710088000",
         value: "Arm bruise",
         url: "https://media.istockphoto.com/photos/male-clenched-fist-with-blood-veins-represents-the-strength-isolated-picture-id1266408697?k=20&m=1266408697&s=612x612&w=0&h=RN82YipMfPRN7j3UK2wLwq-ZkkXtpnOM2vw-leA7mw4=",
     })
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
