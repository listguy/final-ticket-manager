const express = require("express");
const app = express();
const fs = require("fs").promises;

const dbPath = "./data.json";
app.use(express.json());

app.get("/api/tickets", async (req, res) => {
  const data = await fs.readFile(dbPath);
  const filterParam = req.query.searchText;

  try {
    const json = JSON.parse(data);
    if (filterParam) {
      const filterRegx = new RegExp(`${filterParam}`, "i", "g");
      filteredData = Array.from(json).filter((elem) =>
        filterRegx.test(elem.title)
      );
      res.send(filteredData);
    } else {
      res.send(json);
    }
  } catch (e) {
    res.send(e);
  }
});

app.post("/api/tickets/:ticketId/done", async (req, res) => {
  const ticketId = req.params.ticketId;

  const data = await fs.readFile(dbPath);
  const json = JSON.parse(data);

  for (let elem of json) {
    if (elem.id === ticketId) {
      elem.done = true;
      break;
    }
  }

  await fs.writeFile(dbPath, JSON.stringify(json));

  res.send({ updated: true });
});

app.post("/api/tickets/:ticketId/undone", async (req, res) => {
  const ticketId = req.params.ticketId;

  const data = await fs.readFile(dbPath);
  const json = JSON.parse(data);

  for (let elem of json) {
    if (elem.id === ticketId) {
      elem.done = false;
      break;
    }
  }

  await fs.writeFile(dbPath, JSON.stringify(json));

  res.send({ updated: true });
});

// const setIfDone = async (ticketId, isDone) => {
//   const data = await fs.readFile("./data.json");
//   const json = JSON.parse(data);

//   for (elem of json) {
//     if (elem.id === ticketId) {
//       elem.done = isDone;
//       return;
//     }
//   }

//   await fs.writeFile("/data.json", JSON.stringify(json));
// };

module.exports = app;
