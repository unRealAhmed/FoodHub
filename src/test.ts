import * as express from 'express';

const app = express();
app.all('/', (req: express.Request, res, next) => {
  const chuncks: any[] = [];
  req.on('data', (data: any) => {
    console.log(data);
    chuncks.push(data);
  });
  console.log('done');
  req.on('end', () => {
    console.log('--------------------------------');
    console.log(Buffer.concat(chuncks).toString());
  });

  next();
});
app.listen(3000, () => {
  console.log('listening');
});
