import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`E-Commerce app listening on PORT: ${config.port} 😊`);
    });
  } catch (error) {
    console.log('error in server.ts 😈:', error);
  }
}

main();
