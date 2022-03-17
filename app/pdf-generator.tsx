import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Asset } from 'expo-asset';
import { manipulateAsync } from 'expo-image-manipulator';
import { Patient, Reading, Vital } from "../schemas";
import defaultVitals, { quickVitals } from './assets/defaultVitals';

/**
 * Takes in the vitals object list and returns an array with 2 elements:
 * the first is a dictionary of time-indexed vitals (to the nearest minute).
 * Second is the list of the other vitals (custom)
 * @param vitals_list 
 * @returns 
 */
function timestamp_ordered(vitals_list: Vital[]) {

  // Time ordered vitals. Has the organization of {timestamp1: {vital1: reading1, vital2: reading2}}
  var default_dict = {}
  var other_vitals = []

  vitals_list.map((vital: Vital) => {

    // check if the current vital is a default vital (ie. not custom)
    if (quickVitals.includes(vital.name)) {

      vital.data.map((value: Reading) => {
        if (value.value != null) {

          // Format the date time
          var timestamp = Number(value.timestamp);
          var d = new Date(timestamp);
          var datestring = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":";

          var minutes = d.getMinutes();

          if (minutes / 10 <= 1) {
            datestring += "0" + minutes;
          } else {
            datestring += minutes;
          }

          // Add it to the dictionary
          if (datestring in default_dict) {
            default_dict[datestring][vital.name] = value.value;
          } else {
            var vital_dict = {}
            vital_dict[vital.name] = value.value;
            default_dict[datestring] = vital_dict;
          }

        }
      })

    } else {
      other_vitals.push(vital);
    }
  })

  // console.log(default_dict)

  return {
    "default_vitals": default_dict,
    "other_vitals": other_vitals
  };
}

/**
 * Used for creating html table elements for the quick vitals
 * @param prefix the anchor to put before each quick vital
 * @param suffix the anchor to put after each vital
 * @returns an html-formatted string
 */
function getVitalHeaders(prefix = "", suffix = "") {
  var str = "";

  quickVitals.forEach((name) => {
    str = str + prefix + name + suffix;
  });
  return str;

}

/**
 * Formats the html for the rows in the quick vitals table
 * @param rows 
 */
function getVitalRows(rows) {

  var str = "";
  for (let time in rows) {
    str += "<tr><td>" + time + "</td>";
    var vals = rows[time]; // a dictionary of vital:value

    // iterate through the quick vitals, and check if that row has a corresponding value for the current vital.
    for (let i in quickVitals) {
      var qv = quickVitals[i];
      str += "<td>";
      if (qv in vals) {
        str += vals[qv];
      } else {
        str += " - "; // no reading at that time
      }

      str += "</td>";
    }
    str += "</tr>";
  }
  return str;
}



/**
 * Create the PDF containing a patient's data
 * @param patient  the patient to create a pdf for
 */
const createPDF = async (patient: Patient) => {

  // Can be used to insert an image.
  // const asset = Asset.fromModule(require('./assets/images/choking1.png'));
  // const image = await manipulateAsync(
  //   asset.localUri ?? asset.uri,
  //   [],
  //   { base64: true }
  // );

  var default_values = timestamp_ordered(patient.vitals).default_vitals;
  const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          table {
            width: 100%;
          }
          table, th, td {
            border: 1px solid black;
            align-self: center;
          }
          th, td {
            padding: 5px;
            align-items: center;
          }
        </style>
        </head>
      <body style="text-align: center;">
        <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
          ${patient.name}
        </h1>
        <h2>SOAP Notes</h2>
        <table>
        <caption>Vital Signs</caption>
          <tr>
            <th> Time </th>
          
    ${getVitalHeaders("<th>", "</th>")}
           
          </tr >
          <tr>
  ${getVitalRows(default_values)

    // put this before body end tag, after react code
    //     <img
    // src="data:image/jpeg;base64,${image.base64}"
    // style="width: 90vw;" /> 
    }
    </tr>
      </table >
      </body >
    </html >
  `;

  try {
    console.log("creating pdf");
    const { uri } = await Print.printToFileAsync({
      html
    });
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    console.log("pdf uri is " + uri)
    return uri;
  } catch (err) {
    console.log("an error occured: " + err);
    console.error(err);
  }
};

export { createPDF }
