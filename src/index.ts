#!/usr/bin/env node
import { CLI } from "./CLI";
import { PromptHandler } from "./PromptHandler";
import { FileHandler } from "./FileHandler";
import { Parser } from "./Parser";
import { FileSystemHandler } from "./FileSystemHandler";
import { CommandHandler } from "./CommandHandler";

const cli = new CLI(new PromptHandler(), new FileHandler(new FileSystemHandler()), new Parser(), new CommandHandler());
(
    async () => { 
        cli.Start(); 
    })
();