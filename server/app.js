const fs = require("fs");
const Papa = require("papaparse");
// const task = require("../task.json")
// const output = require("../output.json")
const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

//  readfile
let readCsv = fs.readFileSync("task-data.csv", "utf8", (err, data) => {
    if (err) { throw err }
    return data
});
//  parse csv to json
var parse = Papa.parse(readCsv, { header: true }).data

//  view local:3000
app.get("/", function (req, res) {
    res.json(parse);
});

// created object to add all missing keys with value 2
let hash = {}
const addKeys = (element) => {
    //  if keys is guest then I created new object inside guest and assigned value 2
    if (element === "^Guest") {
        hash[element] = {
            "Motivational Speakers": 2
        }
    } else {
        hash[element] = 2
    }
}
//  created array and stored missing keys in it.
const newHeaders = new Set(["^Art Therapy", "^Blues Project",
    "^Mental Health in Schools Team", "^Response", "^CAMHS", "^Listening Ear", "^Progress Watch", "^Barnardo's Anger Management Courses",
    "^Health Services in Schools", "^Cherished", "^Mersey Counselling & Therapy Centre", "^Counselling", "^Wellbeing Mentor", "^Pastoral Support",
    "^All Ears (Wirral YFC)", "^Sr Els 1:1 sessions", "^Dove Bereavement Counselling", "^Signposting to agencies on safeguarding poster",
    "^Bounce Back (Action for Children)", "^Guest", "^JustBe", "^Open Door Centre", "^Opening Doors to the Future"
]).forEach(addKeys)

// I have added hash to each row.
let concatObj = parse.map((row) => { return Object.assign(row, hash) })
// iteration concatobj
concatObj.forEach((row, index) => {

    row.ColInQuestion.split(";").forEach((element) => {
        // I have reached each colQuestion and split with ";"
        if (element === "Guest/Motivational Speakers") {
            // if element is this value then I have assigned same object but this time is value 1
            concatObj[index][`^Guest`] = { 'Motivational Speakers': 1 }
        } else {
            // otherwise founded element is 1
            concatObj[index][`^${element}`] = 1
        }
    });
})

//  unparse the element from json to csv
let newCSV = Papa.unparse(concatObj,{ header: false })
// which can be viewed localhost:3000/unparsed
app.get("/unparsed", function (req, res) {
    res.json(newCSV);
});

fs.writeFileSync("output.csv", newCSV);


app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`));