require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err, req, res, next) => {
	console.log(err);
	const message = err.message ? err.message : "Server Error Occurred";
	const status = err.status ? err.status : 500;

	res.status(status).json({
		message,
	});
});

const PORT = process.env.PORT || 8000;

connectDB(
	`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dafwp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
)
	.then(() => {
		console.log("Database Connected");
		app.listen(PORT, () => {
			console.log(`I am listening on port ${PORT}`);
		});
	})
	.catch((e) => console.log(e));
