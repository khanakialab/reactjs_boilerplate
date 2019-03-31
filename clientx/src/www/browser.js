if(__isBrowser__) { 
	global = window 
} else {
	global.window = {}
	global.localStorage = {
		getItem: () => null
	}
}
global.Sapp = {}