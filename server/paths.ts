import * as path from "path";
import * as fs from "fs";

import * as yargs from "yargs";

let argv = yargs
  .describe("data-path", "Path to store/read data files from, including config and projects")
  .argv;

// User data folder
export let userData = path.join(__dirname, "..");

if (argv["data-path"] != null) {
  userData = path.resolve(argv["data-path"]);
} else {
  if (!fs.existsSync(path.join(userData, "config.json"))) {
    switch (process.platform) {
      case "win32":
        if (process.env.APPDATA != null) userData = path.join(process.env.APPDATA, "Superpowers");
        break;
      case "darwin":
        if (process.env.HOME != null) userData = path.join(process.env.HOME, "Library", "Superpowers");
        break;
      default:
        if (process.env.XDG_DATA_HOME != null) userData = path.join(process.env.XDG_DATA_HOME, "Superpowers");
        else if (process.env.HOME != null) userData = path.join(process.env.HOME, ".local/share", "Superpowers");
    }
  }
}

export let projects = path.join(userData, "projects");
export let builds = path.join(userData, "builds");
export let config = path.join(userData, "config.json");

try { fs.mkdirSync(userData); } catch(err) { if (err.code !== "EEXIST") throw err; }
try { fs.mkdirSync(projects); } catch(err) { if (err.code !== "EEXIST") throw err; }
try { fs.mkdirSync(builds); } catch(err) { if (err.code !== "EEXIST") throw err; }
