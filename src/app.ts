
import { MongoDataBase } from "./data/mongo";
import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugin";

(async () => {
    main();
})();

async function main() {

    // Config DataBase
    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    // Start Server
    Server.start();

    console.log('Server started successfully');
}
