const request = require("supertest");
const app = require("./app");
const fs = require("fs").promises;

const labels = [
  "Api",
  "Collapse",
  "Corvid",
  "Expand",
  "Guidelines",
  "Help",
  "Login",
  "Lolo",
  "Problem",
  "Tech",
  "Tutorial",
  "View Count",
];

const testTicket = {
  title: "popo",
  content: "bobo",
  email: "koko",
  labels: ["Lolo"],
};

const projectName = "2.New backend features";
describe(projectName, () => {
  test("Can post new ticket", async () => {
    const { body } = await request(app)
      .post("/api/tickets")
      .send(testTicket)
      .expect(200);

    console.log(body);

    expect(body.sucseed).toBe(true);

    const updatedData = JSON.parse(await fs.readFile("./data.json"));

    expect(updatedData[0].title).toBe(testTicket.title);
  });

  test("Can get all labels", async () => {
    const { body } = await request(app).get("/api/tickets/labels").expect(200);
    body.sort((a, b) => (a !== b ? (a < b ? -1 : 1) : 0));

    expect(body.length).toBe(labels.length);
    expect(body[7]).toBe(labels[7]);

    let resetedData = JSON.parse(await fs.readFile("./data.json"));
    resetedData.shift();
    await fs.writeFile("./data.json", JSON.stringify(resetedData));
  });
});
