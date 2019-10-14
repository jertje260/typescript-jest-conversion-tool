#!/usr/bin/env node
import { PromptHandler } from "./PromptHandler";


(async () => {
    const handler = new PromptHandler();
    const root = await handler.GetRootOfRepo();
    console.log(root);
});