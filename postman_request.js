const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "values": [
    [
      "Year",
      "Winners",
      "Score",
      "Runners-up"
    ],
    [
      "1930",
      "Uruguay",
      "4–2",
      "Argentina"
    ],
    [
      "1934",
      "Italy",
      "2–1 (a.e.t.)",
      "Czechoslovakia"
    ],
    [
      "1938",
      "Italy",
      "4–2",
      "Hungary"
    ],
    [
      "1950",
      "Uruguay",
      "2–1[n 3]",
      "Brazil"
    ],
    [
      "1954",
      "West Germany",
      "3–2",
      "Hungary"
    ],
    [
      "1958",
      "Brazil",
      "5–2",
      "Sweden"
    ],
    [
      "1962",
      "Brazil",
      "3–1",
      "Czechoslovakia"
    ],
    [
      "1966",
      "England",
      "4–2 (a.e.t.)",
      "West Germany"
    ],
    [
      "1970",
      "Brazil",
      "4–1",
      "Italy"
    ],
    [
      "1974",
      "West Germany",
      "2–1",
      "Netherlands"
    ]
  ]
});

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://sheets.googleapis.com/v4/spreadsheets/1HJcXfI8kvz3DTHq-gMyct7l8tdVg7BZNkdKpkRlHEe0/values/Sheet1!A1:append?valueInputOption=USER_ENTERED", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));