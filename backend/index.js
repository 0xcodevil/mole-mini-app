require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();
const logger = require('./helper/logger');
const path = require('path');

// database
const connectDB = require('./db/connect');

//  routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const playRouter = require('./routes/playRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/play', playRouter);

app.use(express.static('../frontend/dist'));
app.get('*', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, '../frontend/dist')});
});

const port = process.env.PORT || 6002;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      logger.info(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    logger.error(error);
  }
};

start();

//reset Cron job
const cron = require("node-cron");
const User = require('./models/User');
const resetWeekly = async () => {
  await User.updateMany({}, {$set: { ["weeklyScore"]: 0}});
}
const resetMonthly = async () => {
  await User.updateMany({}, {$set: { ["monthlyScore"]: 0}});
}
cron.schedule("0 0 1 * *",resetMonthly,{
  schedule: true,
  timezone: "America/New_York"
})
cron.schedule("0 0 * * SUN",resetWeekly,{
  schedule: true,
  timezone: "America/New_York"
})