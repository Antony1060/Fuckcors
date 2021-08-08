import { Levels, log, time } from "../../src/util/log";

const consoleLog = jest.spyOn(console, "log").mockImplementation(() => {});

describe("LOG", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should log info", () => {
        log(Levels.INFO);
        expect(consoleLog).toHaveBeenCalledWith(`${time()} ${Levels.INFO} `);
    });

    it("should log warn", () => {
        log(Levels.WARN);
        expect(consoleLog).toHaveBeenCalledWith(`${time()} ${Levels.WARN} `);
    });

    it("should log error", () => {
        log(Levels.ERROR);
        expect(consoleLog).toHaveBeenCalledWith(`${time()} ${Levels.ERROR} `);
    });

    it("should log debug", () => {
        log(Levels.DEBUG);
        expect(consoleLog).toHaveBeenCalledWith(`${time()} ${Levels.DEBUG} `);
    });
});