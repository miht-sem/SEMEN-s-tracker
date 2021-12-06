"use strict";
const vscode = require('vscode');
const vscodeTaskTracker = require("./SEMENTracker");
function activate() {
	vscode.commands.registerCommand("semen-s-tracker.setTask", () => {
        vscodeTaskTracker.default.setTask();
    });
    vscode.commands.registerCommand("semen-s-tracker.clearTask", () => {
        vscodeTaskTracker.default.clearTask();
    });
    vscode.commands.registerCommand("semen-s-tracker.setTimer", () => {
        vscodeTaskTracker.default.setTimer();
    });
    vscode.commands.registerCommand("semen-s-tracker.toggleTimerActive", () => {
        vscodeTaskTracker.default.toggleTimerActive();
    });
    vscode.commands.registerCommand("semen-s-tracker.clearTimer", () => {
        vscodeTaskTracker.default.clearTimer();
    });
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
