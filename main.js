import { getListItemById, initialize } from './build/index.js';

initialize('2he0RPbCa92vbBoVHp8ihNGlUdW');

async function run() {
    console.log(await getListItemById({
        id: '2huxRMpzu3vZXNfSX8GThjKuaXb'
    }));
}

run();
