const express = require('express');
const {fork} = require('child_process');
const path = require('path');

const app = express();
app.use(express.json())
app.post('/generate-report',(req,res) => {
   const  {userId, content} = req.body;
   const worker = fork(path.join(__dirname,'report-worker.js'))
   worker.send({ userId, content})
   worker.on('message', (msg) => {
    if(msg.status === 'done') {
        res.json({ message: 'Report generated!', path: msg.path });
    } else {
      res.status(500).json({ error: msg.message });
    }
   })
   worker.on('error', (err) => {
    res.status(500).json({ error: err.message });
  });

})
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });