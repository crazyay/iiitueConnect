// import multer from "multer"

const multer =require("multer");
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'academicreceipt/');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
   }
})
const upload=multer({storage:storage});
module.exports ={upload}

// const storage1 = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'academicreceipt/'); // Specify the directory where files will be stored`
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now();
//       cb(null, file.originalname+ '-' + uniqueSuffix );
//     }
//   });

//   const upload = multer({ storage: storage1 });