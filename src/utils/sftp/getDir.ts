import { any, date } from "zod";


const getDir = () => {

  const Client = require('ssh2-sftp-client');

  const client = new Client()

  console.log("e")

  client.connect({
    host: process.env.HOST!,
    port: 22,
    user: process.env.USER!,
    password: process.env.PASSWORD!,
  }).then(() => {
    return client.list('/');
  }).then((data: any) => {
    console.log(data, 'the data info');
  }).catch((err: any) => {
    console.log(err, 'catch error');
  });

  return ["s", "s"]

}

export default getDir;