#!/usr/bin/env node
import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";

import { dockerMenu } from "./docker.js";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const title = chalkAnimation.rainbow(
        'Welcome to Docker CLI!'
    );
    await sleep();
    title.stop();
    console.log(chalk.gray('****************************'));
}

async function mainMenu() {
    const answer = await inquirer.prompt({
        name: 'mainMenu',
        type: 'list',
        message: 'Please select your desired service:  ',
        choices: [
            'Docker',
            'Docker Compose',
            'Exit'
        ]
    })
    switch (answer.mainMenu) {
        case 'Docker':
            await dockerMenu();
            break;
        case 'Docker Compose':
            dockerComposeMenu();
            break;
        case 'Exit':
            const spinner = createSpinner('Exiting...').start();
            sleep(1000)
            spinner.success({ text: 'Exited successfully' });
            process.exit(0);
    }
}

await welcome();
await sleep(1000);
await mainMenu();