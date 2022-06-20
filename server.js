require('dotenv/config');
const app = require('./app');
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Partners Server listening on port http://localhost:${PORT}! Yay!!!`);
});