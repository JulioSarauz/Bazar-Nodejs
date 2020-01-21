//============================
//Puerto
//============================


process.env.PORT = process.env.PORT || 3000;


//============================
//Base de datos
//============================


let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://Julio:julyok64@cluster0-tmte0.gcp.mongodb.net/bazar'
}

process.env.urlDB = urlDB;