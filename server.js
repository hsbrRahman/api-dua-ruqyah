const express = require("express");
const sqlite = require("sqlite");

const app = express();

// API endpoint to get categories
app.get("/api/category", async (req, res) => {
  const db = await sqlite.open({
    filename: "./dua_main.sqlite",
    driver: sqlite.Database,
    mode: sqlite3.OPEN_READONLY,
  });

  try {
    const rows = await db.all("SELECT * FROM category");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await db.close();
  }
});

// API endpoint to get subcategories for a given category
app.get("/api/sub_category/:cat_id", async (req, res) => {
  const categoryId = req.params.cat_id;

  const db = await sqlite.open({
    filename: "./dua_main.sqlite",
    driver: sqlite.Database,
    mode: sqlite3.OPEN_READONLY,
  });

  try {
    const rows = await db.all(
      `SELECT * FROM sub_category WHERE cat_id = ${categoryId}`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await db.close();
  }
});

// API endpoint to get duas for a given subcategory
app.get("/api/dua/:id", async (req, res) => {
  const duaId = req.params.id;

  const db = await sqlite.open({
    filename: "./dua_main.sqlite",
    driver: sqlite.Database,
    mode: sqlite3.OPEN_READONLY,
  });

  try {
    const rows = await db.all(`SELECT * FROM dua WHERE id = ${duaId}`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await db.close();
  }
});

app.get("/api", (req, res, next) => {
  res.json({ message: "OK" });
});

module.exports = app;
