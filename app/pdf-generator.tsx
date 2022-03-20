import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Asset } from 'expo-asset';
import { manipulateAsync } from 'expo-image-manipulator';
import { Patient, Reading, Vital } from "../schemas";
import defaultVitals, { quickVitals } from './assets/defaultVitals';


function format_datetime(timestamp_str: String) {
  var timestamp = Number(timestamp_str);
  var d = new Date(timestamp);
  var datestring = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":";

  var minutes = d.getMinutes();

  if (minutes / 10 < 1) {
    datestring += "0" + minutes;
  } else {
    datestring += minutes;
  }

  return datestring;
}
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
          var datestring = format_datetime(value.timestamp);

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

  console.log(other_vitals);

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
 * A function to print the custom vitals
 * @param objects an array of vital objects
 * @returns an html-formatted string
 */
function printOtherInfo(objects) {

  let str = "";
  for (let index in objects) {
    let vital_obj = objects[index];

    // check that data is not empty
    if (vital_obj.data.length != 0) {
      let vital_name = vital_obj.name;
      str += "<br><br><div><table><caption>" + vital_name + "</caption>";
      str += "<tr><th> Time </th> <th> Value </th> </tr>";

      let reading_data = vital_obj.data;

      // if the vital is an image
      if (reading_data[0].url != "") {
        for (let di in reading_data) {
          let reading = reading_data[di];
          str += " <tr><td>" + format_datetime(reading.timestamp) + "</td><td><img style=\"display:block;\" src=\""
            + reading.url + "\" width=\"100\" height=\"100\" alt=\"" + reading.value + "\" > </img></td></tr>";
        }

      } else {
        for (let di in reading_data) {
          let reading = reading_data[di];
          str += " <tr><td>" + format_datetime(reading.timestamp) + "</td><td>" + reading.value + " </td></tr>";
        }

      }
    }
    str += "</table></div>";
  }
  return str;
}

/**
 * Create the PDF containing a patient's data
 * @param patient  the patient to create a pdf for
 */
const createPDF = async (patient: Patient) => {

  // Can be used to insert an image from the assets folder.
  // const asset = Asset.fromModule(require('./assets/images/choking1.png'));
  // const image = await manipulateAsync(
  //   asset.localUri ?? asset.uri,
  //   [],
  //   { base64: true }
  // );

  var info = timestamp_ordered(patient.vitals);
  var default_values = info.default_vitals;
  var others = info.other_vitals;
  const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          table {
            width: 100%;
            break-inside: avoid;
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

      ${printOtherInfo(others)}

      </body >
    </html >
  `;

  try {
    console.log("creating pdf");
    const { uri } = await Print.printToFileAsync({
      html
    });
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    return uri;
  } catch (err) {
    console.log("an error occured: " + err);
    console.error(err);
  }
};

export { createPDF }
