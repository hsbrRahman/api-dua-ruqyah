// server.js

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const sqlite3 = require("sqlite3").verbose();

app.use(cors());

// Update this line to use environment variable for the database path
const db = new sqlite3.Database(
  process.env.DATABASE_PATH,
  sqlite3.OPEN_READONLY,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the dua_main database.");
  }
);

// API endpoint to get categories
app.get("/category", (req, res) => {
  db.all("SELECT * FROM category", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// API endpoint to get subcategories for a given category
app.get("/sub_category/:cat_id", (req, res) => {
  const categoryId = req.params.cat_id;

  db.all(
    `SELECT * FROM sub_category WHERE cat_id = ${categoryId}`,
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

// API endpoint to get duas for a given subcategory
app.get("/dua/:id", (req, res) => {
  const duaId = req.params.id;
  db.all(`SELECT * FROM dua WHERE id = ${duaId}`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get("/", (req, res, next) => {
  res.json({ message: "OK" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
