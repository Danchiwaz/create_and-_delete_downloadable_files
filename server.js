const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3030;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/download', (req, res) => {
  const fileName = 'example.txt';
  const fileContent = 'This is an example file.';

  const filePath = path.join(__dirname, 'downloads', fileName);

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error('Error creating file:', err);
      return res.status(500).send('Error creating file');
    }

    res.download(filePath, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
      } else {
        console.log('File downloaded successfully');
      }

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File deleted successfully');
        }
      });
    });
  });
});
