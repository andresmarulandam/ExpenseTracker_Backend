const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3001;

// http://localhost:3001/

const expenses = [];

/*  ENDPOINTS
 
 * POST    /songs      CREATE
 * GET     /songs      READ (ALL)
 * GET     /songs/:id  READ (ONE)
 * PUT     /songs/:id  UPDATE
 * DELETE  /songs/:id  DELETE
 */

app.use(express.json());

// CREATE
app.post("/expenses", (req, res, next) => {
  // body
  const { body = {} } = req;

  const expense = {
    ...body,
    id: uuidv4(),
  };

  expenses.push(expense);

  res.status(201);
  res.json(expense);
});

// READ ALL
app.get("/expenses", (req, res, next) => {
  res.json(expenses);
});

// READ ONE
app.get("/expenses/:id", (req, res, next) => {
  // params
  const { params = {} } = req;
  const { id = "" } = params;

  const expense = expenses.find(function (element) {
    return id === element.id;
  });

  if (expense) {
    res.json(expense);
  } else {
    next({
      statusCode: 404,
      message: `Song with ${id}, Not Found`,
    });
  }
});

// UPDATE
app.put("/expenses/:id", (req, res, next) => {
  // params
  const { params = {}, body = {} } = req;
  const { id = "" } = params;

  const index = expenses.findIndex(function (element) {
    return id === element.id;
  });

  if (index !== -1) {
    const expense = {
      ...expenses[index],
      ...body,
    };

    expenses[index] = expense;

    res.json(expense);
  } else {
    next({
      statusCode: 404,
      message: `Song with ${id}, Not Found`,
    });
  }
});

// DELETE
app.delete("/expenses/:id", (req, res, next) => {
  const { params = {} } = req;
  const { id = "" } = params;

  const index = expenses.findIndex(function (element) {
    return id === element.id;
  });

  if (index !== -1) {
    expenses.splice(index, 1);
    res.status(204);
    res.end();
  } else {
    next({
      statusCode: 404,
      message: `Song with ${id}, Not Found`,
    });
  }
});

app.use((req, res, next) => {
  next({
    statusCode: 404,
    message: "Route Not Found",
  });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Error" } = err;

  console.log(message);

  res.status(statusCode);
  res.json({
    message,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
