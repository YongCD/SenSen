const express = require('express');
const multer = require('multer');
const cors = require('cors'); // 引入 cors

const app = express();

// 使用 Express 内置的 body-parser 功能
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 使用 cors 中间件
app.use(cors({
  origin: '*', // 允许所有来源，生产环境建议指定具体来源
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, x-ext',
}));

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/');
  },
  filename: function (req, file, callback) {
    const timestamp = Date.now();
    const originalName = file.originalname.split('.');
    const ext = originalName[originalName.length - 1];
    callback(null, `${timestamp}.${ext}`);
  }
});
const upload = multer({ storage });

// 1. multiple/form-data 单文件上传
app.post('/file', upload.single('file'), (req, res) => {
  if (req.file) {
    console.log('req.file', req.file); // upload.single 使用 req.file
    res.send('File uploaded successfully');
  } else {
    res.status(400).send('No file was uploaded.');
  }
});

// 2. base64 上传
app.post('/base64', (req, res) => {
  const { file, ext } = req.body;
  const buffer = Buffer.from(file, 'base64');
  const timestamp = Date.now();
  const filename = `${timestamp}.${ext}`;
  const filepath = `uploads/${filename}`;

  // 将 buffer 写入文件
  require('fs').writeFile(filepath, buffer, (err) => {
    if (err) {
      console.error('Error saving file:', err);
      return res.status(500).send('Error saving file');
    }
    console.log('File saved successfully:', filepath);
    res.send('File uploaded successfully');
  });
});

// 3. 二进制上传
app.post('/binary', (req, res) => {
  const buffers = []
  const ext = req.headers['x-ext'];
  const timestamp = Date.now();
  const filename = `${timestamp}.${ext}`;
  const filepath = `uploads/${filename}`;

  req.on('data', chunk => {
    buffers.push(chunk);
  }).on('end', () => {
    const binaryData = Buffer.concat(buffers);

    require('fs').writeFile(filepath, binaryData, (err) => {
      if (err) {
        console.error('Error saving file:', err);
        return res.status(500).send('Error saving file');
      }
      console.log('File saved successfully:', filepath);
      res.send('File uploaded successfully');
    });
    
  })
});

app.listen(8080, () => console.log('Server started on port 8080'));
