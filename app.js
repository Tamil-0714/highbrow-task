const jsdom = require("jsdom");
const axios = require("axios");
const { JSDOM } = jsdom;
const fs = require("fs");
const express = require("express");

const app = express();

async function fetchURL(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

function parseTableFromHTML(html, tableClass) {
  try {
    const dom = new JSDOM(html);
    const body = dom.window.document.querySelector("body");
    const FIFA_World_Cup_Table = body.querySelector(tableClass);
    const caption = FIFA_World_Cup_Table.querySelector("caption");
    if (caption?.innerHTML.includes("List of FIFA World Cup finals")) {
      return FIFA_World_Cup_Table;
    } else {
      throw new Error("The requested table from the html is not found");
    }
  } catch (error) {
    throw error;
  }
}

function extractFieldDataFromTable(table) {
  const rows = table.querySelectorAll("tbody > tr");
  const extractedData = [];

  // choosing min value is to avoid perform actions on undefined, If rows less than 11
  for (let i = 0; i < Math.min(11, rows.length); i++) {
    const cells = rows[i].querySelectorAll("td, th");

    const year = cells[0]?.textContent.trim();
    const winner = cells[1]?.textContent.trim();
    const score = cells[2]?.textContent.trim();
    const runnerUp = cells[3]?.textContent.trim();
    
    extractedData.push([year, winner, score, runnerUp]);
  }

  return extractedData;
}

function saveTableDataAsJSON(filename, data) {
  const jsonData = {
    values: data,
  };

  fs.writeFile(filename, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error("Error in writing JSON file", err);
    } else {
      console.log(`Data successfully saved to ${filename}`);
    }
  });
}


app.get(["/", "/List_of_FIFA_World_Cup_finals"], async (req, res) => {
  try {
    const URL = "https://en.wikipedia.org/wiki/List_of_FIFA_World_Cup_finals";
    const HTML_result = await fetchURL(URL);
    const tableClassName = "table.sortable.plainrowheaders.wikitable";
    const tableResult = parseTableFromHTML(HTML_result, tableClassName);
    const extractedTableData = extractFieldDataFromTable(tableResult);
    const tableDataFileName = "fifa_world_cup_finals.json";
    saveTableDataAsJSON(tableDataFileName, extractedTableData);
    if (extractedTableData) {
      res.status(200).json({ values: extractedTableData });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
const PORT = process.env.X_ZOHO_CATALYST_LISTEN_PORT ||3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
