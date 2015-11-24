var app = require('app'); // Module to control application life.
var BrowserWindow = require('browser-window'); // Module to create native browser window.
// Report crashes to our server.
require('crash-reporter').start();
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform != 'darwin') {
		app.quit();
	}
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

	var path = require("path");
	var fs = require("fs");
	var initPath = path.join(app.getDataPath(), "init.json");
	var data;

	try {
		data = JSON.parse(fs.readFileSync(initPath, 'utf8'));
	} catch (e) {}

	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 400,
		height: 620,
		frame: false,
		resizable: false
	});

	if (data && data.bounds) {
		mainWindow.setBounds(data.bounds);
	};

	// and load the index.html of the app.
	mainWindow.loadUrl('file://' + __dirname + '/index.html');

	// Open the DevTools.
	// mainWindow.openDevTools();

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {

		var data = {
			bounds: mainWindow.getBounds()
		};
		// data = null;
		fs.writeFileSync(initPath, JSON.stringify(data));

		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
});