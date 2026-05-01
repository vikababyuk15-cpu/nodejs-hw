import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { pinoHttp } from 'pino-http';

dotenv.config();

const app = express()

app.use(
  pinoHttp({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  })
);

app.use(cors());
app.use(express.json()); 


app.get('/test-error', (req, res) => {
  throw new Error('Something went wrong');
});



app.get('/notes', (req, res) => {
res.status(200).json({"message": "Retrieved all notes"})
}
)

app.get('/notes/:noteId', (req, res) => {
const id_param = req.params.noteId;
res.status(200).json({"message":`Retrieved note with ID: ${id_param} `})

})

app.use((req, res, next) => {
res.status(404).json({"message": "Route not found"})
})


app.use((err, req, res, next)=>{
 console.error('Error:', err.message);
res.status(500).json({
    message: 'Internal Server Error',
    error: err.message,
  });
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🔗 http://localhost:${PORT}`);
});