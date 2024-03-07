import { getVersions, initialize } from './build/index.js';

async function main() {
    initialize('01HR4E9KPPW8VJ1JGCTKARFN51');

    console.log(await getVersions());
}

main();
