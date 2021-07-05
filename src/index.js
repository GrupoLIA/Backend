import app from './app';

const port = process.env.PORT ?? 8000;

const server = app.listen(port, () =>
  console.log(`Server is up and running on port: ${port}`)
);

// SIGTERM handle function for proper program termination
// https://nodejs.dev/learn/how-to-exit-from-a-nodejs-program
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});
