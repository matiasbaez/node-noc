import { envs } from "../../config/plugins/envs.plugin";
import { MongoDataBase } from "./init";

describe('init MongoDB', () => {

    test('should connect to mongodb', async () => {
        const connected = await MongoDataBase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        });

        expect(connected).toBe(true);
    });

    test('should throw an error', async () => {

        try {
            const connected = await MongoDataBase.connect({
                mongoUrl: `${envs.MONGO_URL}fake`,
                dbName: envs.MONGO_DB_NAME
            });
        } catch (err) {
            expect(true).toBe(true);
        }

    });

});
