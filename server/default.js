// import express from "express";
// import bodyParser from "body-parser";
// import pg from "pg";
// import {questionsAnswers} from "./data.js";


// const app = express();
// const port = 3000;

// const client = new pg.Client({
//   user: "postgres",
//   host: "localhost",
//   database: "tuf",
//   password: "phemon420",
//   port: 5432,
// });

// client.connect();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));


// async function insertCards() {
//     try {
//       for (const product of questionsAnswers) {
//         const query = `
//           INSERT INTO flash_cards (id, question, answer)
//           VALUES ($1, $2, $3)
//         `;
//         const values = [
//           product.id,
//           product.questionText,
//           product.answerText
//         ];
  
//         await client.query(query, values);
//       }
//       console.log('Products inserted successfully!');
//     } catch (error) {
//       console.error('Error inserting products:', error);
//     } finally {
//       client.end();
//     }
//   }
  
//   insertCards();

















import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2/promise"; // Importing mysql2 with promise support
import { questionsAnswers } from "./data.js";

const app = express();
const port = 3000;

// Create a connection to the MySQL database
const connectionConfig = {
  user: "root",  // Replace with your MySQL username
  host: "localhost",
  database: "tuf",
  password: "phemon420",  // Replace with your MySQL password
  port: 3306,  // Default MySQL port
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function insertCards() {
  const connection = await mysql.createConnection(connectionConfig); // Create a connection

  try {
    for (const product of questionsAnswers) {
      const query = `
        INSERT INTO flash_cards (id, question, answer)
        VALUES (?, ?, ?)
      `;
      const values = [
        product.id,
        product.questionText,
        product.answerText
      ];

      await connection.execute(query, values); // Use execute for parameterized queries
    }
    console.log("Products inserted successfully!");
  } catch (error) {
    console.error("Error inserting products:", error);
  } finally {
    await connection.end(); // Close the connection
  }
}

insertCards();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
