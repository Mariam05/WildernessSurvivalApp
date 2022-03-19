import { Vital, Reading } from "../../schemas";

const avpuVital = new Vital({
    periodicity: 60,
    name: "AVPU",
    type: "Categorical",
    description: "AVPU is a measure of the patients level of consciousness. The four levels are: \
                \n1. Alert \nPatient is fully awake(though not necessarily orientated), will have spontaneously open eyes, and will respond to voice(thought may be confused).They will have bodily motor function.\
                  \n2. Voice\nThe patient makes some sort of response when you talk to them.This could be through the eyes, which open when you speak to them, or by voice which may only be as little as a grunt.Or, it could be by moving a limb when prompted to do so by the rescuer. \
                    \n3. Pain \nA patient may respond by using any of the three components when pain stimulus is used on them(Eyes, Voice, Movement).Recognised methods for causing pain are pinching the ear or pressing into the bed of a fingernail.A fully conscious patient will locate the pain and push it away, whereas a patient who is not alert and not responded to voice may only manifest involuntary flexion or extension of a limb.Performing pain stimulus should be used with caution as in extreme circumstances this could be considered assault.\
                    \n4. Unresponsive \nThis outcome is noted if the patient does not give any Eye, Voice or Motor response to voice or pain.",
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
    description: "The color of a patients skin may be used to assess the patients general physical condition. You may visually identify the palor of a patients skin.",
    data: [],
    categories: ["Warm", "Pink", "Blue", "White"],
    timeElapsed: 0,
});

const pulseVital = new Vital({
    periodicity: 60,
    name: "Pulse",
    type: "Numerical",
    description: "Pulse is a measure of heart rate. You can take a pulse by placing your fingers on a patients artery on their wrist or neck.",
    data: [],
    categories: [],
    timeElapsed: 0,
});

const respirationVital = new Vital({
    periodicity: 60,
    name: "Respiration",
    type: "Numerical",
    description: "Respiration is a measure of the breathing rate of patient. You can count the number of inhalations and exhalations (together they count as one breath).",
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
    description: "Temperature is a measure of the patients body heat. If you have access to a thermometer, then place in the patients armpit for 1 minute. Otherwise place your hand on the patients forehead and assess the difference. ",
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
    description: "May include general notes about the patient or notable events during your care of the patient.",
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
    description: "May include photos in specific categories.",
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
