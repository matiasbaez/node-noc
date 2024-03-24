import { envs } from "./envs.plugin";

describe('envs.plugin.ts', () => {

    test('should return env options', () => {

       expect(envs).toEqual({
        PORT: 3000,
        MAILER_EMAIL: expect.any(String),
        MAILER_SERVICE: 'gmail',
        MAILER_SECRET_KEY: expect.any(String),
        PROD: false,
        MONGO_URL: expect.any(String),
        MONGO_DB_NAME: 'NOC-test',
        MONGO_USER: expect.any(String),
        MONGO_PASSWORD: expect.any(String),
        POSTGRES_DB: 'NOC-test',
        POSTGRES_URL: expect.any(String),
        POSTGRES_USER: expect.any(String),
        POSTGRES_PASSWORD: expect.any(String)
      });

    });

    test('should return error if not found env', () => {
        jest.resetModules();
    });

});
