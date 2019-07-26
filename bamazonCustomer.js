const config = require('./config.json')
const mysql = require('mysql')
const inquirer = require('inquirer')

const pool = mysql.createPool({
  host: config.host,
  port: config.port,
  user: config.username,
  password: config.password,
  database: config.db
})

// Display all products first
pool.getConnection((err, connection) => {
  if (err) throw err
  connection.query('SELECT * FROM products', (err, rows) => {
    if (err) throw err
    rows.forEach((item) => {
      console.log(`ID: ${item.item_id}, ${item.product_name}, price: $${item.price}`)
    })
  })

  // Run the prompts
  inquirer
    .prompt([
      {
        type: 'number',
        name: 'id',
        message: 'Which item ID would you like to buy?',
        validate: (num) => num > 0 && num <= 10
      },
      {
        type: 'number',
        name: 'amount',
        message: 'How much of that item would you like?',
        validate: (num) => num > 0
      }
    ])
    .then((answers) => {
      connection.query('SELECT * FROM products WHERE item_id = ?', answers.id, (err, rows) => {
        if (err) throw err
        if (rows[0].stock_quantity < answers.amount) {
          console.log('Insufficient quantity!')
          pool.end()
        } else {
          connection.query(
            'UPDATE products SET stock_quantity = ? WHERE item_id = ?',
            [ rows[0].stock_quantity - answers.amount, answers.id ],
            (err) => {
              if (err) throw err
              console.log(`That will cost you: $${answers.amount * rows[0].price}`)
              pool.end()
            }
          )
        }
      })
    })
})
