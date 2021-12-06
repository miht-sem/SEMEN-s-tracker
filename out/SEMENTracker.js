const vscode = require("vscode");
/**
  return time in seconds from provided time indicator string, ex: 1 hour 10 minutes 10 seconds
  ve5mufchak6weedv5odoinlmqa6ohuk6wtanj4ximw3szxgwdm3a
 */
function parseTimeInput(input) {
    var countOfSeconds = 0;
    var days = input.match(/(\d+)\s*d/);
    var hours = input.match(/(\d+)\s*h/);
    var minutes = input.match(/(\d+)\s*m/);
    var seconds = input.match(/(\d+)\s*s/);
    if (days) {
        countOfSeconds += parseInt(days[1]) * 86400;
    }
    if (hours) {
        countOfSeconds += parseInt(hours[1]) * 3600;
    }
    if (minutes) {
        countOfSeconds += parseInt(minutes[1]) * 60;
    }
    if (seconds) {
        countOfSeconds += parseInt(seconds[1]);
    }
    return countOfSeconds;
}
function doubleDigit(digit) {
    if (digit === 0) {
        return "00";
    }
    else if (digit < 10) {
        return `0${digit}`;
    }
    return digit.toString();
}
/**
 * returns seconds as digital timer format 00:00:00
 */
function formatSecondsDisplay(seconds) {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${doubleDigit(hours)}:${doubleDigit(mins)}:${doubleDigit(secs)}`;
}

class TaskTracker {
    constructor() {
        this.timerSeconds = 0;
        this.timerInterval = null;
        this.task = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        this.timerDisplay = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 99);
    }
    setTask() {
        vscode.window.showInputBox({
            value: '',
            placeHolder: 'Enter Your Task Here'
        }).then(result => {
            if (!result) {
                vscode.window.showInformationMessage("You can't create zero task :(");
            }
            else {
                this.task.text = `Current Task: ${result}`;
                this.task.tooltip = result;
                this.task.show();
            }
        }).catch(err => console.log(err));
    }
    clearTask() {
        this.task.hide();
    }
    setTimer() {
        vscode.window.showInputBox({
            value: "25 Minutes",
            placeHolder: 'Enter Timer Duration Here'
        }).then(result => {
            const seconds = parseTimeInput(result.toLowerCase());
            if (!seconds) {
                vscode.window.showInformationMessage("You can't set zero time :(");
            }
            else {
                clearInterval(this.timerInterval);
                this.timerSeconds = seconds;
                this.timerDisplay.show();
                this.tickTimer();
                this.timerInterval = setInterval(this.tickTimer.bind(this), 1000);
            }
        }).catch(err => console.log(err));
    }
    toggleTimerActive() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        else {
            this.timerInterval = setInterval(this.tickTimer.bind(this), 1000);
        }
    }
    clearTimer() {
        this.timerDisplay.hide();
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    tickTimer() {
        this.timerSeconds = this.timerSeconds - 1;
        this.timerDisplay.text = `Remaining Time: ${formatSecondsDisplay(this.timerSeconds)}`;
        if (this.timerSeconds <= 0) {
            this.clearTimer();
            vscode.window.showInformationMessage("Timer Complete!");
        }
    }
}
exports.TaskTracker = TaskTracker;
exports.default = new TaskTracker();