import {ApplicationConfig, JarabeServerApplication} from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new JarabeServerApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      protocol: 'http',
      key: '',
      cert: '',
      host: process.env.HOST,
      ciphers: [],
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        disabled: false,
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
