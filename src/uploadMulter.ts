import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "src/uploads/")
  },
  filename: function (req, file, callback) {
    callback(null, req.body.title + "_" + file.originalname)
  }
});

export const uploads = multer({ storage: storage });