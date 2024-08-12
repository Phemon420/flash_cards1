// import express from 'express';
// import bodyParser from 'body-parser';
// import pkg from 'pg';
// const { Pool } = pkg;


// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "tuf",
//     password: "phemon420",
//     port: 5432,
// });

// const getCarddetail = express.Router(); // Use express.Router() instead of express()

// getCarddetail.use(bodyParser.json());

// getCarddetail.get('/product/:id', async (req, res) => {
//     const productId = req.params.id;
//     try {
//         const query = 'SELECT * FROM flash_cards WHERE id = $1';
//         const result = await pool.query(query, [productId]);

//         if (result.rows.length === 0) {
//             res.status(404).json({ error: 'Product not found' });
//         } else {
//             res.json(result.rows[0]);
//         }
//     } catch (error) {
//         console.error('Error executing query', error);
//         res.status(500).json({ error: 'An error occurred while fetching product data with the given id' });
//     }
// });

// export default getCarddetail;








import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise'; // Import mysql2 with promise support

const pool = mysql.createPool({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  database: "tuf",
  password: "phemon420", // Replace with your MySQL password
  port: 3306, // Default MySQL port
  waitForConnections: true,
  connectionLimit: 10, // Adjust the number of connections as needed
  queueLimit: 0
});

const getCarddetail = express.Router();

getCarddetail.use(bodyParser.json());

getCarddetail.get('/product/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const query = 'SELECT * FROM flash_cards WHERE id = ?'; // Use ? for parameter placeholders
    const [rows] = await pool.execute(query, [productId]); // Destructure the result to get rows

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'An error occurred while fetching product data with the given id' });
  }
});

export default getCarddetail;