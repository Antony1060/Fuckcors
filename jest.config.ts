import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
    transform: {
        ".(ts|tsx)": "ts-jest"
    },
    testMatch: ["<rootDir>/test/**/*.test.[jt]s"],
    setupFilesAfterEnv: ["<rootDir>/test/util/jestSetup.ts"],
    slowTestThreshold: 60
}

export default config