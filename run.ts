const day = process.argv[2];
const part = process.argv[3] || 1;

if (!day) {
    console.log("Please provide a day");
    process.exit(1);
}

const dayNumber = parseInt(day);

import(`./solutions/${day}/${part}`);
