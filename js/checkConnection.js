function checkConnection() {
//var state = navigator.connection.type;
var state = navigator.connection.type;
if (state == window.Connection.NONE)
	{return false;}    // doesn't have internet, notify
	else
	{return true;}    // has internet, continue work accessing internet
    alert('Connection type: ' + states[networkState]);
}