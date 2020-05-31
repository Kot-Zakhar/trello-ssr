import multer from 'multer';

const allowedImageExts = [
    "png",
    "jpg",
    "jpeg",
    "png"
];

const imageFilter = (req, file, cb) => {
    if(allowedImageExts.some(ext => file.mimetype.indexOf(ext) >=0)){
        cb(null, true);
    }
    else{
        console.log(`Wrong image mimetype: ${file.mimetype}`);
        cb(null, false);
    }
}

const dest = process.env.MULTER_SAVE_DESTINATION || "data/public/uploads";

export const fileMulter = multer({ dest });

export const imageMulter = multer({ dest, fileFilter: imageFilter });