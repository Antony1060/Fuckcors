import chalk from "chalk";

export type Level = string;

export const Levels = {
    INFO: chalk.bgBlueBright.black` INFO `,
    WARN: chalk.bgYellowBright.black` WARN `,
    DEBUG: chalk.bgYellow.black` DEBUG `,
    ERROR: chalk.bgRedBright.black` ERROR `,
};

export const time = (): string => {
    const date = new Date();
    const h = date.getHours().toString().padStart(2, "0");
    const min = date.getMinutes().toString().padStart(2, "0");
    const s = date.getSeconds().toString().padStart(2, "0");
    return `${h}:${min}:${s}`;
};

export function log(level: Level, message = ""): void  {
    if(level !== Levels.DEBUG || (level === Levels.DEBUG && process.env.DEBUG === "true"))
        console.log(`${time()} ${level} ${message}`);
}