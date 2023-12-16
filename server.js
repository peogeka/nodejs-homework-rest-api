// import mongoose from 'mongoose'
// import app from './app.js'

// const {DB_HOST, PORT=3000} = process.env;


// mongoose.connect(DB_HOST)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running. Use our API on port: ${PORT}`);
//     })
//   })
//   .catch(error => {
//     console.log(error.message);
//     process.exit(1);
//   })
import mongoose from 'mongoose';
import app from './app.js';

const { DB_HOST, PORT = 3000 } = process.env;

// Перевірте, чи DB_HOST визначено
if (!DB_HOST) {
  console.error('DB_HOST is not defined in the environment variables');
  process.exit(1);
}

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
  });


 