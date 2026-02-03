const fs = require('fs');
const content = fs.readFileSync('worker.js', 'utf8');

// Replace single backslash followed by hex characters with double backslash
// This avoids "Legacy octal escape sequences" error in template literals
const fixedContent = content.replace(/`([\s\S]*?)`/g, (match, p1) => {
    // Inside backticks, escape backslashes that look like CSS escapes (\xxxx)
    // but only if they are not already escaped.
    return '`' + p1.replace(/\\([0-9a-fA-F]{1,6})/g, '\\\\$1') + '`';
});

fs.writeFileSync('worker.js', fixedContent);
console.log('Fixed CSS escape sequences in worker.js');
