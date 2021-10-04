const File = require('./models/file');
const fs = require('fs');
const connectDB = require('./config/db');
connectDB();


async function deleteData() {
    //24hrs
   
    const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000 )
   
    const files = await File.find({ createdAt: { $lt: pastDate } });

    if(files.length) {
       
       for(const fil of files) {
        try{
                fs.unlinkSync(file.path);
                await file.remove();
    
                console.log(`successfully deleted ${file.filename}`);
        }catch(err){
            console.log(`Erro while deleting the file ${err}`);
        }
    }
   console.log(`Everything Done`);

}
}

deleteData().then(process.exit);