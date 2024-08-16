import express, { Express } from 'express';
import routes from '../config/routes';
//konek ke config db
const cors = require('cors');
import '../config/db';
//import ejs
// import ejs from 'ejs';

const app: Express = express();

// Atur mesin tampilan EJS
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.use(cors());

// Atau, konfigurasi CORS dengan opsi khusus
app.use(cors({
    origin: 'http://localhost:5173', // ganti dengan URL front-end Anda
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.get('/', (_, res) => {
  res.send('Express + TypeScript Server');
});

app.use(express.json());
app.use(routes);

export default app;
