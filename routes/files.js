const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const { v4: uuidv4 } = require('uuid');

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()} - ${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

let upload = multer({
  storage,
  limits: { fileSize: 1000000 * 100 },
}).single('myfile');

router.post('/', (req, res) => {
  // try {
  //   // store files
  //   upload(req, res, async (err) => {
  //     //validate request
  //     if (!req.file) {
  //       return res.json({ error: 'Fields need to be required.' });
  //     }
  upload(req, res, async (err) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      // Store into Database

      const file = new File({
        filename: req.file.filename,
        uuid: uuidv4(),
        path: req.file.path,
        size: req.file.size,
      });

      const response = await file.save();
      res.json({
        file: `${process.env.APP_BASE_URL}files/${response.uuid}`,
      });

      // http://localhost:3000/files/12fjndnsgdgg-a12faf23r
    });
  }); 

    //Response -> Link
//   } catch (error) {
//     console.log(error);
//     res.status(501).send(error);
//   }
// });

router.post('/send', async (req, res) => {
  // try {
    // console.log(req.body);
    // return res.send({});
    const { uuid, emailTo, emailFrom, expiresIn } = req.body;
    //validate request
    if (!uuid || !emailTo || !emailFrom) {
      return res.status(422).send({ error: 'All fields need to be filled.' });
    }
   try{
    //Get data from database
    const file = await File.findOne({ uuid: uuid });
      if (file.sender) {
        return res.status(422).send({ error: 'Email Already Sent' });
      }

      file.sender = emailFrom;
      file.receiver = emailTo;
      const response = await file.save();

      //Send email

      const sendMail = require('../services Email/emailService');
      sendMail({
        from: emailFrom,
        to: emailTo,
        subject: 'DocSend - Ease File Sharing Way',
        text: `${emailFrom} shared a File with you.`,
        html: require('../services Email/emailTemplate')({
          emailFrom: emailFrom,
          downloadLink: `${process.env.APP_BASE_URL}files/${file.uuid}?source=email`,
          size: parseInt(file.size / 1000) + ' KB',
          expires: '24 hours'
        })
      }).then(() => {
         return res.json({success: true});
      }).catch(err => {
        return res.status(500).json({error: 'Error in email sending.'});
      });
    } catch(err) {
      // console.log(error);
      res.status(500).send( {error: 'Something went wrong.'});
    }
   });
   
      //   return res.status(200).send({ success: true });
    // } else {
    //   res.status(402).send('Invalid UUID!');
    // }
 

module.exports = router;
