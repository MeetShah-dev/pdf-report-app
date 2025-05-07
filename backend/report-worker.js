const fs = require('fs')
const path = require('path');
process.on('message', ({ userId, content }) => {
    const filePath = path.join(__dirname, 'reports', `report-${userId}.txt`);
    const data = `Report for ${userId}\n\n${content}\n\nGenerated at ${new Date()}`;
  
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        process.send({ status: 'error', message: err.message });
      } else {
        process.send({ status: 'done', path: filePath });
      }
    });
  });