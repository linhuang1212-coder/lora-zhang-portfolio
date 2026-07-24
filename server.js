const express = require('express');
const path = require('path');

const app = express();
const PORT = 1314;

// Serve all static files from the project root
app.use(express.static(path.join(__dirname)));

// SPA fallback — all routes return index.html
app.get((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✦ LORA ZHANG site running at http://localhost:${PORT}`);
});
