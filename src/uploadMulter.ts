import multer from 'multer';

const storageChallenge = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "src/uploads/")
  },
  filename: function (req, file, callback) {
    callback(null, req.body.title + "_" + file.originalname)
  }
});

const storageSolution = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "src/uploads/solutions/")
  },
  filename: function (req, file, callback) {
    callback(null, req.body.userId + "_" + req.body.challengeId + "_" + file.originalname)
  }
});

export const uploadsChallenge = multer({ storage: storageChallenge });
export const uploadsSolution = multer({ storage: storageSolution });