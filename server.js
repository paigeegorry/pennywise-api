const app = require('./lib/app');
const chalk = require('chalk');

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  console.log(chalk.redBright(`listening at PORT ${PORT}`));
});
