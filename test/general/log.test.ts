import { Levels, log, time } from "../../src/util/log";

const consoleLog = jest.spyOn(console, "log").mockImplementation(() => {});

describe("LOG", () => {
    it("should log info", () => {
        expect(log(Levels.INFO));
        expect(consoleLog).toHaveBeenCalledWith(`${time()} ${Levels.INFO} `);
    });

    it("should log warn", () => {
        expect(log(Levels.WARN));
        expect(consoleLog).toHaveBeenCalledWith(`${time()} ${Levels.WARN} `);
    });

    it("should log error", () => {
        expect(log(Levels.ERROR));
        expect(consoleLog).toHaveBeenCalledWith(`${time()} ${Levels.ERROR} `);
    });

    it("should log debug", () => {
        expect(log(Levels.DEBUG));
        expect(consoleLog).toHaveBeenCalledWith(`${time()} ${Levels.DEBUG} `);
    });
});