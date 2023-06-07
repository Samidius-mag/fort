const { spawn } = require('child_process');

const loadPrice = () => {
  const child = spawn('node', ['load.js']);

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};
/*
const sendToBot = () => {
  const child = spawn('node', ['bot.js']);

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};
*/
const sendToBot2 = () => {
  const child = spawn('node', ['ind.js']);

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};


const sendToBot3 = () => {
  const child = spawn('node', ['bot2.js']);

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};
/*
const sendToBot4 = () => {
  const child = spawn('node', ['bot3.js']);

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

};

  const sendToBot5 = () => {
    const child = spawn('node', ['bot4.js']);
  
    child.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
  
    child.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  
    child.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  };

  const sendToBot6 = () => {
    const child = spawn('node', ['bot5.js']);
  
    child.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
  
    child.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  
    child.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  };

  const sendToBot7 = () => {
    const child = spawn('node', ['bot6.js']);
  
    child.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
  
    child.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  
    child.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  };
*/
setInterval(loadPrice, 5000);
//setInterval(sendToBot, 50000);
setInterval(sendToBot2, 7000);
setInterval(sendToBot3, 10000);
//setInterval(sendToBot4, 120000);
//setInterval(sendToBot5, 121000);
//setInterval(sendToBot6, 122000);
//setInterval(sendToBot7, 123000);