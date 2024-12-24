import { createWorker } from 'tesseract.js';

(async () => {
    const worker = await createWorker('jpn');
    const ret = await worker.recognize('C:\\Users\\ethan\\Pictures\\Screenshots\\gomen.png');
    console.log(ret.data.text);
    await worker.terminate();
})();