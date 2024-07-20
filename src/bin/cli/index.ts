#!/usr/bin/env node
import path from "node:path";

import type { Options } from "@types";

import prompts from "prompts";

import { Command, Entity, Event, Init, Module, Button } from "@actions";
import { ChooseModule, getModules, isInitialise, setOptions } from "@utils";

async function main() {
  const options: Options = {
    dir_project: process.cwd(),
    dir_modules: path.join(process.cwd(), "src", "modules"),
    dir_cli: path.join(__dirname, "..", "..", "..", "cli"),
  };

  let choices = [];

  if (!(await isInitialise(options)))
    choices = [
      {
        title: "Initialise",
        description: "To initialize the project using the modular core",
        value: "init",
      },
    ];
  else
    choices = [
      {
        title: "New Module",
        description: "This allows you to create a new module",
        value: "mo",
      },
      {
        title: "New Command",
        description: "This will create a new command",
        value: "cmd",
      },
      {
        title: "New Entity",
        description: "This will create a new entity",
        value: "entity",
      },
      {
        title: "New Event",
        description: "This will create a new event",
        value: "event",
      },
      {
        title: "New Button",
        description: "This will create a new button",
        value: "btn",
      },
    ];

  console.clear();

  const { actions } = await prompts({
    type: "select",
    name: "actions",
    message: "Chose ur actions",
    choices,
  });

  console.clear();

  if (actions === "init") return Init(options);
  else if (actions === "mo") return Module(options);

  options.modules = getModules(options);

  const module = await ChooseModule(options);
  await setOptions(module, options);

  switch (actions) {
    case "cmd":
      return Command(options);

    case "entity":
      return Entity(options);

    case "event":
      return Event(options);

    case "btn":
      return Button(options);
  }
}

main();
