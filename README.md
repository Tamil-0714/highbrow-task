## Task Summary: List of FIFA World Cup finals  → Google Sheet

### Objective:
The objective is to outline the process for extracting information from the first 10 rows of the table "List of FIFA World Cup finals" on the Wikipedia page - https://en.wikipedia.org/wiki/List_of_FIFA_World_Cup_finals.

---

## Technologies Used

- **JavaScript**
- **Axios** – for HTTP requests  
- **jsdom** – for parsing HTML and extracting table data  
- **Google Sheets API**  
- **Google Cloud Console** – for setting up OAuth 2.0 credentials  
- **Postman (VS Code extension)** – for making authenticated API calls to insert the data into a google sheet   

---

### deployed API URL
https://appsail-50026051012.development.catalystappsail.in/

## Implementation Steps

### 1. Fetch HTML from Wikipedia
- Used `axios` to fetch the entire HTML of the Wikipedia page.

### 2. Parse and Extract Table Data
- Parsed the DOM using `jsdom`.
- Located the table using a class selector.
- Extracted only the first 10 rows and selected columns:
  - Year
  - Winners
  - Score
  - Runners-up

### 3. Structure Data into JSON
- Converted the extracted data into an array of arrays.
- Saved the data into a `.json` file using `fs` (for portability and reuse).

### 4. Setup Google Cloud Project
- Created a new project on Google Cloud Console.
- Enabled the Google Sheets API.
- Generated OAuth 2.0 credentials and set up redirect URIs for Postman.

### 5. Authenticate via Postman
- Used Postman (desktop and VS Code) to authenticate via OAuth.
- Acquired an access token successfully.

### 6. Insert Data into Google Sheet
- Manually copied the JSON array into the request body.
- Made a POST request to the Sheets API with the correct `spreadsheetId`, `range`, and `valueInputOption`.

---

## Google Sheets API Request



### API Endpoint

```http
POST https://sheets.googleapis.com/v4/spreadsheets/1HJcXfI8kvz3DTHq-gMyct7l8tdVg7BZNkdKpkRlHEe0/values/Sheet1!A1:append?valueInputOption=USER_ENTERED
```

### Endpoint Breakdown

| Part | Description |
|------|-------------|
| `https://` | Protocol used – ensures the connection is secure (HTTPS). |
| `sheets.googleapis.com` | Base domain for the Google Sheets API. |
| `/v4/` | API version – v4 is the latest stable version of the Google Sheets API. |
| `/spreadsheets/` | Indicates the resource type – in this case, Google Spreadsheets. |
| `1HJcXfI8kvz3DTHq-gMyct7l8tdVg7BZNkdKpkRlHEe0` | Spreadsheet ID – a unique identifier for the target Google Sheet (you get this from the URL of your sheet). |
| `/values/` | Refers to the content (cell values) of the spreadsheet. |
| `Sheet1!A1` | Range – specifies the sheet (Sheet1) and the starting cell (A1) where the data will begin to append. |
| `:append` | Action – appends the incoming data after the last non-empty row. |
| `?valueInputOption=USER_ENTERED` | Query Parameter – tells the API to treat values as if entered manually by a user (e.g., numbers, dates, and formulas are interpreted naturally). |

## Usage Instructions

1. Send a POST request to the endpoint with your data in the following format:

```json
{
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
    ]
  ]
}
```

3. The API will append this data as a new row after the last non-empty row in the specified sheet.

### Sample output to verify the data insertion
```json
{
    "spreadsheetId": "1HJcXfI8kvz3DTHq-gMyct7l8tdVg7BZNkdKpkRlHEe0",
    "updates": {
        "spreadsheetId": "1HJcXfI8kvz3DTHq-gMyct7l8tdVg7BZNkdKpkRlHEe0",
        "updatedRange": "Sheet1!A1:D11",
        "updatedRows": 11,
        "updatedColumns": 4,
        "updatedCells": 44
    }
}
```

