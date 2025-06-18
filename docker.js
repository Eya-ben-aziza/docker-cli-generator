import inquirer from 'inquirer'
import fs from 'fs'
import { createSpinner } from 'nanospinner';
import chalk from 'chalk';

const config = {
    application: '',
    environment: '',
    nodeVersion: '',
    port: '',
    envVariablesNumber: '',
    envVariablesconfig: []
  };


export async function dockerMenu () {
    const answer = await inquirer.prompt({
        name: 'applicationMenu',
        type: 'list',
        message: 'Please select your desired application:  ',
        choices: [
            'React',
            'Angular',
            'Vue',
            'Nextjs',
            'Nestjs',
            'Spring-Boot',
            'DotNet'
        ]
    })
    config.application = answer.applicationMenu;

    switch (answer.applicationMenu) {
        case 'React':
            await handleEnvironment();
            break
        case 'Angular':
            await handleEnvironment();
            break
        case 'Vue':
            await handleEnvironment();
            break
        case 'Nextjs':
            console.log('You selected Nextjs')
            await handleEnvironment();
            break
        case 'Nestjs':
            console.log('You selected Nestjs')
            break
        case 'Spring-Boot':
            console.log('You selected Spring-Boot')
            break
        case 'DotNet':
            console.log('You selected DotNet')
            break
    }
}

async function handleEnvironment () {
    const answer = await inquirer.prompt({
        name: 'environmentMenu',
        type: 'list',
        message: 'what is the environment that you are trying to create:  ',
        choices: [
            'development',
            'production'
        ]
    })
    config.environment = answer.environmentMenu;
    await handleNodeVersion();

}


async function handleNodeVersion () {
    const answer = await inquirer.prompt({
        name: 'nodeVersion',
        type: 'list',
        message: 'what is your preferred node version:  ',
        choices: [
            'Latest',
            '19',
            '18',
            '16'
        ]
    })
    config.nodeVersion = answer.nodeVersion;
    await handlePort();
}


async function handlePort () {
    const answer = await inquirer.prompt({
        name: 'port',
        type: 'input',
        message: 'what is the port that you want to expose:  ',
        default: '3000'
    })
    config.port = answer.port;
    if (config.application === 'Nextjs') {
        await handleEnvVariables();
    }
    await generateDockerfile();
}
 
async function handleEnvVariables () {
    const answer = await inquirer.prompt({
        name: 'envVariablesNumber',
        type: 'input',
        message: ' How many environment variables you want to define?  ',
        default: 'NODE_ENV,API_URL'
    })
    config.envVariablesNumber = answer.envVariablesNumber;
    console.log(chalk.yellow(`You have defined the following environment variables: ${config.envVariablesNumber}`));
    
    for ( let i =0; i < config.envVariablesNumber; i++) {
        
        const nameAnswer = await inquirer.prompt({
            name: 'envVariableName',
            type: 'input',
            message: `What is the environment variable name ? `
        })

        
        const valueAnswer = await inquirer.prompt({
            name: 'envVariableValue',
            type: 'input',
            message: ` what is the value of this environment variable? `
        })
        const envVariableConfig = {
            envVariableName: nameAnswer.envVariableName,
            envVariableValue: valueAnswer.envVariableValue
        }

        config.envVariablesconfig.push(envVariableConfig);
        console.log(config.envVariablesconfig);
        
    }
        


}

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function generateDockerfile () {
    const spinner = createSpinner('Generating Dockerfile...     ').start();
    await sleep(1000);
    spinner.stop();
    const templatePath = `./templates/${config.application}.${config.environment}.template`;
    const generatedPath = `./generated/${config.application}.${config.environment}.Dockerfile`;

    //  read the template file 
    let template = fs.readFileSync(templatePath, 'utf8');
    
    // replace the variables in the template file with the variables defined above
    template = template.replace(/{{{node_version}}}/g, config.nodeVersion.toLowerCase()).replace(/{{{port}}}/g, config.port);
    if (config.application === 'Nextjs') {
        template = template.replace(/{{{environment_variables}}}/g, config.envVariablesconfig.map(env => `ENV ${env.envVariableName}=${env.envVariableValue}`).join('\n'));
    }
    //  create the generated directory if it does not exist
    if (!fs.existsSync('./generated')) {
        fs.mkdirSync('./generated');
    }

    // Write the processed template content to the file
    fs.writeFileSync(generatedPath, template, 'utf8');
    
    // log success message
    console.log(chalk.green(`Dockerfile generated successfully at this path : ${generatedPath}!`));

}
