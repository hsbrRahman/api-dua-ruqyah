const express = require("express");
const sqlite = require("sqlite3");
// const cors = require("cors");

const app = express();

// Middleware to handle database connection
const withDB = async (req, res, next) => {
  const db = await sqlite.open({
    filename: "./dua_main.sqlite",
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READONLY,
  });

  req.db = db; // Attach the database to the request object
  next();
};

// Enable CORS for all routes
// app.use(cors());

// API endpoint to get categories
app.get("/api/category", withDB, async (req, res) => {
  try {
    const rows = await req.db.all("SELECT * FROM category");
    res.json(rows);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  } finally {
    await req.db.close();
  }
});

// API endpoint to get subcategories for a given category
app.get("/api/sub_category/:cat_id", withDB, async (req, res) => {
  const categoryId = req.params.cat_id;

  try {
    const rows = await req.db.all(
      "SELECT * FROM sub_category WHERE cat_id = ?",
      [categoryId]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  } finally {
    await req.db.close();
  }
});

// API endpoint to get duas for a given subcategory
app.get("/api/dua/:id", withDB, async (req, res) => {
  const duaId = req.params.id;

  try {
    const rows = await req.db.all("SELECT * FROM dua WHERE id = ?", [duaId]);
    res.json(rows);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  } finally {
    await req.db.close();
  }
});

app.get("/api", (req, res, next) => {
  res.json({ message: "OK" });
});

module.exports = app;
