const express = require("express");
const fs = require("fs").promises;
// const path = require("path");

const app = express();
const dbPath = "./data.json";
app.use(express.json());

app.use(express.static("../client/build"));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build", "index.html"));
// });

app.get("/api/tickets/labels", async (req, res) => {
  /* An endpiont to get all labels.
    loops through all ticket's labels and returns an array containing each label once */
  const data = await fs.readFile(dbPath);
  try {
    const json = JSON.parse(data);

    const labels = json
      .map((ticket) => ticket.labels || [])
      .flat()
      .filter((label) => label === l);
    const uniqueLabels = [...new Set(labels)];
    Array.from(json).forEach((ticket) => {
      if (ticket.labels) {
        ticket.labels.forEach((l) => {
          if (!labels.includes(l)) {
            labels.push(l);
          }
        });
      }
    });

    res.send(labels);
  } catch (e) {
    res.send(e);
  }
});

app.post("/api/tickets", async (req, res) => {
  // An entry point to add a new ticket to data.json
  const data = await fs.readFile(dbPath);
  const json = JSON.parse(data);

  try {
    const { body } = req;
    const newTicket = {
      id: `${Math.floor(Math.random() * 10 ** 10)}`,
      title: body.title,
      content: body.content,
      userEmail: body.email ? body.email : "Anonymous",
      creationTime: new Date().getTime(),
    };
    if (body.labels[0]) {
      Object.assign(newTicket, { labels: body.labels });
    }

    json.unshift(newTicket);

    await fs.writeFile(dbPath, JSON.stringify(json));

    res.send({ sucseed: true, ticket: newTicket });
  } catch (e) {
    res.send({ sucseed: false });
  }
});

// #region don't touch this section
app.get("/api/tickets", async (req, res) => {
  const data = await fs.readFile(dbPath);
  const filterParam = req.query.searchText;

  try {
    const json = JSON.parse(data);
    if (filterParam) {
      const filterRegx = new RegExp(`${filterParam}`, "i", "g");
      const filteredData = Array.from(json).filter((elem) =>
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
  const { ticketId } = req.params;

  const data = await fs.readFile(dbPath);
  const json = JSON.parse(data);

  const index = json.findIndex((e) => e.id === ticketId);
  json[index].done = true;

  await fs.writeFile(dbPath, JSON.stringify(json));

  res.send({ updated: true });
});

app.post("/api/tickets/:ticketId/undone", async (req, res) => {
  const { ticketId } = req.params;

  const data = await fs.readFile(dbPath);
  const json = JSON.parse(data);

  const index = json.findIndex((e) => e.id === ticketId);
  json[index].done = false;

  await fs.writeFile(dbPath, JSON.stringify(json));

  res.send({ updated: true });
});
// #endregion
// DON'T touch the data.json either
module.exports = app;
