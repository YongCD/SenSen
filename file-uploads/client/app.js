import axios from "axios";

const oFile = document.querySelector("#file");
const oUploadBtn = document.querySelector("#uploadBtn");

oUploadBtn.addEventListener("click", () => {
  // 3.二进制上传
  const file = oFile.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    const binaryData = reader.result // 这样直接就是二进制数据了
    axios.post("http://localhost:8080/binary", binaryData, {
      headers: {
        "Content-Type": "application/octet-stream",
        "x-ext": file.name.split('.').pop(), // 传递扩展名
      }
    })
    .then(response => {
      console.log('File uploaded successfully:', response.data);
    })
    .catch(error => {
      console.error('Error uploading file:', error);
    });
  }

  reader.readAsArrayBuffer(file);


  // 2.base64 上传
  // const file = oFile.files[0];
  // const reader = new FileReader();
  // const ext = file.name.split('.').pop(); // 获取文件扩展名

  // reader.onload = e => {
  //   console.log("e.target.result", e.target.result)
  //   const uint8Array = new Uint8Array(e.target.result);
  //   const str = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
  //   const base64Data = btoa(str); // 将字符串转换为 base64

  //   axios.post("http://localhost:8080/base64", {
  //     file: base64Data,
  //     ext, // 传递扩展名
  //   }, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   .then(response => {
  //     console.log('File uploaded successfully:', response.data);
  //   })
  //   .catch(error => {
  //     console.error('Error uploading file:', error);
  //   });
  // }

  // reader.readAsArrayBuffer(file);


  // 1.单文件上传 multipart/form-data
  // const file = oFile.files[0];
  // const formData = new FormData();
  // formData.append("file", file);

  // axios.post("http://localhost:8080/file", formData, {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // })
  // .then(response => {
  //   console.log('File uploaded successfully:', response.data);
  // })
  // .catch(error => {
  //   console.error('Error uploading file:', error);
  // });
}, false)
