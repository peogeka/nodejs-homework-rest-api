import mongoose from 'mongoose'
import app from './app.js'

const {DB_HOST, PORT=3000} = process.env;
// cross-env DB_HOST="mongodb+srv://Yevhenii: @cluster0.kb3jzks.mongodb.net/db-contacts?retryWrites=true&w=majority" npm start

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    })
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })