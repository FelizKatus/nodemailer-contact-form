const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' })
const credentials = require('./credentials')

require('dotenv').config()

const app = express()

// Environment

const PORT = process.env.PORT || 8080

// Handlebars

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

// Static

app.use(express.static(path.join(__dirname, 'public')))

// URLencode

app.use(bodyParser.urlencoded({ extended: false }))

// Cookies, Sessions

app.use(require('cookie-parser')(credentials.cookieSecret))
app.use(
  require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret
  })
)

// CSURF

app.use(require('csurf')())

app.use((req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  res.locals._csrfToken = req.csrfToken()
  next()
})

// Routing

app.get('/', (req, res) => {
  res.render('contact', { layout: null })
})

app.post('/', (req, res) => {
  const mailTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: credentials.gmail.user,
      pass: credentials.gmail.password
    }
  })

  const mailOptions = {
    from: 'Contact Form <do-not-reply@gmail.com>',
    to: 'felizkatus@gmail.com',
    subject: 'Contact Form Submission',
    html: `<p>You have submission the following details...</p>
          <p><strong>Name:</strong> ${req.body.name}</p>
          <p><strong>Email:</strong> ${req.body.email}</p>
          <p><strong>Message:</strong> ${req.body.message}</p>`,
    generateTextFromHtml: true
  }

  if (req.body.human) {
    console.log('true')

    mailTransport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`Message could not be sent: ${error}`)
        res.redirect('/')
      } else {
        console.log(`Message sent: ${info.response}`)
        res.redirect('/')
      }
    })
  } else {
    console.log('false')
    res.redirect('/')
  }
})

app.listen(PORT, () => {
  console.log(`Server started in ${app.get('env')} mode at http://localhost: ${PORT}`)
})
