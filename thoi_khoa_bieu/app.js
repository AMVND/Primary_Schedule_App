const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql2/promise");

const app = express();
const port = 3000;

// Sử dụng EJS làm view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Sử dụng bodyParser để xử lý dữ liệu từ form
app.use(bodyParser.urlencoded({ extended: true }));

// Kết nối đến cơ sở dữ liệu MySQL
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1111",
  database: "scheduleapp",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Routes
app.get("/", async (req, res) => {
  try {
    const [monHocRows] = await db.query("SELECT * FROM tbl_monhoc");
    res.render("schedule", { monHoc: monHocRows });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route để hiển thị form thêm môn học
app.get("/monhoc/them", (req, res) => {
  res.render("themMonHoc");
});

// Route xử lý khi submit form thêm môn học
app.post("/monhoc/them", async (req, res) => {
  const { ma_monhoc, ten_monhoc, loai_monhoc } = req.body;

  try {
    await db.execute(
      "INSERT INTO tbl_monhoc (ma_monhoc, ten_monhoc, loai_monhoc) VALUES (?, ?, ?)",
      [ma_monhoc, ten_monhoc, loai_monhoc]
    );
    res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route để hiển thị form sửa môn học
app.get("/monhoc/sua/:id", async (req, res) => {
  const ma_monhoc = req.params.id;

  try {
    const [monHocRows] = await db.query(
      "SELECT * FROM tbl_monhoc WHERE ma_monhoc = ?",
      [ma_monhoc]
    );

    if (monHocRows.length === 0) {
      return res.status(404).send("Not Found");
    }

    res.render("suaMonHoc", { monHoc: monHocRows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route xử lý khi submit form sửa môn học
app.post("/monhoc/sua/:id", async (req, res) => {
  const ma_monhoc = req.params.id;
  const { ten_monhoc, loai_monhoc } = req.body;

  try {
    await db.execute(
      "UPDATE tbl_monhoc SET ten_monhoc = ?, loai_monhoc = ? WHERE ma_monhoc = ?",
      [ten_monhoc, loai_monhoc, ma_monhoc]
    );
    res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route xử lý xóa môn học
app.get("/monhoc/xoa/:id", async (req, res) => {
  const ma_monhoc = req.params.id;

  try {
    await db.execute("DELETE FROM tbl_monhoc WHERE ma_monhoc = ?", [ma_monhoc]);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route để hiển thị thời khóa biểu cả tuần
app.get("/tuanhoc", async (req, res) => {
  try {
    const [tuanHocRows] = await db.query("SELECT * FROM tbl_tuanhoc");
    res.render("tuanhoc", { tuanHoc: tuanHocRows });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route để hiển thị form thêm thời khóa biểu cả tuần
app.get("/tuanhoc/them", (req, res) => {
  res.render("themTuanHoc");
});

// Route để xử lý việc thêm thời khóa biểu cả tuần
app.post("/tuanhoc/them", async (req, res) => {
  // Xử lý thêm thời khóa biểu cả tuần vào cơ sở dữ liệu
  // Redirect hoặc hiển thị thông báo thành công
});

// Route để hiển thị form sửa thời khóa biểu cả tuần
app.get("/tuanhoc/sua/:ma_tuanhoc", async (req, res) => {
  // Truy vấn cơ sở dữ liệu để lấy thông tin thời khóa biểu cả tuần cần sửa
  // Hiển thị form sửa với dữ liệu cũ
});

// Route để xử lý việc sửa thời khóa biểu cả tuần
app.post("/tuanhoc/sua/:ma_tuanhoc", async (req, res) => {
  // Xử lý sửa thông tin thời khóa biểu cả tuần trong cơ sở dữ liệu
  // Redirect hoặc hiển thị thông báo thành công
});

// Route để xóa thời khóa biểu cả tuần
app.get("/tuanhoc/xoa/:ma_tuanhoc", async (req, res) => {
  // Xử lý xóa thời khóa biểu cả tuần khỏi cơ sở dữ liệu
  // Redirect hoặc hiển thị thông báo thành công
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
