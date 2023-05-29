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
  const child = spawn('node', ['bot15m.js']);

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

const sendToBot4 = () => {
  const child = spawn('node', ['bot1h.js']);

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
    const child = spawn('node', ['bot4h.js']);
  
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
    const child = spawn('node', ['bot24h.js']);
  
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

setInterval(loadPrice, 10000);
setInterval(sendToBot, 50000);
setInterval(sendToBot2, 7000);
setInterval(sendToBot3, 310000);
setInterval(sendToBot4, 350000);
setInterval(sendToBot5, 400000);
setInterval(sendToBot6, 500000);
setInterval(sendToBot7, 300000);