const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000;
const { default: mongoose } = require('mongoose');
const EventRouter = require('./routes/event-route');
const cors = require('cors');
const CalendarRouter = require('./routes/calendar-route');
// connect to mongoose db
mongoose.connect('mongodb+srv://njato:njato007@cluster0.0vdmief.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('connected to the database'))
.catch(err => console.log('Cannot connected to the database', err));

app.use(cors());
app.use(bodyParser.json());
app.use('/events', EventRouter);
app.use('/calendars', CalendarRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});