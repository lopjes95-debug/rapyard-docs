chmod +x tools/cli/index.js
#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import tenantCommand from "./commands/tenant.js";

const program = new Command();

program
  .name("ry")
  .description("RapYard CLI")
  .version("1.0.0");

program.addCommand(tenantCommand);

program.parse(process.argv);
