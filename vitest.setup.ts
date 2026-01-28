import * as dotenv from "dotenv";
import path from "path";
console.log(`Setting up environment for testing...`);
dotenv.config({
    path: path.resolve(__dirname, ".env.local"),
});
