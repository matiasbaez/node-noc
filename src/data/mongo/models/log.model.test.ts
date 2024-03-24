import mongoose from "mongoose";
import { envs } from "../../../config/plugins/envs.plugin";
import { MongoDataBase } from "../init";
import { LogModel } from "./log.model";

describe("log.model.test.test", () => {

    beforeAll(async () => {
        await MongoDataBase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        });
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test("should return LogModel", async () => {

        const data = {
            origin: __filename,
            message: "test message",
            level: "LOW"
        };

        const log = await LogModel.create(data);
        expect(log).toEqual(expect.objectContaining({
            ...data,
            id: expect.any(String),
            createdAt: expect.any(Date)
        }));

    });

    test("should return the schema object", () => {
        const schema = LogModel.schema.obj;
        expect(schema).toEqual(expect.objectContaining({
            message: { type: expect.any(Function), required: true },
            origin: { type: expect.any(Function) },
            level: {
                type: String,
                enum: ["HIGH", "MEDIUM", "LOW"]
            },
            createdAt: { type: expect.any(Object), default: Date.now }
        }))
    });

});
