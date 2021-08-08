import type { Config } from "@jest/types";
// setup env
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.test") });

const config: Config.InitialOptions = {
    transform: {
        ".(ts|tsx)": "ts-jest"
    },
    testMatch: ["<rootDir>/test/**/*.test.[jt]s"],
    setupFilesAfterEnv: ["<rootDir>/test/util/jestSetup.ts"],
    slowTestThreshold: 60
};

export default config;