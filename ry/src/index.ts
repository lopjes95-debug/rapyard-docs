#!/usr/bin/env node

import { dev } from "./commands/dev";
import { doctor } from "./commands/doctor";

const [, , cmd, arg] = process.argv;

switch (cmd) {
  case "dev":
    dev(arg);
    break;

  case "doctor":
    doctor();
    break;

  default:
    console.log(`
ry — RapYard CLI

Commands:
  ry dev web
  ry dev api
  ry dev worker
  ry dev mobile
  ry doctor
`);
}
