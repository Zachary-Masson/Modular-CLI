import "dotenv/config"

import { Colors, Modular } from "@zachary_masson/modular-core";

// Imports Modules

async function __main__() {
  
  const client = new Modular({
    token: process.env.TOKEN,
    dev: JSON.parse(process.env.DEV) || false,
    database: {
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: 5432
    },
    design: {
      colors: {
        primary: Colors.Magenta,
        secondary: Colors.Grey,
        info: Colors.Blue,
        warning: Colors.Yellow,
        error: Colors.Red
      }
    }
  });

  // Use Module

  await client.login();
}

__main__();