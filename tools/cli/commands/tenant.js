import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";

const tenant = new Command("tenant");

tenant
  .command("create <name>")
  .description("Create a new RapYard tenant")
  .action(async (name) => {
    const tenantName = name.toLowerCase();
    const base = `apps/web/app/tenant/${tenantName}`;
    const api = `apps/web/app/api/tenant/${tenantName}`;

    console.log(chalk.cyan(`\n=== Creating Tenant: ${tenantName} ===\n`));

    const files = {
      [`${base}/layout.tsx`]: `
export default function TenantLayout({ children, params }) {
  return (
    <html>
      <body>
        <header>
          <h1>Tenant: {params.tenant}</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
      `,
      [`${base}/page.tsx`]: `
export default function TenantHome({ params }) {
  return (
    <div>
      <h2>Welcome to ${tenantName} workspace</h2>
      <p>This is the tenant landing page.</p>
    </div>
  );
}
      `,
      [`${base}/dashboard/page.tsx`]: `
export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Tenant dashboard for ${tenantName}.</p>
    </div>
  );
}
      `,
      [`${base}/settings/page.tsx`]: `
export default function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <p>Manage settings for ${tenantName}.</p>
    </div>
  );
}
      `,
      [`${api}/route.ts`]: `
export async function GET() {
  return Response.json({
    tenant: "${tenantName}",
    status: "ok",
    message: "Tenant API is live"
  });
}
      `
    };

    for (const file in files) {
      const full = path.join(process.cwd(), file);
      await fs.ensureDir(path.dirname(full));
      await fs.writeFile(full, files[file].trim());
      console.log(chalk.yellow(`[CREATE] ${file}`));
    }

    console.log(chalk.green(`\n=== Tenant '${tenantName}' created successfully ===\n`));
  });

export default tenant;
