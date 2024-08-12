// import express from "express";
// import cors from "cors";
// import getCarddetail from "./routes/getcarddetails";

// const app = express();
// const port = 8000;

// app.use(cors({
//     origin:"*"
// }));

// app.use(cors());
// app.use('/',getCarddetail);


// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });














import express from "express";
import cors from "cors";
import getCarddetail from "./routes/getcarddetails.mjs"; // Update extension if changed to .mjs

const app = express();
const port = 8000;

app.use(cors({
    origin: "*"
}));

app.use('/', getCarddetail);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
