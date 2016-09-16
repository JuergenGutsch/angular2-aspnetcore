/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process, __filename) {/*
	 * SystemJS v0.19.27
	 */
	(function() {
	function bootstrap() {// from https://gist.github.com/Yaffle/1088850
	(function(global) {
	function URLPolyfill(url, baseURL) {
	  if (typeof url != 'string')
	    throw new TypeError('URL must be a string');
	  var m = String(url).replace(/^\s+|\s+$/g, "").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
	  if (!m)
	    throw new RangeError('Invalid URL format');
	  var protocol = m[1] || "";
	  var username = m[2] || "";
	  var password = m[3] || "";
	  var host = m[4] || "";
	  var hostname = m[5] || "";
	  var port = m[6] || "";
	  var pathname = m[7] || "";
	  var search = m[8] || "";
	  var hash = m[9] || "";
	  if (baseURL !== undefined) {
	    var base = baseURL instanceof URLPolyfill ? baseURL : new URLPolyfill(baseURL);
	    var flag = !protocol && !host && !username;
	    if (flag && !pathname && !search)
	      search = base.search;
	    if (flag && pathname[0] !== "/")
	      pathname = (pathname ? (((base.host || base.username) && !base.pathname ? "/" : "") + base.pathname.slice(0, base.pathname.lastIndexOf("/") + 1) + pathname) : base.pathname);
	    // dot segments removal
	    var output = [];
	    pathname.replace(/^(\.\.?(\/|$))+/, "")
	      .replace(/\/(\.(\/|$))+/g, "/")
	      .replace(/\/\.\.$/, "/../")
	      .replace(/\/?[^\/]*/g, function (p) {
	        if (p === "/..")
	          output.pop();
	        else
	          output.push(p);
	      });
	    pathname = output.join("").replace(/^\//, pathname[0] === "/" ? "/" : "");
	    if (flag) {
	      port = base.port;
	      hostname = base.hostname;
	      host = base.host;
	      password = base.password;
	      username = base.username;
	    }
	    if (!protocol)
	      protocol = base.protocol;
	  }

	  // convert windows file URLs to use /
	  if (protocol == 'file:')
	    pathname = pathname.replace(/\\/g, '/');

	  this.origin = host ? protocol + (protocol !== "" || host !== "" ? "//" : "") + host : "";
	  this.href = protocol + (protocol && host || protocol == "file:" ? "//" : "") + (username !== "" ? username + (password !== "" ? ":" + password : "") + "@" : "") + host + pathname + search + hash;
	  this.protocol = protocol;
	  this.username = username;
	  this.password = password;
	  this.host = host;
	  this.hostname = hostname;
	  this.port = port;
	  this.pathname = pathname;
	  this.search = search;
	  this.hash = hash;
	}
	global.URLPolyfill = URLPolyfill;
	})(typeof self != 'undefined' ? self : global);(function(__global) {

	  var isWorker = typeof window == 'undefined' && typeof self != 'undefined' && typeof importScripts != 'undefined';
	  var isBrowser = typeof window != 'undefined' && typeof document != 'undefined';
	  var isWindows = typeof process != 'undefined' && typeof process.platform != 'undefined' && !!process.platform.match(/^win/);

	  if (!__global.console)
	    __global.console = { assert: function() {} };

	  // IE8 support
	  var indexOf = Array.prototype.indexOf || function(item) {
	    for (var i = 0, thisLen = this.length; i < thisLen; i++) {
	      if (this[i] === item) {
	        return i;
	      }
	    }
	    return -1;
	  };
	  
	  var defineProperty;
	  (function () {
	    try {
	      if (!!Object.defineProperty({}, 'a', {}))
	        defineProperty = Object.defineProperty;
	    }
	    catch (e) {
	      defineProperty = function(obj, prop, opt) {
	        try {
	          obj[prop] = opt.value || opt.get.call(obj);
	        }
	        catch(e) {}
	      }
	    }
	  })();

	  var errArgs = new Error(0, '_').fileName == '_';

	  function addToError(err, msg) {
	    // parse the stack removing loader code lines for simplification
	    if (!err.originalErr) {
	      var stack = (err.stack || err.message || err).split('\n');
	      var newStack = [];
	      for (var i = 0; i < stack.length; i++) {
	        if (typeof $__curScript == 'undefined' || stack[i].indexOf($__curScript.src) == -1)
	          newStack.push(stack[i]);
	      }
	    }

	    var newMsg = (newStack ? newStack.join('\n\t') : err.message) + '\n\t' + msg;

	    // Convert file:/// URLs to paths in Node
	    if (!isBrowser)
	      newMsg = newMsg.replace(isWindows ? /file:\/\/\//g : /file:\/\//g, '');

	    var newErr = errArgs ? new Error(newMsg, err.fileName, err.lineNumber) : new Error(newMsg);
	    
	    // Node needs stack adjustment for throw to show message
	    if (!isBrowser)
	      newErr.stack = newMsg;
	    // Clearing the stack stops unnecessary loader lines showing
	    else
	      newErr.stack = null;
	    
	    // track the original error
	    newErr.originalErr = err.originalErr || err;

	    return newErr;
	  }

	  function __eval(source, debugName, context) {
	    try {
	      new Function(source).call(context);
	    }
	    catch(e) {
	      throw addToError(e, 'Evaluating ' + debugName);
	    }
	  }

	  var baseURI;
	  // environent baseURI detection
	  if (typeof document != 'undefined' && document.getElementsByTagName) {
	    baseURI = document.baseURI;

	    if (!baseURI) {
	      var bases = document.getElementsByTagName('base');
	      baseURI = bases[0] && bases[0].href || window.location.href;
	    }

	    // sanitize out the hash and querystring
	    baseURI = baseURI.split('#')[0].split('?')[0];
	    baseURI = baseURI.substr(0, baseURI.lastIndexOf('/') + 1);
	  }
	  else if (typeof process != 'undefined' && process.cwd) {
	    baseURI = 'file://' + (isWindows ? '/' : '') + process.cwd() + '/';
	    if (isWindows)
	      baseURI = baseURI.replace(/\\/g, '/');
	  }
	  else if (typeof location != 'undefined') {
	    baseURI = __global.location.href;
	  }
	  else {
	    throw new TypeError('No environment baseURI');
	  }

	  try {
	    var nativeURL = new __global.URL('test:///').protocol == 'test:';
	  }
	  catch(e) {}

	  var URL = nativeURL ? __global.URL : __global.URLPolyfill;
	/*
	*********************************************************************************************

	  Dynamic Module Loader Polyfill

	    - Implemented exactly to the former 2014-08-24 ES6 Specification Draft Rev 27, Section 15
	      http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts#august_24_2014_draft_rev_27

	    - Functions are commented with their spec numbers, with spec differences commented.

	    - Spec bugs are commented in this code with links.

	    - Abstract functions have been combined where possible, and their associated functions
	      commented.

	    - Realm implementation is entirely omitted.

	*********************************************************************************************
	*/

	function Module() {}
	// http://www.ecma-international.org/ecma-262/6.0/#sec-@@tostringtag
	defineProperty(Module.prototype, 'toString', {
	  value: function() {
	    return 'Module';
	  }
	});
	function Loader(options) {
	  this._loader = {
	    loaderObj: this,
	    loads: [],
	    modules: {},
	    importPromises: {},
	    moduleRecords: {}
	  };

	  // 26.3.3.6
	  defineProperty(this, 'global', {
	    get: function() {
	      return __global;
	    }
	  });

	  // 26.3.3.13 realm not implemented
	}

	(function() {

	// Some Helpers

	// logs a linkset snapshot for debugging
	/* function snapshot(loader) {
	  console.log('---Snapshot---');
	  for (var i = 0; i < loader.loads.length; i++) {
	    var load = loader.loads[i];
	    var linkSetLog = '  ' + load.name + ' (' + load.status + '): ';

	    for (var j = 0; j < load.linkSets.length; j++) {
	      linkSetLog += '{' + logloads(load.linkSets[j].loads) + '} ';
	    }
	    console.log(linkSetLog);
	  }
	  console.log('');
	}
	function logloads(loads) {
	  var log = '';
	  for (var k = 0; k < loads.length; k++)
	    log += loads[k].name + (k != loads.length - 1 ? ' ' : '');
	  return log;
	} */


	/* function checkInvariants() {
	  // see https://bugs.ecmascript.org/show_bug.cgi?id=2603#c1

	  var loads = System._loader.loads;
	  var linkSets = [];

	  for (var i = 0; i < loads.length; i++) {
	    var load = loads[i];
	    console.assert(load.status == 'loading' || load.status == 'loaded', 'Each load is loading or loaded');

	    for (var j = 0; j < load.linkSets.length; j++) {
	      var linkSet = load.linkSets[j];

	      for (var k = 0; k < linkSet.loads.length; k++)
	        console.assert(loads.indexOf(linkSet.loads[k]) != -1, 'linkSet loads are a subset of loader loads');

	      if (linkSets.indexOf(linkSet) == -1)
	        linkSets.push(linkSet);
	    }
	  }

	  for (var i = 0; i < loads.length; i++) {
	    var load = loads[i];
	    for (var j = 0; j < linkSets.length; j++) {
	      var linkSet = linkSets[j];

	      if (linkSet.loads.indexOf(load) != -1)
	        console.assert(load.linkSets.indexOf(linkSet) != -1, 'linkSet contains load -> load contains linkSet');

	      if (load.linkSets.indexOf(linkSet) != -1)
	        console.assert(linkSet.loads.indexOf(load) != -1, 'load contains linkSet -> linkSet contains load');
	    }
	  }

	  for (var i = 0; i < linkSets.length; i++) {
	    var linkSet = linkSets[i];
	    for (var j = 0; j < linkSet.loads.length; j++) {
	      var load = linkSet.loads[j];

	      for (var k = 0; k < load.dependencies.length; k++) {
	        var depName = load.dependencies[k].value;
	        var depLoad;
	        for (var l = 0; l < loads.length; l++) {
	          if (loads[l].name != depName)
	            continue;
	          depLoad = loads[l];
	          break;
	        }

	        // loading records are allowed not to have their dependencies yet
	        // if (load.status != 'loading')
	        //  console.assert(depLoad, 'depLoad found');

	        // console.assert(linkSet.loads.indexOf(depLoad) != -1, 'linkset contains all dependencies');
	      }
	    }
	  }
	} */

	  // 15.2.3 - Runtime Semantics: Loader State

	  // 15.2.3.11
	  function createLoaderLoad(object) {
	    return {
	      // modules is an object for ES5 implementation
	      modules: {},
	      loads: [],
	      loaderObj: object
	    };
	  }

	  // 15.2.3.2 Load Records and LoadRequest Objects

	  // 15.2.3.2.1
	  function createLoad(name) {
	    return {
	      status: 'loading',
	      name: name,
	      linkSets: [],
	      dependencies: [],
	      metadata: {}
	    };
	  }

	  // 15.2.3.2.2 createLoadRequestObject, absorbed into calling functions

	  // 15.2.4

	  // 15.2.4.1
	  function loadModule(loader, name, options) {
	    return new Promise(asyncStartLoadPartwayThrough({
	      step: options.address ? 'fetch' : 'locate',
	      loader: loader,
	      moduleName: name,
	      // allow metadata for import https://bugs.ecmascript.org/show_bug.cgi?id=3091
	      moduleMetadata: options && options.metadata || {},
	      moduleSource: options.source,
	      moduleAddress: options.address
	    }));
	  }

	  // 15.2.4.2
	  function requestLoad(loader, request, refererName, refererAddress) {
	    // 15.2.4.2.1 CallNormalize
	    return new Promise(function(resolve, reject) {
	      resolve(loader.loaderObj.normalize(request, refererName, refererAddress));
	    })
	    // 15.2.4.2.2 GetOrCreateLoad
	    .then(function(name) {
	      var load;
	      if (loader.modules[name]) {
	        load = createLoad(name);
	        load.status = 'linked';
	        // https://bugs.ecmascript.org/show_bug.cgi?id=2795
	        load.module = loader.modules[name];
	        return load;
	      }

	      for (var i = 0, l = loader.loads.length; i < l; i++) {
	        load = loader.loads[i];
	        if (load.name != name)
	          continue;
	        console.assert(load.status == 'loading' || load.status == 'loaded', 'loading or loaded');
	        return load;
	      }

	      load = createLoad(name);
	      loader.loads.push(load);

	      proceedToLocate(loader, load);

	      return load;
	    });
	  }

	  // 15.2.4.3
	  function proceedToLocate(loader, load) {
	    proceedToFetch(loader, load,
	      Promise.resolve()
	      // 15.2.4.3.1 CallLocate
	      .then(function() {
	        return loader.loaderObj.locate({ name: load.name, metadata: load.metadata });
	      })
	    );
	  }

	  // 15.2.4.4
	  function proceedToFetch(loader, load, p) {
	    proceedToTranslate(loader, load,
	      p
	      // 15.2.4.4.1 CallFetch
	      .then(function(address) {
	        // adjusted, see https://bugs.ecmascript.org/show_bug.cgi?id=2602
	        if (load.status != 'loading')
	          return;
	        load.address = address;

	        return loader.loaderObj.fetch({ name: load.name, metadata: load.metadata, address: address });
	      })
	    );
	  }

	  var anonCnt = 0;

	  // 15.2.4.5
	  function proceedToTranslate(loader, load, p) {
	    p
	    // 15.2.4.5.1 CallTranslate
	    .then(function(source) {
	      if (load.status != 'loading')
	        return;

	      return Promise.resolve(loader.loaderObj.translate({ name: load.name, metadata: load.metadata, address: load.address, source: source }))

	      // 15.2.4.5.2 CallInstantiate
	      .then(function(source) {
	        load.source = source;
	        return loader.loaderObj.instantiate({ name: load.name, metadata: load.metadata, address: load.address, source: source });
	      })

	      // 15.2.4.5.3 InstantiateSucceeded
	      .then(function(instantiateResult) {
	        if (instantiateResult === undefined) {
	          load.address = load.address || '<Anonymous Module ' + ++anonCnt + '>';

	          // instead of load.kind, use load.isDeclarative
	          load.isDeclarative = true;
	          return transpile.call(loader.loaderObj, load)
	          .then(function(transpiled) {
	            // Hijack System.register to set declare function
	            var curSystem = __global.System;
	            var curRegister = curSystem.register;
	            curSystem.register = function(name, deps, declare) {
	              if (typeof name != 'string') {
	                declare = deps;
	                deps = name;
	              }
	              // store the registered declaration as load.declare
	              // store the deps as load.deps
	              load.declare = declare;
	              load.depsList = deps;
	            }
	            // empty {} context is closest to undefined 'this' we can get
	            __eval(transpiled, load.address, {});
	            curSystem.register = curRegister;
	          });
	        }
	        else if (typeof instantiateResult == 'object') {
	          load.depsList = instantiateResult.deps || [];
	          load.execute = instantiateResult.execute;
	          load.isDeclarative = false;
	        }
	        else
	          throw TypeError('Invalid instantiate return value');
	      })
	      // 15.2.4.6 ProcessLoadDependencies
	      .then(function() {
	        load.dependencies = [];
	        var depsList = load.depsList;

	        var loadPromises = [];
	        for (var i = 0, l = depsList.length; i < l; i++) (function(request, index) {
	          loadPromises.push(
	            requestLoad(loader, request, load.name, load.address)

	            // 15.2.4.6.1 AddDependencyLoad (load is parentLoad)
	            .then(function(depLoad) {

	              // adjusted from spec to maintain dependency order
	              // this is due to the System.register internal implementation needs
	              load.dependencies[index] = {
	                key: request,
	                value: depLoad.name
	              };

	              if (depLoad.status != 'linked') {
	                var linkSets = load.linkSets.concat([]);
	                for (var i = 0, l = linkSets.length; i < l; i++)
	                  addLoadToLinkSet(linkSets[i], depLoad);
	              }

	              // console.log('AddDependencyLoad ' + depLoad.name + ' for ' + load.name);
	              // snapshot(loader);
	            })
	          );
	        })(depsList[i], i);

	        return Promise.all(loadPromises);
	      })

	      // 15.2.4.6.2 LoadSucceeded
	      .then(function() {
	        // console.log('LoadSucceeded ' + load.name);
	        // snapshot(loader);

	        console.assert(load.status == 'loading', 'is loading');

	        load.status = 'loaded';

	        var linkSets = load.linkSets.concat([]);
	        for (var i = 0, l = linkSets.length; i < l; i++)
	          updateLinkSetOnLoad(linkSets[i], load);
	      });
	    })
	    // 15.2.4.5.4 LoadFailed
	    ['catch'](function(exc) {
	      load.status = 'failed';
	      load.exception = exc;

	      var linkSets = load.linkSets.concat([]);
	      for (var i = 0, l = linkSets.length; i < l; i++) {
	        linkSetFailed(linkSets[i], load, exc);
	      }

	      console.assert(load.linkSets.length == 0, 'linkSets not removed');
	    });
	  }

	  // 15.2.4.7 PromiseOfStartLoadPartwayThrough absorbed into calling functions

	  // 15.2.4.7.1
	  function asyncStartLoadPartwayThrough(stepState) {
	    return function(resolve, reject) {
	      var loader = stepState.loader;
	      var name = stepState.moduleName;
	      var step = stepState.step;

	      if (loader.modules[name])
	        throw new TypeError('"' + name + '" already exists in the module table');

	      // adjusted to pick up existing loads
	      var existingLoad;
	      for (var i = 0, l = loader.loads.length; i < l; i++) {
	        if (loader.loads[i].name == name) {
	          existingLoad = loader.loads[i];

	          if (step == 'translate' && !existingLoad.source) {
	            existingLoad.address = stepState.moduleAddress;
	            proceedToTranslate(loader, existingLoad, Promise.resolve(stepState.moduleSource));
	          }

	          // a primary load -> use that existing linkset if it is for the direct load here
	          // otherwise create a new linkset unit
	          if (existingLoad.linkSets.length && existingLoad.linkSets[0].loads[0].name == existingLoad.name)
	            return existingLoad.linkSets[0].done.then(function() {
	              resolve(existingLoad);
	            });
	        }
	      }

	      var load = existingLoad || createLoad(name);

	      load.metadata = stepState.moduleMetadata;

	      var linkSet = createLinkSet(loader, load);

	      loader.loads.push(load);

	      resolve(linkSet.done);

	      if (step == 'locate')
	        proceedToLocate(loader, load);

	      else if (step == 'fetch')
	        proceedToFetch(loader, load, Promise.resolve(stepState.moduleAddress));

	      else {
	        console.assert(step == 'translate', 'translate step');
	        load.address = stepState.moduleAddress;
	        proceedToTranslate(loader, load, Promise.resolve(stepState.moduleSource));
	      }
	    }
	  }

	  // Declarative linking functions run through alternative implementation:
	  // 15.2.5.1.1 CreateModuleLinkageRecord not implemented
	  // 15.2.5.1.2 LookupExport not implemented
	  // 15.2.5.1.3 LookupModuleDependency not implemented

	  // 15.2.5.2.1
	  function createLinkSet(loader, startingLoad) {
	    var linkSet = {
	      loader: loader,
	      loads: [],
	      startingLoad: startingLoad, // added see spec bug https://bugs.ecmascript.org/show_bug.cgi?id=2995
	      loadingCount: 0
	    };
	    linkSet.done = new Promise(function(resolve, reject) {
	      linkSet.resolve = resolve;
	      linkSet.reject = reject;
	    });
	    addLoadToLinkSet(linkSet, startingLoad);
	    return linkSet;
	  }
	  // 15.2.5.2.2
	  function addLoadToLinkSet(linkSet, load) {
	    if (load.status == 'failed')
	      return;

	    console.assert(load.status == 'loading' || load.status == 'loaded', 'loading or loaded on link set');

	    for (var i = 0, l = linkSet.loads.length; i < l; i++)
	      if (linkSet.loads[i] == load)
	        return;

	    linkSet.loads.push(load);
	    load.linkSets.push(linkSet);

	    // adjustment, see https://bugs.ecmascript.org/show_bug.cgi?id=2603
	    if (load.status != 'loaded') {
	      linkSet.loadingCount++;
	    }

	    var loader = linkSet.loader;

	    for (var i = 0, l = load.dependencies.length; i < l; i++) {
	      if (!load.dependencies[i])
	        continue;

	      var name = load.dependencies[i].value;

	      if (loader.modules[name])
	        continue;

	      for (var j = 0, d = loader.loads.length; j < d; j++) {
	        if (loader.loads[j].name != name)
	          continue;

	        addLoadToLinkSet(linkSet, loader.loads[j]);
	        break;
	      }
	    }
	    // console.log('add to linkset ' + load.name);
	    // snapshot(linkSet.loader);
	  }

	  // linking errors can be generic or load-specific
	  // this is necessary for debugging info
	  function doLink(linkSet) {
	    var error = false;
	    try {
	      link(linkSet, function(load, exc) {
	        linkSetFailed(linkSet, load, exc);
	        error = true;
	      });
	    }
	    catch(e) {
	      linkSetFailed(linkSet, null, e);
	      error = true;
	    }
	    return error;
	  }

	  // 15.2.5.2.3
	  function updateLinkSetOnLoad(linkSet, load) {
	    // console.log('update linkset on load ' + load.name);
	    // snapshot(linkSet.loader);

	    console.assert(load.status == 'loaded' || load.status == 'linked', 'loaded or linked');

	    linkSet.loadingCount--;

	    if (linkSet.loadingCount > 0)
	      return;

	    // adjusted for spec bug https://bugs.ecmascript.org/show_bug.cgi?id=2995
	    var startingLoad = linkSet.startingLoad;

	    // non-executing link variation for loader tracing
	    // on the server. Not in spec.
	    /***/
	    if (linkSet.loader.loaderObj.execute === false) {
	      var loads = [].concat(linkSet.loads);
	      for (var i = 0, l = loads.length; i < l; i++) {
	        var load = loads[i];
	        load.module = !load.isDeclarative ? {
	          module: _newModule({})
	        } : {
	          name: load.name,
	          module: _newModule({}),
	          evaluated: true
	        };
	        load.status = 'linked';
	        finishLoad(linkSet.loader, load);
	      }
	      return linkSet.resolve(startingLoad);
	    }
	    /***/

	    var abrupt = doLink(linkSet);

	    if (abrupt)
	      return;

	    console.assert(linkSet.loads.length == 0, 'loads cleared');

	    linkSet.resolve(startingLoad);
	  }

	  // 15.2.5.2.4
	  function linkSetFailed(linkSet, load, exc) {
	    var loader = linkSet.loader;
	    var requests;

	    checkError: 
	    if (load) {
	      if (linkSet.loads[0].name == load.name) {
	        exc = addToError(exc, 'Error loading ' + load.name);
	      }
	      else {
	        for (var i = 0; i < linkSet.loads.length; i++) {
	          var pLoad = linkSet.loads[i];
	          for (var j = 0; j < pLoad.dependencies.length; j++) {
	            var dep = pLoad.dependencies[j];
	            if (dep.value == load.name) {
	              exc = addToError(exc, 'Error loading ' + load.name + ' as "' + dep.key + '" from ' + pLoad.name);
	              break checkError;
	            }
	          }
	        }
	        exc = addToError(exc, 'Error loading ' + load.name + ' from ' + linkSet.loads[0].name);
	      }
	    }
	    else {
	      exc = addToError(exc, 'Error linking ' + linkSet.loads[0].name);
	    }


	    var loads = linkSet.loads.concat([]);
	    for (var i = 0, l = loads.length; i < l; i++) {
	      var load = loads[i];

	      // store all failed load records
	      loader.loaderObj.failed = loader.loaderObj.failed || [];
	      if (indexOf.call(loader.loaderObj.failed, load) == -1)
	        loader.loaderObj.failed.push(load);

	      var linkIndex = indexOf.call(load.linkSets, linkSet);
	      console.assert(linkIndex != -1, 'link not present');
	      load.linkSets.splice(linkIndex, 1);
	      if (load.linkSets.length == 0) {
	        var globalLoadsIndex = indexOf.call(linkSet.loader.loads, load);
	        if (globalLoadsIndex != -1)
	          linkSet.loader.loads.splice(globalLoadsIndex, 1);
	      }
	    }
	    linkSet.reject(exc);
	  }

	  // 15.2.5.2.5
	  function finishLoad(loader, load) {
	    // add to global trace if tracing
	    if (loader.loaderObj.trace) {
	      if (!loader.loaderObj.loads)
	        loader.loaderObj.loads = {};
	      var depMap = {};
	      load.dependencies.forEach(function(dep) {
	        depMap[dep.key] = dep.value;
	      });
	      loader.loaderObj.loads[load.name] = {
	        name: load.name,
	        deps: load.dependencies.map(function(dep){ return dep.key }),
	        depMap: depMap,
	        address: load.address,
	        metadata: load.metadata,
	        source: load.source,
	        kind: load.isDeclarative ? 'declarative' : 'dynamic'
	      };
	    }
	    // if not anonymous, add to the module table
	    if (load.name) {
	      console.assert(!loader.modules[load.name], 'load not in module table');
	      loader.modules[load.name] = load.module;
	    }
	    var loadIndex = indexOf.call(loader.loads, load);
	    if (loadIndex != -1)
	      loader.loads.splice(loadIndex, 1);
	    for (var i = 0, l = load.linkSets.length; i < l; i++) {
	      loadIndex = indexOf.call(load.linkSets[i].loads, load);
	      if (loadIndex != -1)
	        load.linkSets[i].loads.splice(loadIndex, 1);
	    }
	    load.linkSets.splice(0, load.linkSets.length);
	  }

	  function doDynamicExecute(linkSet, load, linkError) {
	    try {
	      var module = load.execute();
	    }
	    catch(e) {
	      linkError(load, e);
	      return;
	    }
	    if (!module || !(module instanceof Module))
	      linkError(load, new TypeError('Execution must define a Module instance'));
	    else
	      return module;
	  }

	  // 26.3 Loader

	  // 26.3.1.1
	  // defined at top

	  // importPromises adds ability to import a module twice without error - https://bugs.ecmascript.org/show_bug.cgi?id=2601
	  function createImportPromise(loader, name, promise) {
	    var importPromises = loader._loader.importPromises;
	    return importPromises[name] = promise.then(function(m) {
	      importPromises[name] = undefined;
	      return m;
	    }, function(e) {
	      importPromises[name] = undefined;
	      throw e;
	    });
	  }

	  Loader.prototype = {
	    // 26.3.3.1
	    constructor: Loader,
	    // 26.3.3.2
	    define: function(name, source, options) {
	      // check if already defined
	      if (this._loader.importPromises[name])
	        throw new TypeError('Module is already loading.');
	      return createImportPromise(this, name, new Promise(asyncStartLoadPartwayThrough({
	        step: 'translate',
	        loader: this._loader,
	        moduleName: name,
	        moduleMetadata: options && options.metadata || {},
	        moduleSource: source,
	        moduleAddress: options && options.address
	      })));
	    },
	    // 26.3.3.3
	    'delete': function(name) {
	      var loader = this._loader;
	      delete loader.importPromises[name];
	      delete loader.moduleRecords[name];
	      return loader.modules[name] ? delete loader.modules[name] : false;
	    },
	    // 26.3.3.4 entries not implemented
	    // 26.3.3.5
	    get: function(key) {
	      if (!this._loader.modules[key])
	        return;
	      doEnsureEvaluated(this._loader.modules[key], [], this);
	      return this._loader.modules[key].module;
	    },
	    // 26.3.3.7
	    has: function(name) {
	      return !!this._loader.modules[name];
	    },
	    // 26.3.3.8
	    'import': function(name, parentName, parentAddress) {
	      if (typeof parentName == 'object')
	        parentName = parentName.name;

	      // run normalize first
	      var loaderObj = this;

	      // added, see https://bugs.ecmascript.org/show_bug.cgi?id=2659
	      return Promise.resolve(loaderObj.normalize(name, parentName))
	      .then(function(name) {
	        var loader = loaderObj._loader;

	        if (loader.modules[name]) {
	          doEnsureEvaluated(loader.modules[name], [], loader._loader);
	          return loader.modules[name].module;
	        }

	        return loader.importPromises[name] || createImportPromise(loaderObj, name,
	          loadModule(loader, name, {})
	          .then(function(load) {
	            delete loader.importPromises[name];
	            return evaluateLoadedModule(loader, load);
	          }));
	      });
	    },
	    // 26.3.3.9 keys not implemented
	    // 26.3.3.10
	    load: function(name) {
	      var loader = this._loader;
	      if (loader.modules[name])
	        return Promise.resolve();
	      return loader.importPromises[name] || createImportPromise(this, name, new Promise(asyncStartLoadPartwayThrough({
	        step: 'locate',
	        loader: loader,
	        moduleName: name,
	        moduleMetadata: {},
	        moduleSource: undefined,
	        moduleAddress: undefined
	      }))
	      .then(function() {
	        delete loader.importPromises[name];
	      }));
	    },
	    // 26.3.3.11
	    module: function(source, options) {
	      var load = createLoad();
	      load.address = options && options.address;
	      var linkSet = createLinkSet(this._loader, load);
	      var sourcePromise = Promise.resolve(source);
	      var loader = this._loader;
	      var p = linkSet.done.then(function() {
	        return evaluateLoadedModule(loader, load);
	      });
	      proceedToTranslate(loader, load, sourcePromise);
	      return p;
	    },
	    // 26.3.3.12
	    newModule: function (obj) {
	      if (typeof obj != 'object')
	        throw new TypeError('Expected object');

	      var m = new Module();

	      var pNames = [];
	      if (Object.getOwnPropertyNames && obj != null)
	        pNames = Object.getOwnPropertyNames(obj);
	      else
	        for (var key in obj)
	          pNames.push(key);

	      for (var i = 0; i < pNames.length; i++) (function(key) {
	        defineProperty(m, key, {
	          configurable: false,
	          enumerable: true,
	          get: function () {
	            return obj[key];
	          },
	          set: function() {
	            throw new Error('Module exports cannot be changed externally.');
	          }
	        });
	      })(pNames[i]);

	      if (Object.freeze)
	        Object.freeze(m);

	      return m;
	    },
	    // 26.3.3.14
	    set: function(name, module) {
	      if (!(module instanceof Module))
	        throw new TypeError('Loader.set(' + name + ', module) must be a module');
	      this._loader.modules[name] = {
	        module: module
	      };
	    },
	    // 26.3.3.15 values not implemented
	    // 26.3.3.16 @@iterator not implemented
	    // 26.3.3.17 @@toStringTag not implemented

	    // 26.3.3.18.1
	    normalize: function(name, referrerName, referrerAddress) {
	      return name;
	    },
	    // 26.3.3.18.2
	    locate: function(load) {
	      return load.name;
	    },
	    // 26.3.3.18.3
	    fetch: function(load) {
	    },
	    // 26.3.3.18.4
	    translate: function(load) {
	      return load.source;
	    },
	    // 26.3.3.18.5
	    instantiate: function(load) {
	    }
	  };

	  var _newModule = Loader.prototype.newModule;
	/*
	 * ES6 Module Declarative Linking Code - Dev Build Only
	 */
	  function link(linkSet, linkError) {

	    var loader = linkSet.loader;

	    if (!linkSet.loads.length)
	      return;

	    var loads = linkSet.loads.concat([]);

	    for (var i = 0; i < loads.length; i++) {
	      var load = loads[i];

	      var module = doDynamicExecute(linkSet, load, linkError);
	      if (!module)
	        return;
	      load.module = {
	        name: load.name,
	        module: module
	      };
	      load.status = 'linked';

	      finishLoad(loader, load);
	    }
	  }

	  function evaluateLoadedModule(loader, load) {
	    console.assert(load.status == 'linked', 'is linked ' + load.name);
	    return load.module.module;
	  }

	  function doEnsureEvaluated() {}

	  function transpile() {
	    throw new TypeError('ES6 transpilation is only provided in the dev module loader build.');
	  }
	})();/*
	*********************************************************************************************

	  System Loader Implementation

	    - Implemented to https://github.com/jorendorff/js-loaders/blob/master/browser-loader.js

	    - <script type="module"> supported

	*********************************************************************************************
	*/

	var System;

	function SystemLoader() {
	  Loader.call(this);
	  this.paths = {};
	}

	// NB no specification provided for System.paths, used ideas discussed in https://github.com/jorendorff/js-loaders/issues/25
	function applyPaths(paths, name) {
	  // most specific (most number of slashes in path) match wins
	  var pathMatch = '', wildcard, maxWildcardPrefixLen = 0;

	  // check to see if we have a paths entry
	  for (var p in paths) {
	    var pathParts = p.split('*');
	    if (pathParts.length > 2)
	      throw new TypeError('Only one wildcard in a path is permitted');

	    // exact path match
	    if (pathParts.length == 1) {
	      if (name == p)
	        return paths[p];
	      
	      // support trailing / in paths rules
	      else if (name.substr(0, p.length - 1) == p.substr(0, p.length - 1) && (name.length < p.length || name[p.length - 1] == p[p.length - 1]) && paths[p][paths[p].length - 1] == '/')
	        return paths[p].substr(0, paths[p].length - 1) + (name.length > p.length ? '/' + name.substr(p.length) : '');
	    }
	    // wildcard path match
	    else {
	      var wildcardPrefixLen = pathParts[0].length;
	      if (wildcardPrefixLen >= maxWildcardPrefixLen &&
	          name.substr(0, pathParts[0].length) == pathParts[0] &&
	          name.substr(name.length - pathParts[1].length) == pathParts[1]) {
	            maxWildcardPrefixLen = wildcardPrefixLen;
	            pathMatch = p;
	            wildcard = name.substr(pathParts[0].length, name.length - pathParts[1].length - pathParts[0].length);
	          }
	    }
	  }

	  var outPath = paths[pathMatch];
	  if (typeof wildcard == 'string')
	    outPath = outPath.replace('*', wildcard);

	  return outPath;
	}

	// inline Object.create-style class extension
	function LoaderProto() {}
	LoaderProto.prototype = Loader.prototype;
	SystemLoader.prototype = new LoaderProto();
	  var fetchTextFromURL;
	  if (typeof XMLHttpRequest != 'undefined') {
	    fetchTextFromURL = function(url, authorization, fulfill, reject) {
	      var xhr = new XMLHttpRequest();
	      var sameDomain = true;
	      var doTimeout = false;
	      if (!('withCredentials' in xhr)) {
	        // check if same domain
	        var domainCheck = /^(\w+:)?\/\/([^\/]+)/.exec(url);
	        if (domainCheck) {
	          sameDomain = domainCheck[2] === window.location.host;
	          if (domainCheck[1])
	            sameDomain &= domainCheck[1] === window.location.protocol;
	        }
	      }
	      if (!sameDomain && typeof XDomainRequest != 'undefined') {
	        xhr = new XDomainRequest();
	        xhr.onload = load;
	        xhr.onerror = error;
	        xhr.ontimeout = error;
	        xhr.onprogress = function() {};
	        xhr.timeout = 0;
	        doTimeout = true;
	      }
	      function load() {
	        fulfill(xhr.responseText);
	      }
	      function error() {
	        reject(new Error('XHR error' + (xhr.status ? ' (' + xhr.status + (xhr.statusText ? ' ' + xhr.statusText  : '') + ')' : '') + ' loading ' + url));
	      }

	      xhr.onreadystatechange = function () {
	        if (xhr.readyState === 4) {
	          // in Chrome on file:/// URLs, status is 0
	          if (xhr.status == 0) {
	            if (xhr.responseText) {
	              load();
	            }
	            else {
	              // when responseText is empty, wait for load or error event
	              // to inform if it is a 404 or empty file
	              xhr.addEventListener('error', error);
	              xhr.addEventListener('load', load);
	            }
	          }
	          else if (xhr.status === 200) {
	            load();
	          }
	          else {
	            error();
	          }
	        }
	      };
	      xhr.open("GET", url, true);

	      if (xhr.setRequestHeader) {
	        xhr.setRequestHeader('Accept', 'application/x-es-module, */*');
	        // can set "authorization: true" to enable withCredentials only
	        if (authorization) {
	          if (typeof authorization == 'string')
	            xhr.setRequestHeader('Authorization', authorization);
	          xhr.withCredentials = true;
	        }
	      }

	      if (doTimeout) {
	        setTimeout(function() {
	          xhr.send();
	        }, 0);
	      } else {
	        xhr.send(null);
	      }
	    };
	  }
	  else if ("function" != 'undefined' && typeof process != 'undefined') {
	    var fs;
	    fetchTextFromURL = function(url, authorization, fulfill, reject) {
	      if (url.substr(0, 8) != 'file:///')
	        throw new Error('Unable to fetch "' + url + '". Only file URLs of the form file:/// allowed running in Node.');
	      fs = fs || __webpack_require__(2);
	      if (isWindows)
	        url = url.replace(/\//g, '\\').substr(8);
	      else
	        url = url.substr(7);
	      return fs.readFile(url, function(err, data) {
	        if (err) {
	          return reject(err);
	        }
	        else {
	          // Strip Byte Order Mark out if it's the leading char
	          var dataString = data + '';
	          if (dataString[0] === '\ufeff')
	            dataString = dataString.substr(1);

	          fulfill(dataString);
	        }
	      });
	    };
	  }
	  else if (typeof self != 'undefined' && typeof self.fetch != 'undefined') {
	    fetchTextFromURL = function(url, authorization, fulfill, reject) {
	      var opts = {
	        headers: {'Accept': 'application/x-es-module, */*'}
	      };

	      if (authorization) {
	        if (typeof authorization == 'string')
	          opts.headers['Authorization'] = authorization;
	        opts.credentials = 'include';
	      }

	      fetch(url, opts)
	        .then(function (r) {
	          if (r.ok) {
	            return r.text();
	          } else {
	            throw new Error('Fetch error: ' + r.status + ' ' + r.statusText);
	          }
	        })
	        .then(fulfill, reject);
	    }
	  }
	  else {
	    throw new TypeError('No environment fetch API available.');
	  }

	  SystemLoader.prototype.fetch = function(load) {
	    return new Promise(function(resolve, reject) {
	      fetchTextFromURL(load.address, undefined, resolve, reject);
	    });
	  };
	/*
	 * Traceur, Babel and TypeScript transpile hook for Loader
	 */
	var transpile = (function() {

	  // use Traceur by default
	  Loader.prototype.transpiler = 'traceur';

	  function transpile(load) {
	    var self = this;

	    return Promise.resolve(__global[self.transpiler == 'typescript' ? 'ts' : self.transpiler]
	        || (self.pluginLoader || self)['import'](self.transpiler))
	    .then(function(transpiler) {
	      if (transpiler.__useDefault)
	        transpiler = transpiler['default'];

	      var transpileFunction;
	      if (transpiler.Compiler)
	        transpileFunction = traceurTranspile;
	      else if (transpiler.createLanguageService)
	        transpileFunction = typescriptTranspile;
	      else
	        transpileFunction = babelTranspile;

	      // note __moduleName will be part of the transformer meta in future when we have the spec for this
	      return '(function(__moduleName){' + transpileFunction.call(self, load, transpiler) + '\n})("' + load.name + '");\n//# sourceURL=' + load.address + '!transpiled';
	    });
	  };

	  function traceurTranspile(load, traceur) {
	    var options = this.traceurOptions || {};
	    options.modules = 'instantiate';
	    options.script = false;
	    if (options.sourceMaps === undefined)
	      options.sourceMaps = 'inline';
	    options.filename = load.address;
	    options.inputSourceMap = load.metadata.sourceMap;
	    options.moduleName = false;

	    var compiler = new traceur.Compiler(options);

	    return doTraceurCompile(load.source, compiler, options.filename);
	  }
	  function doTraceurCompile(source, compiler, filename) {
	    try {
	      return compiler.compile(source, filename);
	    }
	    catch(e) {
	      // on older versions of traceur (<0.9.3), an array of errors is thrown
	      // rather than a single error.
	      if (e.length) {
	        throw e[0];
	      }
	      throw e;
	    }
	  }

	  function babelTranspile(load, babel) {
	    var options = this.babelOptions || {};
	    options.modules = 'system';
	    if (options.sourceMap === undefined)
	      options.sourceMap = 'inline';
	    options.inputSourceMap = load.metadata.sourceMap;
	    options.filename = load.address;
	    options.code = true;
	    options.ast = false;

	    return babel.transform(load.source, options).code;
	  }

	  function typescriptTranspile(load, ts) {
	    var options = this.typescriptOptions || {};
	    options.target = options.target || ts.ScriptTarget.ES5;
	    if (options.sourceMap === undefined)
	      options.sourceMap = true;
	    if (options.sourceMap && options.inlineSourceMap !== false)
	      options.inlineSourceMap = true;

	    options.module = ts.ModuleKind.System;

	    return ts.transpile(load.source, options, load.address);
	  }

	  return transpile;
	})();
	// SystemJS Loader Class and Extension helpers

	function SystemJSLoader() {
	  SystemLoader.call(this);

	  systemJSConstructor.call(this);
	}

	// inline Object.create-style class extension
	function SystemProto() {};
	SystemProto.prototype = SystemLoader.prototype;
	SystemJSLoader.prototype = new SystemProto();
	SystemJSLoader.prototype.constructor = SystemJSLoader;

	// remove ESML instantiate
	SystemJSLoader.prototype.instantiate = function() {};

	var systemJSConstructor;

	function hook(name, hook) {
	  SystemJSLoader.prototype[name] = hook(SystemJSLoader.prototype[name] || function() {});
	}
	function hookConstructor(hook) {
	  systemJSConstructor = hook(systemJSConstructor || function() {});
	}

	function dedupe(deps) {
	  var newDeps = [];
	  for (var i = 0, l = deps.length; i < l; i++)
	    if (indexOf.call(newDeps, deps[i]) == -1)
	      newDeps.push(deps[i])
	  return newDeps;
	}

	function group(deps) {
	  var names = [];
	  var indices = [];
	  for (var i = 0, l = deps.length; i < l; i++) {
	    var index = indexOf.call(names, deps[i]);
	    if (index === -1) {
	      names.push(deps[i]);
	      indices.push([i]);
	    }
	    else {
	      indices[index].push(i);
	    }
	  }
	  return { names: names, indices: indices };
	}

	var getOwnPropertyDescriptor = true;
	try {
	  Object.getOwnPropertyDescriptor({ a: 0 }, 'a');
	}
	catch(e) {
	  getOwnPropertyDescriptor = false;
	}

	// converts any module.exports object into an object ready for SystemJS.newModule
	function getESModule(exports) {
	  var esModule = {};
	  // don't trigger getters/setters in environments that support them
	  if (typeof exports == 'object' || typeof exports == 'function') {
	    var hasOwnProperty = exports && exports.hasOwnProperty;
	    if (getOwnPropertyDescriptor) {
	      for (var p in exports) {
	        if (!trySilentDefineProperty(esModule, exports, p))
	          setPropertyIfHasOwnProperty(esModule, exports, p, hasOwnProperty);
	      }
	    }
	    else {
	      for (var p in exports)
	        setPropertyIfHasOwnProperty(esModule, exports, p, hasOwnProperty);
	    }
	  }
	  esModule['default'] = exports;
	  defineProperty(esModule, '__useDefault', {
	    value: true
	  });
	  return esModule;
	}

	function setPropertyIfHasOwnProperty(targetObj, sourceObj, propName, hasOwnProperty) {
	  if (!hasOwnProperty || sourceObj.hasOwnProperty(propName))
	    targetObj[propName] = sourceObj[propName];
	}

	function trySilentDefineProperty(targetObj, sourceObj, propName) {
	  try {
	    var d;
	    if (d = Object.getOwnPropertyDescriptor(sourceObj, propName))
	      defineProperty(targetObj, propName, d);

	    return true;
	  } catch (ex) {
	    // Object.getOwnPropertyDescriptor threw an exception, fall back to normal set property.
	    return false;
	  }
	}

	function extend(a, b, prepend) {
	  for (var p in b) {
	    if (!prepend || !(p in a))
	      a[p] = b[p];
	  }
	  return a;
	}

	// package configuration options
	var packageProperties = ['main', 'format', 'defaultExtension', 'meta', 'map', 'basePath', 'depCache'];

	// meta first-level extends where:
	// array + array appends
	// object + object extends
	// other properties replace
	function extendMeta(a, b, prepend) {
	  for (var p in b) {
	    var val = b[p];
	    if (!(p in a))
	      a[p] = val;
	    else if (val instanceof Array && a[p] instanceof Array)
	      a[p] = [].concat(prepend ? val : a[p]).concat(prepend ? a[p] : val);
	    else if (typeof val == 'object' && val !== null && typeof a[p] == 'object')
	      a[p] = extend(extend({}, a[p]), val, prepend);
	    else if (!prepend)
	      a[p] = val;
	  }
	}

	function warn(msg) {
	  if (this.warnings && typeof console != 'undefined' && console.warn)
	    console.warn(msg);
	}
	// we define a __exec for globally-scoped execution
	// used by module format implementations
	var __exec;

	(function() {

	  var hasBtoa = typeof btoa != 'undefined';

	  function getSource(load) {
	    var lastLineIndex = load.source.lastIndexOf('\n');

	    // wrap ES formats with a System closure for System global encapsulation
	    var wrap = load.metadata.format != 'global';

	    var sourceMap = load.metadata.sourceMap;
	    if (sourceMap) {
	      if (typeof sourceMap != 'object')
	        throw new TypeError('load.metadata.sourceMap must be set to an object.');

	      sourceMap = JSON.stringify(sourceMap);
	    }

	    return (wrap ? '(function(System, SystemJS) {' : '') + load.source + (wrap ? '\n})(System, System);' : '')
	        // adds the sourceURL comment if not already present
	        + (load.source.substr(lastLineIndex, 15) != '\n//# sourceURL=' 
	          ? '\n//# sourceURL=' + load.address + (sourceMap ? '!transpiled' : '') : '')
	        // add sourceMappingURL if load.metadata.sourceMap is set
	        + (sourceMap && hasBtoa && '\n//# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(sourceMap))) || '');
	  }

	  var curLoad;

	  // System.register, System.registerDynamic, AMD define pipeline
	  // if currently evalling code here, immediately reduce the registered entry against the load record
	  hook('pushRegister_', function() {
	    return function(register) {
	      if (!curLoad)
	        return false;

	      this.reduceRegister_(curLoad, register);
	      return true;
	    };
	  });

	  // System clobbering protection (mostly for Traceur)
	  var curSystem;
	  var callCounter = 0;
	  function preExec(loader, load) {
	    curLoad = load;
	    if (callCounter++ == 0)
	      curSystem = __global.System;
	    __global.System = __global.SystemJS = loader; 
	  }
	  function postExec() {
	    if (--callCounter == 0)
	      __global.System = __global.SystemJS = curSystem;
	    curLoad = undefined;
	  }

	  var vm;
	  __exec = function(load) {
	    if (!load.source)
	      return;
	    if ((load.metadata.integrity || load.metadata.nonce) && supportsScriptExec)
	      return scriptExec.call(this, load);
	    try {
	      preExec(this, load);
	      curLoad = load;
	      // global scoped eval for node (avoids require scope leak)
	      if (this._nodeRequire) {
	        vm = vm || this._nodeRequire('vm');
	        vm.runInThisContext(getSource(load));
	      }
	      else {
	        (0, eval)(getSource(load));
	      }
	      postExec();
	    }
	    catch(e) {
	      postExec(); 
	      throw addToError(e, 'Evaluating ' + load.address);
	    }
	  };

	  var supportsScriptExec = false;
	  if (isBrowser && typeof document != 'undefined' && document.getElementsByTagName) {
	    var scripts = document.getElementsByTagName('script');
	    $__curScript = scripts[scripts.length - 1];

	    if (!(window.chrome && window.chrome.extension || navigator.userAgent.match(/^Node\.js/)))
	      supportsScriptExec = true;
	  }

	  // script execution via injecting a script tag into the page
	  // this allows CSP integrity and nonce to be set for CSP environments
	  var head;
	  function scriptExec(load) {
	    if (!head)
	      head = document.head || document.body || document.documentElement;

	    var script = document.createElement('script');
	    script.text = getSource(load, false);
	    var onerror = window.onerror;
	    var e;
	    window.onerror = function(_e) {
	      e = addToError(_e, 'Evaluating ' + load.address);
	    }
	    preExec(this, load);

	    if (load.metadata.integrity)
	      script.setAttribute('integrity', load.metadata.integrity);
	    if (load.metadata.nonce)
	      script.setAttribute('nonce', load.metadata.nonce);

	    head.appendChild(script);
	    head.removeChild(script);
	    postExec();
	    window.onerror = onerror;
	    if (e)
	      throw e;
	  }

	})();
	var absURLRegEx = /^[^\/]+:\/\//;

	function readMemberExpression(p, value) {
	  var pParts = p.split('.');
	  while (pParts.length)
	    value = value[pParts.shift()];
	  return value;
	}

	var baseURLCache = {};
	function getBaseURLObj() {
	  if (baseURLCache[this.baseURL])
	    return baseURLCache[this.baseURL];

	  // normalize baseURL if not already
	  if (this.baseURL[this.baseURL.length - 1] != '/')
	    this.baseURL += '/';

	  var baseURL = new URL(this.baseURL, baseURI);

	  this.baseURL = baseURL.href;

	  return (baseURLCache[this.baseURL] = baseURL);
	}

	function getMapMatch(map, name) {
	  var bestMatch, bestMatchLength = 0;

	  for (var p in map) {
	    if (name.substr(0, p.length) == p && (name.length == p.length || name[p.length] == '/')) {
	      var curMatchLength = p.split('/').length;
	      if (curMatchLength <= bestMatchLength)
	        continue;
	      bestMatch = p;
	      bestMatchLength = curMatchLength;
	    }
	  }

	  return bestMatch;
	}

	function setProduction(isProduction) {
	  this.set('@system-env', this.newModule({
	    browser: isBrowser,
	    node: !!this._nodeRequire,
	    production: isProduction,
	    'default': true
	  }));
	}

	var baseURIObj = new URL(baseURI);

	hookConstructor(function(constructor) {
	  return function() {
	    constructor.call(this);

	    // support baseURL
	    this.baseURL = baseURI.substr(0, baseURI.lastIndexOf('/') + 1);

	    // support map and paths
	    this.map = {};
	    this.paths = {};

	    // global behaviour flags
	    this.warnings = false;
	    this.defaultJSExtensions = false;
	    this.pluginFirst = false;
	    this.loaderErrorStack = false;

	    // by default load ".json" files as json
	    // leading * meta doesn't need normalization
	    // NB add this in next breaking release
	    // this.meta['*.json'] = { format: 'json' };

	    // support the empty module, as a concept
	    this.set('@empty', this.newModule({}));

	    setProduction.call(this, false);
	  };
	});

	// include the node require since we're overriding it
	if ("function" != 'undefined' && typeof process != 'undefined' && !process.browser)
	  SystemJSLoader.prototype._nodeRequire = __webpack_require__(3);

	var nodeCoreModules = ['assert', 'buffer', 'child_process', 'cluster', 'console', 'constants', 
	    'crypto', 'dgram', 'dns', 'domain', 'events', 'fs', 'http', 'https', 'module', 'net', 'os', 'path', 
	    'process', 'punycode', 'querystring', 'readline', 'repl', 'stream', 'string_decoder', 'sys', 'timers', 
	    'tls', 'tty', 'url', 'util', 'vm', 'zlib'];

	/*
	  Core SystemJS Normalization

	  If a name is relative, we apply URL normalization to the page
	  If a name is an absolute URL, we leave it as-is

	  Plain names (neither of the above) run through the map and paths
	  normalization phases.

	  The paths normalization phase applies last (paths extension), which
	  defines the `decanonicalize` function and normalizes everything into
	  a URL.
	 */

	function isPlain(name) {
	  return (name[0] != '.' || (!!name[1] && name[1] != '/' && name[1] != '.')) && name[0] != '/' && !name.match(absURLRegEx);
	}

	function urlResolve(name, parent) {
	  if (parent)
	    parent = parent.replace(/#/g, '%05');
	  return new URL(name, parent || baseURIObj).href.replace(/%05/g, '#');
	}

	// only applies to plain names
	function baseURLResolve(loader, name) {
	  return new URL(name, getBaseURLObj.call(loader)).href;
	}

	function coreResolve(name, parentName) {
	  // standard URL resolution
	  if (!isPlain(name))
	    return urlResolve(name, parentName);

	  // plain names not starting with './', '://' and '/' go through custom resolution
	  var mapMatch = getMapMatch(this.map, name);

	  if (mapMatch) {
	    name = this.map[mapMatch] + name.substr(mapMatch.length);

	    if (!isPlain(name))
	      return urlResolve(name);
	  }

	  if (this.has(name))
	    return name;
	  // dynamically load node-core modules when requiring `@node/fs` for example
	  if (name.substr(0, 6) == '@node/' && nodeCoreModules.indexOf(name.substr(6)) != -1) {
	    if (!this._nodeRequire)
	      throw new TypeError('Error loading ' + name + '. Can only load node core modules in Node.');
	    this.set(name, this.newModule(getESModule(this._nodeRequire(name.substr(6)))));
	    return name;
	  }

	  var pathed = applyPaths(this.paths, name);

	  if (pathed && !isPlain(pathed))
	    return urlResolve(pathed);

	  return baseURLResolve(this, pathed || name);
	}

	hook('normalize', function(normalize) {
	  return function(name, parentName, skipExt) {
	    var resolved = coreResolve.call(this, name, parentName);
	    if (!skipExt && this.defaultJSExtensions && resolved.substr(resolved.length - 3, 3) != '.js' && !isPlain(resolved))
	      resolved += '.js';
	    return resolved;
	  };
	});

	// percent encode just '#' in urls if using HTTP requests
	var httpRequest = typeof XMLHttpRequest != 'undefined';
	hook('locate', function(locate) {
	  return function(load) {
	    return Promise.resolve(locate.call(this, load))
	    .then(function(address) {
	      if (httpRequest)
	        return address.replace(/#/g, '%23');
	      return address;
	    });
	  };
	});

	/*
	 * Fetch with authorization
	 */
	hook('fetch', function() {
	  return function(load) {
	    return new Promise(function(resolve, reject) {
	      fetchTextFromURL(load.address, load.metadata.authorization, resolve, reject);
	    });
	  };
	});

	/*
	  __useDefault
	  
	  When a module object looks like:
	  newModule(
	    __useDefault: true,
	    default: 'some-module'
	  })

	  Then importing that module provides the 'some-module'
	  result directly instead of the full module.

	  Useful for eg module.exports = function() {}
	*/
	hook('import', function(systemImport) {
	  return function(name, parentName, parentAddress) {
	    if (parentName && parentName.name)
	      warn.call(this, 'SystemJS.import(name, { name: parentName }) is deprecated for SystemJS.import(name, parentName), while importing ' + name + ' from ' + parentName.name);
	    return systemImport.call(this, name, parentName, parentAddress).then(function(module) {
	      return module.__useDefault ? module['default'] : module;
	    });
	  };
	});

	/*
	 * Allow format: 'detect' meta to enable format detection
	 */
	hook('translate', function(systemTranslate) {
	  return function(load) {
	    if (load.metadata.format == 'detect')
	      load.metadata.format = undefined;
	    return systemTranslate.call(this, load);
	  };
	});


	/*
	 * JSON format support
	 *
	 * Supports loading JSON files as a module format itself
	 *
	 * Usage:
	 *
	 * SystemJS.config({
	 *   meta: {
	 *     '*.json': { format: 'json' }
	 *   }
	 * });
	 *
	 * Module is returned as if written:
	 *
	 * export default {JSON}
	 *
	 * No named exports are provided
	 *
	 * Files ending in ".json" are treated as json automatically by SystemJS
	 */
	hook('instantiate', function(instantiate) {
	  return function(load) {
	    if (load.metadata.format == 'json' && !this.builder) {
	      var entry = load.metadata.entry = createEntry();
	      entry.deps = [];
	      entry.execute = function() {
	        try {
	          return JSON.parse(load.source);
	        }
	        catch(e) {
	          throw new Error("Invalid JSON file " + load.name);
	        }
	      };
	    }
	  };
	})

	/*
	 Extend config merging one deep only

	  loader.config({
	    some: 'random',
	    config: 'here',
	    deep: {
	      config: { too: 'too' }
	    }
	  });

	  <=>

	  loader.some = 'random';
	  loader.config = 'here'
	  loader.deep = loader.deep || {};
	  loader.deep.config = { too: 'too' };


	  Normalizes meta and package configs allowing for:

	  SystemJS.config({
	    meta: {
	      './index.js': {}
	    }
	  });

	  To become

	  SystemJS.meta['https://thissite.com/index.js'] = {};

	  For easy normalization canonicalization with latest URL support.

	*/
	SystemJSLoader.prototype.env = 'development';

	var curCurScript;
	SystemJSLoader.prototype.config = function(cfg) {
	  var loader = this;

	  if ('loaderErrorStack' in cfg) {
	    curCurScript = $__curScript;
	    if (cfg.loaderErrorStack)
	      $__curScript = undefined;
	    else
	      $__curScript = curCurScript;
	  }

	  if ('warnings' in cfg)
	    loader.warnings = cfg.warnings;

	  // transpiler deprecation path
	  if (cfg.transpilerRuntime === false)
	    loader._loader.loadedTranspilerRuntime = true;

	  // always configure baseURL first
	  if (cfg.baseURL) {
	    var hasConfig = false;
	    function checkHasConfig(obj) {
	      for (var p in obj)
	        if (hasOwnProperty.call(obj, p))
	          return true;
	    }
	    if (checkHasConfig(loader.packages) || checkHasConfig(loader.meta) || checkHasConfig(loader.depCache) || checkHasConfig(loader.bundles) || checkHasConfig(loader.packageConfigPaths))
	      throw new TypeError('Incorrect configuration order. The baseURL must be configured with the first SystemJS.config call.');

	    loader.baseURL = cfg.baseURL;

	    // sanitize baseURL
	    getBaseURLObj.call(loader);
	  }

	  if (cfg.defaultJSExtensions) {
	    loader.defaultJSExtensions = cfg.defaultJSExtensions;
	    warn.call(loader, 'The defaultJSExtensions configuration option is deprecated, use packages configuration instead.');
	  }

	  if (cfg.pluginFirst)
	    loader.pluginFirst = cfg.pluginFirst;

	  if (cfg.production)
	    setProduction.call(loader, true);

	  if (cfg.paths) {
	    for (var p in cfg.paths)
	      loader.paths[p] = cfg.paths[p];
	  }

	  if (cfg.map) {
	    var objMaps = '';
	    for (var p in cfg.map) {
	      var v = cfg.map[p];

	      // object map backwards-compat into packages configuration
	      if (typeof v !== 'string') {
	        objMaps += (objMaps.length ? ', ' : '') + '"' + p + '"';

	        var defaultJSExtension = loader.defaultJSExtensions && p.substr(p.length - 3, 3) != '.js';
	        var prop = loader.decanonicalize(p);
	        if (defaultJSExtension && prop.substr(prop.length - 3, 3) == '.js')
	          prop = prop.substr(0, prop.length - 3);

	        // if a package main, revert it
	        var pkgMatch = '';
	        for (var pkg in loader.packages) {
	          if (prop.substr(0, pkg.length) == pkg 
	              && (!prop[pkg.length] || prop[pkg.length] == '/') 
	              && pkgMatch.split('/').length < pkg.split('/').length)
	            pkgMatch = pkg;
	        }
	        if (pkgMatch && loader.packages[pkgMatch].main)
	          prop = prop.substr(0, prop.length - loader.packages[pkgMatch].main.length - 1);

	        var pkg = loader.packages[prop] = loader.packages[prop] || {};
	        pkg.map = v;
	      }
	      else {
	        loader.map[p] = v;
	      }
	    }
	    if (objMaps)
	      warn.call(loader, 'The map configuration for ' + objMaps + ' uses object submaps, which is deprecated in global map.\nUpdate this to use package contextual map with configs like SystemJS.config({ packages: { "' + p + '": { map: {...} } } }).');
	  }

	  if (cfg.packageConfigPaths) {
	    var packageConfigPaths = [];
	    for (var i = 0; i < cfg.packageConfigPaths.length; i++) {
	      var path = cfg.packageConfigPaths[i];
	      var packageLength = Math.max(path.lastIndexOf('*') + 1, path.lastIndexOf('/'));
	      var defaultJSExtension = loader.defaultJSExtensions && path.substr(packageLength - 3, 3) != '.js';
	      var normalized = loader.decanonicalize(path.substr(0, packageLength));
	      if (defaultJSExtension && normalized.substr(normalized.length - 3, 3) == '.js')
	        normalized = normalized.substr(0, normalized.length - 3);
	      packageConfigPaths[i] = normalized + path.substr(packageLength);
	    }
	    loader.packageConfigPaths = packageConfigPaths;
	  }

	  if (cfg.bundles) {
	    for (var p in cfg.bundles) {
	      var bundle = [];
	      for (var i = 0; i < cfg.bundles[p].length; i++) {
	        var defaultJSExtension = loader.defaultJSExtensions && cfg.bundles[p][i].substr(cfg.bundles[p][i].length - 3, 3) != '.js';
	        var normalizedBundleDep = loader.decanonicalize(cfg.bundles[p][i]);
	        if (defaultJSExtension && normalizedBundleDep.substr(normalizedBundleDep.length - 3, 3) == '.js')
	          normalizedBundleDep = normalizedBundleDep.substr(0, normalizedBundleDep.length - 3);
	        bundle.push(normalizedBundleDep);
	      }
	      loader.bundles[p] = bundle;
	    }
	  }

	  if (cfg.packages) {
	    for (var p in cfg.packages) {
	      if (p.match(/^([^\/]+:)?\/\/$/))
	        throw new TypeError('"' + p + '" is not a valid package name.');

	      var prop = coreResolve.call(loader, p);

	      // allow trailing slash in packages
	      if (prop[prop.length - 1] == '/')
	        prop = prop.substr(0, prop.length - 1);

	      loader.packages[prop] = loader.packages[prop] || {};

	      var pkg = cfg.packages[p];

	      // meta backwards compatibility
	      if (pkg.modules) {
	        warn.call(loader, 'Package ' + p + ' is configured with "modules", which is deprecated as it has been renamed to "meta".');
	        pkg.meta = pkg.modules;
	        delete pkg.modules;
	      }

	      if (typeof pkg.main == 'object') {
	        pkg.map = pkg.map || {};
	        pkg.map['./@main'] = pkg.main;
	        pkg.main['default'] = pkg.main['default'] || './';
	        pkg.main = '@main';
	      }

	      for (var q in pkg)
	        if (indexOf.call(packageProperties, q) == -1)
	          warn.call(loader, '"' + q + '" is not a valid package configuration option in package ' + p);

	      extendMeta(loader.packages[prop], pkg);
	    }
	  }

	  for (var c in cfg) {
	    var v = cfg[c];

	    if (c == 'baseURL' || c == 'map' || c == 'packages' || c == 'bundles' || c == 'paths' || c == 'warnings' || c == 'packageConfigPaths' || c == 'loaderErrorStack')
	      continue;

	    if (typeof v != 'object' || v instanceof Array) {
	      loader[c] = v;
	    }
	    else {
	      loader[c] = loader[c] || {};

	      for (var p in v) {
	        // base-level wildcard meta does not normalize to retain catch-all quality
	        if (c == 'meta' && p[0] == '*') {
	          loader[c][p] = v[p];
	        }
	        else if (c == 'meta') {
	          // meta can go through global map, with defaultJSExtensions adding
	          var resolved = coreResolve.call(loader, p);
	          if (loader.defaultJSExtensions && resolved.substr(resolved.length - 3, 3) != '.js' && !isPlain(resolved))
	            resolved += '.js';
	          loader[c][resolved] = v[p];
	        }
	        else if (c == 'depCache') {
	          var defaultJSExtension = loader.defaultJSExtensions && p.substr(p.length - 3, 3) != '.js';
	          var prop = loader.decanonicalize(p);
	          if (defaultJSExtension && prop.substr(prop.length - 3, 3) == '.js')
	            prop = prop.substr(0, prop.length - 3);
	          loader[c][prop] = v[p];
	        }
	        else {
	          loader[c][p] = v[p];
	        }
	      }
	    }
	  }
	};/*
	 * Package Configuration Extension
	 *
	 * Example:
	 *
	 * SystemJS.packages = {
	 *   jquery: {
	 *     main: 'index.js', // when not set, package name is requested directly
	 *     format: 'amd',
	 *     defaultExtension: 'ts', // defaults to 'js', can be set to false
	 *     modules: {
	 *       '*.ts': {
	 *         loader: 'typescript'
	 *       },
	 *       'vendor/sizzle.js': {
	 *         format: 'global'
	 *       }
	 *     },
	 *     map: {
	 *        // map internal require('sizzle') to local require('./vendor/sizzle')
	 *        sizzle: './vendor/sizzle.js',
	 *        // map any internal or external require of 'jquery/vendor/another' to 'another/index.js'
	 *        './vendor/another.js': './another/index.js',
	 *        // test.js / test -> lib/test.js
	 *        './test.js': './lib/test.js',
	 *
	 *        // environment-specific map configurations
	 *        './index.js': {
	 *          '~browser': './index-node.js'
	 *        }
	 *     },
	 *     // allows for setting package-prefixed depCache
	 *     // keys are normalized module names relative to the package itself
	 *     depCache: {
	 *       // import 'package/index.js' loads in parallel package/lib/test.js,package/vendor/sizzle.js
	 *       './index.js': ['./test'],
	 *       './test.js': ['external-dep'],
	 *       'external-dep/path.js': ['./another.js']
	 *     }
	 *   }
	 * };
	 *
	 * Then:
	 *   import 'jquery'                       -> jquery/index.js
	 *   import 'jquery/submodule'             -> jquery/submodule.js
	 *   import 'jquery/submodule.ts'          -> jquery/submodule.ts loaded as typescript
	 *   import 'jquery/vendor/another'        -> another/index.js
	 *
	 * Detailed Behaviours
	 * - main can have a leading "./" can be added optionally
	 * - map and defaultExtension are applied to the main
	 * - defaultExtension adds the extension only if the exact extension is not present
	 * - defaultJSExtensions applies after map when defaultExtension is not set
	 * - if a meta value is available for a module, map and defaultExtension are skipped
	 * - like global map, package map also applies to subpaths (sizzle/x, ./vendor/another/sub)
	 * - condition module map is '@env' module in package or '@system-env' globally
	 * - map targets support conditional interpolation ('./x': './x.#{|env}.js')
	 * - internal package map targets cannot use boolean conditionals
	 *
	 * Package Configuration Loading
	 *
	 * Not all packages may already have their configuration present in the System config
	 * For these cases, a list of packageConfigPaths can be provided, which when matched against
	 * a request, will first request a ".json" file by the package name to derive the package
	 * configuration from. This allows dynamic loading of non-predetermined code, a key use
	 * case in SystemJS.
	 *
	 * Example:
	 *
	 *   SystemJS.packageConfigPaths = ['packages/test/package.json', 'packages/*.json'];
	 *
	 *   // will first request 'packages/new-package/package.json' for the package config
	 *   // before completing the package request to 'packages/new-package/path'
	 *   SystemJS.import('packages/new-package/path');
	 *
	 *   // will first request 'packages/test/package.json' before the main
	 *   SystemJS.import('packages/test');
	 *
	 * When a package matches packageConfigPaths, it will always send a config request for
	 * the package configuration.
	 * The package name itself is taken to be the match up to and including the last wildcard
	 * or trailing slash.
	 * The most specific package config path will be used.
	 * Any existing package configurations for the package will deeply merge with the
	 * package config, with the existing package configurations taking preference.
	 * To opt-out of the package configuration request for a package that matches
	 * packageConfigPaths, use the { configured: true } package config option.
	 *
	 */
	(function() {

	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);
	      this.packages = {};
	      this.packageConfigPaths = [];
	    };
	  });

	  function getPackage(loader, normalized) {
	    // use most specific package
	    var curPkg, curPkgLen = 0, pkgLen;
	    for (var p in loader.packages) {
	      if (normalized.substr(0, p.length) === p && (normalized.length === p.length || normalized[p.length] === '/')) {
	        pkgLen = p.split('/').length;
	        if (pkgLen > curPkgLen) {
	          curPkg = p;
	          curPkgLen = pkgLen;
	        }
	      }
	    }
	    return curPkg;
	  }

	  function addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions) {
	    // don't apply extensions to folders or if defaultExtension = false
	    if (!subPath || subPath[subPath.length - 1] == '/' || skipExtensions || pkg.defaultExtension === false)
	      return subPath;

	    // NB are you sure about this?
	    // skip if we have interpolation conditional syntax in subPath?
	    if (subPath.match(interpolationRegEx))
	      return subPath;

	    var metaMatch = false;

	    // exact meta or meta with any content after the last wildcard skips extension
	    if (pkg.meta)
	      getMetaMatches(pkg.meta, subPath, function(metaPattern, matchMeta, matchDepth) {
	        if (matchDepth == 0 || metaPattern.lastIndexOf('*') != metaPattern.length - 1)
	          return metaMatch = true;
	      });

	    // exact global meta or meta with any content after the last wildcard skips extension
	    if (!metaMatch && loader.meta)
	      getMetaMatches(loader.meta, pkgName + '/' + subPath, function(metaPattern, matchMeta, matchDepth) {
	        if (matchDepth == 0 || metaPattern.lastIndexOf('*') != metaPattern.length - 1)
	          return metaMatch = true;
	      });

	    if (metaMatch)
	      return subPath;

	    // work out what the defaultExtension is and add if not there already
	    // NB reconsider if default should really be ".js"?
	    var defaultExtension = '.' + (pkg.defaultExtension || 'js');
	    if (subPath.substr(subPath.length - defaultExtension.length) != defaultExtension)
	      return subPath + defaultExtension;
	    else
	      return subPath;
	  }

	  function applyPackageConfigSync(loader, pkg, pkgName, subPath, skipExtensions) {
	    // main
	    if (!subPath) {
	      if (pkg.main)
	        subPath = pkg.main.substr(0, 2) == './' ? pkg.main.substr(2) : pkg.main;
	      // also no submap if name is package itself (import 'pkg' -> 'path/to/pkg.js')
	      else
	        // NB can add a default package main convention here when defaultJSExtensions is deprecated
	        // if it becomes internal to the package then it would no longer be an exit path
	        return pkgName + (loader.defaultJSExtensions ? '.js' : '');
	    }

	    // map config checking without then with extensions
	    if (pkg.map) {
	      var mapPath = './' + subPath;

	      var mapMatch = getMapMatch(pkg.map, mapPath);

	      // we then check map with the default extension adding
	      if (!mapMatch) {
	        mapPath = './' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions);
	        if (mapPath != './' + subPath)
	          mapMatch = getMapMatch(pkg.map, mapPath);
	      }
	      if (mapMatch)
	        return doMapSync(loader, pkg, pkgName, mapMatch, mapPath, skipExtensions);
	    }

	    // normal package resolution
	    return pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions);
	  }

	  function validateMapping(mapMatch, mapped, pkgName) {
	    // disallow internal to subpath maps
	    if (mapMatch == '.')
	      throw new Error('Package ' + pkgName + ' has a map entry for "." which is not permitted.');
	    // disallow internal ./x -> ./x/y recursive maps
	    else if (mapped.substr(0, mapMatch.length) == mapMatch && (mapMatch[mapMatch.length - 1] != '/' && mapped[mapMatch.length] == '/'))
	      throw new Error('Package ' + pkgName + ' has a recursive map for "' + mapMatch + '" which is not permitted.');
	  }

	  function doMapSync(loader, pkg, pkgName, mapMatch, path, skipExtensions) {
	    var mapped = pkg.map[mapMatch];

	    if (typeof mapped == 'object')
	      throw new Error('Synchronous conditional normalization not supported sync normalizing ' + mapMatch + ' in ' + pkgName);

	    validateMapping(mapMatch, mapped, pkgName);

	    // ignore conditionals in sync
	    if (typeof mapped != 'string')
	      mapped = mapMatch = path;

	    validateMapping(mapMatch, mapped, pkgName);

	    // package map to main / base-level
	    if (mapped == '.')
	      mapped = pkgName;

	    // internal package map
	    else if (mapped.substr(0, 2) == './')
	      return pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, mapped.substr(2) + path.substr(mapMatch.length), skipExtensions);
	    
	    // external map reference
	    return loader.normalizeSync(mapped + path.substr(mapMatch.length), pkgName + '/');
	  }

	  function applyPackageConfig(loader, pkg, pkgName, subPath, skipExtensions) {
	    // main
	    if (!subPath) {
	      if (pkg.main)
	        subPath = pkg.main.substr(0, 2) == './' ? pkg.main.substr(2) : pkg.main;
	      // also no submap if name is package itself (import 'pkg' -> 'path/to/pkg.js')
	      else
	        // NB can add a default package main convention here when defaultJSExtensions is deprecated
	        // if it becomes internal to the package then it would no longer be an exit path
	        return Promise.resolve(pkgName + (loader.defaultJSExtensions ? '.js' : ''));
	    }

	    // map config checking without then with extensions
	    var mapPath, mapMatch;

	    if (pkg.map) {
	      mapPath = './' + subPath;
	      mapMatch = getMapMatch(pkg.map, mapPath);

	      // we then check map with the default extension adding
	      if (!mapMatch) {
	        mapPath = './' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions);
	        if (mapPath != './' + subPath)
	          mapMatch = getMapMatch(pkg.map, mapPath);
	      }
	    }

	    return (mapMatch ? doMap(loader, pkg, pkgName, mapMatch, mapPath, skipExtensions) : Promise.resolve())
	    .then(function(mapped) {
	      if (mapped)
	        return Promise.resolve(mapped);

	      // normal package resolution / fallback resolution for no conditional match
	      return Promise.resolve(pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions));
	    });
	  }

	  function doStringMap(loader, pkg, pkgName, mapMatch, mapped, path, skipExtensions) {
	    // NB the interpolation cases should strictly skip subsequent interpolation

	    // package map to main / base-level
	    if (mapped == '.')
	      mapped = pkgName;
	    
	    // internal package map
	    else if (mapped.substr(0, 2) == './')
	      return Promise.resolve(pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, mapped.substr(2) + path.substr(mapMatch.length), skipExtensions))
	      .then(function(name) {
	        return interpolateConditional.call(loader, name, pkgName + '/');
	      });
	    
	    // external map reference
	    return loader.normalize(mapped + path.substr(mapMatch.length), pkgName + '/');
	  }

	  function doMap(loader, pkg, pkgName, mapMatch, path, skipExtensions) {
	    var mapped = pkg.map[mapMatch];

	    if (typeof mapped == 'string') {
	      validateMapping(mapMatch, mapped, pkgName);
	      return doStringMap(loader, pkg, pkgName, mapMatch, mapped, path, skipExtensions);
	    }

	    // we use a special conditional syntax to allow the builder to handle conditional branch points further
	    if (loader.builder)
	      return Promise.resolve(pkgName + '/#:' + path);

	    // map object -> conditional map
	    return loader['import'](pkg.map['@env'] || '@system-env', pkgName)
	    .then(function(env) {
	      // first map condition to match is used
	      for (var e in mapped) {
	        var negate = e[0] == '~';

	        var value = readMemberExpression(negate ? e.substr(1) : e, env);

	        if (!negate && value || negate && !value)
	          return mapped[e];
	      }
	    })
	    .then(function(mapped) {
	      if (mapped) {
	        if (typeof mapped != 'string')
	          throw new Error('Unable to map a package conditional to a package conditional.');
	        validateMapping(mapMatch, mapped, pkgName);
	        return doStringMap(loader, pkg, pkgName, mapMatch, mapped, path, skipExtensions);
	      }

	      // no environment match -> fallback to original subPath by returning undefined
	    });
	  }

	  // normalizeSync = decanonicalize + package resolution
	  SystemJSLoader.prototype.normalizeSync = SystemJSLoader.prototype.decanonicalize = SystemJSLoader.prototype.normalize;

	  // decanonicalize must JUST handle package defaultExtension: false case when defaultJSExtensions is set
	  // to be deprecated!
	  hook('decanonicalize', function(decanonicalize) {
	    return function(name, parentName) {
	      if (this.builder)
	        return decanonicalize.call(this, name, parentName, true);

	      var decanonicalized = decanonicalize.call(this, name, parentName);

	      if (!this.defaultJSExtensions)
	        return decanonicalized;
	    
	      var pkgName = getPackage(this, decanonicalized);

	      var pkg = this.packages[pkgName];
	      var defaultExtension = pkg && pkg.defaultExtension;

	      if (defaultExtension == undefined && pkg && pkg.meta)
	        getMetaMatches(pkg.meta, decanonicalized.substr(pkgName), function(metaPattern, matchMeta, matchDepth) {
	          if (matchDepth == 0 || metaPattern.lastIndexOf('*') != metaPattern.length - 1) {
	            defaultExtension = false;
	            return true;
	          }
	        });
	      
	      if ((defaultExtension === false || defaultExtension && defaultExtension != '.js') && name.substr(name.length - 3, 3) != '.js' && decanonicalized.substr(decanonicalized.length - 3, 3) == '.js')
	        decanonicalized = decanonicalized.substr(0, decanonicalized.length - 3);

	      return decanonicalized;
	    };
	  });

	  hook('normalizeSync', function(normalizeSync) {
	    return function(name, parentName, isPlugin) {
	      warn.call(this, 'SystemJS.normalizeSync has been deprecated for SystemJS.decanonicalize.');

	      var loader = this;
	      isPlugin = isPlugin === true;

	      // apply contextual package map first
	      // (we assume the parent package config has already been loaded)
	      if (parentName)
	        var parentPackageName = getPackage(loader, parentName) ||
	            loader.defaultJSExtensions && parentName.substr(parentName.length - 3, 3) == '.js' &&
	            getPackage(loader, parentName.substr(0, parentName.length - 3));

	      var parentPackage = parentPackageName && loader.packages[parentPackageName];

	      // ignore . since internal maps handled by standard package resolution
	      if (parentPackage && name[0] != '.') {
	        var parentMap = parentPackage.map;
	        var parentMapMatch = parentMap && getMapMatch(parentMap, name);

	        if (parentMapMatch && typeof parentMap[parentMapMatch] == 'string')
	          return doMapSync(loader, parentPackage, parentPackageName, parentMapMatch, name, isPlugin);
	      }

	      var defaultJSExtension = loader.defaultJSExtensions && name.substr(name.length - 3, 3) != '.js';

	      // apply map, core, paths, contextual package map
	      var normalized = normalizeSync.call(loader, name, parentName);

	      // undo defaultJSExtension
	      if (defaultJSExtension && normalized.substr(normalized.length - 3, 3) != '.js')
	        defaultJSExtension = false;
	      if (defaultJSExtension)
	        normalized = normalized.substr(0, normalized.length - 3);

	      var pkgConfigMatch = getPackageConfigMatch(loader, normalized);
	      var pkgName = pkgConfigMatch && pkgConfigMatch.packageName || getPackage(loader, normalized);

	      if (!pkgName)
	        return normalized + (defaultJSExtension ? '.js' : '');

	      var subPath = normalized.substr(pkgName.length + 1);

	      return applyPackageConfigSync(loader, loader.packages[pkgName] || {}, pkgName, subPath, isPlugin);
	    };
	  });

	  hook('normalize', function(normalize) {
	    return function(name, parentName, isPlugin) {
	      var loader = this;
	      isPlugin = isPlugin === true;

	      return Promise.resolve()
	      .then(function() {
	        // apply contextual package map first
	        // (we assume the parent package config has already been loaded)
	        if (parentName)
	          var parentPackageName = getPackage(loader, parentName) ||
	              loader.defaultJSExtensions && parentName.substr(parentName.length - 3, 3) == '.js' &&
	              getPackage(loader, parentName.substr(0, parentName.length - 3));

	        var parentPackage = parentPackageName && loader.packages[parentPackageName];

	        // ignore . since internal maps handled by standard package resolution
	        if (parentPackage && name.substr(0, 2) != './') {
	          var parentMap = parentPackage.map;
	          var parentMapMatch = parentMap && getMapMatch(parentMap, name);

	          if (parentMapMatch)
	            return doMap(loader, parentPackage, parentPackageName, parentMapMatch, name, isPlugin);
	        }

	        return Promise.resolve();
	      })
	      .then(function(mapped) {
	        if (mapped)
	          return mapped;

	        var defaultJSExtension = loader.defaultJSExtensions && name.substr(name.length - 3, 3) != '.js';

	        // apply map, core, paths, contextual package map
	        var normalized = normalize.call(loader, name, parentName);

	        // undo defaultJSExtension
	        if (defaultJSExtension && normalized.substr(normalized.length - 3, 3) != '.js')
	          defaultJSExtension = false;
	        if (defaultJSExtension)
	          normalized = normalized.substr(0, normalized.length - 3);

	        var pkgConfigMatch = getPackageConfigMatch(loader, normalized);
	        var pkgName = pkgConfigMatch && pkgConfigMatch.packageName || getPackage(loader, normalized);

	        if (!pkgName)
	          return Promise.resolve(normalized + (defaultJSExtension ? '.js' : ''));

	        var pkg = loader.packages[pkgName];

	        // if package is already configured or not a dynamic config package, use existing package config
	        var isConfigured = pkg && (pkg.configured || !pkgConfigMatch);
	        return (isConfigured ? Promise.resolve(pkg) : loadPackageConfigPath(loader, pkgName, pkgConfigMatch.configPath))
	        .then(function(pkg) {
	          var subPath = normalized.substr(pkgName.length + 1);

	          return applyPackageConfig(loader, pkg, pkgName, subPath, isPlugin);
	        });
	      });
	    };
	  });

	  // check if the given normalized name matches a packageConfigPath
	  // if so, loads the config
	  var packageConfigPaths = {};

	  // data object for quick checks against package paths
	  function createPkgConfigPathObj(path) {
	    var lastWildcard = path.lastIndexOf('*');
	    var length = Math.max(lastWildcard + 1, path.lastIndexOf('/'));
	    return {
	      length: length,
	      regEx: new RegExp('^(' + path.substr(0, length).replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^\\/]+') + ')(\\/|$)'),
	      wildcard: lastWildcard != -1
	    };
	  }

	  // most specific match wins
	  function getPackageConfigMatch(loader, normalized) {
	    var pkgName, exactMatch = false, configPath;
	    for (var i = 0; i < loader.packageConfigPaths.length; i++) {
	      var packageConfigPath = loader.packageConfigPaths[i];
	      var p = packageConfigPaths[packageConfigPath] || (packageConfigPaths[packageConfigPath] = createPkgConfigPathObj(packageConfigPath));
	      if (normalized.length < p.length)
	        continue;
	      var match = normalized.match(p.regEx);
	      if (match && (!pkgName || (!(exactMatch && p.wildcard) && pkgName.length < match[1].length))) {
	        pkgName = match[1];
	        exactMatch = !p.wildcard;
	        configPath = pkgName + packageConfigPath.substr(p.length);
	      }
	    }

	    if (!pkgName)
	      return;

	    return {
	      packageName: pkgName,
	      configPath: configPath
	    };
	  }

	  function loadPackageConfigPath(loader, pkgName, pkgConfigPath) {
	    var configLoader = loader.pluginLoader || loader;

	    // NB remove this when json is default
	    (configLoader.meta[pkgConfigPath] = configLoader.meta[pkgConfigPath] || {}).format = 'json';
	    configLoader.meta[pkgConfigPath].loader = null;

	    return configLoader.load(pkgConfigPath)
	    .then(function() {
	      var cfg = configLoader.get(pkgConfigPath)['default'];

	      // support "systemjs" prefixing
	      if (cfg.systemjs)
	        cfg = cfg.systemjs;

	      // modules backwards compatibility
	      if (cfg.modules) {
	        cfg.meta = cfg.modules;
	        warn.call(loader, 'Package config file ' + pkgConfigPath + ' is configured with "modules", which is deprecated as it has been renamed to "meta".');
	      }

	      // remove any non-system properties if generic config file (eg package.json)
	      for (var p in cfg) {
	        if (indexOf.call(packageProperties, p) == -1)
	          delete cfg[p];
	      }

	      // deeply-merge (to first level) config with any existing package config
	      var pkg = loader.packages[pkgName] = loader.packages[pkgName] || {};
	      extendMeta(pkg, cfg, true);

	      // support external depCache
	      if (cfg.depCache) {
	        for (var d in cfg.depCache) {
	          var dNormalized;

	          if (d.substr(0, 2) == './')
	            dNormalized = pkgName + '/' + d.substr(2);
	          else
	            dNormalized = coreResolve.call(loader, d);
	          loader.depCache[dNormalized] = (loader.depCache[dNormalized] || []).concat(cfg.depCache[d]);
	        }
	        delete cfg.depCache;
	      }

	      // main object becomes main map
	      if (typeof pkg.main == 'object') {
	        pkg.map = pkg.map || {};
	        pkg.map['./@main'] = pkg.main;
	        pkg.main['default'] = pkg.main['default'] || './';
	        pkg.main = '@main';
	      }

	      return pkg;
	    });
	  }

	  function getMetaMatches(pkgMeta, subPath, matchFn) {
	    // wildcard meta
	    var meta = {};
	    var wildcardIndex;
	    for (var module in pkgMeta) {
	      // allow meta to start with ./ for flexibility
	      var dotRel = module.substr(0, 2) == './' ? './' : '';
	      if (dotRel)
	        module = module.substr(2);

	      wildcardIndex = module.indexOf('*');
	      if (wildcardIndex === -1)
	        continue;

	      if (module.substr(0, wildcardIndex) == subPath.substr(0, wildcardIndex)
	          && module.substr(wildcardIndex + 1) == subPath.substr(subPath.length - module.length + wildcardIndex + 1)) {
	        // alow match function to return true for an exit path
	        if (matchFn(module, pkgMeta[dotRel + module], module.split('/').length))
	          return;
	      }
	    }
	    // exact meta
	    var exactMeta = pkgMeta[subPath] && pkgMeta.hasOwnProperty && pkgMeta.hasOwnProperty(subPath) ? pkgMeta[subPath] : pkgMeta['./' + subPath];
	    if (exactMeta)
	      matchFn(exactMeta, exactMeta, 0);
	  }

	  hook('locate', function(locate) {
	    return function(load) {
	      var loader = this;
	      return Promise.resolve(locate.call(this, load))
	      .then(function(address) {
	        var pkgName = getPackage(loader, load.name);
	        if (pkgName) {
	          var pkg = loader.packages[pkgName];
	          var subPath = load.name.substr(pkgName.length + 1);

	          // format
	          if (pkg.format)
	            load.metadata.format = load.metadata.format || pkg.format;

	          var meta = {};
	          if (pkg.meta) {
	            var bestDepth = 0;

	            // NB support a main shorthand in meta here?
	            getMetaMatches(pkg.meta, subPath, function(metaPattern, matchMeta, matchDepth) {
	              if (matchDepth > bestDepth)
	                bestDepth = matchDepth;
	              extendMeta(meta, matchMeta, matchDepth && bestDepth > matchDepth);
	            });

	            extendMeta(load.metadata, meta);
	          }
	        }

	        return address;
	      });
	    };
	  });

	})();
	/*
	 * Script tag fetch
	 *
	 * When load.metadata.scriptLoad is true, we load via script tag injection.
	 */
	(function() {

	  if (typeof document != 'undefined')
	    var head = document.getElementsByTagName('head')[0];

	  var curSystem;
	  var curRequire;

	  // if doing worker executing, this is set to the load record being executed
	  var workerLoad = null;
	  
	  // interactive mode handling method courtesy RequireJS
	  var ieEvents = head && (function() {
	    var s = document.createElement('script');
	    var isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]';
	    return s.attachEvent && !(s.attachEvent.toString && s.attachEvent.toString().indexOf('[native code') < 0) && !isOpera;
	  })();

	  // IE interactive-only part
	  // we store loading scripts array as { script: <script>, load: {...} }
	  var interactiveLoadingScripts = [];
	  var interactiveScript;
	  function getInteractiveScriptLoad() {
	    if (interactiveScript && interactiveScript.script.readyState === 'interactive')
	      return interactiveScript.load;

	    for (var i = 0; i < interactiveLoadingScripts.length; i++)
	      if (interactiveLoadingScripts[i].script.readyState == 'interactive') {
	        interactiveScript = interactiveLoadingScripts[i];
	        return interactiveScript.load;
	      }
	  }
	  
	  // System.register, System.registerDynamic, AMD define pipeline
	  // this is called by the above methods when they execute
	  // we then run the reduceRegister_ collection function either immediately
	  // if we are in IE and know the currently executing script (interactive)
	  // or later if we need to wait for the synchronous load callback to know the script
	  var loadingCnt = 0;
	  var registerQueue = [];
	  hook('pushRegister_', function(pushRegister) {
	    return function(register) {
	      // if using eval-execution then skip
	      if (pushRegister.call(this, register))
	        return false;

	      // if using worker execution, then we're done
	      if (workerLoad)
	        this.reduceRegister_(workerLoad, register);

	      // detect if we know the currently executing load (IE)
	      // if so, immediately call reduceRegister
	      else if (ieEvents)
	        this.reduceRegister_(getInteractiveScriptLoad(), register);

	      // otherwise, add to our execution queue
	      // to call reduceRegister on sync script load event
	      else if (loadingCnt)
	        registerQueue.push(register);

	      // if we're not currently loading anything though
	      // then do the reduction against a null load
	      // (out of band named define or named register)
	      // note even in non-script environments, this catch is used
	      else
	        this.reduceRegister_(null, register);

	      return true;
	    };
	  });

	  function webWorkerImport(loader, load) {
	    return new Promise(function(resolve, reject) {
	      if (load.metadata.integrity)
	        reject(new Error('Subresource integrity checking is not supported in web workers.'));

	      workerLoad = load;
	      try {
	        importScripts(load.address);
	      }
	      catch(e) {
	        workerLoad = null;
	        reject(e);
	      }
	      workerLoad = null;

	      // if nothing registered, then something went wrong
	      if (!load.metadata.entry)
	        reject(new Error(load.address + ' did not call System.register or AMD define'));

	      resolve('');
	    });
	  }

	  // override fetch to use script injection
	  hook('fetch', function(fetch) {
	    return function(load) {
	      var loader = this;

	      if (load.metadata.format == 'json' || !load.metadata.scriptLoad || (!isBrowser && !isWorker))
	        return fetch.call(this, load);

	      if (isWorker)
	        return webWorkerImport(loader, load);

	      return new Promise(function(resolve, reject) {
	        var s = document.createElement('script');
	        
	        s.async = true;

	        if (load.metadata.crossOrigin)
	          s.crossOrigin = load.metadata.crossOrigin;

	        if (load.metadata.integrity)
	          s.setAttribute('integrity', load.metadata.integrity);

	        if (ieEvents) {
	          s.attachEvent('onreadystatechange', complete);
	          interactiveLoadingScripts.push({
	            script: s,
	            load: load
	          });
	        }
	        else {
	          s.addEventListener('load', complete, false);
	          s.addEventListener('error', error, false);
	        }

	        loadingCnt++;

	        curSystem = __global.System;
	        curRequire = __global.require;

	        s.src = load.address;
	        head.appendChild(s);

	        function complete(evt) {
	          if (s.readyState && s.readyState != 'loaded' && s.readyState != 'complete')
	            return;

	          loadingCnt--;

	          // complete call is sync on execution finish
	          // (in ie already done reductions)
	          if (!load.metadata.entry && !registerQueue.length) {
	            loader.reduceRegister_(load);
	          }
	          else if (!ieEvents) {
	            for (var i = 0; i < registerQueue.length; i++)
	              loader.reduceRegister_(load, registerQueue[i]);
	            registerQueue = [];
	          }

	          cleanup();

	          // if nothing registered, then something went wrong
	          if (!load.metadata.entry && !load.metadata.bundle)
	            reject(new Error(load.name + ' did not call System.register or AMD define. If loading a global module configure the global name via the meta exports property for script injection support.'));

	          resolve('');
	        }

	        function error(evt) {
	          cleanup();
	          reject(new Error('Unable to load script ' + load.address));
	        }

	        function cleanup() {
	          __global.System = curSystem;
	          __global.require = curRequire;

	          if (s.detachEvent) {
	            s.detachEvent('onreadystatechange', complete);
	            for (var i = 0; i < interactiveLoadingScripts.length; i++)
	              if (interactiveLoadingScripts[i].script == s) {
	                if (interactiveScript && interactiveScript.script == s)
	                  interactiveScript = null;
	                interactiveLoadingScripts.splice(i, 1);
	              }
	          }
	          else {
	            s.removeEventListener('load', complete, false);
	            s.removeEventListener('error', error, false);
	          }

	          head.removeChild(s);
	        }
	      });
	    };
	  });
	})();
	/*
	 * Instantiate registry extension
	 *
	 * Supports Traceur System.register 'instantiate' output for loading ES6 as ES5.
	 *
	 * - Creates the loader.register function
	 * - Also supports metadata.format = 'register' in instantiate for anonymous register modules
	 * - Also supports metadata.deps, metadata.execute and metadata.executingRequire
	 *     for handling dynamic modules alongside register-transformed ES6 modules
	 *
	 *
	 * The code here replicates the ES6 linking groups algorithm to ensure that
	 * circular ES6 compiled into System.register can work alongside circular AMD 
	 * and CommonJS, identically to the actual ES6 loader.
	 *
	 */


	/*
	 * Registry side table entries in loader.defined
	 * Registry Entry Contains:
	 *    - name
	 *    - deps 
	 *    - declare for declarative modules
	 *    - execute for dynamic modules, different to declarative execute on module
	 *    - executingRequire indicates require drives execution for circularity of dynamic modules
	 *    - declarative optional boolean indicating which of the above
	 *
	 * Can preload modules directly on SystemJS.defined['my/module'] = { deps, execute, executingRequire }
	 *
	 * Then the entry gets populated with derived information during processing:
	 *    - normalizedDeps derived from deps, created in instantiate
	 *    - groupIndex used by group linking algorithm
	 *    - evaluated indicating whether evaluation has happend
	 *    - module the module record object, containing:
	 *      - exports actual module exports
	 *
	 *    For dynamic we track the es module with:
	 *    - esModule actual es module value
	 *    - esmExports whether to extend the esModule with named exports
	 *      
	 *    Then for declarative only we track dynamic bindings with the 'module' records:
	 *      - name
	 *      - exports
	 *      - setters declarative setter functions
	 *      - dependencies, module records of dependencies
	 *      - importers, module records of dependents
	 *
	 * After linked and evaluated, entries are removed, declarative module records remain in separate
	 * module binding table
	 *
	 */

	var leadingCommentAndMetaRegEx = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/;
	function detectRegisterFormat(source) {
	  var leadingCommentAndMeta = source.match(leadingCommentAndMetaRegEx);
	  return leadingCommentAndMeta && source.substr(leadingCommentAndMeta[0].length, 15) == 'System.register';
	}

	function createEntry() {
	  return {
	    name: null,
	    deps: null,
	    originalIndices: null,
	    declare: null,
	    execute: null,
	    executingRequire: false,
	    declarative: false,
	    normalizedDeps: null,
	    groupIndex: null,
	    evaluated: false,
	    module: null,
	    esModule: null,
	    esmExports: false
	  };
	}

	(function() {

	  /*
	   * There are two variations of System.register:
	   * 1. System.register for ES6 conversion (2-3 params) - System.register([name, ]deps, declare)
	   *    see https://github.com/ModuleLoader/es6-module-loader/wiki/System.register-Explained
	   *
	   * 2. System.registerDynamic for dynamic modules (3-4 params) - System.registerDynamic([name, ]deps, executingRequire, execute)
	   * the true or false statement 
	   *
	   * this extension implements the linking algorithm for the two variations identical to the spec
	   * allowing compiled ES6 circular references to work alongside AMD and CJS circular references.
	   *
	   */
	  SystemJSLoader.prototype.register = function(name, deps, declare) {
	    if (typeof name != 'string') {
	      declare = deps;
	      deps = name;
	      name = null;
	    }

	    // dynamic backwards-compatibility
	    // can be deprecated eventually
	    if (typeof declare == 'boolean')
	      return this.registerDynamic.apply(this, arguments);

	    var entry = createEntry();
	    // ideally wouldn't apply map config to bundle names but 
	    // dependencies go through map regardless so we can't restrict
	    // could reconsider in shift to new spec
	    entry.name = name && (this.decanonicalize || this.normalize).call(this, name);
	    entry.declarative = true;
	    entry.deps = deps;
	    entry.declare = declare;

	    this.pushRegister_({
	      amd: false,
	      entry: entry
	    });
	  };
	  SystemJSLoader.prototype.registerDynamic = function(name, deps, declare, execute) {
	    if (typeof name != 'string') {
	      execute = declare;
	      declare = deps;
	      deps = name;
	      name = null;
	    }

	    // dynamic
	    var entry = createEntry();
	    entry.name = name && (this.decanonicalize || this.normalize).call(this, name);
	    entry.deps = deps;
	    entry.execute = execute;
	    entry.executingRequire = declare;

	    this.pushRegister_({
	      amd: false,
	      entry: entry
	    });
	  };
	  hook('reduceRegister_', function() {
	    return function(load, register) {
	      if (!register)
	        return;

	      var entry = register.entry;
	      var curMeta = load && load.metadata;

	      // named register
	      if (entry.name) {
	        if (!(entry.name in this.defined))
	          this.defined[entry.name] = entry;

	        if (curMeta)
	          curMeta.bundle = true;
	      }
	      // anonymous register
	      if (!entry.name || load && entry.name == load.name) {
	        if (!curMeta)
	          throw new TypeError('Invalid System.register call. Anonymous System.register calls can only be made by modules loaded by SystemJS.import and not via script tags.');
	        if (curMeta.entry) {
	          if (curMeta.format == 'register')
	            throw new Error('Multiple anonymous System.register calls in module ' + load.name + '. If loading a bundle, ensure all the System.register calls are named.');
	          else
	            throw new Error('Module ' + load.name + ' interpreted as ' + curMeta.format + ' module format, but called System.register.');
	        }
	        if (!curMeta.format)
	          curMeta.format = 'register';
	        curMeta.entry = entry;
	      }
	    };
	  });

	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);

	      this.defined = {};
	      this._loader.moduleRecords = {};
	    };
	  });

	  function buildGroups(entry, loader, groups) {
	    groups[entry.groupIndex] = groups[entry.groupIndex] || [];

	    if (indexOf.call(groups[entry.groupIndex], entry) != -1)
	      return;

	    groups[entry.groupIndex].push(entry);

	    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	      var depName = entry.normalizedDeps[i];
	      var depEntry = loader.defined[depName];
	      
	      // not in the registry means already linked / ES6
	      if (!depEntry || depEntry.evaluated)
	        continue;
	      
	      // now we know the entry is in our unlinked linkage group
	      var depGroupIndex = entry.groupIndex + (depEntry.declarative != entry.declarative);

	      // the group index of an entry is always the maximum
	      if (depEntry.groupIndex === null || depEntry.groupIndex < depGroupIndex) {
	        
	        // if already in a group, remove from the old group
	        if (depEntry.groupIndex !== null) {
	          groups[depEntry.groupIndex].splice(indexOf.call(groups[depEntry.groupIndex], depEntry), 1);

	          // if the old group is empty, then we have a mixed depndency cycle
	          if (groups[depEntry.groupIndex].length == 0)
	            throw new Error("Mixed dependency cycle detected");
	        }

	        depEntry.groupIndex = depGroupIndex;
	      }

	      buildGroups(depEntry, loader, groups);
	    }
	  }

	  function link(name, loader) {
	    var startEntry = loader.defined[name];

	    // skip if already linked
	    if (startEntry.module)
	      return;

	    startEntry.groupIndex = 0;

	    var groups = [];

	    buildGroups(startEntry, loader, groups);

	    var curGroupDeclarative = !!startEntry.declarative == groups.length % 2;
	    for (var i = groups.length - 1; i >= 0; i--) {
	      var group = groups[i];
	      for (var j = 0; j < group.length; j++) {
	        var entry = group[j];

	        // link each group
	        if (curGroupDeclarative)
	          linkDeclarativeModule(entry, loader);
	        else
	          linkDynamicModule(entry, loader);
	      }
	      curGroupDeclarative = !curGroupDeclarative; 
	    }
	  }

	  // module binding records
	  function ModuleRecord() {}
	  defineProperty(ModuleRecord, 'toString', {
	    value: function() {
	      return 'Module';
	    }
	  });

	  function getOrCreateModuleRecord(name, moduleRecords) {
	    return moduleRecords[name] || (moduleRecords[name] = {
	      name: name,
	      dependencies: [],
	      exports: new ModuleRecord(), // start from an empty module and extend
	      importers: []
	    });
	  }

	  function linkDeclarativeModule(entry, loader) {
	    // only link if already not already started linking (stops at circular)
	    if (entry.module)
	      return;

	    var moduleRecords = loader._loader.moduleRecords;
	    var module = entry.module = getOrCreateModuleRecord(entry.name, moduleRecords);
	    var exports = entry.module.exports;

	    var declaration = entry.declare.call(__global, function(name, value) {
	      module.locked = true;

	      if (typeof name == 'object') {
	        for (var p in name)
	          exports[p] = name[p];
	      }
	      else {
	        exports[name] = value;
	      }

	      for (var i = 0, l = module.importers.length; i < l; i++) {
	        var importerModule = module.importers[i];
	        if (!importerModule.locked) {
	          var importerIndex = indexOf.call(importerModule.dependencies, module);
	          importerModule.setters[importerIndex](exports);
	        }
	      }

	      module.locked = false;
	      return value;
	    }, { id: entry.name });
	    
	    module.setters = declaration.setters;
	    module.execute = declaration.execute;

	    if (!module.setters || !module.execute) {
	      throw new TypeError('Invalid System.register form for ' + entry.name);
	    }

	    // now link all the module dependencies
	    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	      var depName = entry.normalizedDeps[i];
	      var depEntry = loader.defined[depName];
	      var depModule = moduleRecords[depName];

	      // work out how to set depExports based on scenarios...
	      var depExports;

	      if (depModule) {
	        depExports = depModule.exports;
	      }
	      // dynamic, already linked in our registry
	      else if (depEntry && !depEntry.declarative) {
	        depExports = depEntry.esModule;
	      }
	      // in the loader registry
	      else if (!depEntry) {
	        depExports = loader.get(depName);
	      }
	      // we have an entry -> link
	      else {
	        linkDeclarativeModule(depEntry, loader);
	        depModule = depEntry.module;
	        depExports = depModule.exports;
	      }

	      // only declarative modules have dynamic bindings
	      if (depModule && depModule.importers) {
	        depModule.importers.push(module);
	        module.dependencies.push(depModule);
	      }
	      else {
	        module.dependencies.push(null);
	      }
	      
	      // run setters for all entries with the matching dependency name
	      var originalIndices = entry.originalIndices[i];
	      for (var j = 0, len = originalIndices.length; j < len; ++j) {
	        var index = originalIndices[j];
	        if (module.setters[index]) {
	          module.setters[index](depExports);
	        }
	      }
	    }
	  }

	  // An analog to loader.get covering execution of all three layers (real declarative, simulated declarative, simulated dynamic)
	  function getModule(name, loader) {
	    var exports;
	    var entry = loader.defined[name];

	    if (!entry) {
	      exports = loader.get(name);
	      if (!exports)
	        throw new Error('Unable to load dependency ' + name + '.');
	    }

	    else {
	      if (entry.declarative)
	        ensureEvaluated(name, [], loader);
	    
	      else if (!entry.evaluated)
	        linkDynamicModule(entry, loader);

	      exports = entry.module.exports;
	    }

	    if ((!entry || entry.declarative) && exports && exports.__useDefault)
	      return exports['default'];
	    
	    return exports;
	  }

	  function linkDynamicModule(entry, loader) {
	    if (entry.module)
	      return;

	    var exports = {};

	    var module = entry.module = { exports: exports, id: entry.name };

	    // AMD requires execute the tree first
	    if (!entry.executingRequire) {
	      for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	        var depName = entry.normalizedDeps[i];
	        // we know we only need to link dynamic due to linking algorithm
	        var depEntry = loader.defined[depName];
	        if (depEntry)
	          linkDynamicModule(depEntry, loader);
	      }
	    }

	    // now execute
	    entry.evaluated = true;
	    var output = entry.execute.call(__global, function(name) {
	      for (var i = 0, l = entry.deps.length; i < l; i++) {
	        if (entry.deps[i] != name)
	          continue;
	        return getModule(entry.normalizedDeps[i], loader);
	      }
	      // try and normalize the dependency to see if we have another form
	      var nameNormalized = loader.normalizeSync(name, entry.name);
	      if (indexOf.call(entry.normalizedDeps, nameNormalized) != -1)
	        return getModule(nameNormalized, loader);

	      throw new Error('Module ' + name + ' not declared as a dependency of ' + entry.name);
	    }, exports, module);
	    
	    if (output)
	      module.exports = output;

	    // create the esModule object, which allows ES6 named imports of dynamics
	    exports = module.exports;

	    // __esModule flag treats as already-named
	    if (exports && (exports.__esModule || exports instanceof Module))
	      entry.esModule = exports;
	    // set module as 'default' export, then fake named exports by iterating properties
	    else if (entry.esmExports && exports !== __global)
	      entry.esModule = getESModule(exports);
	    // just use the 'default' export
	    else
	      entry.esModule = { 'default': exports };
	  }

	  /*
	   * Given a module, and the list of modules for this current branch,
	   *  ensure that each of the dependencies of this module is evaluated
	   *  (unless one is a circular dependency already in the list of seen
	   *  modules, in which case we execute it)
	   *
	   * Then we evaluate the module itself depth-first left to right 
	   * execution to match ES6 modules
	   */
	  function ensureEvaluated(moduleName, seen, loader) {
	    var entry = loader.defined[moduleName];

	    // if already seen, that means it's an already-evaluated non circular dependency
	    if (!entry || entry.evaluated || !entry.declarative)
	      return;

	    // this only applies to declarative modules which late-execute

	    seen.push(moduleName);

	    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	      var depName = entry.normalizedDeps[i];
	      if (indexOf.call(seen, depName) == -1) {
	        if (!loader.defined[depName])
	          loader.get(depName);
	        else
	          ensureEvaluated(depName, seen, loader);
	      }
	    }

	    if (entry.evaluated)
	      return;

	    entry.evaluated = true;
	    entry.module.execute.call(__global);
	  }

	  // override the delete method to also clear the register caches
	  hook('delete', function(del) {
	    return function(name) {
	      delete this._loader.moduleRecords[name];
	      delete this.defined[name];
	      return del.call(this, name);
	    };
	  });

	  hook('fetch', function(fetch) {
	    return function(load) {
	      if (this.defined[load.name]) {
	        load.metadata.format = 'defined';
	        return '';
	      }

	      load.metadata.deps = load.metadata.deps || [];
	      
	      return fetch.call(this, load);
	    };
	  });

	  hook('translate', function(translate) {
	    // we run the meta detection here (register is after meta)
	    return function(load) {
	      load.metadata.deps = load.metadata.deps || [];
	      return Promise.resolve(translate.call(this, load)).then(function(source) {
	        // run detection for register format
	        if (load.metadata.format == 'register' || !load.metadata.format && detectRegisterFormat(load.source))
	          load.metadata.format = 'register';
	        return source;
	      });
	    };
	  });

	  hook('instantiate', function(instantiate) {
	    return function(load) {
	      if (load.metadata.format == 'detect')
	        load.metadata.format = undefined;

	      // assumes previous instantiate is sync
	      // (core json support)
	      instantiate.call(this, load);

	      var loader = this;

	      var entry;

	      // first we check if this module has already been defined in the registry
	      if (loader.defined[load.name]) {
	        entry = loader.defined[load.name];
	        // don't support deps for ES modules
	        if (!entry.declarative)
	          entry.deps = entry.deps.concat(load.metadata.deps);
	      }

	      // picked up already by an anonymous System.register script injection
	      // or via the dynamic formats
	      else if (load.metadata.entry) {
	        entry = load.metadata.entry;
	        entry.deps = entry.deps.concat(load.metadata.deps);
	      }

	      // Contains System.register calls
	      // (dont run bundles in the builder)
	      else if (!(loader.builder && load.metadata.bundle) 
	          && (load.metadata.format == 'register' || load.metadata.format == 'esm' || load.metadata.format == 'es6')) {
	        
	        if (typeof __exec != 'undefined')
	          __exec.call(loader, load);

	        if (!load.metadata.entry && !load.metadata.bundle)
	          throw new Error(load.name + ' detected as ' + load.metadata.format + ' but didn\'t execute.');

	        entry = load.metadata.entry;

	        // support metadata deps for System.register
	        if (entry && load.metadata.deps)
	          entry.deps = entry.deps.concat(load.metadata.deps);
	      }

	      // named bundles are just an empty module
	      if (!entry) {
	        entry = createEntry();
	        entry.deps = load.metadata.deps;
	        entry.execute = function() {};
	      }

	      // place this module onto defined for circular references
	      loader.defined[load.name] = entry;
	      
	      var grouped = group(entry.deps);
	      
	      entry.deps = grouped.names;
	      entry.originalIndices = grouped.indices;
	      entry.name = load.name;
	      entry.esmExports = load.metadata.esmExports !== false;

	      // first, normalize all dependencies
	      var normalizePromises = [];
	      for (var i = 0, l = entry.deps.length; i < l; i++)
	        normalizePromises.push(Promise.resolve(loader.normalize(entry.deps[i], load.name)));

	      return Promise.all(normalizePromises).then(function(normalizedDeps) {

	        entry.normalizedDeps = normalizedDeps;

	        return {
	          deps: entry.deps,
	          execute: function() {
	            // recursively ensure that the module and all its 
	            // dependencies are linked (with dependency group handling)
	            link(load.name, loader);

	            // now handle dependency execution in correct order
	            ensureEvaluated(load.name, [], loader);

	            // remove from the registry
	            loader.defined[load.name] = undefined;

	            // return the defined module object
	            return loader.newModule(entry.declarative ? entry.module.exports : entry.esModule);
	          }
	        };
	      });
	    };
	  });
	})();
	/*
	 * Extension to detect ES6 and auto-load Traceur or Babel for processing
	 */
	(function() {
	  // good enough ES6 module detection regex - format detections not designed to be accurate, but to handle the 99% use case
	  var esmRegEx = /(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s*(\{|default|function|class|var|const|let|async\s+function))/;

	  var traceurRuntimeRegEx = /\$traceurRuntime\s*\./;
	  var babelHelpersRegEx = /babelHelpers\s*\./;

	  hook('translate', function(translate) {
	    return function(load) {
	      var loader = this;
	      return translate.call(loader, load)
	      .then(function(source) {
	        // detect & transpile ES6
	        if (load.metadata.format == 'esm' || load.metadata.format == 'es6' || !load.metadata.format && source.match(esmRegEx)) {
	          if (load.metadata.format == 'es6')
	            warn.call(loader, 'Module ' + load.name + ' has metadata setting its format to "es6", which is deprecated.\nThis should be updated to "esm".');

	          load.metadata.format = 'esm';

	          if (loader.transpiler === false) {
	            // we accept translation to esm for builds though to enable eg rollup optimizations
	            if (loader.builder)
	              return source;
	            throw new TypeError('Unable to dynamically transpile ES module as SystemJS.transpiler set to false.');
	          }

	          // setting _loader.loadedTranspiler = false tells the next block to
	          // do checks for setting transpiler metadata
	          loader._loader.loadedTranspiler = loader._loader.loadedTranspiler || false;
	          if (loader.pluginLoader)
	            loader.pluginLoader._loader.loadedTranspiler = loader._loader.loadedTranspiler || false;

	          // do transpilation
	          return (loader._loader.transpilerPromise || (
	            loader._loader.transpilerPromise = Promise.resolve(
	              __global[loader.transpiler == 'typescript' ? 'ts' : loader.transpiler] || (loader.pluginLoader || loader)['import'](loader.transpiler)
	          ))).then(function(transpiler) {
	            loader._loader.loadedTranspilerRuntime = true;

	            // translate hooks means this is a transpiler plugin instead of a raw implementation
	            if (transpiler.translate) {
	              // if transpiler is the same as the plugin loader, then don't run twice
	              if (transpiler == load.metadata.loaderModule)
	                return load.source;

	              // convert the source map into an object for transpilation chaining
	              if (typeof load.metadata.sourceMap == 'string')
	                load.metadata.sourceMap = JSON.parse(load.metadata.sourceMap);

	              return Promise.resolve(transpiler.translate.call(loader, load))
	              .then(function(source) {
	                // sanitize sourceMap if an object not a JSON string
	                var sourceMap = load.metadata.sourceMap;
	                if (sourceMap && typeof sourceMap == 'object') {
	                  var originalName = load.name.split('!')[0];
	                  
	                  // force set the filename of the original file
	                  sourceMap.file = originalName + '!transpiled';

	                  // force set the sources list if only one source
	                  if (!sourceMap.sources || sourceMap.sources.length <= 1)
	                    sourceMap.sources = [originalName];
	                }

	                if (load.metadata.format == 'esm' && !loader.builder && detectRegisterFormat(source))
	                  load.metadata.format = 'register';
	                return source;
	              });
	            }

	            // legacy builder support
	            if (loader.builder)
	              load.metadata.originalSource = load.source;
	            
	            // defined in es6-module-loader/src/transpile.js
	            return transpile.call(loader, load)
	            .then(function(source) {
	              // clear sourceMap as transpiler embeds it
	              load.metadata.sourceMap = undefined;
	              return source;
	            });            
	          });
	        }

	        // skip transpiler and transpiler runtime loading when transpiler is disabled
	        if (loader.transpiler === false)
	          return source;

	        // load the transpiler correctly
	        if (loader._loader.loadedTranspiler === false && (loader.transpiler == 'traceur' || loader.transpiler == 'typescript' || loader.transpiler == 'babel')
	            && load.name == loader.normalizeSync(loader.transpiler)) {

	          // always load transpiler as a global
	          if (source.length > 100 && !load.metadata.format) {
	            load.metadata.format = 'global';

	            if (loader.transpiler === 'traceur')
	              load.metadata.exports = 'traceur';
	            if (loader.transpiler === 'typescript')
	              load.metadata.exports = 'ts';
	          }

	          loader._loader.loadedTranspiler = true;
	        }

	        // load the transpiler runtime correctly
	        if (loader._loader.loadedTranspilerRuntime === false) {
	          if (load.name == loader.normalizeSync('traceur-runtime')
	              || load.name == loader.normalizeSync('babel/external-helpers*')) {
	            if (source.length > 100)
	              load.metadata.format = load.metadata.format || 'global';

	            loader._loader.loadedTranspilerRuntime = true;
	          }
	        }

	        // detect transpiler runtime usage to load runtimes
	        if ((load.metadata.format == 'register' || load.metadata.bundle) && loader._loader.loadedTranspilerRuntime !== true) {
	          if (!__global.$traceurRuntime && load.source.match(traceurRuntimeRegEx)) {
	            loader._loader.loadedTranspilerRuntime = loader._loader.loadedTranspilerRuntime || false;
	            return loader['import']('traceur-runtime').then(function() {
	              return source;
	            });
	          }
	          if (!__global.babelHelpers && load.source.match(babelHelpersRegEx)) {
	            loader._loader.loadedTranspilerRuntime = loader._loader.loadedTranspilerRuntime || false;
	            return loader['import']('babel/external-helpers').then(function() {
	              return source;
	            });
	          }
	        }

	        return source;
	      });
	    };
	  });

	})();
	/*
	  SystemJS Global Format

	  Supports
	    metadata.deps
	    metadata.globals
	    metadata.exports

	  Without metadata.exports, detects writes to the global object.
	*/
	var __globalName = typeof self != 'undefined' ? 'self' : 'global';

	hook('fetch', function(fetch) {
	  return function(load) {
	    if (load.metadata.exports && !load.metadata.format)
	      load.metadata.format = 'global';
	    return fetch.call(this, load);
	  };
	});

	// ideally we could support script loading for globals, but the issue with that is that
	// we can't do it with AMD support side-by-side since AMD support means defining the
	// global define, and global support means not definining it, yet we don't have any hook
	// into the "pre-execution" phase of a script tag being loaded to handle both cases
	hook('instantiate', function(instantiate) {
	  return function(load) {
	    var loader = this;

	    if (!load.metadata.format)
	      load.metadata.format = 'global';

	    // global is a fallback module format
	    if (load.metadata.format == 'global' && !load.metadata.registered) {

	      var entry = createEntry();

	      load.metadata.entry = entry;

	      entry.deps = [];

	      for (var g in load.metadata.globals) {
	        var gl = load.metadata.globals[g];
	        if (gl)
	          entry.deps.push(gl);
	      }

	      entry.execute = function(require, exports, module) {

	        var globals;
	        if (load.metadata.globals) {
	          globals = {};
	          for (var g in load.metadata.globals)
	            if (load.metadata.globals[g])
	              globals[g] = require(load.metadata.globals[g]);
	        }
	        
	        var exportName = load.metadata.exports;

	        if (exportName)
	          load.source += '\n' + __globalName + '["' + exportName + '"] = ' + exportName + ';';

	        var retrieveGlobal = loader.get('@@global-helpers').prepareGlobal(module.id, exportName, globals);

	        __exec.call(loader, load);

	        return retrieveGlobal();
	      }
	    }
	    return instantiate.call(this, load);
	  };
	});


	function getGlobalValue(exports) {
	  if (typeof exports == 'string')
	    return readMemberExpression(exports, __global);

	  if (!(exports instanceof Array))
	    throw new Error('Global exports must be a string or array.');

	  var globalValue = {};
	  var first = true;
	  for (var i = 0; i < exports.length; i++) {
	    var val = readMemberExpression(exports[i], __global);
	    if (first) {
	      globalValue['default'] = val;
	      first = false;
	    }
	    globalValue[exports[i].split('.').pop()] = val;
	  }
	  return globalValue;
	}

	hook('reduceRegister_', function(reduceRegister) {
	  return function(load, register) {
	    if (register || !load.metadata.exports)
	      return reduceRegister.call(this, load, register);

	    load.metadata.format = 'global';
	    var entry = load.metadata.entry = createEntry();
	    entry.deps = load.metadata.deps;
	    var globalValue = getGlobalValue(load.metadata.exports);
	    entry.execute = function() {
	      return globalValue;
	    };
	  };
	});

	hookConstructor(function(constructor) {
	  return function() {
	    var loader = this;
	    constructor.call(loader);

	    var hasOwnProperty = Object.prototype.hasOwnProperty;

	    // bare minimum ignores
	    var ignoredGlobalProps = ['_g', 'sessionStorage', 'localStorage', 'clipboardData', 'frames', 'frameElement', 'external', 
	      'mozAnimationStartTime', 'webkitStorageInfo', 'webkitIndexedDB', 'mozInnerScreenY', 'mozInnerScreenX'];

	    var globalSnapshot;

	    function forEachGlobal(callback) {
	      if (Object.keys)
	        Object.keys(__global).forEach(callback);
	      else
	        for (var g in __global) {
	          if (!hasOwnProperty.call(__global, g))
	            continue;
	          callback(g);
	        }
	    }

	    function forEachGlobalValue(callback) {
	      forEachGlobal(function(globalName) {
	        if (indexOf.call(ignoredGlobalProps, globalName) != -1)
	          return;
	        try {
	          var value = __global[globalName];
	        }
	        catch (e) {
	          ignoredGlobalProps.push(globalName);
	        }
	        callback(globalName, value);
	      });
	    }

	    loader.set('@@global-helpers', loader.newModule({
	      prepareGlobal: function(moduleName, exports, globals) {
	        // disable module detection
	        var curDefine = __global.define;
	        
	        __global.define = undefined;

	        // set globals
	        var oldGlobals;
	        if (globals) {
	          oldGlobals = {};
	          for (var g in globals) {
	            oldGlobals[g] = __global[g];
	            __global[g] = globals[g];
	          }
	        }

	        // store a complete copy of the global object in order to detect changes
	        if (!exports) {
	          globalSnapshot = {};

	          forEachGlobalValue(function(name, value) {
	            globalSnapshot[name] = value;
	          });
	        }

	        // return function to retrieve global
	        return function() {
	          var globalValue;

	          if (exports) {
	            globalValue = getGlobalValue(exports);
	          }
	          else {
	            globalValue = {};
	            var singleGlobal;
	            var multipleExports;

	            forEachGlobalValue(function(name, value) {
	              if (globalSnapshot[name] === value)
	                return;
	              if (typeof value == 'undefined')
	                return;
	              globalValue[name] = value;

	              if (typeof singleGlobal != 'undefined') {
	                if (!multipleExports && singleGlobal !== value)
	                  multipleExports = true;
	              }
	              else {
	                singleGlobal = value;
	              }
	            });
	            globalValue = multipleExports ? globalValue : singleGlobal;
	          }

	          // revert globals
	          if (oldGlobals) {
	            for (var g in oldGlobals)
	              __global[g] = oldGlobals[g];
	          }
	          __global.define = curDefine;

	          return globalValue;
	        };
	      }
	    }));
	  };
	});
	/*
	  SystemJS CommonJS Format
	*/
	(function() {
	  // CJS Module Format
	  // require('...') || exports[''] = ... || exports.asd = ... || module.exports = ...
	  var cjsExportsRegEx = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])(exports\s*(\[['"]|\.)|module(\.exports|\['exports'\]|\["exports"\])\s*(\[['"]|[=,\.]))/;
	  // RegEx adjusted from https://github.com/jbrantly/yabble/blob/master/lib/yabble.js#L339
	  var cjsRequireRegEx = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF."'])require\s*\(\s*("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')\s*\)/g;
	  var commentRegEx = /(^|[^\\])(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;

	  var stringRegEx = /("[^"\\\n\r]*(\\.[^"\\\n\r]*)*"|'[^'\\\n\r]*(\\.[^'\\\n\r]*)*')/g;

	  // used to support leading #!/usr/bin/env in scripts as supported in Node
	  var hashBangRegEx = /^\#\!.*/;

	  function getCJSDeps(source) {
	    cjsRequireRegEx.lastIndex = commentRegEx.lastIndex = stringRegEx.lastIndex = 0;

	    var deps = [];

	    var match;

	    // track string and comment locations for unminified source    
	    var stringLocations = [], commentLocations = [];

	    function inLocation(locations, match) {
	      for (var i = 0; i < locations.length; i++)
	        if (locations[i][0] < match.index && locations[i][1] > match.index)
	          return true;
	      return false;
	    }

	    if (source.length / source.split('\n').length < 200) {
	      while (match = stringRegEx.exec(source))
	        stringLocations.push([match.index, match.index + match[0].length]);
	      
	      while (match = commentRegEx.exec(source)) {
	        // only track comments not starting in strings
	        if (!inLocation(stringLocations, match))
	          commentLocations.push([match.index, match.index + match[0].length]);
	      }
	    }

	    while (match = cjsRequireRegEx.exec(source)) {
	      // ensure we're not within a string or comment location
	      if (!inLocation(stringLocations, match) && !inLocation(commentLocations, match)) {
	        var dep = match[1].substr(1, match[1].length - 2);
	        // skip cases like require('" + file + "')
	        if (dep.match(/"|'/))
	          continue;
	        // trailing slash requires are removed as they don't map mains in SystemJS
	        if (dep[dep.length - 1] == '/')
	          dep = dep.substr(0, dep.length - 1);
	        deps.push(dep);
	      }
	    }

	    return deps;
	  }

	  hook('instantiate', function(instantiate) {
	    return function(load) {
	      var loader = this;
	      if (!load.metadata.format) {
	        cjsExportsRegEx.lastIndex = 0;
	        cjsRequireRegEx.lastIndex = 0;
	        if (cjsRequireRegEx.exec(load.source) || cjsExportsRegEx.exec(load.source))
	          load.metadata.format = 'cjs';
	      }

	      if (load.metadata.format == 'cjs') {
	        var metaDeps = load.metadata.deps;
	        var deps = load.metadata.cjsRequireDetection === false ? [] : getCJSDeps(load.source);

	        for (var g in load.metadata.globals)
	          if (load.metadata.globals[g])
	            deps.push(load.metadata.globals[g]);

	        var entry = createEntry();

	        load.metadata.entry = entry;

	        entry.deps = deps;
	        entry.executingRequire = true;
	        entry.execute = function(_require, exports, module) {
	          function require(name) {
	            if (name[name.length - 1] == '/')
	              name = name.substr(0, name.length - 1);
	            return _require.apply(this, arguments);
	          }
	          require.resolve = function(name) {
	            return loader.get('@@cjs-helpers').requireResolve(name, module.id);
	          };

	          // ensure meta deps execute first
	          if (!load.metadata.cjsDeferDepsExecute)
	            for (var i = 0; i < metaDeps.length; i++)
	              require(metaDeps[i]);

	          var pathVars = loader.get('@@cjs-helpers').getPathVars(module.id);
	          var __cjsWrapper = {
	            exports: exports,
	            args: [require, exports, module, pathVars.filename, pathVars.dirname, __global, __global]
	          };

	          var cjsWrapper = "(function(require, exports, module, __filename, __dirname, global, GLOBAL";

	          // add metadata.globals to the wrapper arguments
	          if (load.metadata.globals)
	            for (var g in load.metadata.globals) {
	              __cjsWrapper.args.push(require(load.metadata.globals[g]));
	              cjsWrapper += ", " + g;
	            }

	          // disable AMD detection
	          var define = __global.define;
	          __global.define = undefined;
	          __global.__cjsWrapper = __cjsWrapper;

	          load.source = cjsWrapper + ") {" + load.source.replace(hashBangRegEx, '') + "\n}).apply(__cjsWrapper.exports, __cjsWrapper.args);";

	          __exec.call(loader, load);

	          __global.__cjsWrapper = undefined;
	          __global.define = define;
	        };
	      }

	      return instantiate.call(loader, load);
	    };
	  });
	})();
	hookConstructor(function(constructor) {
	  return function() {
	    var loader = this;
	    constructor.call(loader);

	    if (typeof window != 'undefined' && typeof document != 'undefined' && window.location)
	      var windowOrigin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

	    function stripOrigin(path) {
	      if (path.substr(0, 8) == 'file:///')
	        return path.substr(7 + !!isWindows);
	      
	      if (windowOrigin && path.substr(0, windowOrigin.length) == windowOrigin)
	        return path.substr(windowOrigin.length);

	      return path;
	    }

	    loader.set('@@cjs-helpers', loader.newModule({
	      requireResolve: function(request, parentId) {
	        return stripOrigin(loader.normalizeSync(request, parentId));
	      },
	      getPathVars: function(moduleId) {
	        // remove any plugin syntax
	        var pluginIndex = moduleId.lastIndexOf('!');
	        var filename;
	        if (pluginIndex != -1)
	          filename = moduleId.substr(0, pluginIndex);
	        else
	          filename = moduleId;

	        var dirname = filename.split('/');
	        dirname.pop();
	        dirname = dirname.join('/');

	        return {
	          filename: stripOrigin(filename),
	          dirname: stripOrigin(dirname)
	        };
	      }
	    }))
	  };
	});/*
	 * AMD Helper function module
	 * Separated into its own file as this is the part needed for full AMD support in SFX builds
	 * NB since implementations have now diverged this can be merged back with amd.js
	 */

	hook('fetch', function(fetch) {
	  return function(load) {
	    // script load implies define global leak
	    if (load.metadata.scriptLoad && isBrowser)
	      __global.define = this.amdDefine;
	    return fetch.call(this, load);
	  };
	});
	 
	hookConstructor(function(constructor) {
	  return function() {
	    var loader = this;
	    constructor.call(this);

	    var commentRegEx = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
	    var cjsRequirePre = "(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])";
	    var cjsRequirePost = "\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)";
	    var fnBracketRegEx = /\(([^\)]*)\)/;
	    var wsRegEx = /^\s+|\s+$/g;
	    
	    var requireRegExs = {};

	    function getCJSDeps(source, requireIndex) {

	      // remove comments
	      source = source.replace(commentRegEx, '');

	      // determine the require alias
	      var params = source.match(fnBracketRegEx);
	      var requireAlias = (params[1].split(',')[requireIndex] || 'require').replace(wsRegEx, '');

	      // find or generate the regex for this requireAlias
	      var requireRegEx = requireRegExs[requireAlias] || (requireRegExs[requireAlias] = new RegExp(cjsRequirePre + requireAlias + cjsRequirePost, 'g'));

	      requireRegEx.lastIndex = 0;

	      var deps = [];

	      var match;
	      while (match = requireRegEx.exec(source))
	        deps.push(match[2] || match[3]);

	      return deps;
	    }

	    /*
	      AMD-compatible require
	      To copy RequireJS, set window.require = window.requirejs = loader.amdRequire
	    */
	    function require(names, callback, errback, referer) {
	      // in amd, first arg can be a config object... we just ignore
	      if (typeof names == 'object' && !(names instanceof Array))
	        return require.apply(null, Array.prototype.splice.call(arguments, 1, arguments.length - 1));

	      // amd require
	      if (typeof names == 'string' && typeof callback == 'function')
	        names = [names];
	      if (names instanceof Array) {
	        var dynamicRequires = [];
	        for (var i = 0; i < names.length; i++)
	          dynamicRequires.push(loader['import'](names[i], referer));
	        Promise.all(dynamicRequires).then(function(modules) {
	          if (callback)
	            callback.apply(null, modules);
	        }, errback);
	      }

	      // commonjs require
	      else if (typeof names == 'string') {
	        var defaultJSExtension = loader.defaultJSExtensions && names.substr(names.length - 3, 3) != '.js';
	        var normalized = loader.decanonicalize(names, referer);
	        if (defaultJSExtension && normalized.substr(normalized.length - 3, 3) == '.js')
	          normalized = normalized.substr(0, normalized.length - 3);
	        var module = loader.get(normalized);
	        if (!module)
	          throw new Error('Module not already loaded loading "' + names + '" as ' + normalized + (referer ? ' from "' + referer + '".' : '.'));
	        return module.__useDefault ? module['default'] : module;
	      }

	      else
	        throw new TypeError('Invalid require');
	    }

	    function define(name, deps, factory) {
	      if (typeof name != 'string') {
	        factory = deps;
	        deps = name;
	        name = null;
	      }
	      if (!(deps instanceof Array)) {
	        factory = deps;
	        deps = ['require', 'exports', 'module'].splice(0, factory.length);
	      }

	      if (typeof factory != 'function')
	        factory = (function(factory) {
	          return function() { return factory; }
	        })(factory);

	      // in IE8, a trailing comma becomes a trailing undefined entry
	      if (deps[deps.length - 1] === undefined)
	        deps.pop();

	      // remove system dependencies
	      var requireIndex, exportsIndex, moduleIndex;
	      
	      if ((requireIndex = indexOf.call(deps, 'require')) != -1) {
	        
	        deps.splice(requireIndex, 1);

	        // only trace cjs requires for non-named
	        // named defines assume the trace has already been done
	        if (!name)
	          deps = deps.concat(getCJSDeps(factory.toString(), requireIndex));
	      }

	      if ((exportsIndex = indexOf.call(deps, 'exports')) != -1)
	        deps.splice(exportsIndex, 1);
	      
	      if ((moduleIndex = indexOf.call(deps, 'module')) != -1)
	        deps.splice(moduleIndex, 1);

	      function execute(req, exports, module) {
	        var depValues = [];
	        for (var i = 0; i < deps.length; i++)
	          depValues.push(req(deps[i]));

	        module.uri = module.id;

	        module.config = function() {};

	        // add back in system dependencies
	        if (moduleIndex != -1)
	          depValues.splice(moduleIndex, 0, module);
	        
	        if (exportsIndex != -1)
	          depValues.splice(exportsIndex, 0, exports);
	        
	        if (requireIndex != -1) {
	          function contextualRequire(names, callback, errback) {
	            if (typeof names == 'string' && typeof callback != 'function')
	              return req(names);
	            return require.call(loader, names, callback, errback, module.id);
	          }
	          contextualRequire.toUrl = function(name) {
	            // normalize without defaultJSExtensions
	            var defaultJSExtension = loader.defaultJSExtensions && name.substr(name.length - 3, 3) != '.js';
	            var url = loader.decanonicalize(name, module.id);
	            if (defaultJSExtension && url.substr(url.length - 3, 3) == '.js')
	              url = url.substr(0, url.length - 3);
	            return url;
	          };
	          depValues.splice(requireIndex, 0, contextualRequire);
	        }

	        // set global require to AMD require
	        var curRequire = __global.require;
	        __global.require = require;

	        var output = factory.apply(exportsIndex == -1 ? __global : exports, depValues);

	        __global.require = curRequire;

	        if (typeof output == 'undefined' && module)
	          output = module.exports;

	        if (typeof output != 'undefined')
	          return output;
	      }

	      var entry = createEntry();
	      entry.name = name && (loader.decanonicalize || loader.normalize).call(loader, name);
	      entry.deps = deps;
	      entry.execute = execute;

	      loader.pushRegister_({
	        amd: true,
	        entry: entry
	      });
	    }
	    define.amd = {};

	    // reduction function to attach defines to a load record
	    hook('reduceRegister_', function(reduceRegister) {
	      return function(load, register) {
	        // only handle AMD registers here
	        if (!register || !register.amd)
	          return reduceRegister.call(this, load, register);

	        var curMeta = load && load.metadata;
	        var entry = register.entry;

	        if (curMeta) {
	          if (!curMeta.format || curMeta.format == 'detect')
	            curMeta.format = 'amd';
	          else if (!entry.name && curMeta.format != 'amd')
	            throw new Error('AMD define called while executing ' + curMeta.format + ' module ' + load.name);
	        }

	        // anonymous define
	        if (!entry.name) {
	          if (!curMeta)
	            throw new TypeError('Unexpected anonymous AMD define.');

	          if (curMeta.entry && !curMeta.entry.name)
	            throw new Error('Multiple anonymous defines in module ' + load.name);
	          
	          curMeta.entry = entry;
	        }
	        // named define
	        else {
	          // if we don't have any other defines, 
	          // then let this be an anonymous define
	          // this is just to support single modules of the form:
	          // define('jquery')
	          // still loading anonymously
	          // because it is done widely enough to be useful
	          // as soon as there is more than one define, this gets removed though
	          if (curMeta) {
	            if (!curMeta.entry && !curMeta.bundle)
	              curMeta.entry = entry;
	            else if (curMeta.entry && curMeta.entry.name)
	              curMeta.entry = undefined;

	            // note this is now a bundle
	            curMeta.bundle = true;
	          }

	          // define the module through the register registry
	          if (!(entry.name in this.defined))
	            this.defined[entry.name] = entry;
	        }
	      };
	    });

	    loader.amdDefine = define;
	    loader.amdRequire = require;
	  };
	});/*
	  SystemJS AMD Format
	*/
	(function() {
	  // AMD Module Format Detection RegEx
	  // define([.., .., ..], ...)
	  // define(varName); || define(function(require, exports) {}); || define({})
	  var amdRegEx = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])define\s*\(\s*("[^"]+"\s*,\s*|'[^']+'\s*,\s*)?\s*(\[(\s*(("[^"]+"|'[^']+')\s*,|\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*(\s*("[^"]+"|'[^']+')\s*,?)?(\s*(\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*\s*\]|function\s*|{|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\))/;

	  hook('instantiate', function(instantiate) {
	    return function(load) {
	      var loader = this;
	      
	      if (load.metadata.format == 'amd' || !load.metadata.format && load.source.match(amdRegEx)) {
	        load.metadata.format = 'amd';
	        
	        if (!loader.builder && loader.execute !== false) {
	          var curDefine = __global.define;
	          __global.define = this.amdDefine;

	          try {
	            __exec.call(loader, load);
	          }
	          finally {
	            __global.define = curDefine;
	          }

	          if (!load.metadata.entry && !load.metadata.bundle)
	            throw new TypeError('AMD module ' + load.name + ' did not define');
	        }
	        else {
	          load.metadata.execute = function() {
	            return load.metadata.builderExecute.apply(this, arguments);
	          };
	        }
	      }

	      return instantiate.call(loader, load);
	    };
	  });

	})();
	/*
	  SystemJS Loader Plugin Support

	  Supports plugin loader syntax with "!", or via metadata.loader

	  The plugin name is loaded as a module itself, and can override standard loader hooks
	  for the plugin resource. See the plugin section of the systemjs readme.
	*/

	(function() {
	  function getParentName(loader, parentName) {
	    // if parent is a plugin, normalize against the parent plugin argument only
	    if (parentName) {
	      var parentPluginIndex;
	      if (loader.pluginFirst) {
	        if ((parentPluginIndex = parentName.lastIndexOf('!')) != -1)
	          return parentName.substr(parentPluginIndex + 1);
	      }
	      else {
	        if ((parentPluginIndex = parentName.indexOf('!')) != -1)
	          return parentName.substr(0, parentPluginIndex);
	      }

	      return parentName;
	    }
	  }

	  function parsePlugin(loader, name) {
	    var argumentName;
	    var pluginName;

	    var pluginIndex = name.lastIndexOf('!');

	    if (pluginIndex == -1)
	      return;

	    if (loader.pluginFirst) {
	      argumentName = name.substr(pluginIndex + 1);
	      pluginName = name.substr(0, pluginIndex);
	    }
	    else {
	      argumentName = name.substr(0, pluginIndex);
	      pluginName = name.substr(pluginIndex + 1) || argumentName.substr(argumentName.lastIndexOf('.') + 1);
	    }

	    return {
	      argument: argumentName,
	      plugin: pluginName
	    };
	  }

	  // put name back together after parts have been normalized
	  function combinePluginParts(loader, argumentName, pluginName, defaultExtension) {
	    if (defaultExtension && argumentName.substr(argumentName.length - 3, 3) == '.js')
	      argumentName = argumentName.substr(0, argumentName.length - 3);

	    if (loader.pluginFirst) {
	      return pluginName + '!' + argumentName;
	    }
	    else {
	      return argumentName + '!' + pluginName;
	    }
	  }

	  // note if normalize will add a default js extension
	  // if so, remove for backwards compat
	  // this is strange and sucks, but will be deprecated
	  function checkDefaultExtension(loader, arg) {
	    return loader.defaultJSExtensions && arg.substr(arg.length - 3, 3) != '.js'; 
	  }

	  function createNormalizeSync(normalizeSync) {
	    return function(name, parentName, isPlugin) {
	      var loader = this;
	      
	      parentName = getParentName(this, parentName);
	      var parsed = parsePlugin(loader, name);

	      if (!parsed)
	        return normalizeSync.call(this, name, parentName, isPlugin);

	      // if this is a plugin, normalize the plugin name and the argument
	      var argumentName = loader.normalizeSync(parsed.argument, parentName, true);
	      var pluginName = loader.normalizeSync(parsed.plugin, parentName, true);
	      return combinePluginParts(loader, argumentName, pluginName, checkDefaultExtension(loader, parsed.argument));
	    };
	  }
	  
	  hook('decanonicalize', createNormalizeSync);
	  hook('normalizeSync', createNormalizeSync);

	  hook('normalize', function(normalize) {
	    return function(name, parentName, isPlugin) {
	      var loader = this;

	      parentName = getParentName(this, parentName);

	      var parsed = parsePlugin(loader, name);

	      if (!parsed)
	        return normalize.call(loader, name, parentName, isPlugin);

	      return Promise.all([
	        loader.normalize(parsed.argument, parentName, true),
	        loader.normalize(parsed.plugin, parentName)
	      ])
	      .then(function(normalized) {
	        return combinePluginParts(loader, normalized[0], normalized[1], checkDefaultExtension(loader, parsed.argument));
	      });
	    }
	  });

	  hook('locate', function(locate) {
	    return function(load) {
	      var loader = this;

	      var name = load.name;

	      // plugin syntax
	      var pluginSyntaxIndex;
	      if (loader.pluginFirst) {
	        if ((pluginSyntaxIndex = name.indexOf('!')) != -1) {
	          load.metadata.loader = name.substr(0, pluginSyntaxIndex);
	          load.name = name.substr(pluginSyntaxIndex + 1);
	        }
	      }
	      else {
	        if ((pluginSyntaxIndex = name.lastIndexOf('!')) != -1) {
	          load.metadata.loader = name.substr(pluginSyntaxIndex + 1);
	          load.name = name.substr(0, pluginSyntaxIndex);
	        }
	      }

	      return locate.call(loader, load)
	      .then(function(address) {
	        if (pluginSyntaxIndex != -1 || !load.metadata.loader)
	          return address;

	        // normalize plugin relative to parent in locate here when
	        // using plugin via loader metadata
	        return loader.normalize(load.metadata.loader, load.name)
	        .then(function(loaderNormalized) {
	          load.metadata.loader = loaderNormalized;
	          return address;
	        });
	      })
	      .then(function(address) {
	        var plugin = load.metadata.loader;

	        if (!plugin)
	          return address;

	        // don't allow a plugin to load itself
	        if (load.name == plugin)
	          throw new Error('Plugin ' + plugin + ' cannot load itself, make sure it is excluded from any wildcard meta configuration via a custom loader: false rule.');

	        // only fetch the plugin itself if this name isn't defined
	        if (loader.defined && loader.defined[name])
	          return address;

	        var pluginLoader = loader.pluginLoader || loader;

	        // load the plugin module and run standard locate
	        return pluginLoader['import'](plugin)
	        .then(function(loaderModule) {
	          // store the plugin module itself on the metadata
	          load.metadata.loaderModule = loaderModule;

	          load.address = address;
	          if (loaderModule.locate)
	            return loaderModule.locate.call(loader, load);

	          return address;
	        });
	      });
	    };
	  });

	  hook('fetch', function(fetch) {
	    return function(load) {
	      var loader = this;
	      if (load.metadata.loaderModule && load.metadata.loaderModule.fetch && load.metadata.format != 'defined') {
	        load.metadata.scriptLoad = false;
	        return load.metadata.loaderModule.fetch.call(loader, load, function(load) {
	          return fetch.call(loader, load);
	        });
	      }
	      else {
	        return fetch.call(loader, load);
	      }
	    };
	  });

	  hook('translate', function(translate) {
	    return function(load) {
	      var loader = this;
	      if (load.metadata.loaderModule && load.metadata.loaderModule.translate && load.metadata.format != 'defined') {
	        return Promise.resolve(load.metadata.loaderModule.translate.call(loader, load)).then(function(result) {
	          var sourceMap = load.metadata.sourceMap;

	          // sanitize sourceMap if an object not a JSON string
	          if (sourceMap) {
	            if (typeof sourceMap != 'object')
	              throw new Error('load.metadata.sourceMap must be set to an object.');

	            var originalName = load.name.split('!')[0];
	            
	            // force set the filename of the original file
	            sourceMap.file = originalName + '!transpiled';

	            // force set the sources list if only one source
	            if (!sourceMap.sources || sourceMap.sources.length <= 1)
	              sourceMap.sources = [originalName];
	          }

	          // if running on file:/// URLs, sourcesContent is necessary
	          // load.metadata.sourceMap.sourcesContent = [load.source];

	          if (typeof result == 'string')
	            load.source = result;
	          else
	            warn.call(this, 'Plugin ' + load.metadata.loader + ' should return the source in translate, instead of setting load.source directly. This support will be deprecated.');

	          return translate.call(loader, load);
	        });
	      }
	      else {
	        return translate.call(loader, load);
	      }
	    };
	  });

	  hook('instantiate', function(instantiate) {
	    return function(load) {
	      var loader = this;
	      var calledInstantiate = false;

	      if (load.metadata.loaderModule && load.metadata.loaderModule.instantiate && !loader.builder && load.metadata.format != 'defined')
	        return Promise.resolve(load.metadata.loaderModule.instantiate.call(loader, load, function(load) {
	          if (calledInstantiate)
	            throw new Error('Instantiate must only be called once.');
	          calledInstantiate = true;
	          return instantiate.call(loader, load);
	        })).then(function(result) {
	          if (calledInstantiate)
	            return result;

	          load.metadata.entry = createEntry();
	          load.metadata.entry.execute = function() {
	            return result;
	          }
	          load.metadata.entry.deps = load.metadata.deps;
	          load.metadata.format = 'defined';
	          return instantiate.call(loader, load);
	        });
	      else
	        return instantiate.call(loader, load);
	    };
	  });

	})();/*
	 * Conditions Extension
	 *
	 *   Allows a condition module to alter the resolution of an import via syntax:
	 *
	 *     import $ from 'jquery/#{browser}';
	 *
	 *   Will first load the module 'browser' via `SystemJS.import('browser')` and 
	 *   take the default export of that module.
	 *   If the default export is not a string, an error is thrown.
	 * 
	 *   We then substitute the string into the require to get the conditional resolution
	 *   enabling environment-specific variations like:
	 * 
	 *     import $ from 'jquery/ie'
	 *     import $ from 'jquery/firefox'
	 *     import $ from 'jquery/chrome'
	 *     import $ from 'jquery/safari'
	 *
	 *   It can be useful for a condition module to define multiple conditions.
	 *   This can be done via the `|` modifier to specify an export member expression:
	 *
	 *     import 'jquery/#{./browser.js|grade.version}'
	 *
	 *   Where the `grade` export `version` member in the `browser.js` module  is substituted.
	 *
	 *
	 * Boolean Conditionals
	 *
	 *   For polyfill modules, that are used as imports but have no module value,
	 *   a binary conditional allows a module not to be loaded at all if not needed:
	 *
	 *     import 'es5-shim#?./conditions.js|needs-es5shim'
	 *
	 *   These conditions can also be negated via:
	 *     
	 *     import 'es5-shim#?~./conditions.js|es6'
	 *
	 */

	  function parseCondition(condition) {
	    var conditionExport, conditionModule, negation;

	    var negation = condition[0] == '~';
	    var conditionExportIndex = condition.lastIndexOf('|');
	    if (conditionExportIndex != -1) {
	      conditionExport = condition.substr(conditionExportIndex + 1);
	      conditionModule = condition.substr(negation, conditionExportIndex - negation) || '@system-env';
	    }
	    else {
	      conditionExport = null;
	      conditionModule = condition.substr(negation);
	    }

	    return {
	      module: conditionModule,
	      prop: conditionExport,
	      negate: negation
	    };
	  }

	  function serializeCondition(conditionObj) {
	    return (conditionObj.negate ? '~' : '') + conditionObj.module + (conditionObj.prop ? '|' + conditionObj.prop : '');
	  }

	  function resolveCondition(conditionObj, parentName, bool) {
	    return this['import'](conditionObj.module, parentName)
	    .then(function(m) {
	      if (conditionObj.prop)
	        m = readMemberExpression(conditionObj.prop, m);
	      else if (typeof m == 'object' && m + '' == 'Module')
	        m = m['default'];

	      if (bool && typeof m != 'boolean')
	        throw new TypeError('Condition ' + serializeCondition(conditionObj) + ' did not resolve to a boolean.');

	      return conditionObj.negate ? !m : m;
	    });
	  }

	  var interpolationRegEx = /#\{[^\}]+\}/;
	  function interpolateConditional(name, parentName) {
	    // first we normalize the conditional
	    var conditionalMatch = name.match(interpolationRegEx);

	    if (!conditionalMatch)
	      return Promise.resolve(name);

	    var conditionObj = parseCondition(conditionalMatch[0].substr(2, conditionalMatch[0].length - 3));

	    // in builds, return normalized conditional
	    if (this.builder)
	      return this['normalize'](conditionObj.module, parentName)
	      .then(function(conditionModule) {
	        conditionObj.module = conditionModule;
	        return name.replace(interpolationRegEx, '#{' + serializeCondition(conditionObj) + '}');
	      });

	    return resolveCondition.call(this, conditionObj, parentName, false)
	    .then(function(conditionValue) {
	      if (typeof conditionValue !== 'string')
	        throw new TypeError('The condition value for ' + name + ' doesn\'t resolve to a string.');

	      if (conditionValue.indexOf('/') != -1)
	        throw new TypeError('Unabled to interpolate conditional ' + name + (parentName ? ' in ' + parentName : '') + '\n\tThe condition value ' + conditionValue + ' cannot contain a "/" separator.');

	      return name.replace(interpolationRegEx, conditionValue);
	    });
	  }

	  function booleanConditional(name, parentName) {
	    // first we normalize the conditional
	    var booleanIndex = name.lastIndexOf('#?');

	    if (booleanIndex == -1)
	      return Promise.resolve(name);

	    var conditionObj = parseCondition(name.substr(booleanIndex + 2));

	    // in builds, return normalized conditional
	    if (this.builder)
	      return this['normalize'](conditionObj.module, parentName)
	      .then(function(conditionModule) {
	        conditionObj.module = conditionModule;
	        return name.substr(0, booleanIndex) + '#?' + serializeCondition(conditionObj);
	      });

	    return resolveCondition.call(this, conditionObj, parentName, true)
	    .then(function(conditionValue) {
	      return conditionValue ? name.substr(0, booleanIndex) : '@empty';
	    });
	  }

	  // normalizeSync does not parse conditionals at all although it could
	  hook('normalize', function(normalize) {
	    return function(name, parentName, parentAddress) {
	      var loader = this;
	      return booleanConditional.call(loader, name, parentName)
	      .then(function(name) {
	        return normalize.call(loader, name, parentName, parentAddress);
	      })
	      .then(function(normalized) {
	        return interpolateConditional.call(loader, normalized, parentName);
	      });
	    };
	  });
	/*
	 * Alias Extension
	 *
	 * Allows a module to be a plain copy of another module by module name
	 *
	 * SystemJS.meta['mybootstrapalias'] = { alias: 'bootstrap' };
	 *
	 */
	(function() {
	  // aliases
	  hook('fetch', function(fetch) {
	    return function(load) {
	      var alias = load.metadata.alias;
	      var aliasDeps = load.metadata.deps || [];
	      if (alias) {
	        load.metadata.format = 'defined';
	        var entry = createEntry();
	        this.defined[load.name] = entry;
	        entry.declarative = true;
	        entry.deps = aliasDeps.concat([alias]);
	        entry.declare = function(_export) {
	          return {
	            setters: [function(module) {
	              for (var p in module)
	                _export(p, module[p]);
	              if (module.__useDefault)
	                entry.module.exports.__useDefault = true;
	            }],
	            execute: function() {}
	          };
	        };
	        return '';
	      }

	      return fetch.call(this, load);
	    };
	  });
	})();/*
	 * Meta Extension
	 *
	 * Sets default metadata on a load record (load.metadata) from
	 * loader.metadata via SystemJS.meta function.
	 *
	 *
	 * Also provides an inline meta syntax for module meta in source.
	 *
	 * Eg:
	 *
	 * loader.meta({
	 *   'my/module': { deps: ['jquery'] }
	 *   'my/*': { format: 'amd' }
	 * });
	 *
	 * Which in turn populates loader.metadata.
	 *
	 * load.metadata.deps and load.metadata.format will then be set
	 * for 'my/module'
	 *
	 * The same meta could be set with a my/module.js file containing:
	 *
	 * my/module.js
	 *   "format amd";
	 *   "deps[] jquery";
	 *   "globals.some value"
	 *   console.log('this is my/module');
	 *
	 * Configuration meta always takes preference to inline meta.
	 *
	 * Multiple matches in wildcards are supported and ammend the meta.
	 *
	 *
	 * The benefits of the function form is that paths are URL-normalized
	 * supporting say
	 *
	 * loader.meta({ './app': { format: 'cjs' } });
	 *
	 * Instead of needing to set against the absolute URL (https://site.com/app.js)
	 *
	 */

	(function() {

	  hookConstructor(function(constructor) {
	    return function() {
	      this.meta = {};
	      constructor.call(this);
	    };
	  });

	  hook('locate', function(locate) {
	    return function(load) {
	      var meta = this.meta;
	      var name = load.name;

	      // NB for perf, maybe introduce a fast-path wildcard lookup cache here
	      // which is checked first

	      // apply wildcard metas
	      var bestDepth = 0;
	      var wildcardIndex;
	      for (var module in meta) {
	        wildcardIndex = module.indexOf('*');
	        if (wildcardIndex === -1)
	          continue;
	        if (module.substr(0, wildcardIndex) === name.substr(0, wildcardIndex)
	            && module.substr(wildcardIndex + 1) === name.substr(name.length - module.length + wildcardIndex + 1)) {
	          var depth = module.split('/').length;
	          if (depth > bestDepth)
	            bestDepth = depth;
	          extendMeta(load.metadata, meta[module], bestDepth != depth);
	        }
	      }

	      // apply exact meta
	      if (meta[name])
	        extendMeta(load.metadata, meta[name]);

	      return locate.call(this, load);
	    };
	  });

	  // detect any meta header syntax
	  // only set if not already set
	  var metaRegEx = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/;
	  var metaPartRegEx = /\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;

	  function setMetaProperty(target, p, value) {
	    var pParts = p.split('.');
	    var curPart;
	    while (pParts.length > 1) {
	      curPart = pParts.shift();
	      target = target[curPart] = target[curPart] || {};
	    }
	    curPart = pParts.shift();
	    if (!(curPart in target))
	      target[curPart] = value;
	  }

	  hook('translate', function(translate) {
	    return function(load) {
	      // NB meta will be post-translate pending transpiler conversion to plugins
	      var meta = load.source.match(metaRegEx);
	      if (meta) {
	        var metaParts = meta[0].match(metaPartRegEx);

	        for (var i = 0; i < metaParts.length; i++) {
	          var curPart = metaParts[i];
	          var len = curPart.length;

	          var firstChar = curPart.substr(0, 1);
	          if (curPart.substr(len - 1, 1) == ';')
	            len--;

	          if (firstChar != '"' && firstChar != "'")
	            continue;

	          var metaString = curPart.substr(1, curPart.length - 3);
	          var metaName = metaString.substr(0, metaString.indexOf(' '));

	          if (metaName) {
	            var metaValue = metaString.substr(metaName.length + 1, metaString.length - metaName.length - 1);

	            if (metaName.substr(metaName.length - 2, 2) == '[]') {
	              metaName = metaName.substr(0, metaName.length - 2);
	              load.metadata[metaName] = load.metadata[metaName] || [];
	              load.metadata[metaName].push(metaValue);
	            }
	            else if (load.metadata[metaName] instanceof Array) {
	              // temporary backwards compat for previous "deps" syntax
	              warn.call(this, 'Module ' + load.name + ' contains deprecated "deps ' + metaValue + '" meta syntax.\nThis should be updated to "deps[] ' + metaValue + '" for pushing to array meta.');
	              load.metadata[metaName].push(metaValue);
	            }
	            else {
	              setMetaProperty(load.metadata, metaName, metaValue);
	            }
	          }
	          else {
	            load.metadata[metaString] = true;
	          }
	        }
	      }

	      return translate.call(this, load);
	    };
	  });
	})();
	/*
	  System bundles

	  Allows a bundle module to be specified which will be dynamically 
	  loaded before trying to load a given module.

	  For example:
	  SystemJS.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']

	  Will result in a load to "mybundle" whenever a load to "jquery"
	  or "bootstrap/js/bootstrap" is made.

	  In this way, the bundle becomes the request that provides the module
	*/

	(function() {
	  // bundles support (just like RequireJS)
	  // bundle name is module name of bundle itself
	  // bundle is array of modules defined by the bundle
	  // when a module in the bundle is requested, the bundle is loaded instead
	  // of the form SystemJS.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']
	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);
	      this.bundles = {};
	      this._loader.loadedBundles = {};
	    };
	  });

	  // assign bundle metadata for bundle loads
	  hook('locate', function(locate) {
	    return function(load) {
	      var loader = this;
	      var matched = false;

	      if (!(load.name in loader.defined))
	        for (var b in loader.bundles) {
	          for (var i = 0; i < loader.bundles[b].length; i++) {
	            var curModule = loader.bundles[b][i];

	            if (curModule == load.name) {
	              matched = true;
	              break;
	            }

	            // wildcard in bundles does not include / boundaries
	            if (curModule.indexOf('*') != -1) {
	              var parts = curModule.split('*');
	              if (parts.length != 2) {
	                loader.bundles[b].splice(i--, 1);
	                continue;
	              }
	              
	              if (load.name.substring(0, parts[0].length) == parts[0] &&
	                  load.name.substr(load.name.length - parts[1].length, parts[1].length) == parts[1] &&
	                  load.name.substr(parts[0].length, load.name.length - parts[1].length - parts[0].length).indexOf('/') == -1) {
	                matched = true;
	                break;
	              }
	            }
	          }

	          if (matched)
	            return loader['import'](b)
	            .then(function() {
	              return locate.call(loader, load);
	            });
	        }

	      return locate.call(loader, load);
	    };
	  });
	})();
	/*
	 * Dependency Tree Cache
	 * 
	 * Allows a build to pre-populate a dependency trace tree on the loader of 
	 * the expected dependency tree, to be loaded upfront when requesting the
	 * module, avoinding the n round trips latency of module loading, where 
	 * n is the dependency tree depth.
	 *
	 * eg:
	 * SystemJS.depCache = {
	 *  'app': ['normalized', 'deps'],
	 *  'normalized': ['another'],
	 *  'deps': ['tree']
	 * };
	 * 
	 * SystemJS.import('app') 
	 * // simultaneously starts loading all of:
	 * // 'normalized', 'deps', 'another', 'tree'
	 * // before "app" source is even loaded
	 *
	 */

	(function() {
	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);
	      this.depCache = {};
	    }
	  });

	  hook('locate', function(locate) {
	    return function(load) {
	      var loader = this;
	      // load direct deps, in turn will pick up their trace trees
	      var deps = loader.depCache[load.name];
	      if (deps)
	        for (var i = 0; i < deps.length; i++)
	          loader['import'](deps[i], load.name);

	      return locate.call(loader, load);
	    };
	  });
	})();
	  
	System = new SystemJSLoader();

	__global.SystemJS = System;
	System.version = '0.19.27 Standard';
	  // -- exporting --

	  if (true)
	    module.exports = Loader;

	  __global.Reflect = __global.Reflect || {};
	  __global.Reflect.Loader = __global.Reflect.Loader || Loader;
	  __global.Reflect.global = __global.Reflect.global || __global;
	  __global.LoaderPolyfill = Loader;

	  if (!System) {
	    System = new SystemLoader();
	    System.constructor = SystemLoader;
	  }

	  if (true)
	    module.exports = System;

	  __global.System = System;

	})(typeof self != 'undefined' ? self : global);}

	// auto-load Promise polyfill if needed in the browser
	var doPolyfill = typeof Promise === 'undefined';

	// document.write
	if (typeof document !== 'undefined') {
	  var scripts = document.getElementsByTagName('script');
	  $__curScript = scripts[scripts.length - 1];
	  if (doPolyfill) {
	    var curPath = $__curScript.src;
	    var basePath = curPath.substr(0, curPath.lastIndexOf('/') + 1);
	    window.systemJSBootstrap = bootstrap;
	    document.write(
	      '<' + 'script type="text/javascript" src="' + basePath + 'system-polyfills.js">' + '<' + '/script>'
	    );
	  }
	  else {
	    bootstrap();
	  }
	}
	// importScripts
	else if (typeof importScripts !== 'undefined') {
	  var basePath = '';
	  try {
	    throw new Error('_');
	  } catch (e) {
	    e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/, function(m, url) {
	      $__curScript = { src: url };
	      basePath = url.replace(/\/[^\/]*$/, '/');
	    });
	  }
	  if (doPolyfill)
	    importScripts(basePath + 'system-polyfills.js');
	  bootstrap();
	}
	else {
	  $__curScript =  true ? { src: __filename } : null;
	  bootstrap();
	}


	})();
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1), "/index.js"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 2 */
/***/ function(module, exports) {

	

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./system": 4,
		"./system-csp-production": 5,
		"./system-csp-production.js": 5,
		"./system-csp-production.src": 7,
		"./system-csp-production.src.js": 7,
		"./system-polyfills": 8,
		"./system-polyfills.js": 8,
		"./system-polyfills.src": 10,
		"./system-polyfills.src.js": 10,
		"./system-register-only": 11,
		"./system-register-only.js": 11,
		"./system-register-only.src": 13,
		"./system-register-only.src.js": 13,
		"./system.js": 4
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 3;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process, __filename) {/*
	 * SystemJS v0.19.27
	 */
	!function(){function e(){!function(e){function t(e,r){if("string"!=typeof e)throw new TypeError("URL must be a string");var n=String(e).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);if(!n)throw new RangeError("Invalid URL format");var a=n[1]||"",o=n[2]||"",i=n[3]||"",s=n[4]||"",l=n[5]||"",u=n[6]||"",d=n[7]||"",c=n[8]||"",f=n[9]||"";if(void 0!==r){var m=r instanceof t?r:new t(r),p=!a&&!s&&!o;!p||d||c||(c=m.search),p&&"/"!==d[0]&&(d=d?(!m.host&&!m.username||m.pathname?"":"/")+m.pathname.slice(0,m.pathname.lastIndexOf("/")+1)+d:m.pathname);var h=[];d.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(e){"/.."===e?h.pop():h.push(e)}),d=h.join("").replace(/^\//,"/"===d[0]?"/":""),p&&(u=m.port,l=m.hostname,s=m.host,i=m.password,o=m.username),a||(a=m.protocol)}"file:"==a&&(d=d.replace(/\\/g,"/")),this.origin=s?a+(""!==a||""!==s?"//":"")+s:"",this.href=a+(a&&s||"file:"==a?"//":"")+(""!==o?o+(""!==i?":"+i:"")+"@":"")+s+d+c+f,this.protocol=a,this.username=o,this.password=i,this.host=s,this.hostname=l,this.port=u,this.pathname=d,this.search=c,this.hash=f}e.URLPolyfill=t}("undefined"!=typeof self?self:global),function(e){function t(e,t){if(!e.originalErr)for(var r=(e.stack||e.message||e).split("\n"),n=[],a=0;a<r.length;a++)("undefined"==typeof $__curScript||-1==r[a].indexOf($__curScript.src))&&n.push(r[a]);var o=(n?n.join("\n	"):e.message)+"\n	"+t;F||(o=o.replace(D?/file:\/\/\//g:/file:\/\//g,""));var i=C?new Error(o,e.fileName,e.lineNumber):new Error(o);return F?i.stack=null:i.stack=o,i.originalErr=e.originalErr||e,i}function r(e,r,n){try{new Function(e).call(n)}catch(a){throw t(a,"Evaluating "+r)}}function n(){}function a(t){this._loader={loaderObj:this,loads:[],modules:{},importPromises:{},moduleRecords:{}},q(this,"global",{get:function(){return e}})}function o(){a.call(this),this.paths={}}function i(e,t){var r,n="",a=0;for(var o in e){var i=o.split("*");if(i.length>2)throw new TypeError("Only one wildcard in a path is permitted");if(1==i.length){if(t==o)return e[o];if(t.substr(0,o.length-1)==o.substr(0,o.length-1)&&(t.length<o.length||t[o.length-1]==o[o.length-1])&&"/"==e[o][e[o].length-1])return e[o].substr(0,e[o].length-1)+(t.length>o.length?"/"+t.substr(o.length):"")}else{var s=i[0].length;s>=a&&t.substr(0,i[0].length)==i[0]&&t.substr(t.length-i[1].length)==i[1]&&(a=s,n=o,r=t.substr(i[0].length,t.length-i[1].length-i[0].length))}}var l=e[n];return"string"==typeof r&&(l=l.replace("*",r)),l}function s(){}function l(){o.call(this),V.call(this)}function u(){}function d(e,t){l.prototype[e]=t(l.prototype[e]||function(){})}function c(e){V=e(V||function(){})}function f(e){for(var t=[],r=[],n=0,a=e.length;a>n;n++){var o=J.call(t,e[n]);-1===o?(t.push(e[n]),r.push([n])):r[o].push(n)}return{names:t,indices:r}}function m(e){var t={};if("object"==typeof e||"function"==typeof e){var r=e&&e.hasOwnProperty;if(K)for(var n in e)h(t,e,n)||p(t,e,n,r);else for(var n in e)p(t,e,n,r)}return t["default"]=e,q(t,"__useDefault",{value:!0}),t}function p(e,t,r,n){(!n||t.hasOwnProperty(r))&&(e[r]=t[r])}function h(e,t,r){try{var n;return(n=Object.getOwnPropertyDescriptor(t,r))&&q(e,r,n),!0}catch(a){return!1}}function g(e,t,r){for(var n in t)r&&n in e||(e[n]=t[n]);return e}function v(e,t,r){for(var n in t){var a=t[n];n in e?a instanceof Array&&e[n]instanceof Array?e[n]=[].concat(r?a:e[n]).concat(r?e[n]:a):"object"==typeof a&&null!==a&&"object"==typeof e[n]?e[n]=g(g({},e[n]),a,r):r||(e[n]=a):e[n]=a}}function y(e){this.warnings&&"undefined"!=typeof console&&console.warn}function b(e,t){for(var r=e.split(".");r.length;)t=t[r.shift()];return t}function w(){if(te[this.baseURL])return te[this.baseURL];"/"!=this.baseURL[this.baseURL.length-1]&&(this.baseURL+="/");var e=new H(this.baseURL,U);return this.baseURL=e.href,te[this.baseURL]=e}function x(e,t){var r,n=0;for(var a in e)if(t.substr(0,a.length)==a&&(t.length==a.length||"/"==t[a.length])){var o=a.split("/").length;if(n>=o)continue;r=a,n=o}return r}function S(e){this.set("@system-env",this.newModule({browser:F,node:!!this._nodeRequire,production:e,"default":!0}))}function E(e){return("."!=e[0]||!!e[1]&&"/"!=e[1]&&"."!=e[1])&&"/"!=e[0]&&!e.match(ee)}function _(e,t){return t&&(t=t.replace(/#/g,"%05")),new H(e,t||re).href.replace(/%05/g,"#")}function j(e,t){return new H(t,w.call(e)).href}function k(e,t){if(!E(e))return _(e,t);var r=x(this.map,e);if(r&&(e=this.map[r]+e.substr(r.length),!E(e)))return _(e);if(this.has(e))return e;if("@node/"==e.substr(0,6)&&-1!=ne.indexOf(e.substr(6))){if(!this._nodeRequire)throw new TypeError("Error loading "+e+". Can only load node core modules in Node.");return this.set(e,this.newModule(m(this._nodeRequire(e.substr(6))))),e}var n=i(this.paths,e);return n&&!E(n)?_(n):j(this,n||e)}function R(e){var t=e.match(ie);return t&&"System.register"==e.substr(t[0].length,15)}function P(){return{name:null,deps:null,originalIndices:null,declare:null,execute:null,executingRequire:!1,declarative:!1,normalizedDeps:null,groupIndex:null,evaluated:!1,module:null,esModule:null,esmExports:!1}}function O(t){if("string"==typeof t)return b(t,e);if(!(t instanceof Array))throw new Error("Global exports must be a string or array.");for(var r={},n=!0,a=0;a<t.length;a++){var o=b(t[a],e);n&&(r["default"]=o,n=!1),r[t[a].split(".").pop()]=o}return r}function M(e){var t,r,n,n="~"==e[0],a=e.lastIndexOf("|");return-1!=a?(t=e.substr(a+1),r=e.substr(n,a-n)||"@system-env"):(t=null,r=e.substr(n)),{module:r,prop:t,negate:n}}function z(e){return(e.negate?"~":"")+e.module+(e.prop?"|"+e.prop:"")}function T(e,t,r){return this["import"](e.module,t).then(function(t){if(e.prop?t=b(e.prop,t):"object"==typeof t&&t+""=="Module"&&(t=t["default"]),r&&"boolean"!=typeof t)throw new TypeError("Condition "+z(e)+" did not resolve to a boolean.");return e.negate?!t:t})}function I(e,t){var r=e.match(le);if(!r)return Promise.resolve(e);var n=M(r[0].substr(2,r[0].length-3));return this.builder?this.normalize(n.module,t).then(function(t){return n.module=t,e.replace(le,"#{"+z(n)+"}")}):T.call(this,n,t,!1).then(function(r){if("string"!=typeof r)throw new TypeError("The condition value for "+e+" doesn't resolve to a string.");if(-1!=r.indexOf("/"))throw new TypeError("Unabled to interpolate conditional "+e+(t?" in "+t:"")+"\n	The condition value "+r+' cannot contain a "/" separator.');return e.replace(le,r)})}function L(e,t){var r=e.lastIndexOf("#?");if(-1==r)return Promise.resolve(e);var n=M(e.substr(r+2));return this.builder?this.normalize(n.module,t).then(function(t){return n.module=t,e.substr(0,r)+"#?"+z(n)}):T.call(this,n,t,!0).then(function(t){return t?e.substr(0,r):"@empty"})}var A="undefined"==typeof window&&"undefined"!=typeof self&&"undefined"!=typeof importScripts,F="undefined"!=typeof window&&"undefined"!=typeof document,D="undefined"!=typeof process&&"undefined"!=typeof process.platform&&!!process.platform.match(/^win/);e.console||(e.console={assert:function(){}});var q,J=Array.prototype.indexOf||function(e){for(var t=0,r=this.length;r>t;t++)if(this[t]===e)return t;return-1};!function(){try{Object.defineProperty({},"a",{})&&(q=Object.defineProperty)}catch(e){q=function(e,t,r){try{e[t]=r.value||r.get.call(e)}catch(n){}}}}();var U,C="_"==new Error(0,"_").fileName;if("undefined"!=typeof document&&document.getElementsByTagName){if(U=document.baseURI,!U){var N=document.getElementsByTagName("base");U=N[0]&&N[0].href||window.location.href}U=U.split("#")[0].split("?")[0],U=U.substr(0,U.lastIndexOf("/")+1)}else if("undefined"!=typeof process&&process.cwd)U="file://"+(D?"/":"")+process.cwd()+"/",D&&(U=U.replace(/\\/g,"/"));else{if("undefined"==typeof location)throw new TypeError("No environment baseURI");U=e.location.href}try{var $="test:"==new e.URL("test:///").protocol}catch(B){}var H=$?e.URL:e.URLPolyfill;q(n.prototype,"toString",{value:function(){return"Module"}}),function(){function o(e){return{status:"loading",name:e,linkSets:[],dependencies:[],metadata:{}}}function i(e,t,r){return new Promise(c({step:r.address?"fetch":"locate",loader:e,moduleName:t,moduleMetadata:r&&r.metadata||{},moduleSource:r.source,moduleAddress:r.address}))}function s(e,t,r,n){return new Promise(function(a,o){a(e.loaderObj.normalize(t,r,n))}).then(function(t){var r;if(e.modules[t])return r=o(t),r.status="linked",r.module=e.modules[t],r;for(var n=0,a=e.loads.length;a>n;n++)if(r=e.loads[n],r.name==t)return r;return r=o(t),e.loads.push(r),l(e,r),r})}function l(e,t){u(e,t,Promise.resolve().then(function(){return e.loaderObj.locate({name:t.name,metadata:t.metadata})}))}function u(e,t,r){d(e,t,r.then(function(r){return"loading"==t.status?(t.address=r,e.loaderObj.fetch({name:t.name,metadata:t.metadata,address:r})):void 0}))}function d(t,n,a){a.then(function(a){return"loading"==n.status?Promise.resolve(t.loaderObj.translate({name:n.name,metadata:n.metadata,address:n.address,source:a})).then(function(e){return n.source=e,t.loaderObj.instantiate({name:n.name,metadata:n.metadata,address:n.address,source:e})}).then(function(a){if(void 0===a)return n.address=n.address||"<Anonymous Module "+ ++_+">",n.isDeclarative=!0,E.call(t.loaderObj,n).then(function(t){var a=e.System,o=a.register;a.register=function(e,t,r){"string"!=typeof e&&(r=t,t=e),n.declare=r,n.depsList=t},r(t,n.address,{}),a.register=o});if("object"!=typeof a)throw TypeError("Invalid instantiate return value");n.depsList=a.deps||[],n.execute=a.execute,n.isDeclarative=!1}).then(function(){n.dependencies=[];for(var e=n.depsList,r=[],a=0,o=e.length;o>a;a++)(function(e,a){r.push(s(t,e,n.name,n.address).then(function(t){if(n.dependencies[a]={key:e,value:t.name},"linked"!=t.status)for(var r=n.linkSets.concat([]),o=0,i=r.length;i>o;o++)m(r[o],t)}))})(e[a],a);return Promise.all(r)}).then(function(){n.status="loaded";for(var e=n.linkSets.concat([]),t=0,r=e.length;r>t;t++)h(e[t],n)}):void 0})["catch"](function(e){n.status="failed",n.exception=e;for(var t=n.linkSets.concat([]),r=0,a=t.length;a>r;r++)g(t[r],n,e)})}function c(e){return function(t,r){var n=e.loader,a=e.moduleName,i=e.step;if(n.modules[a])throw new TypeError('"'+a+'" already exists in the module table');for(var s,c=0,m=n.loads.length;m>c;c++)if(n.loads[c].name==a&&(s=n.loads[c],"translate"!=i||s.source||(s.address=e.moduleAddress,d(n,s,Promise.resolve(e.moduleSource))),s.linkSets.length&&s.linkSets[0].loads[0].name==s.name))return s.linkSets[0].done.then(function(){t(s)});var p=s||o(a);p.metadata=e.moduleMetadata;var h=f(n,p);n.loads.push(p),t(h.done),"locate"==i?l(n,p):"fetch"==i?u(n,p,Promise.resolve(e.moduleAddress)):(p.address=e.moduleAddress,d(n,p,Promise.resolve(e.moduleSource)))}}function f(e,t){var r={loader:e,loads:[],startingLoad:t,loadingCount:0};return r.done=new Promise(function(e,t){r.resolve=e,r.reject=t}),m(r,t),r}function m(e,t){if("failed"!=t.status){for(var r=0,n=e.loads.length;n>r;r++)if(e.loads[r]==t)return;e.loads.push(t),t.linkSets.push(e),"loaded"!=t.status&&e.loadingCount++;for(var a=e.loader,r=0,n=t.dependencies.length;n>r;r++)if(t.dependencies[r]){var o=t.dependencies[r].value;if(!a.modules[o])for(var i=0,s=a.loads.length;s>i;i++)if(a.loads[i].name==o){m(e,a.loads[i]);break}}}}function p(e){var t=!1;try{w(e,function(r,n){g(e,r,n),t=!0})}catch(r){g(e,null,r),t=!0}return t}function h(e,t){if(e.loadingCount--,!(e.loadingCount>0)){var r=e.startingLoad;if(e.loader.loaderObj.execute===!1){for(var n=[].concat(e.loads),a=0,o=n.length;o>a;a++){var t=n[a];t.module=t.isDeclarative?{name:t.name,module:j({}),evaluated:!0}:{module:j({})},t.status="linked",v(e.loader,t)}return e.resolve(r)}var i=p(e);i||e.resolve(r)}}function g(e,r,n){var a=e.loader;e:if(r)if(e.loads[0].name==r.name)n=t(n,"Error loading "+r.name);else{for(var o=0;o<e.loads.length;o++)for(var i=e.loads[o],s=0;s<i.dependencies.length;s++){var l=i.dependencies[s];if(l.value==r.name){n=t(n,"Error loading "+r.name+' as "'+l.key+'" from '+i.name);break e}}n=t(n,"Error loading "+r.name+" from "+e.loads[0].name)}else n=t(n,"Error linking "+e.loads[0].name);for(var u=e.loads.concat([]),o=0,d=u.length;d>o;o++){var r=u[o];a.loaderObj.failed=a.loaderObj.failed||[],-1==J.call(a.loaderObj.failed,r)&&a.loaderObj.failed.push(r);var c=J.call(r.linkSets,e);if(r.linkSets.splice(c,1),0==r.linkSets.length){var f=J.call(e.loader.loads,r);-1!=f&&e.loader.loads.splice(f,1)}}e.reject(n)}function v(e,t){if(e.loaderObj.trace){e.loaderObj.loads||(e.loaderObj.loads={});var r={};t.dependencies.forEach(function(e){r[e.key]=e.value}),e.loaderObj.loads[t.name]={name:t.name,deps:t.dependencies.map(function(e){return e.key}),depMap:r,address:t.address,metadata:t.metadata,source:t.source,kind:t.isDeclarative?"declarative":"dynamic"}}t.name&&(e.modules[t.name]=t.module);var n=J.call(e.loads,t);-1!=n&&e.loads.splice(n,1);for(var a=0,o=t.linkSets.length;o>a;a++)n=J.call(t.linkSets[a].loads,t),-1!=n&&t.linkSets[a].loads.splice(n,1);t.linkSets.splice(0,t.linkSets.length)}function y(e,t,r){try{var a=t.execute()}catch(o){return void r(t,o)}return a&&a instanceof n?a:void r(t,new TypeError("Execution must define a Module instance"))}function b(e,t,r){var n=e._loader.importPromises;return n[t]=r.then(function(e){return n[t]=void 0,e},function(e){throw n[t]=void 0,e})}function w(e,t){var r=e.loader;if(e.loads.length)for(var n=e.loads.concat([]),a=0;a<n.length;a++){var o=n[a],i=y(e,o,t);if(!i)return;o.module={name:o.name,module:i},o.status="linked",v(r,o)}}function x(e,t){return t.module.module}function S(){}function E(){throw new TypeError("ES6 transpilation is only provided in the dev module loader build.")}var _=0;a.prototype={constructor:a,define:function(e,t,r){if(this._loader.importPromises[e])throw new TypeError("Module is already loading.");return b(this,e,new Promise(c({step:"translate",loader:this._loader,moduleName:e,moduleMetadata:r&&r.metadata||{},moduleSource:t,moduleAddress:r&&r.address})))},"delete":function(e){var t=this._loader;return delete t.importPromises[e],delete t.moduleRecords[e],t.modules[e]?delete t.modules[e]:!1},get:function(e){return this._loader.modules[e]?(S(this._loader.modules[e],[],this),this._loader.modules[e].module):void 0},has:function(e){return!!this._loader.modules[e]},"import":function(e,t,r){"object"==typeof t&&(t=t.name);var n=this;return Promise.resolve(n.normalize(e,t)).then(function(e){var t=n._loader;return t.modules[e]?(S(t.modules[e],[],t._loader),t.modules[e].module):t.importPromises[e]||b(n,e,i(t,e,{}).then(function(r){return delete t.importPromises[e],x(t,r)}))})},load:function(e){var t=this._loader;return t.modules[e]?Promise.resolve():t.importPromises[e]||b(this,e,new Promise(c({step:"locate",loader:t,moduleName:e,moduleMetadata:{},moduleSource:void 0,moduleAddress:void 0})).then(function(){delete t.importPromises[e]}))},module:function(e,t){var r=o();r.address=t&&t.address;var n=f(this._loader,r),a=Promise.resolve(e),i=this._loader,s=n.done.then(function(){return x(i,r)});return d(i,r,a),s},newModule:function(e){if("object"!=typeof e)throw new TypeError("Expected object");var t=new n,r=[];if(Object.getOwnPropertyNames&&null!=e)r=Object.getOwnPropertyNames(e);else for(var a in e)r.push(a);for(var o=0;o<r.length;o++)(function(r){q(t,r,{configurable:!1,enumerable:!0,get:function(){return e[r]},set:function(){throw new Error("Module exports cannot be changed externally.")}})})(r[o]);return Object.freeze&&Object.freeze(t),t},set:function(e,t){if(!(t instanceof n))throw new TypeError("Loader.set("+e+", module) must be a module");this._loader.modules[e]={module:t}},normalize:function(e,t,r){return e},locate:function(e){return e.name},fetch:function(e){},translate:function(e){return e.source},instantiate:function(e){}};var j=a.prototype.newModule}();var X;s.prototype=a.prototype,o.prototype=new s;var Z;if("undefined"!=typeof XMLHttpRequest)Z=function(e,t,r,n){function a(){r(i.responseText)}function o(){n(new Error("XHR error"+(i.status?" ("+i.status+(i.statusText?" "+i.statusText:"")+")":"")+" loading "+e))}var i=new XMLHttpRequest,s=!0,l=!1;if(!("withCredentials"in i)){var u=/^(\w+:)?\/\/([^\/]+)/.exec(e);u&&(s=u[2]===window.location.host,u[1]&&(s&=u[1]===window.location.protocol))}s||"undefined"==typeof XDomainRequest||(i=new XDomainRequest,i.onload=a,i.onerror=o,i.ontimeout=o,i.onprogress=function(){},i.timeout=0,l=!0),i.onreadystatechange=function(){4===i.readyState&&(0==i.status?i.responseText?a():(i.addEventListener("error",o),i.addEventListener("load",a)):200===i.status?a():o())},i.open("GET",e,!0),i.setRequestHeader&&(i.setRequestHeader("Accept","application/x-es-module, */*"),t&&("string"==typeof t&&i.setRequestHeader("Authorization",t),i.withCredentials=!0)),l?setTimeout(function(){i.send()},0):i.send(null)};else if("undefined"!="function"&&"undefined"!=typeof process){var G;Z=function(e,t,r,n){if("file:///"!=e.substr(0,8))throw new Error('Unable to fetch "'+e+'". Only file URLs of the form file:/// allowed running in Node.');return G=G||__webpack_require__(2),e=D?e.replace(/\//g,"\\").substr(8):e.substr(7),G.readFile(e,function(e,t){if(e)return n(e);var a=t+"";"\ufeff"===a[0]&&(a=a.substr(1)),r(a)})}}else{if("undefined"==typeof self||"undefined"==typeof self.fetch)throw new TypeError("No environment fetch API available.");Z=function(e,t,r,n){var a={headers:{Accept:"application/x-es-module, */*"}};t&&("string"==typeof t&&(a.headers.Authorization=t),a.credentials="include"),fetch(e,a).then(function(e){if(e.ok)return e.text();throw new Error("Fetch error: "+e.status+" "+e.statusText)}).then(r,n)}}o.prototype.fetch=function(e){return new Promise(function(t,r){Z(e.address,void 0,t,r)})};var W=function(){function t(t){var n=this;return Promise.resolve(e["typescript"==n.transpiler?"ts":n.transpiler]||(n.pluginLoader||n)["import"](n.transpiler)).then(function(e){e.__useDefault&&(e=e["default"]);var a;return a=e.Compiler?r:e.createLanguageService?i:o,"(function(__moduleName){"+a.call(n,t,e)+'\n})("'+t.name+'");\n//# sourceURL='+t.address+"!transpiled"})}function r(e,t){var r=this.traceurOptions||{};r.modules="instantiate",r.script=!1,void 0===r.sourceMaps&&(r.sourceMaps="inline"),r.filename=e.address,r.inputSourceMap=e.metadata.sourceMap,r.moduleName=!1;var a=new t.Compiler(r);return n(e.source,a,r.filename)}function n(e,t,r){try{return t.compile(e,r)}catch(n){if(n.length)throw n[0];throw n}}function o(e,t){var r=this.babelOptions||{};return r.modules="system",void 0===r.sourceMap&&(r.sourceMap="inline"),r.inputSourceMap=e.metadata.sourceMap,r.filename=e.address,r.code=!0,r.ast=!1,t.transform(e.source,r).code}function i(e,t){var r=this.typescriptOptions||{};return r.target=r.target||t.ScriptTarget.ES5,void 0===r.sourceMap&&(r.sourceMap=!0),r.sourceMap&&r.inlineSourceMap!==!1&&(r.inlineSourceMap=!0),r.module=t.ModuleKind.System,t.transpile(e.source,r,e.address)}return a.prototype.transpiler="traceur",t}();u.prototype=o.prototype,l.prototype=new u,l.prototype.constructor=l,l.prototype.instantiate=function(){};var V,K=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(B){K=!1}var Y,Q=["main","format","defaultExtension","meta","map","basePath","depCache"];!function(){function r(e){var t=e.source.lastIndexOf("\n"),r="global"!=e.metadata.format,n=e.metadata.sourceMap;if(n){if("object"!=typeof n)throw new TypeError("load.metadata.sourceMap must be set to an object.");n=JSON.stringify(n)}return(r?"(function(System, SystemJS) {":"")+e.source+(r?"\n})(System, System);":"")+("\n//# sourceURL="!=e.source.substr(t,15)?"\n//# sourceURL="+e.address+(n?"!transpiled":""):"")+(n&&s&&"\n//# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(n)))||"")}function n(t,r){i=r,0==c++&&(l=e.System),e.System=e.SystemJS=t}function a(){0==--c&&(e.System=e.SystemJS=l),i=void 0}function o(e){p||(p=document.head||document.body||document.documentElement);var o=document.createElement("script");o.text=r(e,!1);var i,s=window.onerror;if(window.onerror=function(r){i=t(r,"Evaluating "+e.address)},n(this,e),e.metadata.integrity&&o.setAttribute("integrity",e.metadata.integrity),e.metadata.nonce&&o.setAttribute("nonce",e.metadata.nonce),p.appendChild(o),p.removeChild(o),a(),window.onerror=s,i)throw i}var i,s="undefined"!=typeof btoa;d("pushRegister_",function(){return function(e){return i?(this.reduceRegister_(i,e),!0):!1}});var l,u,c=0;Y=function(e){if(e.source){if((e.metadata.integrity||e.metadata.nonce)&&f)return o.call(this,e);try{n(this,e),i=e,this._nodeRequire?(u=u||this._nodeRequire("vm"),u.runInThisContext(r(e))):(0,eval)(r(e)),a()}catch(s){throw a(),t(s,"Evaluating "+e.address)}}};var f=!1;if(F&&"undefined"!=typeof document&&document.getElementsByTagName){var m=document.getElementsByTagName("script");$__curScript=m[m.length-1],window.chrome&&window.chrome.extension||navigator.userAgent.match(/^Node\.js/)||(f=!0)}var p}();var ee=/^[^\/]+:\/\//,te={},re=new H(U);c(function(e){return function(){e.call(this),this.baseURL=U.substr(0,U.lastIndexOf("/")+1),this.map={},this.paths={},this.warnings=!1,this.defaultJSExtensions=!1,this.pluginFirst=!1,this.loaderErrorStack=!1,this.set("@empty",this.newModule({})),S.call(this,!1)}}),"undefined"=="function"||"undefined"==typeof process||process.browser||(l.prototype._nodeRequire=__webpack_require__(3));var ne=["assert","buffer","child_process","cluster","console","constants","crypto","dgram","dns","domain","events","fs","http","https","module","net","os","path","process","punycode","querystring","readline","repl","stream","string_decoder","sys","timers","tls","tty","url","util","vm","zlib"];d("normalize",function(e){return function(e,t,r){var n=k.call(this,e,t);return r||!this.defaultJSExtensions||".js"==n.substr(n.length-3,3)||E(n)||(n+=".js"),n}});var ae="undefined"!=typeof XMLHttpRequest;d("locate",function(e){return function(t){return Promise.resolve(e.call(this,t)).then(function(e){return ae?e.replace(/#/g,"%23"):e})}}),d("fetch",function(){return function(e){return new Promise(function(t,r){Z(e.address,e.metadata.authorization,t,r)})}}),d("import",function(e){return function(t,r,n){return r&&r.name&&y.call(this,"SystemJS.import(name, { name: parentName }) is deprecated for SystemJS.import(name, parentName), while importing "+t+" from "+r.name),e.call(this,t,r,n).then(function(e){return e.__useDefault?e["default"]:e})}}),d("translate",function(e){return function(t){return"detect"==t.metadata.format&&(t.metadata.format=void 0),e.call(this,t)}}),d("instantiate",function(e){return function(e){if("json"==e.metadata.format&&!this.builder){var t=e.metadata.entry=P();t.deps=[],t.execute=function(){try{return JSON.parse(e.source)}catch(t){throw new Error("Invalid JSON file "+e.name)}}}}}),l.prototype.env="development";var oe;l.prototype.config=function(e){function t(e){for(var t in e)if(hasOwnProperty.call(e,t))return!0}var r=this;if("loaderErrorStack"in e&&(oe=$__curScript,e.loaderErrorStack?$__curScript=void 0:$__curScript=oe),"warnings"in e&&(r.warnings=e.warnings),e.transpilerRuntime===!1&&(r._loader.loadedTranspilerRuntime=!0),e.baseURL){if(t(r.packages)||t(r.meta)||t(r.depCache)||t(r.bundles)||t(r.packageConfigPaths))throw new TypeError("Incorrect configuration order. The baseURL must be configured with the first SystemJS.config call.");r.baseURL=e.baseURL,w.call(r)}if(e.defaultJSExtensions&&(r.defaultJSExtensions=e.defaultJSExtensions,y.call(r,"The defaultJSExtensions configuration option is deprecated, use packages configuration instead.")),e.pluginFirst&&(r.pluginFirst=e.pluginFirst),e.production&&S.call(r,!0),e.paths)for(var n in e.paths)r.paths[n]=e.paths[n];if(e.map){var a="";for(var n in e.map){var o=e.map[n];if("string"!=typeof o){a+=(a.length?", ":"")+'"'+n+'"';var i=r.defaultJSExtensions&&".js"!=n.substr(n.length-3,3),s=r.decanonicalize(n);i&&".js"==s.substr(s.length-3,3)&&(s=s.substr(0,s.length-3));var l="";for(var u in r.packages)s.substr(0,u.length)==u&&(!s[u.length]||"/"==s[u.length])&&l.split("/").length<u.split("/").length&&(l=u);l&&r.packages[l].main&&(s=s.substr(0,s.length-r.packages[l].main.length-1));var u=r.packages[s]=r.packages[s]||{};u.map=o}else r.map[n]=o}a&&y.call(r,"The map configuration for "+a+' uses object submaps, which is deprecated in global map.\nUpdate this to use package contextual map with configs like SystemJS.config({ packages: { "'+n+'": { map: {...} } } }).')}if(e.packageConfigPaths){for(var d=[],c=0;c<e.packageConfigPaths.length;c++){var f=e.packageConfigPaths[c],m=Math.max(f.lastIndexOf("*")+1,f.lastIndexOf("/")),i=r.defaultJSExtensions&&".js"!=f.substr(m-3,3),p=r.decanonicalize(f.substr(0,m));i&&".js"==p.substr(p.length-3,3)&&(p=p.substr(0,p.length-3)),d[c]=p+f.substr(m)}r.packageConfigPaths=d}if(e.bundles)for(var n in e.bundles){for(var h=[],c=0;c<e.bundles[n].length;c++){var i=r.defaultJSExtensions&&".js"!=e.bundles[n][c].substr(e.bundles[n][c].length-3,3),g=r.decanonicalize(e.bundles[n][c]);i&&".js"==g.substr(g.length-3,3)&&(g=g.substr(0,g.length-3)),h.push(g)}r.bundles[n]=h}if(e.packages)for(var n in e.packages){if(n.match(/^([^\/]+:)?\/\/$/))throw new TypeError('"'+n+'" is not a valid package name.');var s=k.call(r,n);"/"==s[s.length-1]&&(s=s.substr(0,s.length-1)),r.packages[s]=r.packages[s]||{};var u=e.packages[n];u.modules&&(y.call(r,"Package "+n+' is configured with "modules", which is deprecated as it has been renamed to "meta".'),u.meta=u.modules,delete u.modules),"object"==typeof u.main&&(u.map=u.map||{},u.map["./@main"]=u.main,u.main["default"]=u.main["default"]||"./",u.main="@main");for(var b in u)-1==J.call(Q,b)&&y.call(r,'"'+b+'" is not a valid package configuration option in package '+n);v(r.packages[s],u)}for(var x in e){var o=e[x];if("baseURL"!=x&&"map"!=x&&"packages"!=x&&"bundles"!=x&&"paths"!=x&&"warnings"!=x&&"packageConfigPaths"!=x&&"loaderErrorStack"!=x)if("object"!=typeof o||o instanceof Array)r[x]=o;else{r[x]=r[x]||{};for(var n in o)if("meta"==x&&"*"==n[0])r[x][n]=o[n];else if("meta"==x){var _=k.call(r,n);r.defaultJSExtensions&&".js"!=_.substr(_.length-3,3)&&!E(_)&&(_+=".js"),r[x][_]=o[n]}else if("depCache"==x){var i=r.defaultJSExtensions&&".js"!=n.substr(n.length-3,3),s=r.decanonicalize(n);i&&".js"==s.substr(s.length-3,3)&&(s=s.substr(0,s.length-3)),r[x][s]=o[n]}else r[x][n]=o[n]}}},function(){function e(e,t){var r,n,a=0;for(var o in e.packages)t.substr(0,o.length)!==o||t.length!==o.length&&"/"!==t[o.length]||(n=o.split("/").length,n>a&&(r=o,a=n));return r}function t(e,t,r,n,a){if(!n||"/"==n[n.length-1]||a||t.defaultExtension===!1)return n;if(n.match(le))return n;var o=!1;if(t.meta&&p(t.meta,n,function(e,t,r){return 0==r||e.lastIndexOf("*")!=e.length-1?o=!0:void 0}),!o&&e.meta&&p(e.meta,r+"/"+n,function(e,t,r){return 0==r||e.lastIndexOf("*")!=e.length-1?o=!0:void 0}),o)return n;var i="."+(t.defaultExtension||"js");return n.substr(n.length-i.length)!=i?n+i:n}function r(e,r,n,o,i){if(!o){if(!r.main)return n+(e.defaultJSExtensions?".js":"");o="./"==r.main.substr(0,2)?r.main.substr(2):r.main}if(r.map){var s="./"+o,l=x(r.map,s);if(l||(s="./"+t(e,r,n,o,i),s!="./"+o&&(l=x(r.map,s))),l)return a(e,r,n,l,s,i)}return n+"/"+t(e,r,n,o,i)}function n(e,t,r){if("."==e)throw new Error("Package "+r+' has a map entry for "." which is not permitted.');if(t.substr(0,e.length)==e&&"/"!=e[e.length-1]&&"/"==t[e.length])throw new Error("Package "+r+' has a recursive map for "'+e+'" which is not permitted.')}function a(e,r,a,o,i,s){var l=r.map[o];if("object"==typeof l)throw new Error("Synchronous conditional normalization not supported sync normalizing "+o+" in "+a);if(n(o,l,a),"string"!=typeof l&&(l=o=i),n(o,l,a),"."==l)l=a;else if("./"==l.substr(0,2))return a+"/"+t(e,r,a,l.substr(2)+i.substr(o.length),s);return e.normalizeSync(l+i.substr(o.length),a+"/")}function o(e,r,n,a,o){if(!a){if(!r.main)return Promise.resolve(n+(e.defaultJSExtensions?".js":""));a="./"==r.main.substr(0,2)?r.main.substr(2):r.main}var i,l;return r.map&&(i="./"+a,l=x(r.map,i),l||(i="./"+t(e,r,n,a,o),i!="./"+a&&(l=x(r.map,i)))),(l?s(e,r,n,l,i,o):Promise.resolve()).then(function(i){return i?Promise.resolve(i):Promise.resolve(n+"/"+t(e,r,n,a,o))})}function i(e,r,n,a,o,i,s){if("."==o)o=n;else if("./"==o.substr(0,2))return Promise.resolve(n+"/"+t(e,r,n,o.substr(2)+i.substr(a.length),s)).then(function(t){return I.call(e,t,n+"/")});return e.normalize(o+i.substr(a.length),n+"/")}function s(e,t,r,a,o,s){var l=t.map[a];return"string"==typeof l?(n(a,l,r),i(e,t,r,a,l,o,s)):e.builder?Promise.resolve(r+"/#:"+o):e["import"](t.map["@env"]||"@system-env",r).then(function(e){for(var t in l){var r="~"==t[0],n=b(r?t.substr(1):t,e);if(!r&&n||r&&!n)return l[t]}}).then(function(l){if(l){if("string"!=typeof l)throw new Error("Unable to map a package conditional to a package conditional.");return n(a,l,r),i(e,t,r,a,l,o,s)}})}function u(e){var t=e.lastIndexOf("*"),r=Math.max(t+1,e.lastIndexOf("/"));return{length:r,regEx:new RegExp("^("+e.substr(0,r).replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^\\/]+")+")(\\/|$)"),wildcard:-1!=t}}function f(e,t){for(var r,n,a=!1,o=0;o<e.packageConfigPaths.length;o++){var i=e.packageConfigPaths[o],s=h[i]||(h[i]=u(i));if(!(t.length<s.length)){var l=t.match(s.regEx);!l||r&&(a&&s.wildcard||!(r.length<l[1].length))||(r=l[1],a=!s.wildcard,n=r+i.substr(s.length))}}return r?{packageName:r,configPath:n}:void 0}function m(e,t,r){var n=e.pluginLoader||e;return(n.meta[r]=n.meta[r]||{}).format="json",n.meta[r].loader=null,n.load(r).then(function(){var a=n.get(r)["default"];a.systemjs&&(a=a.systemjs),a.modules&&(a.meta=a.modules,y.call(e,"Package config file "+r+' is configured with "modules", which is deprecated as it has been renamed to "meta".'));for(var o in a)-1==J.call(Q,o)&&delete a[o];var i=e.packages[t]=e.packages[t]||{};if(v(i,a,!0),a.depCache){for(var s in a.depCache){var l;l="./"==s.substr(0,2)?t+"/"+s.substr(2):k.call(e,s),e.depCache[l]=(e.depCache[l]||[]).concat(a.depCache[s])}delete a.depCache}return"object"==typeof i.main&&(i.map=i.map||{},i.map["./@main"]=i.main,i.main["default"]=i.main["default"]||"./",i.main="@main"),i})}function p(e,t,r){var n;for(var a in e){var o="./"==a.substr(0,2)?"./":"";if(o&&(a=a.substr(2)),n=a.indexOf("*"),-1!==n&&a.substr(0,n)==t.substr(0,n)&&a.substr(n+1)==t.substr(t.length-a.length+n+1)&&r(a,e[o+a],a.split("/").length))return}var i=e[t]&&e.hasOwnProperty&&e.hasOwnProperty(t)?e[t]:e["./"+t];i&&r(i,i,0)}c(function(e){return function(){e.call(this),this.packages={},this.packageConfigPaths=[]}}),l.prototype.normalizeSync=l.prototype.decanonicalize=l.prototype.normalize,d("decanonicalize",function(t){return function(r,n){if(this.builder)return t.call(this,r,n,!0);var a=t.call(this,r,n);if(!this.defaultJSExtensions)return a;var o=e(this,a),i=this.packages[o],s=i&&i.defaultExtension;return void 0==s&&i&&i.meta&&p(i.meta,a.substr(o),function(e,t,r){return 0==r||e.lastIndexOf("*")!=e.length-1?(s=!1,!0):void 0}),(s===!1||s&&".js"!=s)&&".js"!=r.substr(r.length-3,3)&&".js"==a.substr(a.length-3,3)&&(a=a.substr(0,a.length-3)),a}}),d("normalizeSync",function(t){return function(n,o,i){y.call(this,"SystemJS.normalizeSync has been deprecated for SystemJS.decanonicalize.");var s=this;if(i=i===!0,o)var l=e(s,o)||s.defaultJSExtensions&&".js"==o.substr(o.length-3,3)&&e(s,o.substr(0,o.length-3));var u=l&&s.packages[l];if(u&&"."!=n[0]){var d=u.map,c=d&&x(d,n);if(c&&"string"==typeof d[c])return a(s,u,l,c,n,i)}var m=s.defaultJSExtensions&&".js"!=n.substr(n.length-3,3),p=t.call(s,n,o);m&&".js"!=p.substr(p.length-3,3)&&(m=!1),m&&(p=p.substr(0,p.length-3));var h=f(s,p),g=h&&h.packageName||e(s,p);if(!g)return p+(m?".js":"");var v=p.substr(g.length+1);return r(s,s.packages[g]||{},g,v,i)}}),d("normalize",function(t){return function(r,n,a){var i=this;return a=a===!0,Promise.resolve().then(function(){if(n)var t=e(i,n)||i.defaultJSExtensions&&".js"==n.substr(n.length-3,3)&&e(i,n.substr(0,n.length-3));var o=t&&i.packages[t];if(o&&"./"!=r.substr(0,2)){var l=o.map,u=l&&x(l,r);if(u)return s(i,o,t,u,r,a)}return Promise.resolve()}).then(function(s){if(s)return s;var l=i.defaultJSExtensions&&".js"!=r.substr(r.length-3,3),u=t.call(i,r,n);
	l&&".js"!=u.substr(u.length-3,3)&&(l=!1),l&&(u=u.substr(0,u.length-3));var d=f(i,u),c=d&&d.packageName||e(i,u);if(!c)return Promise.resolve(u+(l?".js":""));var p=i.packages[c],h=p&&(p.configured||!d);return(h?Promise.resolve(p):m(i,c,d.configPath)).then(function(e){var t=u.substr(c.length+1);return o(i,e,c,t,a)})})}});var h={};d("locate",function(t){return function(r){var n=this;return Promise.resolve(t.call(this,r)).then(function(t){var a=e(n,r.name);if(a){var o=n.packages[a],i=r.name.substr(a.length+1);o.format&&(r.metadata.format=r.metadata.format||o.format);var s={};if(o.meta){var l=0;p(o.meta,i,function(e,t,r){r>l&&(l=r),v(s,t,r&&l>r)}),v(r.metadata,s)}}return t})}})}(),function(){function t(){if(i&&"interactive"===i.script.readyState)return i.load;for(var e=0;e<u.length;e++)if("interactive"==u[e].script.readyState)return i=u[e],i.load}function r(e,t){return new Promise(function(e,r){t.metadata.integrity&&r(new Error("Subresource integrity checking is not supported in web workers.")),s=t;try{importScripts(t.address)}catch(n){s=null,r(n)}s=null,t.metadata.entry||r(new Error(t.address+" did not call System.register or AMD define")),e("")})}if("undefined"!=typeof document)var n=document.getElementsByTagName("head")[0];var a,o,i,s=null,l=n&&function(){var e=document.createElement("script"),t="undefined"!=typeof opera&&"[object Opera]"===opera.toString();return e.attachEvent&&!(e.attachEvent.toString&&e.attachEvent.toString().indexOf("[native code")<0)&&!t}(),u=[],c=0,f=[];d("pushRegister_",function(e){return function(r){return e.call(this,r)?!1:(s?this.reduceRegister_(s,r):l?this.reduceRegister_(t(),r):c?f.push(r):this.reduceRegister_(null,r),!0)}}),d("fetch",function(t){return function(s){var d=this;return"json"!=s.metadata.format&&s.metadata.scriptLoad&&(F||A)?A?r(d,s):new Promise(function(t,r){function m(e){if(!g.readyState||"loaded"==g.readyState||"complete"==g.readyState){if(c--,s.metadata.entry||f.length){if(!l){for(var n=0;n<f.length;n++)d.reduceRegister_(s,f[n]);f=[]}}else d.reduceRegister_(s);h(),s.metadata.entry||s.metadata.bundle||r(new Error(s.name+" did not call System.register or AMD define. If loading a global module configure the global name via the meta exports property for script injection support.")),t("")}}function p(e){h(),r(new Error("Unable to load script "+s.address))}function h(){if(e.System=a,e.require=o,g.detachEvent){g.detachEvent("onreadystatechange",m);for(var t=0;t<u.length;t++)u[t].script==g&&(i&&i.script==g&&(i=null),u.splice(t,1))}else g.removeEventListener("load",m,!1),g.removeEventListener("error",p,!1);n.removeChild(g)}var g=document.createElement("script");g.async=!0,s.metadata.crossOrigin&&(g.crossOrigin=s.metadata.crossOrigin),s.metadata.integrity&&g.setAttribute("integrity",s.metadata.integrity),l?(g.attachEvent("onreadystatechange",m),u.push({script:g,load:s})):(g.addEventListener("load",m,!1),g.addEventListener("error",p,!1)),c++,a=e.System,o=e.require,g.src=s.address,n.appendChild(g)}):t.call(this,s)}})}();var ie=/^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/;!function(){function t(e,r,n){if(n[e.groupIndex]=n[e.groupIndex]||[],-1==J.call(n[e.groupIndex],e)){n[e.groupIndex].push(e);for(var a=0,o=e.normalizedDeps.length;o>a;a++){var i=e.normalizedDeps[a],s=r.defined[i];if(s&&!s.evaluated){var l=e.groupIndex+(s.declarative!=e.declarative);if(null===s.groupIndex||s.groupIndex<l){if(null!==s.groupIndex&&(n[s.groupIndex].splice(J.call(n[s.groupIndex],s),1),0==n[s.groupIndex].length))throw new Error("Mixed dependency cycle detected");s.groupIndex=l}t(s,r,n)}}}}function r(e,r){var n=r.defined[e];if(!n.module){n.groupIndex=0;var a=[];t(n,r,a);for(var o=!!n.declarative==a.length%2,s=a.length-1;s>=0;s--){for(var l=a[s],d=0;d<l.length;d++){var c=l[d];o?i(c,r):u(c,r)}o=!o}}}function a(){}function o(e,t){return t[e]||(t[e]={name:e,dependencies:[],exports:new a,importers:[]})}function i(t,r){if(!t.module){var n=r._loader.moduleRecords,a=t.module=o(t.name,n),s=t.module.exports,l=t.declare.call(e,function(e,t){if(a.locked=!0,"object"==typeof e)for(var r in e)s[r]=e[r];else s[e]=t;for(var n=0,o=a.importers.length;o>n;n++){var i=a.importers[n];if(!i.locked){var l=J.call(i.dependencies,a);i.setters[l](s)}}return a.locked=!1,t},{id:t.name});if(a.setters=l.setters,a.execute=l.execute,!a.setters||!a.execute)throw new TypeError("Invalid System.register form for "+t.name);for(var u=0,d=t.normalizedDeps.length;d>u;u++){var c,f=t.normalizedDeps[u],m=r.defined[f],p=n[f];p?c=p.exports:m&&!m.declarative?c=m.esModule:m?(i(m,r),p=m.module,c=p.exports):c=r.get(f),p&&p.importers?(p.importers.push(a),a.dependencies.push(p)):a.dependencies.push(null);for(var h=t.originalIndices[u],g=0,v=h.length;v>g;++g){var y=h[g];a.setters[y]&&a.setters[y](c)}}}}function s(e,t){var r,n=t.defined[e];if(n)n.declarative?p(e,[],t):n.evaluated||u(n,t),r=n.module.exports;else if(r=t.get(e),!r)throw new Error("Unable to load dependency "+e+".");return(!n||n.declarative)&&r&&r.__useDefault?r["default"]:r}function u(t,r){if(!t.module){var a={},o=t.module={exports:a,id:t.name};if(!t.executingRequire)for(var i=0,l=t.normalizedDeps.length;l>i;i++){var d=t.normalizedDeps[i],c=r.defined[d];c&&u(c,r)}t.evaluated=!0;var f=t.execute.call(e,function(e){for(var n=0,a=t.deps.length;a>n;n++)if(t.deps[n]==e)return s(t.normalizedDeps[n],r);var o=r.normalizeSync(e,t.name);if(-1!=J.call(t.normalizedDeps,o))return s(o,r);throw new Error("Module "+e+" not declared as a dependency of "+t.name)},a,o);f&&(o.exports=f),a=o.exports,a&&(a.__esModule||a instanceof n)?t.esModule=a:t.esmExports&&a!==e?t.esModule=m(a):t.esModule={"default":a}}}function p(t,r,n){var a=n.defined[t];if(a&&!a.evaluated&&a.declarative){r.push(t);for(var o=0,i=a.normalizedDeps.length;i>o;o++){var s=a.normalizedDeps[o];-1==J.call(r,s)&&(n.defined[s]?p(s,r,n):n.get(s))}a.evaluated||(a.evaluated=!0,a.module.execute.call(e))}}l.prototype.register=function(e,t,r){if("string"!=typeof e&&(r=t,t=e,e=null),"boolean"==typeof r)return this.registerDynamic.apply(this,arguments);var n=P();n.name=e&&(this.decanonicalize||this.normalize).call(this,e),n.declarative=!0,n.deps=t,n.declare=r,this.pushRegister_({amd:!1,entry:n})},l.prototype.registerDynamic=function(e,t,r,n){"string"!=typeof e&&(n=r,r=t,t=e,e=null);var a=P();a.name=e&&(this.decanonicalize||this.normalize).call(this,e),a.deps=t,a.execute=n,a.executingRequire=r,this.pushRegister_({amd:!1,entry:a})},d("reduceRegister_",function(){return function(e,t){if(t){var r=t.entry,n=e&&e.metadata;if(r.name&&(r.name in this.defined||(this.defined[r.name]=r),n&&(n.bundle=!0)),!r.name||e&&r.name==e.name){if(!n)throw new TypeError("Invalid System.register call. Anonymous System.register calls can only be made by modules loaded by SystemJS.import and not via script tags.");if(n.entry)throw"register"==n.format?new Error("Multiple anonymous System.register calls in module "+e.name+". If loading a bundle, ensure all the System.register calls are named."):new Error("Module "+e.name+" interpreted as "+n.format+" module format, but called System.register.");n.format||(n.format="register"),n.entry=r}}}}),c(function(e){return function(){e.call(this),this.defined={},this._loader.moduleRecords={}}}),q(a,"toString",{value:function(){return"Module"}}),d("delete",function(e){return function(t){return delete this._loader.moduleRecords[t],delete this.defined[t],e.call(this,t)}}),d("fetch",function(e){return function(t){return this.defined[t.name]?(t.metadata.format="defined",""):(t.metadata.deps=t.metadata.deps||[],e.call(this,t))}}),d("translate",function(e){return function(t){return t.metadata.deps=t.metadata.deps||[],Promise.resolve(e.call(this,t)).then(function(e){return("register"==t.metadata.format||!t.metadata.format&&R(t.source))&&(t.metadata.format="register"),e})}}),d("instantiate",function(e){return function(t){"detect"==t.metadata.format&&(t.metadata.format=void 0),e.call(this,t);var n,a=this;if(a.defined[t.name])n=a.defined[t.name],n.declarative||(n.deps=n.deps.concat(t.metadata.deps));else if(t.metadata.entry)n=t.metadata.entry,n.deps=n.deps.concat(t.metadata.deps);else if(!(a.builder&&t.metadata.bundle||"register"!=t.metadata.format&&"esm"!=t.metadata.format&&"es6"!=t.metadata.format)){if("undefined"!=typeof Y&&Y.call(a,t),!t.metadata.entry&&!t.metadata.bundle)throw new Error(t.name+" detected as "+t.metadata.format+" but didn't execute.");n=t.metadata.entry,n&&t.metadata.deps&&(n.deps=n.deps.concat(t.metadata.deps))}n||(n=P(),n.deps=t.metadata.deps,n.execute=function(){}),a.defined[t.name]=n;var o=f(n.deps);n.deps=o.names,n.originalIndices=o.indices,n.name=t.name,n.esmExports=t.metadata.esmExports!==!1;for(var i=[],s=0,l=n.deps.length;l>s;s++)i.push(Promise.resolve(a.normalize(n.deps[s],t.name)));return Promise.all(i).then(function(e){return n.normalizedDeps=e,{deps:n.deps,execute:function(){return r(t.name,a),p(t.name,[],a),a.defined[t.name]=void 0,a.newModule(n.declarative?n.module.exports:n.esModule)}}})}})}(),function(){var t=/(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s*(\{|default|function|class|var|const|let|async\s+function))/,r=/\$traceurRuntime\s*\./,n=/babelHelpers\s*\./;d("translate",function(a){return function(o){var i=this;return a.call(i,o).then(function(a){if("esm"==o.metadata.format||"es6"==o.metadata.format||!o.metadata.format&&a.match(t)){if("es6"==o.metadata.format&&y.call(i,"Module "+o.name+' has metadata setting its format to "es6", which is deprecated.\nThis should be updated to "esm".'),o.metadata.format="esm",i.transpiler===!1){if(i.builder)return a;throw new TypeError("Unable to dynamically transpile ES module as SystemJS.transpiler set to false.")}return i._loader.loadedTranspiler=i._loader.loadedTranspiler||!1,i.pluginLoader&&(i.pluginLoader._loader.loadedTranspiler=i._loader.loadedTranspiler||!1),(i._loader.transpilerPromise||(i._loader.transpilerPromise=Promise.resolve(e["typescript"==i.transpiler?"ts":i.transpiler]||(i.pluginLoader||i)["import"](i.transpiler)))).then(function(e){return i._loader.loadedTranspilerRuntime=!0,e.translate?e==o.metadata.loaderModule?o.source:("string"==typeof o.metadata.sourceMap&&(o.metadata.sourceMap=JSON.parse(o.metadata.sourceMap)),Promise.resolve(e.translate.call(i,o)).then(function(e){var t=o.metadata.sourceMap;if(t&&"object"==typeof t){var r=o.name.split("!")[0];t.file=r+"!transpiled",(!t.sources||t.sources.length<=1)&&(t.sources=[r])}return"esm"==o.metadata.format&&!i.builder&&R(e)&&(o.metadata.format="register"),e})):(i.builder&&(o.metadata.originalSource=o.source),W.call(i,o).then(function(e){return o.metadata.sourceMap=void 0,e}))})}if(i.transpiler===!1)return a;if(i._loader.loadedTranspiler!==!1||"traceur"!=i.transpiler&&"typescript"!=i.transpiler&&"babel"!=i.transpiler||o.name!=i.normalizeSync(i.transpiler)||(a.length>100&&!o.metadata.format&&(o.metadata.format="global","traceur"===i.transpiler&&(o.metadata.exports="traceur"),"typescript"===i.transpiler&&(o.metadata.exports="ts")),i._loader.loadedTranspiler=!0),i._loader.loadedTranspilerRuntime===!1&&(o.name==i.normalizeSync("traceur-runtime")||o.name==i.normalizeSync("babel/external-helpers*"))&&(a.length>100&&(o.metadata.format=o.metadata.format||"global"),i._loader.loadedTranspilerRuntime=!0),("register"==o.metadata.format||o.metadata.bundle)&&i._loader.loadedTranspilerRuntime!==!0){if(!e.$traceurRuntime&&o.source.match(r))return i._loader.loadedTranspilerRuntime=i._loader.loadedTranspilerRuntime||!1,i["import"]("traceur-runtime").then(function(){return a});if(!e.babelHelpers&&o.source.match(n))return i._loader.loadedTranspilerRuntime=i._loader.loadedTranspilerRuntime||!1,i["import"]("babel/external-helpers").then(function(){return a})}return a})}})}();var se="undefined"!=typeof self?"self":"global";d("fetch",function(e){return function(t){return t.metadata.exports&&!t.metadata.format&&(t.metadata.format="global"),e.call(this,t)}}),d("instantiate",function(e){return function(t){var r=this;if(t.metadata.format||(t.metadata.format="global"),"global"==t.metadata.format&&!t.metadata.registered){var n=P();t.metadata.entry=n,n.deps=[];for(var a in t.metadata.globals){var o=t.metadata.globals[a];o&&n.deps.push(o)}n.execute=function(e,n,a){var o;if(t.metadata.globals){o={};for(var i in t.metadata.globals)t.metadata.globals[i]&&(o[i]=e(t.metadata.globals[i]))}var s=t.metadata.exports;s&&(t.source+="\n"+se+'["'+s+'"] = '+s+";");var l=r.get("@@global-helpers").prepareGlobal(a.id,s,o);return Y.call(r,t),l()}}return e.call(this,t)}}),d("reduceRegister_",function(e){return function(t,r){if(r||!t.metadata.exports)return e.call(this,t,r);t.metadata.format="global";var n=t.metadata.entry=P();n.deps=t.metadata.deps;var a=O(t.metadata.exports);n.execute=function(){return a}}}),c(function(t){return function(){function r(t){if(Object.keys)Object.keys(e).forEach(t);else for(var r in e)i.call(e,r)&&t(r)}function n(t){r(function(r){if(-1==J.call(s,r)){try{var n=e[r]}catch(a){s.push(r)}t(r,n)}})}var a=this;t.call(a);var o,i=Object.prototype.hasOwnProperty,s=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];a.set("@@global-helpers",a.newModule({prepareGlobal:function(t,r,a){var i=e.define;e.define=void 0;var s;if(a){s={};for(var l in a)s[l]=e[l],e[l]=a[l]}return r||(o={},n(function(e,t){o[e]=t})),function(){var t;if(r)t=O(r);else{t={};var a,l;n(function(e,r){o[e]!==r&&"undefined"!=typeof r&&(t[e]=r,"undefined"!=typeof a?l||a===r||(l=!0):a=r)}),t=l?t:a}if(s)for(var u in s)e[u]=s[u];return e.define=i,t}}}))}}),function(){function t(e){function t(e,t){for(var r=0;r<e.length;r++)if(e[r][0]<t.index&&e[r][1]>t.index)return!0;return!1}n.lastIndex=a.lastIndex=o.lastIndex=0;var r,i=[],s=[],l=[];if(e.length/e.split("\n").length<200){for(;r=o.exec(e);)s.push([r.index,r.index+r[0].length]);for(;r=a.exec(e);)t(s,r)||l.push([r.index,r.index+r[0].length])}for(;r=n.exec(e);)if(!t(s,r)&&!t(l,r)){var u=r[1].substr(1,r[1].length-2);if(u.match(/"|'/))continue;"/"==u[u.length-1]&&(u=u.substr(0,u.length-1)),i.push(u)}return i}var r=/(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])(exports\s*(\[['"]|\.)|module(\.exports|\['exports'\]|\["exports"\])\s*(\[['"]|[=,\.]))/,n=/(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF."'])require\s*\(\s*("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')\s*\)/g,a=/(^|[^\\])(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,o=/("[^"\\\n\r]*(\\.[^"\\\n\r]*)*"|'[^'\\\n\r]*(\\.[^'\\\n\r]*)*')/g,i=/^\#\!.*/;d("instantiate",function(a){return function(o){var s=this;if(o.metadata.format||(r.lastIndex=0,n.lastIndex=0,(n.exec(o.source)||r.exec(o.source))&&(o.metadata.format="cjs")),"cjs"==o.metadata.format){var l=o.metadata.deps,u=o.metadata.cjsRequireDetection===!1?[]:t(o.source);for(var d in o.metadata.globals)o.metadata.globals[d]&&u.push(o.metadata.globals[d]);var c=P();o.metadata.entry=c,c.deps=u,c.executingRequire=!0,c.execute=function(t,r,n){function a(e){return"/"==e[e.length-1]&&(e=e.substr(0,e.length-1)),t.apply(this,arguments)}if(a.resolve=function(e){return s.get("@@cjs-helpers").requireResolve(e,n.id)},!o.metadata.cjsDeferDepsExecute)for(var u=0;u<l.length;u++)a(l[u]);var d=s.get("@@cjs-helpers").getPathVars(n.id),c={exports:r,args:[a,r,n,d.filename,d.dirname,e,e]},f="(function(require, exports, module, __filename, __dirname, global, GLOBAL";if(o.metadata.globals)for(var m in o.metadata.globals)c.args.push(a(o.metadata.globals[m])),f+=", "+m;var p=e.define;e.define=void 0,e.__cjsWrapper=c,o.source=f+") {"+o.source.replace(i,"")+"\n}).apply(__cjsWrapper.exports, __cjsWrapper.args);",Y.call(s,o),e.__cjsWrapper=void 0,e.define=p}}return a.call(s,o)}})}(),c(function(e){return function(){function t(e){return"file:///"==e.substr(0,8)?e.substr(7+!!D):n&&e.substr(0,n.length)==n?e.substr(n.length):e}var r=this;if(e.call(r),"undefined"!=typeof window&&"undefined"!=typeof document&&window.location)var n=location.protocol+"//"+location.hostname+(location.port?":"+location.port:"");r.set("@@cjs-helpers",r.newModule({requireResolve:function(e,n){return t(r.normalizeSync(e,n))},getPathVars:function(e){var r,n=e.lastIndexOf("!");r=-1!=n?e.substr(0,n):e;var a=r.split("/");return a.pop(),a=a.join("/"),{filename:t(r),dirname:t(a)}}}))}}),d("fetch",function(t){return function(r){return r.metadata.scriptLoad&&F&&(e.define=this.amdDefine),t.call(this,r)}}),c(function(t){return function(){function r(e,t){e=e.replace(i,"");var r=e.match(u),n=(r[1].split(",")[t]||"require").replace(c,""),a=f[n]||(f[n]=new RegExp(s+n+l,"g"));a.lastIndex=0;for(var o,d=[];o=a.exec(e);)d.push(o[2]||o[3]);return d}function n(e,t,r,a){if("object"==typeof e&&!(e instanceof Array))return n.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof t&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var i=o.defaultJSExtensions&&".js"!=e.substr(e.length-3,3),s=o.decanonicalize(e,a);i&&".js"==s.substr(s.length-3,3)&&(s=s.substr(0,s.length-3));var l=o.get(s);if(!l)throw new Error('Module not already loaded loading "'+e+'" as '+s+(a?' from "'+a+'".':"."));return l.__useDefault?l["default"]:l}throw new TypeError("Invalid require")}for(var u=[],d=0;d<e.length;d++)u.push(o["import"](e[d],a));Promise.all(u).then(function(e){t&&t.apply(null,e)},r)}function a(t,a,i){function s(t,r,s){function c(e,r,a){return"string"==typeof e&&"function"!=typeof r?t(e):n.call(o,e,r,a,s.id)}for(var f=[],m=0;m<a.length;m++)f.push(t(a[m]));s.uri=s.id,s.config=function(){},-1!=d&&f.splice(d,0,s),-1!=u&&f.splice(u,0,r),-1!=l&&(c.toUrl=function(e){var t=o.defaultJSExtensions&&".js"!=e.substr(e.length-3,3),r=o.decanonicalize(e,s.id);return t&&".js"==r.substr(r.length-3,3)&&(r=r.substr(0,r.length-3)),r},f.splice(l,0,c));var p=e.require;e.require=n;var h=i.apply(-1==u?e:r,f);return e.require=p,"undefined"==typeof h&&s&&(h=s.exports),"undefined"!=typeof h?h:void 0}"string"!=typeof t&&(i=a,a=t,t=null),a instanceof Array||(i=a,a=["require","exports","module"].splice(0,i.length)),"function"!=typeof i&&(i=function(e){return function(){return e}}(i)),void 0===a[a.length-1]&&a.pop();var l,u,d;-1!=(l=J.call(a,"require"))&&(a.splice(l,1),t||(a=a.concat(r(i.toString(),l)))),-1!=(u=J.call(a,"exports"))&&a.splice(u,1),-1!=(d=J.call(a,"module"))&&a.splice(d,1);var c=P();c.name=t&&(o.decanonicalize||o.normalize).call(o,t),c.deps=a,c.execute=s,o.pushRegister_({amd:!0,entry:c})}var o=this;t.call(this);var i=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,s="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",l="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",u=/\(([^\)]*)\)/,c=/^\s+|\s+$/g,f={};a.amd={},d("reduceRegister_",function(e){return function(t,r){if(!r||!r.amd)return e.call(this,t,r);var n=t&&t.metadata,a=r.entry;if(n)if(n.format&&"detect"!=n.format){if(!a.name&&"amd"!=n.format)throw new Error("AMD define called while executing "+n.format+" module "+t.name)}else n.format="amd";if(a.name)n&&(n.entry||n.bundle?n.entry&&n.entry.name&&(n.entry=void 0):n.entry=a,n.bundle=!0),a.name in this.defined||(this.defined[a.name]=a);else{if(!n)throw new TypeError("Unexpected anonymous AMD define.");if(n.entry&&!n.entry.name)throw new Error("Multiple anonymous defines in module "+t.name);n.entry=a}}}),o.amdDefine=a,o.amdRequire=n}}),function(){var t=/(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])define\s*\(\s*("[^"]+"\s*,\s*|'[^']+'\s*,\s*)?\s*(\[(\s*(("[^"]+"|'[^']+')\s*,|\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*(\s*("[^"]+"|'[^']+')\s*,?)?(\s*(\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*\s*\]|function\s*|{|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\))/;d("instantiate",function(r){return function(n){var a=this;if("amd"==n.metadata.format||!n.metadata.format&&n.source.match(t))if(n.metadata.format="amd",a.builder||a.execute===!1)n.metadata.execute=function(){return n.metadata.builderExecute.apply(this,arguments)};else{var o=e.define;e.define=this.amdDefine;try{Y.call(a,n)}finally{e.define=o}if(!n.metadata.entry&&!n.metadata.bundle)throw new TypeError("AMD module "+n.name+" did not define")}return r.call(a,n)}})}(),function(){function e(e,t){if(t){var r;if(e.pluginFirst){if(-1!=(r=t.lastIndexOf("!")))return t.substr(r+1)}else if(-1!=(r=t.indexOf("!")))return t.substr(0,r);return t}}function t(e,t){var r,n,a=t.lastIndexOf("!");return-1!=a?(e.pluginFirst?(r=t.substr(a+1),n=t.substr(0,a)):(r=t.substr(0,a),n=t.substr(a+1)||r.substr(r.lastIndexOf(".")+1)),{argument:r,plugin:n}):void 0}function r(e,t,r,n){return n&&".js"==t.substr(t.length-3,3)&&(t=t.substr(0,t.length-3)),e.pluginFirst?r+"!"+t:t+"!"+r}function n(e,t){return e.defaultJSExtensions&&".js"!=t.substr(t.length-3,3)}function a(a){return function(o,i,s){var l=this;i=e(this,i);var u=t(l,o);if(!u)return a.call(this,o,i,s);var d=l.normalizeSync(u.argument,i,!0),c=l.normalizeSync(u.plugin,i,!0);return r(l,d,c,n(l,u.argument))}}d("decanonicalize",a),d("normalizeSync",a),d("normalize",function(a){return function(o,i,s){var l=this;i=e(this,i);var u=t(l,o);return u?Promise.all([l.normalize(u.argument,i,!0),l.normalize(u.plugin,i)]).then(function(e){return r(l,e[0],e[1],n(l,u.argument))}):a.call(l,o,i,s)}}),d("locate",function(e){return function(t){var r,n=this,a=t.name;return n.pluginFirst?-1!=(r=a.indexOf("!"))&&(t.metadata.loader=a.substr(0,r),t.name=a.substr(r+1)):-1!=(r=a.lastIndexOf("!"))&&(t.metadata.loader=a.substr(r+1),t.name=a.substr(0,r)),e.call(n,t).then(function(e){return-1==r&&t.metadata.loader?n.normalize(t.metadata.loader,t.name).then(function(r){return t.metadata.loader=r,e}):e}).then(function(e){var r=t.metadata.loader;if(!r)return e;if(t.name==r)throw new Error("Plugin "+r+" cannot load itself, make sure it is excluded from any wildcard meta configuration via a custom loader: false rule.");if(n.defined&&n.defined[a])return e;var o=n.pluginLoader||n;return o["import"](r).then(function(r){return t.metadata.loaderModule=r,t.address=e,r.locate?r.locate.call(n,t):e})})}}),d("fetch",function(e){return function(t){var r=this;return t.metadata.loaderModule&&t.metadata.loaderModule.fetch&&"defined"!=t.metadata.format?(t.metadata.scriptLoad=!1,t.metadata.loaderModule.fetch.call(r,t,function(t){return e.call(r,t)})):e.call(r,t)}}),d("translate",function(e){return function(t){var r=this;return t.metadata.loaderModule&&t.metadata.loaderModule.translate&&"defined"!=t.metadata.format?Promise.resolve(t.metadata.loaderModule.translate.call(r,t)).then(function(n){var a=t.metadata.sourceMap;if(a){if("object"!=typeof a)throw new Error("load.metadata.sourceMap must be set to an object.");var o=t.name.split("!")[0];a.file=o+"!transpiled",(!a.sources||a.sources.length<=1)&&(a.sources=[o])}return"string"==typeof n?t.source=n:y.call(this,"Plugin "+t.metadata.loader+" should return the source in translate, instead of setting load.source directly. This support will be deprecated."),e.call(r,t)}):e.call(r,t)}}),d("instantiate",function(e){return function(t){var r=this,n=!1;return t.metadata.loaderModule&&t.metadata.loaderModule.instantiate&&!r.builder&&"defined"!=t.metadata.format?Promise.resolve(t.metadata.loaderModule.instantiate.call(r,t,function(t){if(n)throw new Error("Instantiate must only be called once.");return n=!0,e.call(r,t)})).then(function(a){return n?a:(t.metadata.entry=P(),t.metadata.entry.execute=function(){return a},t.metadata.entry.deps=t.metadata.deps,t.metadata.format="defined",e.call(r,t))}):e.call(r,t)}})}();var le=/#\{[^\}]+\}/;d("normalize",function(e){return function(t,r,n){var a=this;return L.call(a,t,r).then(function(t){return e.call(a,t,r,n)}).then(function(e){return I.call(a,e,r)})}}),function(){d("fetch",function(e){return function(t){var r=t.metadata.alias,n=t.metadata.deps||[];if(r){t.metadata.format="defined";var a=P();return this.defined[t.name]=a,a.declarative=!0,a.deps=n.concat([r]),a.declare=function(e){return{setters:[function(t){for(var r in t)e(r,t[r]);t.__useDefault&&(a.module.exports.__useDefault=!0)}],execute:function(){}}},""}return e.call(this,t)}})}(),function(){function e(e,t,r){for(var n,a=t.split(".");a.length>1;)n=a.shift(),e=e[n]=e[n]||{};n=a.shift(),n in e||(e[n]=r)}c(function(e){return function(){this.meta={},e.call(this)}}),d("locate",function(e){return function(t){var r,n=this.meta,a=t.name,o=0;for(var i in n)if(r=i.indexOf("*"),-1!==r&&i.substr(0,r)===a.substr(0,r)&&i.substr(r+1)===a.substr(a.length-i.length+r+1)){var s=i.split("/").length;s>o&&(o=s),v(t.metadata,n[i],o!=s)}return n[a]&&v(t.metadata,n[a]),e.call(this,t)}});var t=/^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/,r=/\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;d("translate",function(n){return function(a){var o=a.source.match(t);if(o)for(var i=o[0].match(r),s=0;s<i.length;s++){var l=i[s],u=l.length,d=l.substr(0,1);if(";"==l.substr(u-1,1)&&u--,'"'==d||"'"==d){var c=l.substr(1,l.length-3),f=c.substr(0,c.indexOf(" "));if(f){var m=c.substr(f.length+1,c.length-f.length-1);"[]"==f.substr(f.length-2,2)?(f=f.substr(0,f.length-2),a.metadata[f]=a.metadata[f]||[],a.metadata[f].push(m)):a.metadata[f]instanceof Array?(y.call(this,"Module "+a.name+' contains deprecated "deps '+m+'" meta syntax.\nThis should be updated to "deps[] '+m+'" for pushing to array meta.'),a.metadata[f].push(m)):e(a.metadata,f,m)}else a.metadata[c]=!0}}return n.call(this,a)}})}(),function(){c(function(e){return function(){e.call(this),this.bundles={},this._loader.loadedBundles={}}}),d("locate",function(e){return function(t){var r=this,n=!1;if(!(t.name in r.defined))for(var a in r.bundles){for(var o=0;o<r.bundles[a].length;o++){var i=r.bundles[a][o];if(i==t.name){n=!0;break}if(-1!=i.indexOf("*")){var s=i.split("*");if(2!=s.length){r.bundles[a].splice(o--,1);continue}if(t.name.substring(0,s[0].length)==s[0]&&t.name.substr(t.name.length-s[1].length,s[1].length)==s[1]&&-1==t.name.substr(s[0].length,t.name.length-s[1].length-s[0].length).indexOf("/")){n=!0;break}}}if(n)return r["import"](a).then(function(){return e.call(r,t)})}return e.call(r,t)}})}(),function(){c(function(e){return function(){e.call(this),this.depCache={}}}),d("locate",function(e){return function(t){var r=this,n=r.depCache[t.name];if(n)for(var a=0;a<n.length;a++)r["import"](n[a],t.name);return e.call(r,t)}})}(),X=new l,e.SystemJS=X,X.version="0.19.27 Standard","object"==typeof exports&&(module.exports=a),e.Reflect=e.Reflect||{},e.Reflect.Loader=e.Reflect.Loader||a,e.Reflect.global=e.Reflect.global||e,e.LoaderPolyfill=a,X||(X=new o,X.constructor=o),"object"==typeof exports&&(module.exports=X),e.System=X}("undefined"!=typeof self?self:global)}var t="undefined"==typeof Promise;if("undefined"!=typeof document){var r=document.getElementsByTagName("script");if($__curScript=r[r.length-1],t){var n=$__curScript.src,a=n.substr(0,n.lastIndexOf("/")+1);window.systemJSBootstrap=e,document.write('<script type="text/javascript" src="'+a+'system-polyfills.js"></script>')}else e()}else if("undefined"!=typeof importScripts){var a="";try{throw new Error("_")}catch(o){o.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/,function(e,t){$__curScript={src:t},a=t.replace(/\/[^\/]*$/,"/")})}t&&importScripts(a+"system-polyfills.js"),e()}else $__curScript= true?{src:__filename}:null,e()}();
	//# sourceMappingURL=system.js.map

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1), "/index.js"))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process, __filename) {/*
	 * SystemJS v0.19.27
	 */
	!function(){function e(){!function(e){function t(e,n){if("string"!=typeof e)throw new TypeError("URL must be a string");var r=String(e).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);if(!r)throw new RangeError("Invalid URL format");var a=r[1]||"",o=r[2]||"",i=r[3]||"",s=r[4]||"",l=r[5]||"",u=r[6]||"",d=r[7]||"",c=r[8]||"",f=r[9]||"";if(void 0!==n){var m=n instanceof t?n:new t(n),p=!a&&!s&&!o;!p||d||c||(c=m.search),p&&"/"!==d[0]&&(d=d?(!m.host&&!m.username||m.pathname?"":"/")+m.pathname.slice(0,m.pathname.lastIndexOf("/")+1)+d:m.pathname);var h=[];d.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(e){"/.."===e?h.pop():h.push(e)}),d=h.join("").replace(/^\//,"/"===d[0]?"/":""),p&&(u=m.port,l=m.hostname,s=m.host,i=m.password,o=m.username),a||(a=m.protocol)}"file:"==a&&(d=d.replace(/\\/g,"/")),this.origin=s?a+(""!==a||""!==s?"//":"")+s:"",this.href=a+(a&&s||"file:"==a?"//":"")+(""!==o?o+(""!==i?":"+i:"")+"@":"")+s+d+c+f,this.protocol=a,this.username=o,this.password=i,this.host=s,this.hostname=l,this.port=u,this.pathname=d,this.search=c,this.hash=f}e.URLPolyfill=t}("undefined"!=typeof self?self:global),function(e){function t(e,t){if(!e.originalErr)for(var n=(e.stack||e.message||e).split("\n"),r=[],a=0;a<n.length;a++)("undefined"==typeof $__curScript||-1==n[a].indexOf($__curScript.src))&&r.push(n[a]);var o=(r?r.join("\n	"):e.message)+"\n	"+t;J||(o=o.replace(q?/file:\/\/\//g:/file:\/\//g,""));var i=N?new Error(o,e.fileName,e.lineNumber):new Error(o);return J?i.stack=null:i.stack=o,i.originalErr=e.originalErr||e,i}function n(e,n,r){try{new Function(e).call(r)}catch(a){throw t(a,"Evaluating "+n)}}function r(){}function a(t){this._loader={loaderObj:this,loads:[],modules:{},importPromises:{},moduleRecords:{}},A(this,"global",{get:function(){return e}})}function o(){a.call(this),this.paths={}}function i(e,t){var n,r="",a=0;for(var o in e){var i=o.split("*");if(i.length>2)throw new TypeError("Only one wildcard in a path is permitted");if(1==i.length){if(t==o)return e[o];if(t.substr(0,o.length-1)==o.substr(0,o.length-1)&&(t.length<o.length||t[o.length-1]==o[o.length-1])&&"/"==e[o][e[o].length-1])return e[o].substr(0,e[o].length-1)+(t.length>o.length?"/"+t.substr(o.length):"")}else{var s=i[0].length;s>=a&&t.substr(0,i[0].length)==i[0]&&t.substr(t.length-i[1].length)==i[1]&&(a=s,r=o,n=t.substr(i[0].length,t.length-i[1].length-i[0].length))}}var l=e[r];return"string"==typeof n&&(l=l.replace("*",n)),l}function s(){}function l(){o.call(this),Y.call(this)}function u(){}function d(e,t){l.prototype[e]=t(l.prototype[e]||function(){})}function c(e){Y=e(Y||function(){})}function f(e){for(var t=[],n=[],r=0,a=e.length;a>r;r++){var o=C.call(t,e[r]);-1===o?(t.push(e[r]),n.push([r])):n[o].push(r)}return{names:t,indices:n}}function m(e){var t={};if("object"==typeof e||"function"==typeof e){var n=e&&e.hasOwnProperty;if(Z)for(var r in e)h(t,e,r)||p(t,e,r,n);else for(var r in e)p(t,e,r,n)}return t["default"]=e,A(t,"__useDefault",{value:!0}),t}function p(e,t,n,r){(!r||t.hasOwnProperty(n))&&(e[n]=t[n])}function h(e,t,n){try{var r;return(r=Object.getOwnPropertyDescriptor(t,n))&&A(e,n,r),!0}catch(a){return!1}}function g(e,t,n){for(var r in t)n&&r in e||(e[r]=t[r]);return e}function v(e,t,n){for(var r in t){var a=t[r];r in e?a instanceof Array&&e[r]instanceof Array?e[r]=[].concat(n?a:e[r]).concat(n?e[r]:a):"object"==typeof a&&null!==a&&"object"==typeof e[r]?e[r]=g(g({},e[r]),a,n):n||(e[r]=a):e[r]=a}}function y(e){this.warnings&&"undefined"!=typeof console&&console.warn}function b(e,t){for(var n=e.split(".");n.length;)t=t[n.shift()];return t}function w(){if(W[this.baseURL])return W[this.baseURL];"/"!=this.baseURL[this.baseURL.length-1]&&(this.baseURL+="/");var e=new H(this.baseURL,U);return this.baseURL=e.href,W[this.baseURL]=e}function x(e,t){var n,r=0;for(var a in e)if(t.substr(0,a.length)==a&&(t.length==a.length||"/"==t[a.length])){var o=a.split("/").length;if(r>=o)continue;n=a,r=o}return n}function S(e){this.set("@system-env",this.newModule({browser:J,node:!!this._nodeRequire,production:e,"default":!0}))}function E(e){return("."!=e[0]||!!e[1]&&"/"!=e[1]&&"."!=e[1])&&"/"!=e[0]&&!e.match(Q)}function k(e,t){return t&&(t=t.replace(/#/g,"%05")),new H(e,t||ee).href.replace(/%05/g,"#")}function j(e,t){return new H(t,w.call(e)).href}function P(e,t){if(!E(e))return k(e,t);var n=x(this.map,e);if(n&&(e=this.map[n]+e.substr(n.length),!E(e)))return k(e);if(this.has(e))return e;if("@node/"==e.substr(0,6)&&-1!=te.indexOf(e.substr(6))){if(!this._nodeRequire)throw new TypeError("Error loading "+e+". Can only load node core modules in Node.");return this.set(e,this.newModule(m(this._nodeRequire(e.substr(6))))),e}var r=i(this.paths,e);return r&&!E(r)?k(r):j(this,r||e)}function _(e){var t=e.match(ae);return t&&"System.register"==e.substr(t[0].length,15)}function O(){return{name:null,deps:null,originalIndices:null,declare:null,execute:null,executingRequire:!1,declarative:!1,normalizedDeps:null,groupIndex:null,evaluated:!1,module:null,esModule:null,esmExports:!1}}function R(t){if("string"==typeof t)return b(t,e);if(!(t instanceof Array))throw new Error("Global exports must be a string or array.");for(var n={},r=!0,a=0;a<t.length;a++){var o=b(t[a],e);r&&(n["default"]=o,r=!1),n[t[a].split(".").pop()]=o}return n}function z(e){var t,n,r,r="~"==e[0],a=e.lastIndexOf("|");return-1!=a?(t=e.substr(a+1),n=e.substr(r,a-r)||"@system-env"):(t=null,n=e.substr(r)),{module:n,prop:t,negate:r}}function M(e){return(e.negate?"~":"")+e.module+(e.prop?"|"+e.prop:"")}function I(e,t,n){return this["import"](e.module,t).then(function(t){if(e.prop?t=b(e.prop,t):"object"==typeof t&&t+""=="Module"&&(t=t["default"]),n&&"boolean"!=typeof t)throw new TypeError("Condition "+M(e)+" did not resolve to a boolean.");return e.negate?!t:t})}function L(e,t){var n=e.match(oe);if(!n)return Promise.resolve(e);var r=z(n[0].substr(2,n[0].length-3));return this.builder?this.normalize(r.module,t).then(function(t){return r.module=t,e.replace(oe,"#{"+M(r)+"}")}):I.call(this,r,t,!1).then(function(n){if("string"!=typeof n)throw new TypeError("The condition value for "+e+" doesn't resolve to a string.");if(-1!=n.indexOf("/"))throw new TypeError("Unabled to interpolate conditional "+e+(t?" in "+t:"")+"\n	The condition value "+n+' cannot contain a "/" separator.');return e.replace(oe,n)})}function T(e,t){var n=e.lastIndexOf("#?");if(-1==n)return Promise.resolve(e);var r=z(e.substr(n+2));return this.builder?this.normalize(r.module,t).then(function(t){return r.module=t,e.substr(0,n)+"#?"+M(r)}):I.call(this,r,t,!0).then(function(t){return t?e.substr(0,n):"@empty"})}var D="undefined"==typeof window&&"undefined"!=typeof self&&"undefined"!=typeof importScripts,J="undefined"!=typeof window&&"undefined"!=typeof document,q="undefined"!=typeof process&&"undefined"!=typeof process.platform&&!!process.platform.match(/^win/);e.console||(e.console={assert:function(){}});var A,C=Array.prototype.indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(this[t]===e)return t;return-1};!function(){try{Object.defineProperty({},"a",{})&&(A=Object.defineProperty)}catch(e){A=function(e,t,n){try{e[t]=n.value||n.get.call(e)}catch(r){}}}}();var U,N="_"==new Error(0,"_").fileName;if("undefined"!=typeof document&&document.getElementsByTagName){if(U=document.baseURI,!U){var $=document.getElementsByTagName("base");U=$[0]&&$[0].href||window.location.href}U=U.split("#")[0].split("?")[0],U=U.substr(0,U.lastIndexOf("/")+1)}else if("undefined"!=typeof process&&process.cwd)U="file://"+(q?"/":"")+process.cwd()+"/",q&&(U=U.replace(/\\/g,"/"));else{if("undefined"==typeof location)throw new TypeError("No environment baseURI");U=e.location.href}try{var F="test:"==new e.URL("test:///").protocol}catch(B){}var H=F?e.URL:e.URLPolyfill;A(r.prototype,"toString",{value:function(){return"Module"}}),function(){function o(e){return{status:"loading",name:e,linkSets:[],dependencies:[],metadata:{}}}function i(e,t,n){return new Promise(c({step:n.address?"fetch":"locate",loader:e,moduleName:t,moduleMetadata:n&&n.metadata||{},moduleSource:n.source,moduleAddress:n.address}))}function s(e,t,n,r){return new Promise(function(a,o){a(e.loaderObj.normalize(t,n,r))}).then(function(t){var n;if(e.modules[t])return n=o(t),n.status="linked",n.module=e.modules[t],n;for(var r=0,a=e.loads.length;a>r;r++)if(n=e.loads[r],n.name==t)return n;return n=o(t),e.loads.push(n),l(e,n),n})}function l(e,t){u(e,t,Promise.resolve().then(function(){return e.loaderObj.locate({name:t.name,metadata:t.metadata})}))}function u(e,t,n){d(e,t,n.then(function(n){return"loading"==t.status?(t.address=n,e.loaderObj.fetch({name:t.name,metadata:t.metadata,address:n})):void 0}))}function d(t,r,a){a.then(function(a){return"loading"==r.status?Promise.resolve(t.loaderObj.translate({name:r.name,metadata:r.metadata,address:r.address,source:a})).then(function(e){return r.source=e,t.loaderObj.instantiate({name:r.name,metadata:r.metadata,address:r.address,source:e})}).then(function(a){if(void 0===a)return r.address=r.address||"<Anonymous Module "+ ++k+">",r.isDeclarative=!0,E.call(t.loaderObj,r).then(function(t){var a=e.System,o=a.register;a.register=function(e,t,n){"string"!=typeof e&&(n=t,t=e),r.declare=n,r.depsList=t},n(t,r.address,{}),a.register=o});if("object"!=typeof a)throw TypeError("Invalid instantiate return value");r.depsList=a.deps||[],r.execute=a.execute,r.isDeclarative=!1}).then(function(){r.dependencies=[];for(var e=r.depsList,n=[],a=0,o=e.length;o>a;a++)(function(e,a){n.push(s(t,e,r.name,r.address).then(function(t){if(r.dependencies[a]={key:e,value:t.name},"linked"!=t.status)for(var n=r.linkSets.concat([]),o=0,i=n.length;i>o;o++)m(n[o],t)}))})(e[a],a);return Promise.all(n)}).then(function(){r.status="loaded";for(var e=r.linkSets.concat([]),t=0,n=e.length;n>t;t++)h(e[t],r)}):void 0})["catch"](function(e){r.status="failed",r.exception=e;for(var t=r.linkSets.concat([]),n=0,a=t.length;a>n;n++)g(t[n],r,e)})}function c(e){return function(t,n){var r=e.loader,a=e.moduleName,i=e.step;if(r.modules[a])throw new TypeError('"'+a+'" already exists in the module table');for(var s,c=0,m=r.loads.length;m>c;c++)if(r.loads[c].name==a&&(s=r.loads[c],"translate"!=i||s.source||(s.address=e.moduleAddress,d(r,s,Promise.resolve(e.moduleSource))),s.linkSets.length&&s.linkSets[0].loads[0].name==s.name))return s.linkSets[0].done.then(function(){t(s)});var p=s||o(a);p.metadata=e.moduleMetadata;var h=f(r,p);r.loads.push(p),t(h.done),"locate"==i?l(r,p):"fetch"==i?u(r,p,Promise.resolve(e.moduleAddress)):(p.address=e.moduleAddress,d(r,p,Promise.resolve(e.moduleSource)))}}function f(e,t){var n={loader:e,loads:[],startingLoad:t,loadingCount:0};return n.done=new Promise(function(e,t){n.resolve=e,n.reject=t}),m(n,t),n}function m(e,t){if("failed"!=t.status){for(var n=0,r=e.loads.length;r>n;n++)if(e.loads[n]==t)return;e.loads.push(t),t.linkSets.push(e),"loaded"!=t.status&&e.loadingCount++;for(var a=e.loader,n=0,r=t.dependencies.length;r>n;n++)if(t.dependencies[n]){var o=t.dependencies[n].value;if(!a.modules[o])for(var i=0,s=a.loads.length;s>i;i++)if(a.loads[i].name==o){m(e,a.loads[i]);break}}}}function p(e){var t=!1;try{w(e,function(n,r){g(e,n,r),t=!0})}catch(n){g(e,null,n),t=!0}return t}function h(e,t){if(e.loadingCount--,!(e.loadingCount>0)){var n=e.startingLoad;if(e.loader.loaderObj.execute===!1){for(var r=[].concat(e.loads),a=0,o=r.length;o>a;a++){var t=r[a];t.module=t.isDeclarative?{name:t.name,module:j({}),evaluated:!0}:{module:j({})},t.status="linked",v(e.loader,t)}return e.resolve(n)}var i=p(e);i||e.resolve(n)}}function g(e,n,r){var a=e.loader;e:if(n)if(e.loads[0].name==n.name)r=t(r,"Error loading "+n.name);else{for(var o=0;o<e.loads.length;o++)for(var i=e.loads[o],s=0;s<i.dependencies.length;s++){var l=i.dependencies[s];if(l.value==n.name){r=t(r,"Error loading "+n.name+' as "'+l.key+'" from '+i.name);break e}}r=t(r,"Error loading "+n.name+" from "+e.loads[0].name)}else r=t(r,"Error linking "+e.loads[0].name);for(var u=e.loads.concat([]),o=0,d=u.length;d>o;o++){var n=u[o];a.loaderObj.failed=a.loaderObj.failed||[],-1==C.call(a.loaderObj.failed,n)&&a.loaderObj.failed.push(n);var c=C.call(n.linkSets,e);if(n.linkSets.splice(c,1),0==n.linkSets.length){var f=C.call(e.loader.loads,n);-1!=f&&e.loader.loads.splice(f,1)}}e.reject(r)}function v(e,t){if(e.loaderObj.trace){e.loaderObj.loads||(e.loaderObj.loads={});var n={};t.dependencies.forEach(function(e){n[e.key]=e.value}),e.loaderObj.loads[t.name]={name:t.name,deps:t.dependencies.map(function(e){return e.key}),depMap:n,address:t.address,metadata:t.metadata,source:t.source,kind:t.isDeclarative?"declarative":"dynamic"}}t.name&&(e.modules[t.name]=t.module);var r=C.call(e.loads,t);-1!=r&&e.loads.splice(r,1);for(var a=0,o=t.linkSets.length;o>a;a++)r=C.call(t.linkSets[a].loads,t),-1!=r&&t.linkSets[a].loads.splice(r,1);t.linkSets.splice(0,t.linkSets.length)}function y(e,t,n){try{var a=t.execute()}catch(o){return void n(t,o)}return a&&a instanceof r?a:void n(t,new TypeError("Execution must define a Module instance"))}function b(e,t,n){var r=e._loader.importPromises;return r[t]=n.then(function(e){return r[t]=void 0,e},function(e){throw r[t]=void 0,e})}function w(e,t){var n=e.loader;if(e.loads.length)for(var r=e.loads.concat([]),a=0;a<r.length;a++){var o=r[a],i=y(e,o,t);if(!i)return;o.module={name:o.name,module:i},o.status="linked",v(n,o)}}function x(e,t){return t.module.module}function S(){}function E(){throw new TypeError("ES6 transpilation is only provided in the dev module loader build.")}var k=0;a.prototype={constructor:a,define:function(e,t,n){if(this._loader.importPromises[e])throw new TypeError("Module is already loading.");return b(this,e,new Promise(c({step:"translate",loader:this._loader,moduleName:e,moduleMetadata:n&&n.metadata||{},moduleSource:t,moduleAddress:n&&n.address})))},"delete":function(e){var t=this._loader;return delete t.importPromises[e],delete t.moduleRecords[e],t.modules[e]?delete t.modules[e]:!1},get:function(e){return this._loader.modules[e]?(S(this._loader.modules[e],[],this),this._loader.modules[e].module):void 0},has:function(e){return!!this._loader.modules[e]},"import":function(e,t,n){"object"==typeof t&&(t=t.name);var r=this;return Promise.resolve(r.normalize(e,t)).then(function(e){var t=r._loader;return t.modules[e]?(S(t.modules[e],[],t._loader),t.modules[e].module):t.importPromises[e]||b(r,e,i(t,e,{}).then(function(n){return delete t.importPromises[e],x(t,n)}))})},load:function(e){var t=this._loader;return t.modules[e]?Promise.resolve():t.importPromises[e]||b(this,e,new Promise(c({step:"locate",loader:t,moduleName:e,moduleMetadata:{},moduleSource:void 0,moduleAddress:void 0})).then(function(){delete t.importPromises[e]}))},module:function(e,t){var n=o();n.address=t&&t.address;var r=f(this._loader,n),a=Promise.resolve(e),i=this._loader,s=r.done.then(function(){return x(i,n)});return d(i,n,a),s},newModule:function(e){if("object"!=typeof e)throw new TypeError("Expected object");var t=new r,n=[];if(Object.getOwnPropertyNames&&null!=e)n=Object.getOwnPropertyNames(e);else for(var a in e)n.push(a);for(var o=0;o<n.length;o++)(function(n){A(t,n,{configurable:!1,enumerable:!0,get:function(){return e[n]},set:function(){throw new Error("Module exports cannot be changed externally.")}})})(n[o]);return Object.freeze&&Object.freeze(t),t},set:function(e,t){if(!(t instanceof r))throw new TypeError("Loader.set("+e+", module) must be a module");this._loader.modules[e]={module:t}},normalize:function(e,t,n){return e},locate:function(e){return e.name},fetch:function(e){},translate:function(e){return e.source},instantiate:function(e){}};var j=a.prototype.newModule}();var X;s.prototype=a.prototype,o.prototype=new s;var G;if("undefined"!=typeof XMLHttpRequest)G=function(e,t,n,r){function a(){n(i.responseText)}function o(){r(new Error("XHR error"+(i.status?" ("+i.status+(i.statusText?" "+i.statusText:"")+")":"")+" loading "+e))}var i=new XMLHttpRequest,s=!0,l=!1;if(!("withCredentials"in i)){var u=/^(\w+:)?\/\/([^\/]+)/.exec(e);u&&(s=u[2]===window.location.host,u[1]&&(s&=u[1]===window.location.protocol))}s||"undefined"==typeof XDomainRequest||(i=new XDomainRequest,i.onload=a,i.onerror=o,i.ontimeout=o,i.onprogress=function(){},i.timeout=0,l=!0),i.onreadystatechange=function(){4===i.readyState&&(0==i.status?i.responseText?a():(i.addEventListener("error",o),i.addEventListener("load",a)):200===i.status?a():o())},i.open("GET",e,!0),i.setRequestHeader&&(i.setRequestHeader("Accept","application/x-es-module, */*"),t&&("string"==typeof t&&i.setRequestHeader("Authorization",t),i.withCredentials=!0)),l?setTimeout(function(){i.send()},0):i.send(null)};else if("undefined"!="function"&&"undefined"!=typeof process){var V;G=function(e,t,n,r){if("file:///"!=e.substr(0,8))throw new Error('Unable to fetch "'+e+'". Only file URLs of the form file:/// allowed running in Node.');return V=V||__webpack_require__(2),e=q?e.replace(/\//g,"\\").substr(8):e.substr(7),V.readFile(e,function(e,t){if(e)return r(e);var a=t+"";"\ufeff"===a[0]&&(a=a.substr(1)),n(a)})}}else{if("undefined"==typeof self||"undefined"==typeof self.fetch)throw new TypeError("No environment fetch API available.");G=function(e,t,n,r){var a={headers:{Accept:"application/x-es-module, */*"}};t&&("string"==typeof t&&(a.headers.Authorization=t),a.credentials="include"),fetch(e,a).then(function(e){if(e.ok)return e.text();throw new Error("Fetch error: "+e.status+" "+e.statusText)}).then(n,r)}}o.prototype.fetch=function(e){return new Promise(function(t,n){G(e.address,void 0,t,n)})},u.prototype=o.prototype,l.prototype=new u,l.prototype.constructor=l,l.prototype.instantiate=function(){};var Y,Z=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(B){Z=!1}var K=["main","format","defaultExtension","meta","map","basePath","depCache"],Q=/^[^\/]+:\/\//,W={},ee=new H(U);c(function(e){return function(){e.call(this),this.baseURL=U.substr(0,U.lastIndexOf("/")+1),this.map={},this.paths={},this.warnings=!1,this.defaultJSExtensions=!1,this.pluginFirst=!1,this.loaderErrorStack=!1,this.set("@empty",this.newModule({})),S.call(this,!1)}}),"undefined"=="function"||"undefined"==typeof process||process.browser||(l.prototype._nodeRequire=__webpack_require__(3));var te=["assert","buffer","child_process","cluster","console","constants","crypto","dgram","dns","domain","events","fs","http","https","module","net","os","path","process","punycode","querystring","readline","repl","stream","string_decoder","sys","timers","tls","tty","url","util","vm","zlib"];d("normalize",function(e){return function(e,t,n){var r=P.call(this,e,t);return n||!this.defaultJSExtensions||".js"==r.substr(r.length-3,3)||E(r)||(r+=".js"),r}});var ne="undefined"!=typeof XMLHttpRequest;d("locate",function(e){return function(t){return Promise.resolve(e.call(this,t)).then(function(e){return ne?e.replace(/#/g,"%23"):e})}}),d("fetch",function(){return function(e){return new Promise(function(t,n){G(e.address,e.metadata.authorization,t,n)})}}),d("import",function(e){return function(t,n,r){return n&&n.name&&y.call(this,"SystemJS.import(name, { name: parentName }) is deprecated for SystemJS.import(name, parentName), while importing "+t+" from "+n.name),e.call(this,t,n,r).then(function(e){return e.__useDefault?e["default"]:e})}}),d("translate",function(e){return function(t){return"detect"==t.metadata.format&&(t.metadata.format=void 0),e.call(this,t)}}),d("instantiate",function(e){return function(e){if("json"==e.metadata.format&&!this.builder){var t=e.metadata.entry=O();t.deps=[],t.execute=function(){try{return JSON.parse(e.source)}catch(t){throw new Error("Invalid JSON file "+e.name)}}}}}),l.prototype.env="development";var re;l.prototype.config=function(e){function t(e){for(var t in e)if(hasOwnProperty.call(e,t))return!0}var n=this;if("loaderErrorStack"in e&&(re=$__curScript,e.loaderErrorStack?$__curScript=void 0:$__curScript=re),"warnings"in e&&(n.warnings=e.warnings),e.transpilerRuntime===!1&&(n._loader.loadedTranspilerRuntime=!0),e.baseURL){if(t(n.packages)||t(n.meta)||t(n.depCache)||t(n.bundles)||t(n.packageConfigPaths))throw new TypeError("Incorrect configuration order. The baseURL must be configured with the first SystemJS.config call.");n.baseURL=e.baseURL,w.call(n)}if(e.defaultJSExtensions&&(n.defaultJSExtensions=e.defaultJSExtensions,y.call(n,"The defaultJSExtensions configuration option is deprecated, use packages configuration instead.")),e.pluginFirst&&(n.pluginFirst=e.pluginFirst),e.production&&S.call(n,!0),e.paths)for(var r in e.paths)n.paths[r]=e.paths[r];if(e.map){var a="";for(var r in e.map){var o=e.map[r];if("string"!=typeof o){a+=(a.length?", ":"")+'"'+r+'"';var i=n.defaultJSExtensions&&".js"!=r.substr(r.length-3,3),s=n.decanonicalize(r);i&&".js"==s.substr(s.length-3,3)&&(s=s.substr(0,s.length-3));var l="";for(var u in n.packages)s.substr(0,u.length)==u&&(!s[u.length]||"/"==s[u.length])&&l.split("/").length<u.split("/").length&&(l=u);l&&n.packages[l].main&&(s=s.substr(0,s.length-n.packages[l].main.length-1));var u=n.packages[s]=n.packages[s]||{};u.map=o}else n.map[r]=o}a&&y.call(n,"The map configuration for "+a+' uses object submaps, which is deprecated in global map.\nUpdate this to use package contextual map with configs like SystemJS.config({ packages: { "'+r+'": { map: {...} } } }).')}if(e.packageConfigPaths){for(var d=[],c=0;c<e.packageConfigPaths.length;c++){var f=e.packageConfigPaths[c],m=Math.max(f.lastIndexOf("*")+1,f.lastIndexOf("/")),i=n.defaultJSExtensions&&".js"!=f.substr(m-3,3),p=n.decanonicalize(f.substr(0,m));i&&".js"==p.substr(p.length-3,3)&&(p=p.substr(0,p.length-3)),d[c]=p+f.substr(m)}n.packageConfigPaths=d}if(e.bundles)for(var r in e.bundles){for(var h=[],c=0;c<e.bundles[r].length;c++){var i=n.defaultJSExtensions&&".js"!=e.bundles[r][c].substr(e.bundles[r][c].length-3,3),g=n.decanonicalize(e.bundles[r][c]);i&&".js"==g.substr(g.length-3,3)&&(g=g.substr(0,g.length-3)),h.push(g)}n.bundles[r]=h}if(e.packages)for(var r in e.packages){if(r.match(/^([^\/]+:)?\/\/$/))throw new TypeError('"'+r+'" is not a valid package name.');var s=P.call(n,r);"/"==s[s.length-1]&&(s=s.substr(0,s.length-1)),n.packages[s]=n.packages[s]||{};var u=e.packages[r];u.modules&&(y.call(n,"Package "+r+' is configured with "modules", which is deprecated as it has been renamed to "meta".'),u.meta=u.modules,delete u.modules),"object"==typeof u.main&&(u.map=u.map||{},u.map["./@main"]=u.main,u.main["default"]=u.main["default"]||"./",u.main="@main");for(var b in u)-1==C.call(K,b)&&y.call(n,'"'+b+'" is not a valid package configuration option in package '+r);v(n.packages[s],u)}for(var x in e){var o=e[x];if("baseURL"!=x&&"map"!=x&&"packages"!=x&&"bundles"!=x&&"paths"!=x&&"warnings"!=x&&"packageConfigPaths"!=x&&"loaderErrorStack"!=x)if("object"!=typeof o||o instanceof Array)n[x]=o;else{n[x]=n[x]||{};for(var r in o)if("meta"==x&&"*"==r[0])n[x][r]=o[r];else if("meta"==x){var k=P.call(n,r);n.defaultJSExtensions&&".js"!=k.substr(k.length-3,3)&&!E(k)&&(k+=".js"),n[x][k]=o[r]}else if("depCache"==x){var i=n.defaultJSExtensions&&".js"!=r.substr(r.length-3,3),s=n.decanonicalize(r);i&&".js"==s.substr(s.length-3,3)&&(s=s.substr(0,s.length-3)),n[x][s]=o[r]}else n[x][r]=o[r]}}},function(){function e(e,t){var n,r,a=0;for(var o in e.packages)t.substr(0,o.length)!==o||t.length!==o.length&&"/"!==t[o.length]||(r=o.split("/").length,r>a&&(n=o,a=r));return n}function t(e,t,n,r,a){if(!r||"/"==r[r.length-1]||a||t.defaultExtension===!1)return r;if(r.match(oe))return r;var o=!1;if(t.meta&&p(t.meta,r,function(e,t,n){return 0==n||e.lastIndexOf("*")!=e.length-1?o=!0:void 0}),!o&&e.meta&&p(e.meta,n+"/"+r,function(e,t,n){return 0==n||e.lastIndexOf("*")!=e.length-1?o=!0:void 0}),o)return r;var i="."+(t.defaultExtension||"js");return r.substr(r.length-i.length)!=i?r+i:r}function n(e,n,r,o,i){if(!o){if(!n.main)return r+(e.defaultJSExtensions?".js":"");o="./"==n.main.substr(0,2)?n.main.substr(2):n.main}if(n.map){var s="./"+o,l=x(n.map,s);if(l||(s="./"+t(e,n,r,o,i),s!="./"+o&&(l=x(n.map,s))),l)return a(e,n,r,l,s,i)}return r+"/"+t(e,n,r,o,i)}function r(e,t,n){if("."==e)throw new Error("Package "+n+' has a map entry for "." which is not permitted.');if(t.substr(0,e.length)==e&&"/"!=e[e.length-1]&&"/"==t[e.length])throw new Error("Package "+n+' has a recursive map for "'+e+'" which is not permitted.')}function a(e,n,a,o,i,s){var l=n.map[o];if("object"==typeof l)throw new Error("Synchronous conditional normalization not supported sync normalizing "+o+" in "+a);if(r(o,l,a),"string"!=typeof l&&(l=o=i),r(o,l,a),"."==l)l=a;else if("./"==l.substr(0,2))return a+"/"+t(e,n,a,l.substr(2)+i.substr(o.length),s);return e.normalizeSync(l+i.substr(o.length),a+"/")}function o(e,n,r,a,o){if(!a){if(!n.main)return Promise.resolve(r+(e.defaultJSExtensions?".js":""));a="./"==n.main.substr(0,2)?n.main.substr(2):n.main}var i,l;return n.map&&(i="./"+a,l=x(n.map,i),l||(i="./"+t(e,n,r,a,o),i!="./"+a&&(l=x(n.map,i)))),(l?s(e,n,r,l,i,o):Promise.resolve()).then(function(i){return i?Promise.resolve(i):Promise.resolve(r+"/"+t(e,n,r,a,o))})}function i(e,n,r,a,o,i,s){if("."==o)o=r;else if("./"==o.substr(0,2))return Promise.resolve(r+"/"+t(e,n,r,o.substr(2)+i.substr(a.length),s)).then(function(t){return L.call(e,t,r+"/")});return e.normalize(o+i.substr(a.length),r+"/")}function s(e,t,n,a,o,s){var l=t.map[a];return"string"==typeof l?(r(a,l,n),i(e,t,n,a,l,o,s)):e.builder?Promise.resolve(n+"/#:"+o):e["import"](t.map["@env"]||"@system-env",n).then(function(e){for(var t in l){var n="~"==t[0],r=b(n?t.substr(1):t,e);if(!n&&r||n&&!r)return l[t]}}).then(function(l){if(l){if("string"!=typeof l)throw new Error("Unable to map a package conditional to a package conditional.");return r(a,l,n),i(e,t,n,a,l,o,s)}})}function u(e){var t=e.lastIndexOf("*"),n=Math.max(t+1,e.lastIndexOf("/"));return{length:n,regEx:new RegExp("^("+e.substr(0,n).replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^\\/]+")+")(\\/|$)"),wildcard:-1!=t}}function f(e,t){for(var n,r,a=!1,o=0;o<e.packageConfigPaths.length;o++){var i=e.packageConfigPaths[o],s=h[i]||(h[i]=u(i));if(!(t.length<s.length)){var l=t.match(s.regEx);!l||n&&(a&&s.wildcard||!(n.length<l[1].length))||(n=l[1],a=!s.wildcard,r=n+i.substr(s.length))}}return n?{packageName:n,configPath:r}:void 0}function m(e,t,n){var r=e.pluginLoader||e;return(r.meta[n]=r.meta[n]||{}).format="json",r.meta[n].loader=null,r.load(n).then(function(){var a=r.get(n)["default"];a.systemjs&&(a=a.systemjs),a.modules&&(a.meta=a.modules,y.call(e,"Package config file "+n+' is configured with "modules", which is deprecated as it has been renamed to "meta".'));for(var o in a)-1==C.call(K,o)&&delete a[o];var i=e.packages[t]=e.packages[t]||{};if(v(i,a,!0),a.depCache){for(var s in a.depCache){var l;l="./"==s.substr(0,2)?t+"/"+s.substr(2):P.call(e,s),e.depCache[l]=(e.depCache[l]||[]).concat(a.depCache[s])}delete a.depCache}return"object"==typeof i.main&&(i.map=i.map||{},i.map["./@main"]=i.main,i.main["default"]=i.main["default"]||"./",i.main="@main"),i})}function p(e,t,n){var r;for(var a in e){var o="./"==a.substr(0,2)?"./":"";if(o&&(a=a.substr(2)),r=a.indexOf("*"),-1!==r&&a.substr(0,r)==t.substr(0,r)&&a.substr(r+1)==t.substr(t.length-a.length+r+1)&&n(a,e[o+a],a.split("/").length))return}var i=e[t]&&e.hasOwnProperty&&e.hasOwnProperty(t)?e[t]:e["./"+t];i&&n(i,i,0)}c(function(e){return function(){e.call(this),this.packages={},this.packageConfigPaths=[]}}),l.prototype.normalizeSync=l.prototype.decanonicalize=l.prototype.normalize,d("decanonicalize",function(t){return function(n,r){if(this.builder)return t.call(this,n,r,!0);var a=t.call(this,n,r);if(!this.defaultJSExtensions)return a;var o=e(this,a),i=this.packages[o],s=i&&i.defaultExtension;return void 0==s&&i&&i.meta&&p(i.meta,a.substr(o),function(e,t,n){return 0==n||e.lastIndexOf("*")!=e.length-1?(s=!1,!0):void 0}),(s===!1||s&&".js"!=s)&&".js"!=n.substr(n.length-3,3)&&".js"==a.substr(a.length-3,3)&&(a=a.substr(0,a.length-3)),a}}),d("normalizeSync",function(t){return function(r,o,i){y.call(this,"SystemJS.normalizeSync has been deprecated for SystemJS.decanonicalize.");var s=this;if(i=i===!0,o)var l=e(s,o)||s.defaultJSExtensions&&".js"==o.substr(o.length-3,3)&&e(s,o.substr(0,o.length-3));var u=l&&s.packages[l];if(u&&"."!=r[0]){var d=u.map,c=d&&x(d,r);if(c&&"string"==typeof d[c])return a(s,u,l,c,r,i)}var m=s.defaultJSExtensions&&".js"!=r.substr(r.length-3,3),p=t.call(s,r,o);m&&".js"!=p.substr(p.length-3,3)&&(m=!1),m&&(p=p.substr(0,p.length-3));var h=f(s,p),g=h&&h.packageName||e(s,p);if(!g)return p+(m?".js":"");var v=p.substr(g.length+1);return n(s,s.packages[g]||{},g,v,i)}}),d("normalize",function(t){return function(n,r,a){var i=this;return a=a===!0,Promise.resolve().then(function(){if(r)var t=e(i,r)||i.defaultJSExtensions&&".js"==r.substr(r.length-3,3)&&e(i,r.substr(0,r.length-3));var o=t&&i.packages[t];if(o&&"./"!=n.substr(0,2)){var l=o.map,u=l&&x(l,n);if(u)return s(i,o,t,u,n,a)}return Promise.resolve()}).then(function(s){if(s)return s;var l=i.defaultJSExtensions&&".js"!=n.substr(n.length-3,3),u=t.call(i,n,r);l&&".js"!=u.substr(u.length-3,3)&&(l=!1),l&&(u=u.substr(0,u.length-3));var d=f(i,u),c=d&&d.packageName||e(i,u);if(!c)return Promise.resolve(u+(l?".js":""));var p=i.packages[c],h=p&&(p.configured||!d);return(h?Promise.resolve(p):m(i,c,d.configPath)).then(function(e){var t=u.substr(c.length+1);return o(i,e,c,t,a)})})}});var h={};d("locate",function(t){return function(n){var r=this;return Promise.resolve(t.call(this,n)).then(function(t){var a=e(r,n.name);if(a){var o=r.packages[a],i=n.name.substr(a.length+1);o.format&&(n.metadata.format=n.metadata.format||o.format);var s={};if(o.meta){var l=0;p(o.meta,i,function(e,t,n){n>l&&(l=n),v(s,t,n&&l>n)}),v(n.metadata,s)}}return t})}})}(),function(){function t(){if(i&&"interactive"===i.script.readyState)return i.load;for(var e=0;e<u.length;e++)if("interactive"==u[e].script.readyState)return i=u[e],i.load}function n(e,t){return new Promise(function(e,n){t.metadata.integrity&&n(new Error("Subresource integrity checking is not supported in web workers.")),s=t;try{importScripts(t.address)}catch(r){s=null,n(r)}s=null,t.metadata.entry||n(new Error(t.address+" did not call System.register or AMD define")),e("")})}if("undefined"!=typeof document)var r=document.getElementsByTagName("head")[0];var a,o,i,s=null,l=r&&function(){var e=document.createElement("script"),t="undefined"!=typeof opera&&"[object Opera]"===opera.toString();return e.attachEvent&&!(e.attachEvent.toString&&e.attachEvent.toString().indexOf("[native code")<0)&&!t}(),u=[],c=0,f=[];d("pushRegister_",function(e){return function(n){return e.call(this,n)?!1:(s?this.reduceRegister_(s,n):l?this.reduceRegister_(t(),n):c?f.push(n):this.reduceRegister_(null,n),!0)}}),d("fetch",function(t){return function(s){var d=this;return"json"!=s.metadata.format&&s.metadata.scriptLoad&&(J||D)?D?n(d,s):new Promise(function(t,n){function m(e){if(!g.readyState||"loaded"==g.readyState||"complete"==g.readyState){if(c--,s.metadata.entry||f.length){if(!l){for(var r=0;r<f.length;r++)d.reduceRegister_(s,f[r]);f=[]}}else d.reduceRegister_(s);h(),s.metadata.entry||s.metadata.bundle||n(new Error(s.name+" did not call System.register or AMD define. If loading a global module configure the global name via the meta exports property for script injection support.")),t("")}}function p(e){h(),n(new Error("Unable to load script "+s.address))}function h(){if(e.System=a,e.require=o,g.detachEvent){g.detachEvent("onreadystatechange",m);for(var t=0;t<u.length;t++)u[t].script==g&&(i&&i.script==g&&(i=null),u.splice(t,1))}else g.removeEventListener("load",m,!1),g.removeEventListener("error",p,!1);r.removeChild(g)}var g=document.createElement("script");g.async=!0,s.metadata.crossOrigin&&(g.crossOrigin=s.metadata.crossOrigin),s.metadata.integrity&&g.setAttribute("integrity",s.metadata.integrity),l?(g.attachEvent("onreadystatechange",m),u.push({script:g,load:s})):(g.addEventListener("load",m,!1),g.addEventListener("error",p,!1)),c++,a=e.System,o=e.require,
	g.src=s.address,r.appendChild(g)}):t.call(this,s)}})}();var ae=/^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/;!function(){function t(e,n,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==C.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var a=0,o=e.normalizedDeps.length;o>a;a++){var i=e.normalizedDeps[a],s=n.defined[i];if(s&&!s.evaluated){var l=e.groupIndex+(s.declarative!=e.declarative);if(null===s.groupIndex||s.groupIndex<l){if(null!==s.groupIndex&&(r[s.groupIndex].splice(C.call(r[s.groupIndex],s),1),0==r[s.groupIndex].length))throw new Error("Mixed dependency cycle detected");s.groupIndex=l}t(s,n,r)}}}}function n(e,n){var r=n.defined[e];if(!r.module){r.groupIndex=0;var a=[];t(r,n,a);for(var o=!!r.declarative==a.length%2,s=a.length-1;s>=0;s--){for(var l=a[s],d=0;d<l.length;d++){var c=l[d];o?i(c,n):u(c,n)}o=!o}}}function a(){}function o(e,t){return t[e]||(t[e]={name:e,dependencies:[],exports:new a,importers:[]})}function i(t,n){if(!t.module){var r=n._loader.moduleRecords,a=t.module=o(t.name,r),s=t.module.exports,l=t.declare.call(e,function(e,t){if(a.locked=!0,"object"==typeof e)for(var n in e)s[n]=e[n];else s[e]=t;for(var r=0,o=a.importers.length;o>r;r++){var i=a.importers[r];if(!i.locked){var l=C.call(i.dependencies,a);i.setters[l](s)}}return a.locked=!1,t},{id:t.name});if(a.setters=l.setters,a.execute=l.execute,!a.setters||!a.execute)throw new TypeError("Invalid System.register form for "+t.name);for(var u=0,d=t.normalizedDeps.length;d>u;u++){var c,f=t.normalizedDeps[u],m=n.defined[f],p=r[f];p?c=p.exports:m&&!m.declarative?c=m.esModule:m?(i(m,n),p=m.module,c=p.exports):c=n.get(f),p&&p.importers?(p.importers.push(a),a.dependencies.push(p)):a.dependencies.push(null);for(var h=t.originalIndices[u],g=0,v=h.length;v>g;++g){var y=h[g];a.setters[y]&&a.setters[y](c)}}}}function s(e,t){var n,r=t.defined[e];if(r)r.declarative?p(e,[],t):r.evaluated||u(r,t),n=r.module.exports;else if(n=t.get(e),!n)throw new Error("Unable to load dependency "+e+".");return(!r||r.declarative)&&n&&n.__useDefault?n["default"]:n}function u(t,n){if(!t.module){var a={},o=t.module={exports:a,id:t.name};if(!t.executingRequire)for(var i=0,l=t.normalizedDeps.length;l>i;i++){var d=t.normalizedDeps[i],c=n.defined[d];c&&u(c,n)}t.evaluated=!0;var f=t.execute.call(e,function(e){for(var r=0,a=t.deps.length;a>r;r++)if(t.deps[r]==e)return s(t.normalizedDeps[r],n);var o=n.normalizeSync(e,t.name);if(-1!=C.call(t.normalizedDeps,o))return s(o,n);throw new Error("Module "+e+" not declared as a dependency of "+t.name)},a,o);f&&(o.exports=f),a=o.exports,a&&(a.__esModule||a instanceof r)?t.esModule=a:t.esmExports&&a!==e?t.esModule=m(a):t.esModule={"default":a}}}function p(t,n,r){var a=r.defined[t];if(a&&!a.evaluated&&a.declarative){n.push(t);for(var o=0,i=a.normalizedDeps.length;i>o;o++){var s=a.normalizedDeps[o];-1==C.call(n,s)&&(r.defined[s]?p(s,n,r):r.get(s))}a.evaluated||(a.evaluated=!0,a.module.execute.call(e))}}l.prototype.register=function(e,t,n){if("string"!=typeof e&&(n=t,t=e,e=null),"boolean"==typeof n)return this.registerDynamic.apply(this,arguments);var r=O();r.name=e&&(this.decanonicalize||this.normalize).call(this,e),r.declarative=!0,r.deps=t,r.declare=n,this.pushRegister_({amd:!1,entry:r})},l.prototype.registerDynamic=function(e,t,n,r){"string"!=typeof e&&(r=n,n=t,t=e,e=null);var a=O();a.name=e&&(this.decanonicalize||this.normalize).call(this,e),a.deps=t,a.execute=r,a.executingRequire=n,this.pushRegister_({amd:!1,entry:a})},d("reduceRegister_",function(){return function(e,t){if(t){var n=t.entry,r=e&&e.metadata;if(n.name&&(n.name in this.defined||(this.defined[n.name]=n),r&&(r.bundle=!0)),!n.name||e&&n.name==e.name){if(!r)throw new TypeError("Invalid System.register call. Anonymous System.register calls can only be made by modules loaded by SystemJS.import and not via script tags.");if(r.entry)throw"register"==r.format?new Error("Multiple anonymous System.register calls in module "+e.name+". If loading a bundle, ensure all the System.register calls are named."):new Error("Module "+e.name+" interpreted as "+r.format+" module format, but called System.register.");r.format||(r.format="register"),r.entry=n}}}}),c(function(e){return function(){e.call(this),this.defined={},this._loader.moduleRecords={}}}),A(a,"toString",{value:function(){return"Module"}}),d("delete",function(e){return function(t){return delete this._loader.moduleRecords[t],delete this.defined[t],e.call(this,t)}}),d("fetch",function(e){return function(t){return this.defined[t.name]?(t.metadata.format="defined",""):(t.metadata.deps=t.metadata.deps||[],e.call(this,t))}}),d("translate",function(e){return function(t){return t.metadata.deps=t.metadata.deps||[],Promise.resolve(e.call(this,t)).then(function(e){return("register"==t.metadata.format||!t.metadata.format&&_(t.source))&&(t.metadata.format="register"),e})}}),d("instantiate",function(e){return function(t){"detect"==t.metadata.format&&(t.metadata.format=void 0),e.call(this,t);var r,a=this;if(a.defined[t.name])r=a.defined[t.name],r.declarative||(r.deps=r.deps.concat(t.metadata.deps));else if(t.metadata.entry)r=t.metadata.entry,r.deps=r.deps.concat(t.metadata.deps);else if(!(a.builder&&t.metadata.bundle||"register"!=t.metadata.format&&"esm"!=t.metadata.format&&"es6"!=t.metadata.format)){if("undefined"!=typeof __exec&&__exec.call(a,t),!t.metadata.entry&&!t.metadata.bundle)throw new Error(t.name+" detected as "+t.metadata.format+" but didn't execute.");r=t.metadata.entry,r&&t.metadata.deps&&(r.deps=r.deps.concat(t.metadata.deps))}r||(r=O(),r.deps=t.metadata.deps,r.execute=function(){}),a.defined[t.name]=r;var o=f(r.deps);r.deps=o.names,r.originalIndices=o.indices,r.name=t.name,r.esmExports=t.metadata.esmExports!==!1;for(var i=[],s=0,l=r.deps.length;l>s;s++)i.push(Promise.resolve(a.normalize(r.deps[s],t.name)));return Promise.all(i).then(function(e){return r.normalizedDeps=e,{deps:r.deps,execute:function(){return n(t.name,a),p(t.name,[],a),a.defined[t.name]=void 0,a.newModule(r.declarative?r.module.exports:r.esModule)}}})}})}(),d("reduceRegister_",function(e){return function(t,n){if(n||!t.metadata.exports)return e.call(this,t,n);t.metadata.format="global";var r=t.metadata.entry=O();r.deps=t.metadata.deps;var a=R(t.metadata.exports);r.execute=function(){return a}}}),c(function(t){return function(){function n(t){if(Object.keys)Object.keys(e).forEach(t);else for(var n in e)i.call(e,n)&&t(n)}function r(t){n(function(n){if(-1==C.call(s,n)){try{var r=e[n]}catch(a){s.push(n)}t(n,r)}})}var a=this;t.call(a);var o,i=Object.prototype.hasOwnProperty,s=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];a.set("@@global-helpers",a.newModule({prepareGlobal:function(t,n,a){var i=e.define;e.define=void 0;var s;if(a){s={};for(var l in a)s[l]=e[l],e[l]=a[l]}return n||(o={},r(function(e,t){o[e]=t})),function(){var t;if(n)t=R(n);else{t={};var a,l;r(function(e,n){o[e]!==n&&"undefined"!=typeof n&&(t[e]=n,"undefined"!=typeof a?l||a===n||(l=!0):a=n)}),t=l?t:a}if(s)for(var u in s)e[u]=s[u];return e.define=i,t}}}))}}),c(function(e){return function(){function t(e){return"file:///"==e.substr(0,8)?e.substr(7+!!q):r&&e.substr(0,r.length)==r?e.substr(r.length):e}var n=this;if(e.call(n),"undefined"!=typeof window&&"undefined"!=typeof document&&window.location)var r=location.protocol+"//"+location.hostname+(location.port?":"+location.port:"");n.set("@@cjs-helpers",n.newModule({requireResolve:function(e,r){return t(n.normalizeSync(e,r))},getPathVars:function(e){var n,r=e.lastIndexOf("!");n=-1!=r?e.substr(0,r):e;var a=n.split("/");return a.pop(),a=a.join("/"),{filename:t(n),dirname:t(a)}}}))}}),d("fetch",function(t){return function(n){return n.metadata.scriptLoad&&J&&(e.define=this.amdDefine),t.call(this,n)}}),c(function(t){return function(){function n(e,t){e=e.replace(i,"");var n=e.match(u),r=(n[1].split(",")[t]||"require").replace(c,""),a=f[r]||(f[r]=new RegExp(s+r+l,"g"));a.lastIndex=0;for(var o,d=[];o=a.exec(e);)d.push(o[2]||o[3]);return d}function r(e,t,n,a){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof t&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var i=o.defaultJSExtensions&&".js"!=e.substr(e.length-3,3),s=o.decanonicalize(e,a);i&&".js"==s.substr(s.length-3,3)&&(s=s.substr(0,s.length-3));var l=o.get(s);if(!l)throw new Error('Module not already loaded loading "'+e+'" as '+s+(a?' from "'+a+'".':"."));return l.__useDefault?l["default"]:l}throw new TypeError("Invalid require")}for(var u=[],d=0;d<e.length;d++)u.push(o["import"](e[d],a));Promise.all(u).then(function(e){t&&t.apply(null,e)},n)}function a(t,a,i){function s(t,n,s){function c(e,n,a){return"string"==typeof e&&"function"!=typeof n?t(e):r.call(o,e,n,a,s.id)}for(var f=[],m=0;m<a.length;m++)f.push(t(a[m]));s.uri=s.id,s.config=function(){},-1!=d&&f.splice(d,0,s),-1!=u&&f.splice(u,0,n),-1!=l&&(c.toUrl=function(e){var t=o.defaultJSExtensions&&".js"!=e.substr(e.length-3,3),n=o.decanonicalize(e,s.id);return t&&".js"==n.substr(n.length-3,3)&&(n=n.substr(0,n.length-3)),n},f.splice(l,0,c));var p=e.require;e.require=r;var h=i.apply(-1==u?e:n,f);return e.require=p,"undefined"==typeof h&&s&&(h=s.exports),"undefined"!=typeof h?h:void 0}"string"!=typeof t&&(i=a,a=t,t=null),a instanceof Array||(i=a,a=["require","exports","module"].splice(0,i.length)),"function"!=typeof i&&(i=function(e){return function(){return e}}(i)),void 0===a[a.length-1]&&a.pop();var l,u,d;-1!=(l=C.call(a,"require"))&&(a.splice(l,1),t||(a=a.concat(n(i.toString(),l)))),-1!=(u=C.call(a,"exports"))&&a.splice(u,1),-1!=(d=C.call(a,"module"))&&a.splice(d,1);var c=O();c.name=t&&(o.decanonicalize||o.normalize).call(o,t),c.deps=a,c.execute=s,o.pushRegister_({amd:!0,entry:c})}var o=this;t.call(this);var i=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,s="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",l="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",u=/\(([^\)]*)\)/,c=/^\s+|\s+$/g,f={};a.amd={},d("reduceRegister_",function(e){return function(t,n){if(!n||!n.amd)return e.call(this,t,n);var r=t&&t.metadata,a=n.entry;if(r)if(r.format&&"detect"!=r.format){if(!a.name&&"amd"!=r.format)throw new Error("AMD define called while executing "+r.format+" module "+t.name)}else r.format="amd";if(a.name)r&&(r.entry||r.bundle?r.entry&&r.entry.name&&(r.entry=void 0):r.entry=a,r.bundle=!0),a.name in this.defined||(this.defined[a.name]=a);else{if(!r)throw new TypeError("Unexpected anonymous AMD define.");if(r.entry&&!r.entry.name)throw new Error("Multiple anonymous defines in module "+t.name);r.entry=a}}}),o.amdDefine=a,o.amdRequire=r}}),function(){function e(e,t){if(t){var n;if(e.pluginFirst){if(-1!=(n=t.lastIndexOf("!")))return t.substr(n+1)}else if(-1!=(n=t.indexOf("!")))return t.substr(0,n);return t}}function t(e,t){var n,r,a=t.lastIndexOf("!");return-1!=a?(e.pluginFirst?(n=t.substr(a+1),r=t.substr(0,a)):(n=t.substr(0,a),r=t.substr(a+1)||n.substr(n.lastIndexOf(".")+1)),{argument:n,plugin:r}):void 0}function n(e,t,n,r){return r&&".js"==t.substr(t.length-3,3)&&(t=t.substr(0,t.length-3)),e.pluginFirst?n+"!"+t:t+"!"+n}function r(e,t){return e.defaultJSExtensions&&".js"!=t.substr(t.length-3,3)}function a(a){return function(o,i,s){var l=this;i=e(this,i);var u=t(l,o);if(!u)return a.call(this,o,i,s);var d=l.normalizeSync(u.argument,i,!0),c=l.normalizeSync(u.plugin,i,!0);return n(l,d,c,r(l,u.argument))}}d("decanonicalize",a),d("normalizeSync",a),d("normalize",function(a){return function(o,i,s){var l=this;i=e(this,i);var u=t(l,o);return u?Promise.all([l.normalize(u.argument,i,!0),l.normalize(u.plugin,i)]).then(function(e){return n(l,e[0],e[1],r(l,u.argument))}):a.call(l,o,i,s)}}),d("locate",function(e){return function(t){var n,r=this,a=t.name;return r.pluginFirst?-1!=(n=a.indexOf("!"))&&(t.metadata.loader=a.substr(0,n),t.name=a.substr(n+1)):-1!=(n=a.lastIndexOf("!"))&&(t.metadata.loader=a.substr(n+1),t.name=a.substr(0,n)),e.call(r,t).then(function(e){return-1==n&&t.metadata.loader?r.normalize(t.metadata.loader,t.name).then(function(n){return t.metadata.loader=n,e}):e}).then(function(e){var n=t.metadata.loader;if(!n)return e;if(t.name==n)throw new Error("Plugin "+n+" cannot load itself, make sure it is excluded from any wildcard meta configuration via a custom loader: false rule.");if(r.defined&&r.defined[a])return e;var o=r.pluginLoader||r;return o["import"](n).then(function(n){return t.metadata.loaderModule=n,t.address=e,n.locate?n.locate.call(r,t):e})})}}),d("fetch",function(e){return function(t){var n=this;return t.metadata.loaderModule&&t.metadata.loaderModule.fetch&&"defined"!=t.metadata.format?(t.metadata.scriptLoad=!1,t.metadata.loaderModule.fetch.call(n,t,function(t){return e.call(n,t)})):e.call(n,t)}}),d("translate",function(e){return function(t){var n=this;return t.metadata.loaderModule&&t.metadata.loaderModule.translate&&"defined"!=t.metadata.format?Promise.resolve(t.metadata.loaderModule.translate.call(n,t)).then(function(r){var a=t.metadata.sourceMap;if(a){if("object"!=typeof a)throw new Error("load.metadata.sourceMap must be set to an object.");var o=t.name.split("!")[0];a.file=o+"!transpiled",(!a.sources||a.sources.length<=1)&&(a.sources=[o])}return"string"==typeof r?t.source=r:y.call(this,"Plugin "+t.metadata.loader+" should return the source in translate, instead of setting load.source directly. This support will be deprecated."),e.call(n,t)}):e.call(n,t)}}),d("instantiate",function(e){return function(t){var n=this,r=!1;return t.metadata.loaderModule&&t.metadata.loaderModule.instantiate&&!n.builder&&"defined"!=t.metadata.format?Promise.resolve(t.metadata.loaderModule.instantiate.call(n,t,function(t){if(r)throw new Error("Instantiate must only be called once.");return r=!0,e.call(n,t)})).then(function(a){return r?a:(t.metadata.entry=O(),t.metadata.entry.execute=function(){return a},t.metadata.entry.deps=t.metadata.deps,t.metadata.format="defined",e.call(n,t))}):e.call(n,t)}})}();var oe=/#\{[^\}]+\}/;d("normalize",function(e){return function(t,n,r){var a=this;return T.call(a,t,n).then(function(t){return e.call(a,t,n,r)}).then(function(e){return L.call(a,e,n)})}}),function(){d("fetch",function(e){return function(t){var n=t.metadata.alias,r=t.metadata.deps||[];if(n){t.metadata.format="defined";var a=O();return this.defined[t.name]=a,a.declarative=!0,a.deps=r.concat([n]),a.declare=function(e){return{setters:[function(t){for(var n in t)e(n,t[n]);t.__useDefault&&(a.module.exports.__useDefault=!0)}],execute:function(){}}},""}return e.call(this,t)}})}(),function(){function e(e,t,n){for(var r,a=t.split(".");a.length>1;)r=a.shift(),e=e[r]=e[r]||{};r=a.shift(),r in e||(e[r]=n)}c(function(e){return function(){this.meta={},e.call(this)}}),d("locate",function(e){return function(t){var n,r=this.meta,a=t.name,o=0;for(var i in r)if(n=i.indexOf("*"),-1!==n&&i.substr(0,n)===a.substr(0,n)&&i.substr(n+1)===a.substr(a.length-i.length+n+1)){var s=i.split("/").length;s>o&&(o=s),v(t.metadata,r[i],o!=s)}return r[a]&&v(t.metadata,r[a]),e.call(this,t)}});var t=/^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/,n=/\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;d("translate",function(r){return function(a){var o=a.source.match(t);if(o)for(var i=o[0].match(n),s=0;s<i.length;s++){var l=i[s],u=l.length,d=l.substr(0,1);if(";"==l.substr(u-1,1)&&u--,'"'==d||"'"==d){var c=l.substr(1,l.length-3),f=c.substr(0,c.indexOf(" "));if(f){var m=c.substr(f.length+1,c.length-f.length-1);"[]"==f.substr(f.length-2,2)?(f=f.substr(0,f.length-2),a.metadata[f]=a.metadata[f]||[],a.metadata[f].push(m)):a.metadata[f]instanceof Array?(y.call(this,"Module "+a.name+' contains deprecated "deps '+m+'" meta syntax.\nThis should be updated to "deps[] '+m+'" for pushing to array meta.'),a.metadata[f].push(m)):e(a.metadata,f,m)}else a.metadata[c]=!0}}return r.call(this,a)}})}(),function(){c(function(e){return function(){e.call(this),this.bundles={},this._loader.loadedBundles={}}}),d("locate",function(e){return function(t){var n=this,r=!1;if(!(t.name in n.defined))for(var a in n.bundles){for(var o=0;o<n.bundles[a].length;o++){var i=n.bundles[a][o];if(i==t.name){r=!0;break}if(-1!=i.indexOf("*")){var s=i.split("*");if(2!=s.length){n.bundles[a].splice(o--,1);continue}if(t.name.substring(0,s[0].length)==s[0]&&t.name.substr(t.name.length-s[1].length,s[1].length)==s[1]&&-1==t.name.substr(s[0].length,t.name.length-s[1].length-s[0].length).indexOf("/")){r=!0;break}}}if(r)return n["import"](a).then(function(){return e.call(n,t)})}return e.call(n,t)}})}(),function(){c(function(e){return function(){e.call(this),this.depCache={}}}),d("locate",function(e){return function(t){var n=this,r=n.depCache[t.name];if(r)for(var a=0;a<r.length;a++)n["import"](r[a],t.name);return e.call(n,t)}})}(),c(function(t){return function(){t.apply(this,arguments),e.define=this.amdDefine}}),d("fetch",function(e){return function(t){return t.metadata.scriptLoad=!0,e.call(this,t)}}),X=new l,e.SystemJS=X,X.version="0.19.27 CSP","object"==typeof exports&&(module.exports=a),e.Reflect=e.Reflect||{},e.Reflect.Loader=e.Reflect.Loader||a,e.Reflect.global=e.Reflect.global||e,e.LoaderPolyfill=a,X||(X=new o,X.constructor=o),"object"==typeof exports&&(module.exports=X),e.System=X}("undefined"!=typeof self?self:global)}var t="undefined"==typeof Promise;if("undefined"!=typeof document){var n=document.getElementsByTagName("script");if($__curScript=n[n.length-1],t){var r=$__curScript.src,a=r.substr(0,r.lastIndexOf("/")+1);window.systemJSBootstrap=e,document.write('<script type="text/javascript" src="'+a+'system-polyfills.js"></script>')}else e()}else if("undefined"!=typeof importScripts){var a="";try{throw new Error("_")}catch(o){o.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/,function(e,t){$__curScript={src:t},a=t.replace(/\/[^\/]*$/,"/")})}t&&importScripts(a+"system-polyfills.js"),e()}else $__curScript= true?{src:__filename}:null,e()}();
	//# sourceMappingURL=system-csp-production.js.map

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1), "/index.js"))

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process, __filename) {/*
	 * SystemJS v0.19.27
	 */
	(function() {
	function bootstrap() {// from https://gist.github.com/Yaffle/1088850
	(function(global) {
	function URLPolyfill(url, baseURL) {
	  if (typeof url != 'string')
	    throw new TypeError('URL must be a string');
	  var m = String(url).replace(/^\s+|\s+$/g, "").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
	  if (!m)
	    throw new RangeError('Invalid URL format');
	  var protocol = m[1] || "";
	  var username = m[2] || "";
	  var password = m[3] || "";
	  var host = m[4] || "";
	  var hostname = m[5] || "";
	  var port = m[6] || "";
	  var pathname = m[7] || "";
	  var search = m[8] || "";
	  var hash = m[9] || "";
	  if (baseURL !== undefined) {
	    var base = baseURL instanceof URLPolyfill ? baseURL : new URLPolyfill(baseURL);
	    var flag = !protocol && !host && !username;
	    if (flag && !pathname && !search)
	      search = base.search;
	    if (flag && pathname[0] !== "/")
	      pathname = (pathname ? (((base.host || base.username) && !base.pathname ? "/" : "") + base.pathname.slice(0, base.pathname.lastIndexOf("/") + 1) + pathname) : base.pathname);
	    // dot segments removal
	    var output = [];
	    pathname.replace(/^(\.\.?(\/|$))+/, "")
	      .replace(/\/(\.(\/|$))+/g, "/")
	      .replace(/\/\.\.$/, "/../")
	      .replace(/\/?[^\/]*/g, function (p) {
	        if (p === "/..")
	          output.pop();
	        else
	          output.push(p);
	      });
	    pathname = output.join("").replace(/^\//, pathname[0] === "/" ? "/" : "");
	    if (flag) {
	      port = base.port;
	      hostname = base.hostname;
	      host = base.host;
	      password = base.password;
	      username = base.username;
	    }
	    if (!protocol)
	      protocol = base.protocol;
	  }

	  // convert windows file URLs to use /
	  if (protocol == 'file:')
	    pathname = pathname.replace(/\\/g, '/');

	  this.origin = host ? protocol + (protocol !== "" || host !== "" ? "//" : "") + host : "";
	  this.href = protocol + (protocol && host || protocol == "file:" ? "//" : "") + (username !== "" ? username + (password !== "" ? ":" + password : "") + "@" : "") + host + pathname + search + hash;
	  this.protocol = protocol;
	  this.username = username;
	  this.password = password;
	  this.host = host;
	  this.hostname = hostname;
	  this.port = port;
	  this.pathname = pathname;
	  this.search = search;
	  this.hash = hash;
	}
	global.URLPolyfill = URLPolyfill;
	})(typeof self != 'undefined' ? self : global);(function(__global) {

	  var isWorker = typeof window == 'undefined' && typeof self != 'undefined' && typeof importScripts != 'undefined';
	  var isBrowser = typeof window != 'undefined' && typeof document != 'undefined';
	  var isWindows = typeof process != 'undefined' && typeof process.platform != 'undefined' && !!process.platform.match(/^win/);

	  if (!__global.console)
	    __global.console = { assert: function() {} };

	  // IE8 support
	  var indexOf = Array.prototype.indexOf || function(item) {
	    for (var i = 0, thisLen = this.length; i < thisLen; i++) {
	      if (this[i] === item) {
	        return i;
	      }
	    }
	    return -1;
	  };
	  
	  var defineProperty;
	  (function () {
	    try {
	      if (!!Object.defineProperty({}, 'a', {}))
	        defineProperty = Object.defineProperty;
	    }
	    catch (e) {
	      defineProperty = function(obj, prop, opt) {
	        try {
	          obj[prop] = opt.value || opt.get.call(obj);
	        }
	        catch(e) {}
	      }
	    }
	  })();

	  var errArgs = new Error(0, '_').fileName == '_';

	  function addToError(err, msg) {
	    // parse the stack removing loader code lines for simplification
	    if (!err.originalErr) {
	      var stack = (err.stack || err.message || err).split('\n');
	      var newStack = [];
	      for (var i = 0; i < stack.length; i++) {
	        if (typeof $__curScript == 'undefined' || stack[i].indexOf($__curScript.src) == -1)
	          newStack.push(stack[i]);
	      }
	    }

	    var newMsg = (newStack ? newStack.join('\n\t') : err.message) + '\n\t' + msg;

	    // Convert file:/// URLs to paths in Node
	    if (!isBrowser)
	      newMsg = newMsg.replace(isWindows ? /file:\/\/\//g : /file:\/\//g, '');

	    var newErr = errArgs ? new Error(newMsg, err.fileName, err.lineNumber) : new Error(newMsg);
	    
	    // Node needs stack adjustment for throw to show message
	    if (!isBrowser)
	      newErr.stack = newMsg;
	    // Clearing the stack stops unnecessary loader lines showing
	    else
	      newErr.stack = null;
	    
	    // track the original error
	    newErr.originalErr = err.originalErr || err;

	    return newErr;
	  }

	  function __eval(source, debugName, context) {
	    try {
	      new Function(source).call(context);
	    }
	    catch(e) {
	      throw addToError(e, 'Evaluating ' + debugName);
	    }
	  }

	  var baseURI;
	  // environent baseURI detection
	  if (typeof document != 'undefined' && document.getElementsByTagName) {
	    baseURI = document.baseURI;

	    if (!baseURI) {
	      var bases = document.getElementsByTagName('base');
	      baseURI = bases[0] && bases[0].href || window.location.href;
	    }

	    // sanitize out the hash and querystring
	    baseURI = baseURI.split('#')[0].split('?')[0];
	    baseURI = baseURI.substr(0, baseURI.lastIndexOf('/') + 1);
	  }
	  else if (typeof process != 'undefined' && process.cwd) {
	    baseURI = 'file://' + (isWindows ? '/' : '') + process.cwd() + '/';
	    if (isWindows)
	      baseURI = baseURI.replace(/\\/g, '/');
	  }
	  else if (typeof location != 'undefined') {
	    baseURI = __global.location.href;
	  }
	  else {
	    throw new TypeError('No environment baseURI');
	  }

	  try {
	    var nativeURL = new __global.URL('test:///').protocol == 'test:';
	  }
	  catch(e) {}

	  var URL = nativeURL ? __global.URL : __global.URLPolyfill;
	/*
	*********************************************************************************************

	  Dynamic Module Loader Polyfill

	    - Implemented exactly to the former 2014-08-24 ES6 Specification Draft Rev 27, Section 15
	      http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts#august_24_2014_draft_rev_27

	    - Functions are commented with their spec numbers, with spec differences commented.

	    - Spec bugs are commented in this code with links.

	    - Abstract functions have been combined where possible, and their associated functions
	      commented.

	    - Realm implementation is entirely omitted.

	*********************************************************************************************
	*/

	function Module() {}
	// http://www.ecma-international.org/ecma-262/6.0/#sec-@@tostringtag
	defineProperty(Module.prototype, 'toString', {
	  value: function() {
	    return 'Module';
	  }
	});
	function Loader(options) {
	  this._loader = {
	    loaderObj: this,
	    loads: [],
	    modules: {},
	    importPromises: {},
	    moduleRecords: {}
	  };

	  // 26.3.3.6
	  defineProperty(this, 'global', {
	    get: function() {
	      return __global;
	    }
	  });

	  // 26.3.3.13 realm not implemented
	}

	(function() {

	// Some Helpers

	// logs a linkset snapshot for debugging
	/* function snapshot(loader) {
	  console.log('---Snapshot---');
	  for (var i = 0; i < loader.loads.length; i++) {
	    var load = loader.loads[i];
	    var linkSetLog = '  ' + load.name + ' (' + load.status + '): ';

	    for (var j = 0; j < load.linkSets.length; j++) {
	      linkSetLog += '{' + logloads(load.linkSets[j].loads) + '} ';
	    }
	    console.log(linkSetLog);
	  }
	  console.log('');
	}
	function logloads(loads) {
	  var log = '';
	  for (var k = 0; k < loads.length; k++)
	    log += loads[k].name + (k != loads.length - 1 ? ' ' : '');
	  return log;
	} */


	/* function checkInvariants() {
	  // see https://bugs.ecmascript.org/show_bug.cgi?id=2603#c1

	  var loads = System._loader.loads;
	  var linkSets = [];

	  for (var i = 0; i < loads.length; i++) {
	    var load = loads[i];
	    console.assert(load.status == 'loading' || load.status == 'loaded', 'Each load is loading or loaded');

	    for (var j = 0; j < load.linkSets.length; j++) {
	      var linkSet = load.linkSets[j];

	      for (var k = 0; k < linkSet.loads.length; k++)
	        console.assert(loads.indexOf(linkSet.loads[k]) != -1, 'linkSet loads are a subset of loader loads');

	      if (linkSets.indexOf(linkSet) == -1)
	        linkSets.push(linkSet);
	    }
	  }

	  for (var i = 0; i < loads.length; i++) {
	    var load = loads[i];
	    for (var j = 0; j < linkSets.length; j++) {
	      var linkSet = linkSets[j];

	      if (linkSet.loads.indexOf(load) != -1)
	        console.assert(load.linkSets.indexOf(linkSet) != -1, 'linkSet contains load -> load contains linkSet');

	      if (load.linkSets.indexOf(linkSet) != -1)
	        console.assert(linkSet.loads.indexOf(load) != -1, 'load contains linkSet -> linkSet contains load');
	    }
	  }

	  for (var i = 0; i < linkSets.length; i++) {
	    var linkSet = linkSets[i];
	    for (var j = 0; j < linkSet.loads.length; j++) {
	      var load = linkSet.loads[j];

	      for (var k = 0; k < load.dependencies.length; k++) {
	        var depName = load.dependencies[k].value;
	        var depLoad;
	        for (var l = 0; l < loads.length; l++) {
	          if (loads[l].name != depName)
	            continue;
	          depLoad = loads[l];
	          break;
	        }

	        // loading records are allowed not to have their dependencies yet
	        // if (load.status != 'loading')
	        //  console.assert(depLoad, 'depLoad found');

	        // console.assert(linkSet.loads.indexOf(depLoad) != -1, 'linkset contains all dependencies');
	      }
	    }
	  }
	} */

	  // 15.2.3 - Runtime Semantics: Loader State

	  // 15.2.3.11
	  function createLoaderLoad(object) {
	    return {
	      // modules is an object for ES5 implementation
	      modules: {},
	      loads: [],
	      loaderObj: object
	    };
	  }

	  // 15.2.3.2 Load Records and LoadRequest Objects

	  // 15.2.3.2.1
	  function createLoad(name) {
	    return {
	      status: 'loading',
	      name: name,
	      linkSets: [],
	      dependencies: [],
	      metadata: {}
	    };
	  }

	  // 15.2.3.2.2 createLoadRequestObject, absorbed into calling functions

	  // 15.2.4

	  // 15.2.4.1
	  function loadModule(loader, name, options) {
	    return new Promise(asyncStartLoadPartwayThrough({
	      step: options.address ? 'fetch' : 'locate',
	      loader: loader,
	      moduleName: name,
	      // allow metadata for import https://bugs.ecmascript.org/show_bug.cgi?id=3091
	      moduleMetadata: options && options.metadata || {},
	      moduleSource: options.source,
	      moduleAddress: options.address
	    }));
	  }

	  // 15.2.4.2
	  function requestLoad(loader, request, refererName, refererAddress) {
	    // 15.2.4.2.1 CallNormalize
	    return new Promise(function(resolve, reject) {
	      resolve(loader.loaderObj.normalize(request, refererName, refererAddress));
	    })
	    // 15.2.4.2.2 GetOrCreateLoad
	    .then(function(name) {
	      var load;
	      if (loader.modules[name]) {
	        load = createLoad(name);
	        load.status = 'linked';
	        // https://bugs.ecmascript.org/show_bug.cgi?id=2795
	        load.module = loader.modules[name];
	        return load;
	      }

	      for (var i = 0, l = loader.loads.length; i < l; i++) {
	        load = loader.loads[i];
	        if (load.name != name)
	          continue;
	        console.assert(load.status == 'loading' || load.status == 'loaded', 'loading or loaded');
	        return load;
	      }

	      load = createLoad(name);
	      loader.loads.push(load);

	      proceedToLocate(loader, load);

	      return load;
	    });
	  }

	  // 15.2.4.3
	  function proceedToLocate(loader, load) {
	    proceedToFetch(loader, load,
	      Promise.resolve()
	      // 15.2.4.3.1 CallLocate
	      .then(function() {
	        return loader.loaderObj.locate({ name: load.name, metadata: load.metadata });
	      })
	    );
	  }

	  // 15.2.4.4
	  function proceedToFetch(loader, load, p) {
	    proceedToTranslate(loader, load,
	      p
	      // 15.2.4.4.1 CallFetch
	      .then(function(address) {
	        // adjusted, see https://bugs.ecmascript.org/show_bug.cgi?id=2602
	        if (load.status != 'loading')
	          return;
	        load.address = address;

	        return loader.loaderObj.fetch({ name: load.name, metadata: load.metadata, address: address });
	      })
	    );
	  }

	  var anonCnt = 0;

	  // 15.2.4.5
	  function proceedToTranslate(loader, load, p) {
	    p
	    // 15.2.4.5.1 CallTranslate
	    .then(function(source) {
	      if (load.status != 'loading')
	        return;

	      return Promise.resolve(loader.loaderObj.translate({ name: load.name, metadata: load.metadata, address: load.address, source: source }))

	      // 15.2.4.5.2 CallInstantiate
	      .then(function(source) {
	        load.source = source;
	        return loader.loaderObj.instantiate({ name: load.name, metadata: load.metadata, address: load.address, source: source });
	      })

	      // 15.2.4.5.3 InstantiateSucceeded
	      .then(function(instantiateResult) {
	        if (instantiateResult === undefined) {
	          load.address = load.address || '<Anonymous Module ' + ++anonCnt + '>';

	          // instead of load.kind, use load.isDeclarative
	          load.isDeclarative = true;
	          return transpile.call(loader.loaderObj, load)
	          .then(function(transpiled) {
	            // Hijack System.register to set declare function
	            var curSystem = __global.System;
	            var curRegister = curSystem.register;
	            curSystem.register = function(name, deps, declare) {
	              if (typeof name != 'string') {
	                declare = deps;
	                deps = name;
	              }
	              // store the registered declaration as load.declare
	              // store the deps as load.deps
	              load.declare = declare;
	              load.depsList = deps;
	            }
	            // empty {} context is closest to undefined 'this' we can get
	            __eval(transpiled, load.address, {});
	            curSystem.register = curRegister;
	          });
	        }
	        else if (typeof instantiateResult == 'object') {
	          load.depsList = instantiateResult.deps || [];
	          load.execute = instantiateResult.execute;
	          load.isDeclarative = false;
	        }
	        else
	          throw TypeError('Invalid instantiate return value');
	      })
	      // 15.2.4.6 ProcessLoadDependencies
	      .then(function() {
	        load.dependencies = [];
	        var depsList = load.depsList;

	        var loadPromises = [];
	        for (var i = 0, l = depsList.length; i < l; i++) (function(request, index) {
	          loadPromises.push(
	            requestLoad(loader, request, load.name, load.address)

	            // 15.2.4.6.1 AddDependencyLoad (load is parentLoad)
	            .then(function(depLoad) {

	              // adjusted from spec to maintain dependency order
	              // this is due to the System.register internal implementation needs
	              load.dependencies[index] = {
	                key: request,
	                value: depLoad.name
	              };

	              if (depLoad.status != 'linked') {
	                var linkSets = load.linkSets.concat([]);
	                for (var i = 0, l = linkSets.length; i < l; i++)
	                  addLoadToLinkSet(linkSets[i], depLoad);
	              }

	              // console.log('AddDependencyLoad ' + depLoad.name + ' for ' + load.name);
	              // snapshot(loader);
	            })
	          );
	        })(depsList[i], i);

	        return Promise.all(loadPromises);
	      })

	      // 15.2.4.6.2 LoadSucceeded
	      .then(function() {
	        // console.log('LoadSucceeded ' + load.name);
	        // snapshot(loader);

	        console.assert(load.status == 'loading', 'is loading');

	        load.status = 'loaded';

	        var linkSets = load.linkSets.concat([]);
	        for (var i = 0, l = linkSets.length; i < l; i++)
	          updateLinkSetOnLoad(linkSets[i], load);
	      });
	    })
	    // 15.2.4.5.4 LoadFailed
	    ['catch'](function(exc) {
	      load.status = 'failed';
	      load.exception = exc;

	      var linkSets = load.linkSets.concat([]);
	      for (var i = 0, l = linkSets.length; i < l; i++) {
	        linkSetFailed(linkSets[i], load, exc);
	      }

	      console.assert(load.linkSets.length == 0, 'linkSets not removed');
	    });
	  }

	  // 15.2.4.7 PromiseOfStartLoadPartwayThrough absorbed into calling functions

	  // 15.2.4.7.1
	  function asyncStartLoadPartwayThrough(stepState) {
	    return function(resolve, reject) {
	      var loader = stepState.loader;
	      var name = stepState.moduleName;
	      var step = stepState.step;

	      if (loader.modules[name])
	        throw new TypeError('"' + name + '" already exists in the module table');

	      // adjusted to pick up existing loads
	      var existingLoad;
	      for (var i = 0, l = loader.loads.length; i < l; i++) {
	        if (loader.loads[i].name == name) {
	          existingLoad = loader.loads[i];

	          if (step == 'translate' && !existingLoad.source) {
	            existingLoad.address = stepState.moduleAddress;
	            proceedToTranslate(loader, existingLoad, Promise.resolve(stepState.moduleSource));
	          }

	          // a primary load -> use that existing linkset if it is for the direct load here
	          // otherwise create a new linkset unit
	          if (existingLoad.linkSets.length && existingLoad.linkSets[0].loads[0].name == existingLoad.name)
	            return existingLoad.linkSets[0].done.then(function() {
	              resolve(existingLoad);
	            });
	        }
	      }

	      var load = existingLoad || createLoad(name);

	      load.metadata = stepState.moduleMetadata;

	      var linkSet = createLinkSet(loader, load);

	      loader.loads.push(load);

	      resolve(linkSet.done);

	      if (step == 'locate')
	        proceedToLocate(loader, load);

	      else if (step == 'fetch')
	        proceedToFetch(loader, load, Promise.resolve(stepState.moduleAddress));

	      else {
	        console.assert(step == 'translate', 'translate step');
	        load.address = stepState.moduleAddress;
	        proceedToTranslate(loader, load, Promise.resolve(stepState.moduleSource));
	      }
	    }
	  }

	  // Declarative linking functions run through alternative implementation:
	  // 15.2.5.1.1 CreateModuleLinkageRecord not implemented
	  // 15.2.5.1.2 LookupExport not implemented
	  // 15.2.5.1.3 LookupModuleDependency not implemented

	  // 15.2.5.2.1
	  function createLinkSet(loader, startingLoad) {
	    var linkSet = {
	      loader: loader,
	      loads: [],
	      startingLoad: startingLoad, // added see spec bug https://bugs.ecmascript.org/show_bug.cgi?id=2995
	      loadingCount: 0
	    };
	    linkSet.done = new Promise(function(resolve, reject) {
	      linkSet.resolve = resolve;
	      linkSet.reject = reject;
	    });
	    addLoadToLinkSet(linkSet, startingLoad);
	    return linkSet;
	  }
	  // 15.2.5.2.2
	  function addLoadToLinkSet(linkSet, load) {
	    if (load.status == 'failed')
	      return;

	    console.assert(load.status == 'loading' || load.status == 'loaded', 'loading or loaded on link set');

	    for (var i = 0, l = linkSet.loads.length; i < l; i++)
	      if (linkSet.loads[i] == load)
	        return;

	    linkSet.loads.push(load);
	    load.linkSets.push(linkSet);

	    // adjustment, see https://bugs.ecmascript.org/show_bug.cgi?id=2603
	    if (load.status != 'loaded') {
	      linkSet.loadingCount++;
	    }

	    var loader = linkSet.loader;

	    for (var i = 0, l = load.dependencies.length; i < l; i++) {
	      if (!load.dependencies[i])
	        continue;

	      var name = load.dependencies[i].value;

	      if (loader.modules[name])
	        continue;

	      for (var j = 0, d = loader.loads.length; j < d; j++) {
	        if (loader.loads[j].name != name)
	          continue;

	        addLoadToLinkSet(linkSet, loader.loads[j]);
	        break;
	      }
	    }
	    // console.log('add to linkset ' + load.name);
	    // snapshot(linkSet.loader);
	  }

	  // linking errors can be generic or load-specific
	  // this is necessary for debugging info
	  function doLink(linkSet) {
	    var error = false;
	    try {
	      link(linkSet, function(load, exc) {
	        linkSetFailed(linkSet, load, exc);
	        error = true;
	      });
	    }
	    catch(e) {
	      linkSetFailed(linkSet, null, e);
	      error = true;
	    }
	    return error;
	  }

	  // 15.2.5.2.3
	  function updateLinkSetOnLoad(linkSet, load) {
	    // console.log('update linkset on load ' + load.name);
	    // snapshot(linkSet.loader);

	    console.assert(load.status == 'loaded' || load.status == 'linked', 'loaded or linked');

	    linkSet.loadingCount--;

	    if (linkSet.loadingCount > 0)
	      return;

	    // adjusted for spec bug https://bugs.ecmascript.org/show_bug.cgi?id=2995
	    var startingLoad = linkSet.startingLoad;

	    // non-executing link variation for loader tracing
	    // on the server. Not in spec.
	    /***/
	    if (linkSet.loader.loaderObj.execute === false) {
	      var loads = [].concat(linkSet.loads);
	      for (var i = 0, l = loads.length; i < l; i++) {
	        var load = loads[i];
	        load.module = !load.isDeclarative ? {
	          module: _newModule({})
	        } : {
	          name: load.name,
	          module: _newModule({}),
	          evaluated: true
	        };
	        load.status = 'linked';
	        finishLoad(linkSet.loader, load);
	      }
	      return linkSet.resolve(startingLoad);
	    }
	    /***/

	    var abrupt = doLink(linkSet);

	    if (abrupt)
	      return;

	    console.assert(linkSet.loads.length == 0, 'loads cleared');

	    linkSet.resolve(startingLoad);
	  }

	  // 15.2.5.2.4
	  function linkSetFailed(linkSet, load, exc) {
	    var loader = linkSet.loader;
	    var requests;

	    checkError: 
	    if (load) {
	      if (linkSet.loads[0].name == load.name) {
	        exc = addToError(exc, 'Error loading ' + load.name);
	      }
	      else {
	        for (var i = 0; i < linkSet.loads.length; i++) {
	          var pLoad = linkSet.loads[i];
	          for (var j = 0; j < pLoad.dependencies.length; j++) {
	            var dep = pLoad.dependencies[j];
	            if (dep.value == load.name) {
	              exc = addToError(exc, 'Error loading ' + load.name + ' as "' + dep.key + '" from ' + pLoad.name);
	              break checkError;
	            }
	          }
	        }
	        exc = addToError(exc, 'Error loading ' + load.name + ' from ' + linkSet.loads[0].name);
	      }
	    }
	    else {
	      exc = addToError(exc, 'Error linking ' + linkSet.loads[0].name);
	    }


	    var loads = linkSet.loads.concat([]);
	    for (var i = 0, l = loads.length; i < l; i++) {
	      var load = loads[i];

	      // store all failed load records
	      loader.loaderObj.failed = loader.loaderObj.failed || [];
	      if (indexOf.call(loader.loaderObj.failed, load) == -1)
	        loader.loaderObj.failed.push(load);

	      var linkIndex = indexOf.call(load.linkSets, linkSet);
	      console.assert(linkIndex != -1, 'link not present');
	      load.linkSets.splice(linkIndex, 1);
	      if (load.linkSets.length == 0) {
	        var globalLoadsIndex = indexOf.call(linkSet.loader.loads, load);
	        if (globalLoadsIndex != -1)
	          linkSet.loader.loads.splice(globalLoadsIndex, 1);
	      }
	    }
	    linkSet.reject(exc);
	  }

	  // 15.2.5.2.5
	  function finishLoad(loader, load) {
	    // add to global trace if tracing
	    if (loader.loaderObj.trace) {
	      if (!loader.loaderObj.loads)
	        loader.loaderObj.loads = {};
	      var depMap = {};
	      load.dependencies.forEach(function(dep) {
	        depMap[dep.key] = dep.value;
	      });
	      loader.loaderObj.loads[load.name] = {
	        name: load.name,
	        deps: load.dependencies.map(function(dep){ return dep.key }),
	        depMap: depMap,
	        address: load.address,
	        metadata: load.metadata,
	        source: load.source,
	        kind: load.isDeclarative ? 'declarative' : 'dynamic'
	      };
	    }
	    // if not anonymous, add to the module table
	    if (load.name) {
	      console.assert(!loader.modules[load.name], 'load not in module table');
	      loader.modules[load.name] = load.module;
	    }
	    var loadIndex = indexOf.call(loader.loads, load);
	    if (loadIndex != -1)
	      loader.loads.splice(loadIndex, 1);
	    for (var i = 0, l = load.linkSets.length; i < l; i++) {
	      loadIndex = indexOf.call(load.linkSets[i].loads, load);
	      if (loadIndex != -1)
	        load.linkSets[i].loads.splice(loadIndex, 1);
	    }
	    load.linkSets.splice(0, load.linkSets.length);
	  }

	  function doDynamicExecute(linkSet, load, linkError) {
	    try {
	      var module = load.execute();
	    }
	    catch(e) {
	      linkError(load, e);
	      return;
	    }
	    if (!module || !(module instanceof Module))
	      linkError(load, new TypeError('Execution must define a Module instance'));
	    else
	      return module;
	  }

	  // 26.3 Loader

	  // 26.3.1.1
	  // defined at top

	  // importPromises adds ability to import a module twice without error - https://bugs.ecmascript.org/show_bug.cgi?id=2601
	  function createImportPromise(loader, name, promise) {
	    var importPromises = loader._loader.importPromises;
	    return importPromises[name] = promise.then(function(m) {
	      importPromises[name] = undefined;
	      return m;
	    }, function(e) {
	      importPromises[name] = undefined;
	      throw e;
	    });
	  }

	  Loader.prototype = {
	    // 26.3.3.1
	    constructor: Loader,
	    // 26.3.3.2
	    define: function(name, source, options) {
	      // check if already defined
	      if (this._loader.importPromises[name])
	        throw new TypeError('Module is already loading.');
	      return createImportPromise(this, name, new Promise(asyncStartLoadPartwayThrough({
	        step: 'translate',
	        loader: this._loader,
	        moduleName: name,
	        moduleMetadata: options && options.metadata || {},
	        moduleSource: source,
	        moduleAddress: options && options.address
	      })));
	    },
	    // 26.3.3.3
	    'delete': function(name) {
	      var loader = this._loader;
	      delete loader.importPromises[name];
	      delete loader.moduleRecords[name];
	      return loader.modules[name] ? delete loader.modules[name] : false;
	    },
	    // 26.3.3.4 entries not implemented
	    // 26.3.3.5
	    get: function(key) {
	      if (!this._loader.modules[key])
	        return;
	      doEnsureEvaluated(this._loader.modules[key], [], this);
	      return this._loader.modules[key].module;
	    },
	    // 26.3.3.7
	    has: function(name) {
	      return !!this._loader.modules[name];
	    },
	    // 26.3.3.8
	    'import': function(name, parentName, parentAddress) {
	      if (typeof parentName == 'object')
	        parentName = parentName.name;

	      // run normalize first
	      var loaderObj = this;

	      // added, see https://bugs.ecmascript.org/show_bug.cgi?id=2659
	      return Promise.resolve(loaderObj.normalize(name, parentName))
	      .then(function(name) {
	        var loader = loaderObj._loader;

	        if (loader.modules[name]) {
	          doEnsureEvaluated(loader.modules[name], [], loader._loader);
	          return loader.modules[name].module;
	        }

	        return loader.importPromises[name] || createImportPromise(loaderObj, name,
	          loadModule(loader, name, {})
	          .then(function(load) {
	            delete loader.importPromises[name];
	            return evaluateLoadedModule(loader, load);
	          }));
	      });
	    },
	    // 26.3.3.9 keys not implemented
	    // 26.3.3.10
	    load: function(name) {
	      var loader = this._loader;
	      if (loader.modules[name])
	        return Promise.resolve();
	      return loader.importPromises[name] || createImportPromise(this, name, new Promise(asyncStartLoadPartwayThrough({
	        step: 'locate',
	        loader: loader,
	        moduleName: name,
	        moduleMetadata: {},
	        moduleSource: undefined,
	        moduleAddress: undefined
	      }))
	      .then(function() {
	        delete loader.importPromises[name];
	      }));
	    },
	    // 26.3.3.11
	    module: function(source, options) {
	      var load = createLoad();
	      load.address = options && options.address;
	      var linkSet = createLinkSet(this._loader, load);
	      var sourcePromise = Promise.resolve(source);
	      var loader = this._loader;
	      var p = linkSet.done.then(function() {
	        return evaluateLoadedModule(loader, load);
	      });
	      proceedToTranslate(loader, load, sourcePromise);
	      return p;
	    },
	    // 26.3.3.12
	    newModule: function (obj) {
	      if (typeof obj != 'object')
	        throw new TypeError('Expected object');

	      var m = new Module();

	      var pNames = [];
	      if (Object.getOwnPropertyNames && obj != null)
	        pNames = Object.getOwnPropertyNames(obj);
	      else
	        for (var key in obj)
	          pNames.push(key);

	      for (var i = 0; i < pNames.length; i++) (function(key) {
	        defineProperty(m, key, {
	          configurable: false,
	          enumerable: true,
	          get: function () {
	            return obj[key];
	          },
	          set: function() {
	            throw new Error('Module exports cannot be changed externally.');
	          }
	        });
	      })(pNames[i]);

	      if (Object.freeze)
	        Object.freeze(m);

	      return m;
	    },
	    // 26.3.3.14
	    set: function(name, module) {
	      if (!(module instanceof Module))
	        throw new TypeError('Loader.set(' + name + ', module) must be a module');
	      this._loader.modules[name] = {
	        module: module
	      };
	    },
	    // 26.3.3.15 values not implemented
	    // 26.3.3.16 @@iterator not implemented
	    // 26.3.3.17 @@toStringTag not implemented

	    // 26.3.3.18.1
	    normalize: function(name, referrerName, referrerAddress) {
	      return name;
	    },
	    // 26.3.3.18.2
	    locate: function(load) {
	      return load.name;
	    },
	    // 26.3.3.18.3
	    fetch: function(load) {
	    },
	    // 26.3.3.18.4
	    translate: function(load) {
	      return load.source;
	    },
	    // 26.3.3.18.5
	    instantiate: function(load) {
	    }
	  };

	  var _newModule = Loader.prototype.newModule;
	/*
	 * ES6 Module Declarative Linking Code - Dev Build Only
	 */
	  function link(linkSet, linkError) {

	    var loader = linkSet.loader;

	    if (!linkSet.loads.length)
	      return;

	    var loads = linkSet.loads.concat([]);

	    for (var i = 0; i < loads.length; i++) {
	      var load = loads[i];

	      var module = doDynamicExecute(linkSet, load, linkError);
	      if (!module)
	        return;
	      load.module = {
	        name: load.name,
	        module: module
	      };
	      load.status = 'linked';

	      finishLoad(loader, load);
	    }
	  }

	  function evaluateLoadedModule(loader, load) {
	    console.assert(load.status == 'linked', 'is linked ' + load.name);
	    return load.module.module;
	  }

	  function doEnsureEvaluated() {}

	  function transpile() {
	    throw new TypeError('ES6 transpilation is only provided in the dev module loader build.');
	  }
	})();/*
	*********************************************************************************************

	  System Loader Implementation

	    - Implemented to https://github.com/jorendorff/js-loaders/blob/master/browser-loader.js

	    - <script type="module"> supported

	*********************************************************************************************
	*/

	var System;

	function SystemLoader() {
	  Loader.call(this);
	  this.paths = {};
	}

	// NB no specification provided for System.paths, used ideas discussed in https://github.com/jorendorff/js-loaders/issues/25
	function applyPaths(paths, name) {
	  // most specific (most number of slashes in path) match wins
	  var pathMatch = '', wildcard, maxWildcardPrefixLen = 0;

	  // check to see if we have a paths entry
	  for (var p in paths) {
	    var pathParts = p.split('*');
	    if (pathParts.length > 2)
	      throw new TypeError('Only one wildcard in a path is permitted');

	    // exact path match
	    if (pathParts.length == 1) {
	      if (name == p)
	        return paths[p];
	      
	      // support trailing / in paths rules
	      else if (name.substr(0, p.length - 1) == p.substr(0, p.length - 1) && (name.length < p.length || name[p.length - 1] == p[p.length - 1]) && paths[p][paths[p].length - 1] == '/')
	        return paths[p].substr(0, paths[p].length - 1) + (name.length > p.length ? '/' + name.substr(p.length) : '');
	    }
	    // wildcard path match
	    else {
	      var wildcardPrefixLen = pathParts[0].length;
	      if (wildcardPrefixLen >= maxWildcardPrefixLen &&
	          name.substr(0, pathParts[0].length) == pathParts[0] &&
	          name.substr(name.length - pathParts[1].length) == pathParts[1]) {
	            maxWildcardPrefixLen = wildcardPrefixLen;
	            pathMatch = p;
	            wildcard = name.substr(pathParts[0].length, name.length - pathParts[1].length - pathParts[0].length);
	          }
	    }
	  }

	  var outPath = paths[pathMatch];
	  if (typeof wildcard == 'string')
	    outPath = outPath.replace('*', wildcard);

	  return outPath;
	}

	// inline Object.create-style class extension
	function LoaderProto() {}
	LoaderProto.prototype = Loader.prototype;
	SystemLoader.prototype = new LoaderProto();
	  var fetchTextFromURL;
	  if (typeof XMLHttpRequest != 'undefined') {
	    fetchTextFromURL = function(url, authorization, fulfill, reject) {
	      var xhr = new XMLHttpRequest();
	      var sameDomain = true;
	      var doTimeout = false;
	      if (!('withCredentials' in xhr)) {
	        // check if same domain
	        var domainCheck = /^(\w+:)?\/\/([^\/]+)/.exec(url);
	        if (domainCheck) {
	          sameDomain = domainCheck[2] === window.location.host;
	          if (domainCheck[1])
	            sameDomain &= domainCheck[1] === window.location.protocol;
	        }
	      }
	      if (!sameDomain && typeof XDomainRequest != 'undefined') {
	        xhr = new XDomainRequest();
	        xhr.onload = load;
	        xhr.onerror = error;
	        xhr.ontimeout = error;
	        xhr.onprogress = function() {};
	        xhr.timeout = 0;
	        doTimeout = true;
	      }
	      function load() {
	        fulfill(xhr.responseText);
	      }
	      function error() {
	        reject(new Error('XHR error' + (xhr.status ? ' (' + xhr.status + (xhr.statusText ? ' ' + xhr.statusText  : '') + ')' : '') + ' loading ' + url));
	      }

	      xhr.onreadystatechange = function () {
	        if (xhr.readyState === 4) {
	          // in Chrome on file:/// URLs, status is 0
	          if (xhr.status == 0) {
	            if (xhr.responseText) {
	              load();
	            }
	            else {
	              // when responseText is empty, wait for load or error event
	              // to inform if it is a 404 or empty file
	              xhr.addEventListener('error', error);
	              xhr.addEventListener('load', load);
	            }
	          }
	          else if (xhr.status === 200) {
	            load();
	          }
	          else {
	            error();
	          }
	        }
	      };
	      xhr.open("GET", url, true);

	      if (xhr.setRequestHeader) {
	        xhr.setRequestHeader('Accept', 'application/x-es-module, */*');
	        // can set "authorization: true" to enable withCredentials only
	        if (authorization) {
	          if (typeof authorization == 'string')
	            xhr.setRequestHeader('Authorization', authorization);
	          xhr.withCredentials = true;
	        }
	      }

	      if (doTimeout) {
	        setTimeout(function() {
	          xhr.send();
	        }, 0);
	      } else {
	        xhr.send(null);
	      }
	    };
	  }
	  else if ("function" != 'undefined' && typeof process != 'undefined') {
	    var fs;
	    fetchTextFromURL = function(url, authorization, fulfill, reject) {
	      if (url.substr(0, 8) != 'file:///')
	        throw new Error('Unable to fetch "' + url + '". Only file URLs of the form file:/// allowed running in Node.');
	      fs = fs || __webpack_require__(2);
	      if (isWindows)
	        url = url.replace(/\//g, '\\').substr(8);
	      else
	        url = url.substr(7);
	      return fs.readFile(url, function(err, data) {
	        if (err) {
	          return reject(err);
	        }
	        else {
	          // Strip Byte Order Mark out if it's the leading char
	          var dataString = data + '';
	          if (dataString[0] === '\ufeff')
	            dataString = dataString.substr(1);

	          fulfill(dataString);
	        }
	      });
	    };
	  }
	  else if (typeof self != 'undefined' && typeof self.fetch != 'undefined') {
	    fetchTextFromURL = function(url, authorization, fulfill, reject) {
	      var opts = {
	        headers: {'Accept': 'application/x-es-module, */*'}
	      };

	      if (authorization) {
	        if (typeof authorization == 'string')
	          opts.headers['Authorization'] = authorization;
	        opts.credentials = 'include';
	      }

	      fetch(url, opts)
	        .then(function (r) {
	          if (r.ok) {
	            return r.text();
	          } else {
	            throw new Error('Fetch error: ' + r.status + ' ' + r.statusText);
	          }
	        })
	        .then(fulfill, reject);
	    }
	  }
	  else {
	    throw new TypeError('No environment fetch API available.');
	  }

	  SystemLoader.prototype.fetch = function(load) {
	    return new Promise(function(resolve, reject) {
	      fetchTextFromURL(load.address, undefined, resolve, reject);
	    });
	  };
	// SystemJS Loader Class and Extension helpers

	function SystemJSLoader() {
	  SystemLoader.call(this);

	  systemJSConstructor.call(this);
	}

	// inline Object.create-style class extension
	function SystemProto() {};
	SystemProto.prototype = SystemLoader.prototype;
	SystemJSLoader.prototype = new SystemProto();
	SystemJSLoader.prototype.constructor = SystemJSLoader;

	// remove ESML instantiate
	SystemJSLoader.prototype.instantiate = function() {};

	var systemJSConstructor;

	function hook(name, hook) {
	  SystemJSLoader.prototype[name] = hook(SystemJSLoader.prototype[name] || function() {});
	}
	function hookConstructor(hook) {
	  systemJSConstructor = hook(systemJSConstructor || function() {});
	}

	function dedupe(deps) {
	  var newDeps = [];
	  for (var i = 0, l = deps.length; i < l; i++)
	    if (indexOf.call(newDeps, deps[i]) == -1)
	      newDeps.push(deps[i])
	  return newDeps;
	}

	function group(deps) {
	  var names = [];
	  var indices = [];
	  for (var i = 0, l = deps.length; i < l; i++) {
	    var index = indexOf.call(names, deps[i]);
	    if (index === -1) {
	      names.push(deps[i]);
	      indices.push([i]);
	    }
	    else {
	      indices[index].push(i);
	    }
	  }
	  return { names: names, indices: indices };
	}

	var getOwnPropertyDescriptor = true;
	try {
	  Object.getOwnPropertyDescriptor({ a: 0 }, 'a');
	}
	catch(e) {
	  getOwnPropertyDescriptor = false;
	}

	// converts any module.exports object into an object ready for SystemJS.newModule
	function getESModule(exports) {
	  var esModule = {};
	  // don't trigger getters/setters in environments that support them
	  if (typeof exports == 'object' || typeof exports == 'function') {
	    var hasOwnProperty = exports && exports.hasOwnProperty;
	    if (getOwnPropertyDescriptor) {
	      for (var p in exports) {
	        if (!trySilentDefineProperty(esModule, exports, p))
	          setPropertyIfHasOwnProperty(esModule, exports, p, hasOwnProperty);
	      }
	    }
	    else {
	      for (var p in exports)
	        setPropertyIfHasOwnProperty(esModule, exports, p, hasOwnProperty);
	    }
	  }
	  esModule['default'] = exports;
	  defineProperty(esModule, '__useDefault', {
	    value: true
	  });
	  return esModule;
	}

	function setPropertyIfHasOwnProperty(targetObj, sourceObj, propName, hasOwnProperty) {
	  if (!hasOwnProperty || sourceObj.hasOwnProperty(propName))
	    targetObj[propName] = sourceObj[propName];
	}

	function trySilentDefineProperty(targetObj, sourceObj, propName) {
	  try {
	    var d;
	    if (d = Object.getOwnPropertyDescriptor(sourceObj, propName))
	      defineProperty(targetObj, propName, d);

	    return true;
	  } catch (ex) {
	    // Object.getOwnPropertyDescriptor threw an exception, fall back to normal set property.
	    return false;
	  }
	}

	function extend(a, b, prepend) {
	  for (var p in b) {
	    if (!prepend || !(p in a))
	      a[p] = b[p];
	  }
	  return a;
	}

	// package configuration options
	var packageProperties = ['main', 'format', 'defaultExtension', 'meta', 'map', 'basePath', 'depCache'];

	// meta first-level extends where:
	// array + array appends
	// object + object extends
	// other properties replace
	function extendMeta(a, b, prepend) {
	  for (var p in b) {
	    var val = b[p];
	    if (!(p in a))
	      a[p] = val;
	    else if (val instanceof Array && a[p] instanceof Array)
	      a[p] = [].concat(prepend ? val : a[p]).concat(prepend ? a[p] : val);
	    else if (typeof val == 'object' && val !== null && typeof a[p] == 'object')
	      a[p] = extend(extend({}, a[p]), val, prepend);
	    else if (!prepend)
	      a[p] = val;
	  }
	}

	function warn(msg) {
	  if (this.warnings && typeof console != 'undefined' && console.warn)
	    console.warn(msg);
	}
	var absURLRegEx = /^[^\/]+:\/\//;

	function readMemberExpression(p, value) {
	  var pParts = p.split('.');
	  while (pParts.length)
	    value = value[pParts.shift()];
	  return value;
	}

	var baseURLCache = {};
	function getBaseURLObj() {
	  if (baseURLCache[this.baseURL])
	    return baseURLCache[this.baseURL];

	  // normalize baseURL if not already
	  if (this.baseURL[this.baseURL.length - 1] != '/')
	    this.baseURL += '/';

	  var baseURL = new URL(this.baseURL, baseURI);

	  this.baseURL = baseURL.href;

	  return (baseURLCache[this.baseURL] = baseURL);
	}

	function getMapMatch(map, name) {
	  var bestMatch, bestMatchLength = 0;

	  for (var p in map) {
	    if (name.substr(0, p.length) == p && (name.length == p.length || name[p.length] == '/')) {
	      var curMatchLength = p.split('/').length;
	      if (curMatchLength <= bestMatchLength)
	        continue;
	      bestMatch = p;
	      bestMatchLength = curMatchLength;
	    }
	  }

	  return bestMatch;
	}

	function setProduction(isProduction) {
	  this.set('@system-env', this.newModule({
	    browser: isBrowser,
	    node: !!this._nodeRequire,
	    production: isProduction,
	    'default': true
	  }));
	}

	var baseURIObj = new URL(baseURI);

	hookConstructor(function(constructor) {
	  return function() {
	    constructor.call(this);

	    // support baseURL
	    this.baseURL = baseURI.substr(0, baseURI.lastIndexOf('/') + 1);

	    // support map and paths
	    this.map = {};
	    this.paths = {};

	    // global behaviour flags
	    this.warnings = false;
	    this.defaultJSExtensions = false;
	    this.pluginFirst = false;
	    this.loaderErrorStack = false;

	    // by default load ".json" files as json
	    // leading * meta doesn't need normalization
	    // NB add this in next breaking release
	    // this.meta['*.json'] = { format: 'json' };

	    // support the empty module, as a concept
	    this.set('@empty', this.newModule({}));

	    setProduction.call(this, false);
	  };
	});

	// include the node require since we're overriding it
	if ("function" != 'undefined' && typeof process != 'undefined' && !process.browser)
	  SystemJSLoader.prototype._nodeRequire = __webpack_require__(3);

	var nodeCoreModules = ['assert', 'buffer', 'child_process', 'cluster', 'console', 'constants', 
	    'crypto', 'dgram', 'dns', 'domain', 'events', 'fs', 'http', 'https', 'module', 'net', 'os', 'path', 
	    'process', 'punycode', 'querystring', 'readline', 'repl', 'stream', 'string_decoder', 'sys', 'timers', 
	    'tls', 'tty', 'url', 'util', 'vm', 'zlib'];

	/*
	  Core SystemJS Normalization

	  If a name is relative, we apply URL normalization to the page
	  If a name is an absolute URL, we leave it as-is

	  Plain names (neither of the above) run through the map and paths
	  normalization phases.

	  The paths normalization phase applies last (paths extension), which
	  defines the `decanonicalize` function and normalizes everything into
	  a URL.
	 */

	function isPlain(name) {
	  return (name[0] != '.' || (!!name[1] && name[1] != '/' && name[1] != '.')) && name[0] != '/' && !name.match(absURLRegEx);
	}

	function urlResolve(name, parent) {
	  if (parent)
	    parent = parent.replace(/#/g, '%05');
	  return new URL(name, parent || baseURIObj).href.replace(/%05/g, '#');
	}

	// only applies to plain names
	function baseURLResolve(loader, name) {
	  return new URL(name, getBaseURLObj.call(loader)).href;
	}

	function coreResolve(name, parentName) {
	  // standard URL resolution
	  if (!isPlain(name))
	    return urlResolve(name, parentName);

	  // plain names not starting with './', '://' and '/' go through custom resolution
	  var mapMatch = getMapMatch(this.map, name);

	  if (mapMatch) {
	    name = this.map[mapMatch] + name.substr(mapMatch.length);

	    if (!isPlain(name))
	      return urlResolve(name);
	  }

	  if (this.has(name))
	    return name;
	  // dynamically load node-core modules when requiring `@node/fs` for example
	  if (name.substr(0, 6) == '@node/' && nodeCoreModules.indexOf(name.substr(6)) != -1) {
	    if (!this._nodeRequire)
	      throw new TypeError('Error loading ' + name + '. Can only load node core modules in Node.');
	    this.set(name, this.newModule(getESModule(this._nodeRequire(name.substr(6)))));
	    return name;
	  }

	  var pathed = applyPaths(this.paths, name);

	  if (pathed && !isPlain(pathed))
	    return urlResolve(pathed);

	  return baseURLResolve(this, pathed || name);
	}

	hook('normalize', function(normalize) {
	  return function(name, parentName, skipExt) {
	    var resolved = coreResolve.call(this, name, parentName);
	    if (!skipExt && this.defaultJSExtensions && resolved.substr(resolved.length - 3, 3) != '.js' && !isPlain(resolved))
	      resolved += '.js';
	    return resolved;
	  };
	});

	// percent encode just '#' in urls if using HTTP requests
	var httpRequest = typeof XMLHttpRequest != 'undefined';
	hook('locate', function(locate) {
	  return function(load) {
	    return Promise.resolve(locate.call(this, load))
	    .then(function(address) {
	      if (httpRequest)
	        return address.replace(/#/g, '%23');
	      return address;
	    });
	  };
	});

	/*
	 * Fetch with authorization
	 */
	hook('fetch', function() {
	  return function(load) {
	    return new Promise(function(resolve, reject) {
	      fetchTextFromURL(load.address, load.metadata.authorization, resolve, reject);
	    });
	  };
	});

	/*
	  __useDefault
	  
	  When a module object looks like:
	  newModule(
	    __useDefault: true,
	    default: 'some-module'
	  })

	  Then importing that module provides the 'some-module'
	  result directly instead of the full module.

	  Useful for eg module.exports = function() {}
	*/
	hook('import', function(systemImport) {
	  return function(name, parentName, parentAddress) {
	    if (parentName && parentName.name)
	      warn.call(this, 'SystemJS.import(name, { name: parentName }) is deprecated for SystemJS.import(name, parentName), while importing ' + name + ' from ' + parentName.name);
	    return systemImport.call(this, name, parentName, parentAddress).then(function(module) {
	      return module.__useDefault ? module['default'] : module;
	    });
	  };
	});

	/*
	 * Allow format: 'detect' meta to enable format detection
	 */
	hook('translate', function(systemTranslate) {
	  return function(load) {
	    if (load.metadata.format == 'detect')
	      load.metadata.format = undefined;
	    return systemTranslate.call(this, load);
	  };
	});


	/*
	 * JSON format support
	 *
	 * Supports loading JSON files as a module format itself
	 *
	 * Usage:
	 *
	 * SystemJS.config({
	 *   meta: {
	 *     '*.json': { format: 'json' }
	 *   }
	 * });
	 *
	 * Module is returned as if written:
	 *
	 * export default {JSON}
	 *
	 * No named exports are provided
	 *
	 * Files ending in ".json" are treated as json automatically by SystemJS
	 */
	hook('instantiate', function(instantiate) {
	  return function(load) {
	    if (load.metadata.format == 'json' && !this.builder) {
	      var entry = load.metadata.entry = createEntry();
	      entry.deps = [];
	      entry.execute = function() {
	        try {
	          return JSON.parse(load.source);
	        }
	        catch(e) {
	          throw new Error("Invalid JSON file " + load.name);
	        }
	      };
	    }
	  };
	})

	/*
	 Extend config merging one deep only

	  loader.config({
	    some: 'random',
	    config: 'here',
	    deep: {
	      config: { too: 'too' }
	    }
	  });

	  <=>

	  loader.some = 'random';
	  loader.config = 'here'
	  loader.deep = loader.deep || {};
	  loader.deep.config = { too: 'too' };


	  Normalizes meta and package configs allowing for:

	  SystemJS.config({
	    meta: {
	      './index.js': {}
	    }
	  });

	  To become

	  SystemJS.meta['https://thissite.com/index.js'] = {};

	  For easy normalization canonicalization with latest URL support.

	*/
	SystemJSLoader.prototype.env = 'development';

	var curCurScript;
	SystemJSLoader.prototype.config = function(cfg) {
	  var loader = this;

	  if ('loaderErrorStack' in cfg) {
	    curCurScript = $__curScript;
	    if (cfg.loaderErrorStack)
	      $__curScript = undefined;
	    else
	      $__curScript = curCurScript;
	  }

	  if ('warnings' in cfg)
	    loader.warnings = cfg.warnings;

	  // transpiler deprecation path
	  if (cfg.transpilerRuntime === false)
	    loader._loader.loadedTranspilerRuntime = true;

	  // always configure baseURL first
	  if (cfg.baseURL) {
	    var hasConfig = false;
	    function checkHasConfig(obj) {
	      for (var p in obj)
	        if (hasOwnProperty.call(obj, p))
	          return true;
	    }
	    if (checkHasConfig(loader.packages) || checkHasConfig(loader.meta) || checkHasConfig(loader.depCache) || checkHasConfig(loader.bundles) || checkHasConfig(loader.packageConfigPaths))
	      throw new TypeError('Incorrect configuration order. The baseURL must be configured with the first SystemJS.config call.');

	    loader.baseURL = cfg.baseURL;

	    // sanitize baseURL
	    getBaseURLObj.call(loader);
	  }

	  if (cfg.defaultJSExtensions) {
	    loader.defaultJSExtensions = cfg.defaultJSExtensions;
	    warn.call(loader, 'The defaultJSExtensions configuration option is deprecated, use packages configuration instead.');
	  }

	  if (cfg.pluginFirst)
	    loader.pluginFirst = cfg.pluginFirst;

	  if (cfg.production)
	    setProduction.call(loader, true);

	  if (cfg.paths) {
	    for (var p in cfg.paths)
	      loader.paths[p] = cfg.paths[p];
	  }

	  if (cfg.map) {
	    var objMaps = '';
	    for (var p in cfg.map) {
	      var v = cfg.map[p];

	      // object map backwards-compat into packages configuration
	      if (typeof v !== 'string') {
	        objMaps += (objMaps.length ? ', ' : '') + '"' + p + '"';

	        var defaultJSExtension = loader.defaultJSExtensions && p.substr(p.length - 3, 3) != '.js';
	        var prop = loader.decanonicalize(p);
	        if (defaultJSExtension && prop.substr(prop.length - 3, 3) == '.js')
	          prop = prop.substr(0, prop.length - 3);

	        // if a package main, revert it
	        var pkgMatch = '';
	        for (var pkg in loader.packages) {
	          if (prop.substr(0, pkg.length) == pkg 
	              && (!prop[pkg.length] || prop[pkg.length] == '/') 
	              && pkgMatch.split('/').length < pkg.split('/').length)
	            pkgMatch = pkg;
	        }
	        if (pkgMatch && loader.packages[pkgMatch].main)
	          prop = prop.substr(0, prop.length - loader.packages[pkgMatch].main.length - 1);

	        var pkg = loader.packages[prop] = loader.packages[prop] || {};
	        pkg.map = v;
	      }
	      else {
	        loader.map[p] = v;
	      }
	    }
	    if (objMaps)
	      warn.call(loader, 'The map configuration for ' + objMaps + ' uses object submaps, which is deprecated in global map.\nUpdate this to use package contextual map with configs like SystemJS.config({ packages: { "' + p + '": { map: {...} } } }).');
	  }

	  if (cfg.packageConfigPaths) {
	    var packageConfigPaths = [];
	    for (var i = 0; i < cfg.packageConfigPaths.length; i++) {
	      var path = cfg.packageConfigPaths[i];
	      var packageLength = Math.max(path.lastIndexOf('*') + 1, path.lastIndexOf('/'));
	      var defaultJSExtension = loader.defaultJSExtensions && path.substr(packageLength - 3, 3) != '.js';
	      var normalized = loader.decanonicalize(path.substr(0, packageLength));
	      if (defaultJSExtension && normalized.substr(normalized.length - 3, 3) == '.js')
	        normalized = normalized.substr(0, normalized.length - 3);
	      packageConfigPaths[i] = normalized + path.substr(packageLength);
	    }
	    loader.packageConfigPaths = packageConfigPaths;
	  }

	  if (cfg.bundles) {
	    for (var p in cfg.bundles) {
	      var bundle = [];
	      for (var i = 0; i < cfg.bundles[p].length; i++) {
	        var defaultJSExtension = loader.defaultJSExtensions && cfg.bundles[p][i].substr(cfg.bundles[p][i].length - 3, 3) != '.js';
	        var normalizedBundleDep = loader.decanonicalize(cfg.bundles[p][i]);
	        if (defaultJSExtension && normalizedBundleDep.substr(normalizedBundleDep.length - 3, 3) == '.js')
	          normalizedBundleDep = normalizedBundleDep.substr(0, normalizedBundleDep.length - 3);
	        bundle.push(normalizedBundleDep);
	      }
	      loader.bundles[p] = bundle;
	    }
	  }

	  if (cfg.packages) {
	    for (var p in cfg.packages) {
	      if (p.match(/^([^\/]+:)?\/\/$/))
	        throw new TypeError('"' + p + '" is not a valid package name.');

	      var prop = coreResolve.call(loader, p);

	      // allow trailing slash in packages
	      if (prop[prop.length - 1] == '/')
	        prop = prop.substr(0, prop.length - 1);

	      loader.packages[prop] = loader.packages[prop] || {};

	      var pkg = cfg.packages[p];

	      // meta backwards compatibility
	      if (pkg.modules) {
	        warn.call(loader, 'Package ' + p + ' is configured with "modules", which is deprecated as it has been renamed to "meta".');
	        pkg.meta = pkg.modules;
	        delete pkg.modules;
	      }

	      if (typeof pkg.main == 'object') {
	        pkg.map = pkg.map || {};
	        pkg.map['./@main'] = pkg.main;
	        pkg.main['default'] = pkg.main['default'] || './';
	        pkg.main = '@main';
	      }

	      for (var q in pkg)
	        if (indexOf.call(packageProperties, q) == -1)
	          warn.call(loader, '"' + q + '" is not a valid package configuration option in package ' + p);

	      extendMeta(loader.packages[prop], pkg);
	    }
	  }

	  for (var c in cfg) {
	    var v = cfg[c];

	    if (c == 'baseURL' || c == 'map' || c == 'packages' || c == 'bundles' || c == 'paths' || c == 'warnings' || c == 'packageConfigPaths' || c == 'loaderErrorStack')
	      continue;

	    if (typeof v != 'object' || v instanceof Array) {
	      loader[c] = v;
	    }
	    else {
	      loader[c] = loader[c] || {};

	      for (var p in v) {
	        // base-level wildcard meta does not normalize to retain catch-all quality
	        if (c == 'meta' && p[0] == '*') {
	          loader[c][p] = v[p];
	        }
	        else if (c == 'meta') {
	          // meta can go through global map, with defaultJSExtensions adding
	          var resolved = coreResolve.call(loader, p);
	          if (loader.defaultJSExtensions && resolved.substr(resolved.length - 3, 3) != '.js' && !isPlain(resolved))
	            resolved += '.js';
	          loader[c][resolved] = v[p];
	        }
	        else if (c == 'depCache') {
	          var defaultJSExtension = loader.defaultJSExtensions && p.substr(p.length - 3, 3) != '.js';
	          var prop = loader.decanonicalize(p);
	          if (defaultJSExtension && prop.substr(prop.length - 3, 3) == '.js')
	            prop = prop.substr(0, prop.length - 3);
	          loader[c][prop] = v[p];
	        }
	        else {
	          loader[c][p] = v[p];
	        }
	      }
	    }
	  }
	};/*
	 * Package Configuration Extension
	 *
	 * Example:
	 *
	 * SystemJS.packages = {
	 *   jquery: {
	 *     main: 'index.js', // when not set, package name is requested directly
	 *     format: 'amd',
	 *     defaultExtension: 'ts', // defaults to 'js', can be set to false
	 *     modules: {
	 *       '*.ts': {
	 *         loader: 'typescript'
	 *       },
	 *       'vendor/sizzle.js': {
	 *         format: 'global'
	 *       }
	 *     },
	 *     map: {
	 *        // map internal require('sizzle') to local require('./vendor/sizzle')
	 *        sizzle: './vendor/sizzle.js',
	 *        // map any internal or external require of 'jquery/vendor/another' to 'another/index.js'
	 *        './vendor/another.js': './another/index.js',
	 *        // test.js / test -> lib/test.js
	 *        './test.js': './lib/test.js',
	 *
	 *        // environment-specific map configurations
	 *        './index.js': {
	 *          '~browser': './index-node.js'
	 *        }
	 *     },
	 *     // allows for setting package-prefixed depCache
	 *     // keys are normalized module names relative to the package itself
	 *     depCache: {
	 *       // import 'package/index.js' loads in parallel package/lib/test.js,package/vendor/sizzle.js
	 *       './index.js': ['./test'],
	 *       './test.js': ['external-dep'],
	 *       'external-dep/path.js': ['./another.js']
	 *     }
	 *   }
	 * };
	 *
	 * Then:
	 *   import 'jquery'                       -> jquery/index.js
	 *   import 'jquery/submodule'             -> jquery/submodule.js
	 *   import 'jquery/submodule.ts'          -> jquery/submodule.ts loaded as typescript
	 *   import 'jquery/vendor/another'        -> another/index.js
	 *
	 * Detailed Behaviours
	 * - main can have a leading "./" can be added optionally
	 * - map and defaultExtension are applied to the main
	 * - defaultExtension adds the extension only if the exact extension is not present
	 * - defaultJSExtensions applies after map when defaultExtension is not set
	 * - if a meta value is available for a module, map and defaultExtension are skipped
	 * - like global map, package map also applies to subpaths (sizzle/x, ./vendor/another/sub)
	 * - condition module map is '@env' module in package or '@system-env' globally
	 * - map targets support conditional interpolation ('./x': './x.#{|env}.js')
	 * - internal package map targets cannot use boolean conditionals
	 *
	 * Package Configuration Loading
	 *
	 * Not all packages may already have their configuration present in the System config
	 * For these cases, a list of packageConfigPaths can be provided, which when matched against
	 * a request, will first request a ".json" file by the package name to derive the package
	 * configuration from. This allows dynamic loading of non-predetermined code, a key use
	 * case in SystemJS.
	 *
	 * Example:
	 *
	 *   SystemJS.packageConfigPaths = ['packages/test/package.json', 'packages/*.json'];
	 *
	 *   // will first request 'packages/new-package/package.json' for the package config
	 *   // before completing the package request to 'packages/new-package/path'
	 *   SystemJS.import('packages/new-package/path');
	 *
	 *   // will first request 'packages/test/package.json' before the main
	 *   SystemJS.import('packages/test');
	 *
	 * When a package matches packageConfigPaths, it will always send a config request for
	 * the package configuration.
	 * The package name itself is taken to be the match up to and including the last wildcard
	 * or trailing slash.
	 * The most specific package config path will be used.
	 * Any existing package configurations for the package will deeply merge with the
	 * package config, with the existing package configurations taking preference.
	 * To opt-out of the package configuration request for a package that matches
	 * packageConfigPaths, use the { configured: true } package config option.
	 *
	 */
	(function() {

	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);
	      this.packages = {};
	      this.packageConfigPaths = [];
	    };
	  });

	  function getPackage(loader, normalized) {
	    // use most specific package
	    var curPkg, curPkgLen = 0, pkgLen;
	    for (var p in loader.packages) {
	      if (normalized.substr(0, p.length) === p && (normalized.length === p.length || normalized[p.length] === '/')) {
	        pkgLen = p.split('/').length;
	        if (pkgLen > curPkgLen) {
	          curPkg = p;
	          curPkgLen = pkgLen;
	        }
	      }
	    }
	    return curPkg;
	  }

	  function addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions) {
	    // don't apply extensions to folders or if defaultExtension = false
	    if (!subPath || subPath[subPath.length - 1] == '/' || skipExtensions || pkg.defaultExtension === false)
	      return subPath;

	    // NB are you sure about this?
	    // skip if we have interpolation conditional syntax in subPath?
	    if (subPath.match(interpolationRegEx))
	      return subPath;

	    var metaMatch = false;

	    // exact meta or meta with any content after the last wildcard skips extension
	    if (pkg.meta)
	      getMetaMatches(pkg.meta, subPath, function(metaPattern, matchMeta, matchDepth) {
	        if (matchDepth == 0 || metaPattern.lastIndexOf('*') != metaPattern.length - 1)
	          return metaMatch = true;
	      });

	    // exact global meta or meta with any content after the last wildcard skips extension
	    if (!metaMatch && loader.meta)
	      getMetaMatches(loader.meta, pkgName + '/' + subPath, function(metaPattern, matchMeta, matchDepth) {
	        if (matchDepth == 0 || metaPattern.lastIndexOf('*') != metaPattern.length - 1)
	          return metaMatch = true;
	      });

	    if (metaMatch)
	      return subPath;

	    // work out what the defaultExtension is and add if not there already
	    // NB reconsider if default should really be ".js"?
	    var defaultExtension = '.' + (pkg.defaultExtension || 'js');
	    if (subPath.substr(subPath.length - defaultExtension.length) != defaultExtension)
	      return subPath + defaultExtension;
	    else
	      return subPath;
	  }

	  function applyPackageConfigSync(loader, pkg, pkgName, subPath, skipExtensions) {
	    // main
	    if (!subPath) {
	      if (pkg.main)
	        subPath = pkg.main.substr(0, 2) == './' ? pkg.main.substr(2) : pkg.main;
	      // also no submap if name is package itself (import 'pkg' -> 'path/to/pkg.js')
	      else
	        // NB can add a default package main convention here when defaultJSExtensions is deprecated
	        // if it becomes internal to the package then it would no longer be an exit path
	        return pkgName + (loader.defaultJSExtensions ? '.js' : '');
	    }

	    // map config checking without then with extensions
	    if (pkg.map) {
	      var mapPath = './' + subPath;

	      var mapMatch = getMapMatch(pkg.map, mapPath);

	      // we then check map with the default extension adding
	      if (!mapMatch) {
	        mapPath = './' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions);
	        if (mapPath != './' + subPath)
	          mapMatch = getMapMatch(pkg.map, mapPath);
	      }
	      if (mapMatch)
	        return doMapSync(loader, pkg, pkgName, mapMatch, mapPath, skipExtensions);
	    }

	    // normal package resolution
	    return pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions);
	  }

	  function validateMapping(mapMatch, mapped, pkgName) {
	    // disallow internal to subpath maps
	    if (mapMatch == '.')
	      throw new Error('Package ' + pkgName + ' has a map entry for "." which is not permitted.');
	    // disallow internal ./x -> ./x/y recursive maps
	    else if (mapped.substr(0, mapMatch.length) == mapMatch && (mapMatch[mapMatch.length - 1] != '/' && mapped[mapMatch.length] == '/'))
	      throw new Error('Package ' + pkgName + ' has a recursive map for "' + mapMatch + '" which is not permitted.');
	  }

	  function doMapSync(loader, pkg, pkgName, mapMatch, path, skipExtensions) {
	    var mapped = pkg.map[mapMatch];

	    if (typeof mapped == 'object')
	      throw new Error('Synchronous conditional normalization not supported sync normalizing ' + mapMatch + ' in ' + pkgName);

	    validateMapping(mapMatch, mapped, pkgName);

	    // ignore conditionals in sync
	    if (typeof mapped != 'string')
	      mapped = mapMatch = path;

	    validateMapping(mapMatch, mapped, pkgName);

	    // package map to main / base-level
	    if (mapped == '.')
	      mapped = pkgName;

	    // internal package map
	    else if (mapped.substr(0, 2) == './')
	      return pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, mapped.substr(2) + path.substr(mapMatch.length), skipExtensions);
	    
	    // external map reference
	    return loader.normalizeSync(mapped + path.substr(mapMatch.length), pkgName + '/');
	  }

	  function applyPackageConfig(loader, pkg, pkgName, subPath, skipExtensions) {
	    // main
	    if (!subPath) {
	      if (pkg.main)
	        subPath = pkg.main.substr(0, 2) == './' ? pkg.main.substr(2) : pkg.main;
	      // also no submap if name is package itself (import 'pkg' -> 'path/to/pkg.js')
	      else
	        // NB can add a default package main convention here when defaultJSExtensions is deprecated
	        // if it becomes internal to the package then it would no longer be an exit path
	        return Promise.resolve(pkgName + (loader.defaultJSExtensions ? '.js' : ''));
	    }

	    // map config checking without then with extensions
	    var mapPath, mapMatch;

	    if (pkg.map) {
	      mapPath = './' + subPath;
	      mapMatch = getMapMatch(pkg.map, mapPath);

	      // we then check map with the default extension adding
	      if (!mapMatch) {
	        mapPath = './' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions);
	        if (mapPath != './' + subPath)
	          mapMatch = getMapMatch(pkg.map, mapPath);
	      }
	    }

	    return (mapMatch ? doMap(loader, pkg, pkgName, mapMatch, mapPath, skipExtensions) : Promise.resolve())
	    .then(function(mapped) {
	      if (mapped)
	        return Promise.resolve(mapped);

	      // normal package resolution / fallback resolution for no conditional match
	      return Promise.resolve(pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions));
	    });
	  }

	  function doStringMap(loader, pkg, pkgName, mapMatch, mapped, path, skipExtensions) {
	    // NB the interpolation cases should strictly skip subsequent interpolation

	    // package map to main / base-level
	    if (mapped == '.')
	      mapped = pkgName;
	    
	    // internal package map
	    else if (mapped.substr(0, 2) == './')
	      return Promise.resolve(pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, mapped.substr(2) + path.substr(mapMatch.length), skipExtensions))
	      .then(function(name) {
	        return interpolateConditional.call(loader, name, pkgName + '/');
	      });
	    
	    // external map reference
	    return loader.normalize(mapped + path.substr(mapMatch.length), pkgName + '/');
	  }

	  function doMap(loader, pkg, pkgName, mapMatch, path, skipExtensions) {
	    var mapped = pkg.map[mapMatch];

	    if (typeof mapped == 'string') {
	      validateMapping(mapMatch, mapped, pkgName);
	      return doStringMap(loader, pkg, pkgName, mapMatch, mapped, path, skipExtensions);
	    }

	    // we use a special conditional syntax to allow the builder to handle conditional branch points further
	    if (loader.builder)
	      return Promise.resolve(pkgName + '/#:' + path);

	    // map object -> conditional map
	    return loader['import'](pkg.map['@env'] || '@system-env', pkgName)
	    .then(function(env) {
	      // first map condition to match is used
	      for (var e in mapped) {
	        var negate = e[0] == '~';

	        var value = readMemberExpression(negate ? e.substr(1) : e, env);

	        if (!negate && value || negate && !value)
	          return mapped[e];
	      }
	    })
	    .then(function(mapped) {
	      if (mapped) {
	        if (typeof mapped != 'string')
	          throw new Error('Unable to map a package conditional to a package conditional.');
	        validateMapping(mapMatch, mapped, pkgName);
	        return doStringMap(loader, pkg, pkgName, mapMatch, mapped, path, skipExtensions);
	      }

	      // no environment match -> fallback to original subPath by returning undefined
	    });
	  }

	  // normalizeSync = decanonicalize + package resolution
	  SystemJSLoader.prototype.normalizeSync = SystemJSLoader.prototype.decanonicalize = SystemJSLoader.prototype.normalize;

	  // decanonicalize must JUST handle package defaultExtension: false case when defaultJSExtensions is set
	  // to be deprecated!
	  hook('decanonicalize', function(decanonicalize) {
	    return function(name, parentName) {
	      if (this.builder)
	        return decanonicalize.call(this, name, parentName, true);

	      var decanonicalized = decanonicalize.call(this, name, parentName);

	      if (!this.defaultJSExtensions)
	        return decanonicalized;
	    
	      var pkgName = getPackage(this, decanonicalized);

	      var pkg = this.packages[pkgName];
	      var defaultExtension = pkg && pkg.defaultExtension;

	      if (defaultExtension == undefined && pkg && pkg.meta)
	        getMetaMatches(pkg.meta, decanonicalized.substr(pkgName), function(metaPattern, matchMeta, matchDepth) {
	          if (matchDepth == 0 || metaPattern.lastIndexOf('*') != metaPattern.length - 1) {
	            defaultExtension = false;
	            return true;
	          }
	        });
	      
	      if ((defaultExtension === false || defaultExtension && defaultExtension != '.js') && name.substr(name.length - 3, 3) != '.js' && decanonicalized.substr(decanonicalized.length - 3, 3) == '.js')
	        decanonicalized = decanonicalized.substr(0, decanonicalized.length - 3);

	      return decanonicalized;
	    };
	  });

	  hook('normalizeSync', function(normalizeSync) {
	    return function(name, parentName, isPlugin) {
	      warn.call(this, 'SystemJS.normalizeSync has been deprecated for SystemJS.decanonicalize.');

	      var loader = this;
	      isPlugin = isPlugin === true;

	      // apply contextual package map first
	      // (we assume the parent package config has already been loaded)
	      if (parentName)
	        var parentPackageName = getPackage(loader, parentName) ||
	            loader.defaultJSExtensions && parentName.substr(parentName.length - 3, 3) == '.js' &&
	            getPackage(loader, parentName.substr(0, parentName.length - 3));

	      var parentPackage = parentPackageName && loader.packages[parentPackageName];

	      // ignore . since internal maps handled by standard package resolution
	      if (parentPackage && name[0] != '.') {
	        var parentMap = parentPackage.map;
	        var parentMapMatch = parentMap && getMapMatch(parentMap, name);

	        if (parentMapMatch && typeof parentMap[parentMapMatch] == 'string')
	          return doMapSync(loader, parentPackage, parentPackageName, parentMapMatch, name, isPlugin);
	      }

	      var defaultJSExtension = loader.defaultJSExtensions && name.substr(name.length - 3, 3) != '.js';

	      // apply map, core, paths, contextual package map
	      var normalized = normalizeSync.call(loader, name, parentName);

	      // undo defaultJSExtension
	      if (defaultJSExtension && normalized.substr(normalized.length - 3, 3) != '.js')
	        defaultJSExtension = false;
	      if (defaultJSExtension)
	        normalized = normalized.substr(0, normalized.length - 3);

	      var pkgConfigMatch = getPackageConfigMatch(loader, normalized);
	      var pkgName = pkgConfigMatch && pkgConfigMatch.packageName || getPackage(loader, normalized);

	      if (!pkgName)
	        return normalized + (defaultJSExtension ? '.js' : '');

	      var subPath = normalized.substr(pkgName.length + 1);

	      return applyPackageConfigSync(loader, loader.packages[pkgName] || {}, pkgName, subPath, isPlugin);
	    };
	  });

	  hook('normalize', function(normalize) {
	    return function(name, parentName, isPlugin) {
	      var loader = this;
	      isPlugin = isPlugin === true;

	      return Promise.resolve()
	      .then(function() {
	        // apply contextual package map first
	        // (we assume the parent package config has already been loaded)
	        if (parentName)
	          var parentPackageName = getPackage(loader, parentName) ||
	              loader.defaultJSExtensions && parentName.substr(parentName.length - 3, 3) == '.js' &&
	              getPackage(loader, parentName.substr(0, parentName.length - 3));

	        var parentPackage = parentPackageName && loader.packages[parentPackageName];

	        // ignore . since internal maps handled by standard package resolution
	        if (parentPackage && name.substr(0, 2) != './') {
	          var parentMap = parentPackage.map;
	          var parentMapMatch = parentMap && getMapMatch(parentMap, name);

	          if (parentMapMatch)
	            return doMap(loader, parentPackage, parentPackageName, parentMapMatch, name, isPlugin);
	        }

	        return Promise.resolve();
	      })
	      .then(function(mapped) {
	        if (mapped)
	          return mapped;

	        var defaultJSExtension = loader.defaultJSExtensions && name.substr(name.length - 3, 3) != '.js';

	        // apply map, core, paths, contextual package map
	        var normalized = normalize.call(loader, name, parentName);

	        // undo defaultJSExtension
	        if (defaultJSExtension && normalized.substr(normalized.length - 3, 3) != '.js')
	          defaultJSExtension = false;
	        if (defaultJSExtension)
	          normalized = normalized.substr(0, normalized.length - 3);

	        var pkgConfigMatch = getPackageConfigMatch(loader, normalized);
	        var pkgName = pkgConfigMatch && pkgConfigMatch.packageName || getPackage(loader, normalized);

	        if (!pkgName)
	          return Promise.resolve(normalized + (defaultJSExtension ? '.js' : ''));

	        var pkg = loader.packages[pkgName];

	        // if package is already configured or not a dynamic config package, use existing package config
	        var isConfigured = pkg && (pkg.configured || !pkgConfigMatch);
	        return (isConfigured ? Promise.resolve(pkg) : loadPackageConfigPath(loader, pkgName, pkgConfigMatch.configPath))
	        .then(function(pkg) {
	          var subPath = normalized.substr(pkgName.length + 1);

	          return applyPackageConfig(loader, pkg, pkgName, subPath, isPlugin);
	        });
	      });
	    };
	  });

	  // check if the given normalized name matches a packageConfigPath
	  // if so, loads the config
	  var packageConfigPaths = {};

	  // data object for quick checks against package paths
	  function createPkgConfigPathObj(path) {
	    var lastWildcard = path.lastIndexOf('*');
	    var length = Math.max(lastWildcard + 1, path.lastIndexOf('/'));
	    return {
	      length: length,
	      regEx: new RegExp('^(' + path.substr(0, length).replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^\\/]+') + ')(\\/|$)'),
	      wildcard: lastWildcard != -1
	    };
	  }

	  // most specific match wins
	  function getPackageConfigMatch(loader, normalized) {
	    var pkgName, exactMatch = false, configPath;
	    for (var i = 0; i < loader.packageConfigPaths.length; i++) {
	      var packageConfigPath = loader.packageConfigPaths[i];
	      var p = packageConfigPaths[packageConfigPath] || (packageConfigPaths[packageConfigPath] = createPkgConfigPathObj(packageConfigPath));
	      if (normalized.length < p.length)
	        continue;
	      var match = normalized.match(p.regEx);
	      if (match && (!pkgName || (!(exactMatch && p.wildcard) && pkgName.length < match[1].length))) {
	        pkgName = match[1];
	        exactMatch = !p.wildcard;
	        configPath = pkgName + packageConfigPath.substr(p.length);
	      }
	    }

	    if (!pkgName)
	      return;

	    return {
	      packageName: pkgName,
	      configPath: configPath
	    };
	  }

	  function loadPackageConfigPath(loader, pkgName, pkgConfigPath) {
	    var configLoader = loader.pluginLoader || loader;

	    // NB remove this when json is default
	    (configLoader.meta[pkgConfigPath] = configLoader.meta[pkgConfigPath] || {}).format = 'json';
	    configLoader.meta[pkgConfigPath].loader = null;

	    return configLoader.load(pkgConfigPath)
	    .then(function() {
	      var cfg = configLoader.get(pkgConfigPath)['default'];

	      // support "systemjs" prefixing
	      if (cfg.systemjs)
	        cfg = cfg.systemjs;

	      // modules backwards compatibility
	      if (cfg.modules) {
	        cfg.meta = cfg.modules;
	        warn.call(loader, 'Package config file ' + pkgConfigPath + ' is configured with "modules", which is deprecated as it has been renamed to "meta".');
	      }

	      // remove any non-system properties if generic config file (eg package.json)
	      for (var p in cfg) {
	        if (indexOf.call(packageProperties, p) == -1)
	          delete cfg[p];
	      }

	      // deeply-merge (to first level) config with any existing package config
	      var pkg = loader.packages[pkgName] = loader.packages[pkgName] || {};
	      extendMeta(pkg, cfg, true);

	      // support external depCache
	      if (cfg.depCache) {
	        for (var d in cfg.depCache) {
	          var dNormalized;

	          if (d.substr(0, 2) == './')
	            dNormalized = pkgName + '/' + d.substr(2);
	          else
	            dNormalized = coreResolve.call(loader, d);
	          loader.depCache[dNormalized] = (loader.depCache[dNormalized] || []).concat(cfg.depCache[d]);
	        }
	        delete cfg.depCache;
	      }

	      // main object becomes main map
	      if (typeof pkg.main == 'object') {
	        pkg.map = pkg.map || {};
	        pkg.map['./@main'] = pkg.main;
	        pkg.main['default'] = pkg.main['default'] || './';
	        pkg.main = '@main';
	      }

	      return pkg;
	    });
	  }

	  function getMetaMatches(pkgMeta, subPath, matchFn) {
	    // wildcard meta
	    var meta = {};
	    var wildcardIndex;
	    for (var module in pkgMeta) {
	      // allow meta to start with ./ for flexibility
	      var dotRel = module.substr(0, 2) == './' ? './' : '';
	      if (dotRel)
	        module = module.substr(2);

	      wildcardIndex = module.indexOf('*');
	      if (wildcardIndex === -1)
	        continue;

	      if (module.substr(0, wildcardIndex) == subPath.substr(0, wildcardIndex)
	          && module.substr(wildcardIndex + 1) == subPath.substr(subPath.length - module.length + wildcardIndex + 1)) {
	        // alow match function to return true for an exit path
	        if (matchFn(module, pkgMeta[dotRel + module], module.split('/').length))
	          return;
	      }
	    }
	    // exact meta
	    var exactMeta = pkgMeta[subPath] && pkgMeta.hasOwnProperty && pkgMeta.hasOwnProperty(subPath) ? pkgMeta[subPath] : pkgMeta['./' + subPath];
	    if (exactMeta)
	      matchFn(exactMeta, exactMeta, 0);
	  }

	  hook('locate', function(locate) {
	    return function(load) {
	      var loader = this;
	      return Promise.resolve(locate.call(this, load))
	      .then(function(address) {
	        var pkgName = getPackage(loader, load.name);
	        if (pkgName) {
	          var pkg = loader.packages[pkgName];
	          var subPath = load.name.substr(pkgName.length + 1);

	          // format
	          if (pkg.format)
	            load.metadata.format = load.metadata.format || pkg.format;

	          var meta = {};
	          if (pkg.meta) {
	            var bestDepth = 0;

	            // NB support a main shorthand in meta here?
	            getMetaMatches(pkg.meta, subPath, function(metaPattern, matchMeta, matchDepth) {
	              if (matchDepth > bestDepth)
	                bestDepth = matchDepth;
	              extendMeta(meta, matchMeta, matchDepth && bestDepth > matchDepth);
	            });

	            extendMeta(load.metadata, meta);
	          }
	        }

	        return address;
	      });
	    };
	  });

	})();
	/*
	 * Script tag fetch
	 *
	 * When load.metadata.scriptLoad is true, we load via script tag injection.
	 */
	(function() {

	  if (typeof document != 'undefined')
	    var head = document.getElementsByTagName('head')[0];

	  var curSystem;
	  var curRequire;

	  // if doing worker executing, this is set to the load record being executed
	  var workerLoad = null;
	  
	  // interactive mode handling method courtesy RequireJS
	  var ieEvents = head && (function() {
	    var s = document.createElement('script');
	    var isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]';
	    return s.attachEvent && !(s.attachEvent.toString && s.attachEvent.toString().indexOf('[native code') < 0) && !isOpera;
	  })();

	  // IE interactive-only part
	  // we store loading scripts array as { script: <script>, load: {...} }
	  var interactiveLoadingScripts = [];
	  var interactiveScript;
	  function getInteractiveScriptLoad() {
	    if (interactiveScript && interactiveScript.script.readyState === 'interactive')
	      return interactiveScript.load;

	    for (var i = 0; i < interactiveLoadingScripts.length; i++)
	      if (interactiveLoadingScripts[i].script.readyState == 'interactive') {
	        interactiveScript = interactiveLoadingScripts[i];
	        return interactiveScript.load;
	      }
	  }
	  
	  // System.register, System.registerDynamic, AMD define pipeline
	  // this is called by the above methods when they execute
	  // we then run the reduceRegister_ collection function either immediately
	  // if we are in IE and know the currently executing script (interactive)
	  // or later if we need to wait for the synchronous load callback to know the script
	  var loadingCnt = 0;
	  var registerQueue = [];
	  hook('pushRegister_', function(pushRegister) {
	    return function(register) {
	      // if using eval-execution then skip
	      if (pushRegister.call(this, register))
	        return false;

	      // if using worker execution, then we're done
	      if (workerLoad)
	        this.reduceRegister_(workerLoad, register);

	      // detect if we know the currently executing load (IE)
	      // if so, immediately call reduceRegister
	      else if (ieEvents)
	        this.reduceRegister_(getInteractiveScriptLoad(), register);

	      // otherwise, add to our execution queue
	      // to call reduceRegister on sync script load event
	      else if (loadingCnt)
	        registerQueue.push(register);

	      // if we're not currently loading anything though
	      // then do the reduction against a null load
	      // (out of band named define or named register)
	      // note even in non-script environments, this catch is used
	      else
	        this.reduceRegister_(null, register);

	      return true;
	    };
	  });

	  function webWorkerImport(loader, load) {
	    return new Promise(function(resolve, reject) {
	      if (load.metadata.integrity)
	        reject(new Error('Subresource integrity checking is not supported in web workers.'));

	      workerLoad = load;
	      try {
	        importScripts(load.address);
	      }
	      catch(e) {
	        workerLoad = null;
	        reject(e);
	      }
	      workerLoad = null;

	      // if nothing registered, then something went wrong
	      if (!load.metadata.entry)
	        reject(new Error(load.address + ' did not call System.register or AMD define'));

	      resolve('');
	    });
	  }

	  // override fetch to use script injection
	  hook('fetch', function(fetch) {
	    return function(load) {
	      var loader = this;

	      if (load.metadata.format == 'json' || !load.metadata.scriptLoad || (!isBrowser && !isWorker))
	        return fetch.call(this, load);

	      if (isWorker)
	        return webWorkerImport(loader, load);

	      return new Promise(function(resolve, reject) {
	        var s = document.createElement('script');
	        
	        s.async = true;

	        if (load.metadata.crossOrigin)
	          s.crossOrigin = load.metadata.crossOrigin;

	        if (load.metadata.integrity)
	          s.setAttribute('integrity', load.metadata.integrity);

	        if (ieEvents) {
	          s.attachEvent('onreadystatechange', complete);
	          interactiveLoadingScripts.push({
	            script: s,
	            load: load
	          });
	        }
	        else {
	          s.addEventListener('load', complete, false);
	          s.addEventListener('error', error, false);
	        }

	        loadingCnt++;

	        curSystem = __global.System;
	        curRequire = __global.require;

	        s.src = load.address;
	        head.appendChild(s);

	        function complete(evt) {
	          if (s.readyState && s.readyState != 'loaded' && s.readyState != 'complete')
	            return;

	          loadingCnt--;

	          // complete call is sync on execution finish
	          // (in ie already done reductions)
	          if (!load.metadata.entry && !registerQueue.length) {
	            loader.reduceRegister_(load);
	          }
	          else if (!ieEvents) {
	            for (var i = 0; i < registerQueue.length; i++)
	              loader.reduceRegister_(load, registerQueue[i]);
	            registerQueue = [];
	          }

	          cleanup();

	          // if nothing registered, then something went wrong
	          if (!load.metadata.entry && !load.metadata.bundle)
	            reject(new Error(load.name + ' did not call System.register or AMD define. If loading a global module configure the global name via the meta exports property for script injection support.'));

	          resolve('');
	        }

	        function error(evt) {
	          cleanup();
	          reject(new Error('Unable to load script ' + load.address));
	        }

	        function cleanup() {
	          __global.System = curSystem;
	          __global.require = curRequire;

	          if (s.detachEvent) {
	            s.detachEvent('onreadystatechange', complete);
	            for (var i = 0; i < interactiveLoadingScripts.length; i++)
	              if (interactiveLoadingScripts[i].script == s) {
	                if (interactiveScript && interactiveScript.script == s)
	                  interactiveScript = null;
	                interactiveLoadingScripts.splice(i, 1);
	              }
	          }
	          else {
	            s.removeEventListener('load', complete, false);
	            s.removeEventListener('error', error, false);
	          }

	          head.removeChild(s);
	        }
	      });
	    };
	  });
	})();
	/*
	 * Instantiate registry extension
	 *
	 * Supports Traceur System.register 'instantiate' output for loading ES6 as ES5.
	 *
	 * - Creates the loader.register function
	 * - Also supports metadata.format = 'register' in instantiate for anonymous register modules
	 * - Also supports metadata.deps, metadata.execute and metadata.executingRequire
	 *     for handling dynamic modules alongside register-transformed ES6 modules
	 *
	 *
	 * The code here replicates the ES6 linking groups algorithm to ensure that
	 * circular ES6 compiled into System.register can work alongside circular AMD 
	 * and CommonJS, identically to the actual ES6 loader.
	 *
	 */


	/*
	 * Registry side table entries in loader.defined
	 * Registry Entry Contains:
	 *    - name
	 *    - deps 
	 *    - declare for declarative modules
	 *    - execute for dynamic modules, different to declarative execute on module
	 *    - executingRequire indicates require drives execution for circularity of dynamic modules
	 *    - declarative optional boolean indicating which of the above
	 *
	 * Can preload modules directly on SystemJS.defined['my/module'] = { deps, execute, executingRequire }
	 *
	 * Then the entry gets populated with derived information during processing:
	 *    - normalizedDeps derived from deps, created in instantiate
	 *    - groupIndex used by group linking algorithm
	 *    - evaluated indicating whether evaluation has happend
	 *    - module the module record object, containing:
	 *      - exports actual module exports
	 *
	 *    For dynamic we track the es module with:
	 *    - esModule actual es module value
	 *    - esmExports whether to extend the esModule with named exports
	 *      
	 *    Then for declarative only we track dynamic bindings with the 'module' records:
	 *      - name
	 *      - exports
	 *      - setters declarative setter functions
	 *      - dependencies, module records of dependencies
	 *      - importers, module records of dependents
	 *
	 * After linked and evaluated, entries are removed, declarative module records remain in separate
	 * module binding table
	 *
	 */

	var leadingCommentAndMetaRegEx = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/;
	function detectRegisterFormat(source) {
	  var leadingCommentAndMeta = source.match(leadingCommentAndMetaRegEx);
	  return leadingCommentAndMeta && source.substr(leadingCommentAndMeta[0].length, 15) == 'System.register';
	}

	function createEntry() {
	  return {
	    name: null,
	    deps: null,
	    originalIndices: null,
	    declare: null,
	    execute: null,
	    executingRequire: false,
	    declarative: false,
	    normalizedDeps: null,
	    groupIndex: null,
	    evaluated: false,
	    module: null,
	    esModule: null,
	    esmExports: false
	  };
	}

	(function() {

	  /*
	   * There are two variations of System.register:
	   * 1. System.register for ES6 conversion (2-3 params) - System.register([name, ]deps, declare)
	   *    see https://github.com/ModuleLoader/es6-module-loader/wiki/System.register-Explained
	   *
	   * 2. System.registerDynamic for dynamic modules (3-4 params) - System.registerDynamic([name, ]deps, executingRequire, execute)
	   * the true or false statement 
	   *
	   * this extension implements the linking algorithm for the two variations identical to the spec
	   * allowing compiled ES6 circular references to work alongside AMD and CJS circular references.
	   *
	   */
	  SystemJSLoader.prototype.register = function(name, deps, declare) {
	    if (typeof name != 'string') {
	      declare = deps;
	      deps = name;
	      name = null;
	    }

	    // dynamic backwards-compatibility
	    // can be deprecated eventually
	    if (typeof declare == 'boolean')
	      return this.registerDynamic.apply(this, arguments);

	    var entry = createEntry();
	    // ideally wouldn't apply map config to bundle names but 
	    // dependencies go through map regardless so we can't restrict
	    // could reconsider in shift to new spec
	    entry.name = name && (this.decanonicalize || this.normalize).call(this, name);
	    entry.declarative = true;
	    entry.deps = deps;
	    entry.declare = declare;

	    this.pushRegister_({
	      amd: false,
	      entry: entry
	    });
	  };
	  SystemJSLoader.prototype.registerDynamic = function(name, deps, declare, execute) {
	    if (typeof name != 'string') {
	      execute = declare;
	      declare = deps;
	      deps = name;
	      name = null;
	    }

	    // dynamic
	    var entry = createEntry();
	    entry.name = name && (this.decanonicalize || this.normalize).call(this, name);
	    entry.deps = deps;
	    entry.execute = execute;
	    entry.executingRequire = declare;

	    this.pushRegister_({
	      amd: false,
	      entry: entry
	    });
	  };
	  hook('reduceRegister_', function() {
	    return function(load, register) {
	      if (!register)
	        return;

	      var entry = register.entry;
	      var curMeta = load && load.metadata;

	      // named register
	      if (entry.name) {
	        if (!(entry.name in this.defined))
	          this.defined[entry.name] = entry;

	        if (curMeta)
	          curMeta.bundle = true;
	      }
	      // anonymous register
	      if (!entry.name || load && entry.name == load.name) {
	        if (!curMeta)
	          throw new TypeError('Invalid System.register call. Anonymous System.register calls can only be made by modules loaded by SystemJS.import and not via script tags.');
	        if (curMeta.entry) {
	          if (curMeta.format == 'register')
	            throw new Error('Multiple anonymous System.register calls in module ' + load.name + '. If loading a bundle, ensure all the System.register calls are named.');
	          else
	            throw new Error('Module ' + load.name + ' interpreted as ' + curMeta.format + ' module format, but called System.register.');
	        }
	        if (!curMeta.format)
	          curMeta.format = 'register';
	        curMeta.entry = entry;
	      }
	    };
	  });

	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);

	      this.defined = {};
	      this._loader.moduleRecords = {};
	    };
	  });

	  function buildGroups(entry, loader, groups) {
	    groups[entry.groupIndex] = groups[entry.groupIndex] || [];

	    if (indexOf.call(groups[entry.groupIndex], entry) != -1)
	      return;

	    groups[entry.groupIndex].push(entry);

	    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	      var depName = entry.normalizedDeps[i];
	      var depEntry = loader.defined[depName];
	      
	      // not in the registry means already linked / ES6
	      if (!depEntry || depEntry.evaluated)
	        continue;
	      
	      // now we know the entry is in our unlinked linkage group
	      var depGroupIndex = entry.groupIndex + (depEntry.declarative != entry.declarative);

	      // the group index of an entry is always the maximum
	      if (depEntry.groupIndex === null || depEntry.groupIndex < depGroupIndex) {
	        
	        // if already in a group, remove from the old group
	        if (depEntry.groupIndex !== null) {
	          groups[depEntry.groupIndex].splice(indexOf.call(groups[depEntry.groupIndex], depEntry), 1);

	          // if the old group is empty, then we have a mixed depndency cycle
	          if (groups[depEntry.groupIndex].length == 0)
	            throw new Error("Mixed dependency cycle detected");
	        }

	        depEntry.groupIndex = depGroupIndex;
	      }

	      buildGroups(depEntry, loader, groups);
	    }
	  }

	  function link(name, loader) {
	    var startEntry = loader.defined[name];

	    // skip if already linked
	    if (startEntry.module)
	      return;

	    startEntry.groupIndex = 0;

	    var groups = [];

	    buildGroups(startEntry, loader, groups);

	    var curGroupDeclarative = !!startEntry.declarative == groups.length % 2;
	    for (var i = groups.length - 1; i >= 0; i--) {
	      var group = groups[i];
	      for (var j = 0; j < group.length; j++) {
	        var entry = group[j];

	        // link each group
	        if (curGroupDeclarative)
	          linkDeclarativeModule(entry, loader);
	        else
	          linkDynamicModule(entry, loader);
	      }
	      curGroupDeclarative = !curGroupDeclarative; 
	    }
	  }

	  // module binding records
	  function ModuleRecord() {}
	  defineProperty(ModuleRecord, 'toString', {
	    value: function() {
	      return 'Module';
	    }
	  });

	  function getOrCreateModuleRecord(name, moduleRecords) {
	    return moduleRecords[name] || (moduleRecords[name] = {
	      name: name,
	      dependencies: [],
	      exports: new ModuleRecord(), // start from an empty module and extend
	      importers: []
	    });
	  }

	  function linkDeclarativeModule(entry, loader) {
	    // only link if already not already started linking (stops at circular)
	    if (entry.module)
	      return;

	    var moduleRecords = loader._loader.moduleRecords;
	    var module = entry.module = getOrCreateModuleRecord(entry.name, moduleRecords);
	    var exports = entry.module.exports;

	    var declaration = entry.declare.call(__global, function(name, value) {
	      module.locked = true;

	      if (typeof name == 'object') {
	        for (var p in name)
	          exports[p] = name[p];
	      }
	      else {
	        exports[name] = value;
	      }

	      for (var i = 0, l = module.importers.length; i < l; i++) {
	        var importerModule = module.importers[i];
	        if (!importerModule.locked) {
	          var importerIndex = indexOf.call(importerModule.dependencies, module);
	          importerModule.setters[importerIndex](exports);
	        }
	      }

	      module.locked = false;
	      return value;
	    }, { id: entry.name });
	    
	    module.setters = declaration.setters;
	    module.execute = declaration.execute;

	    if (!module.setters || !module.execute) {
	      throw new TypeError('Invalid System.register form for ' + entry.name);
	    }

	    // now link all the module dependencies
	    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	      var depName = entry.normalizedDeps[i];
	      var depEntry = loader.defined[depName];
	      var depModule = moduleRecords[depName];

	      // work out how to set depExports based on scenarios...
	      var depExports;

	      if (depModule) {
	        depExports = depModule.exports;
	      }
	      // dynamic, already linked in our registry
	      else if (depEntry && !depEntry.declarative) {
	        depExports = depEntry.esModule;
	      }
	      // in the loader registry
	      else if (!depEntry) {
	        depExports = loader.get(depName);
	      }
	      // we have an entry -> link
	      else {
	        linkDeclarativeModule(depEntry, loader);
	        depModule = depEntry.module;
	        depExports = depModule.exports;
	      }

	      // only declarative modules have dynamic bindings
	      if (depModule && depModule.importers) {
	        depModule.importers.push(module);
	        module.dependencies.push(depModule);
	      }
	      else {
	        module.dependencies.push(null);
	      }
	      
	      // run setters for all entries with the matching dependency name
	      var originalIndices = entry.originalIndices[i];
	      for (var j = 0, len = originalIndices.length; j < len; ++j) {
	        var index = originalIndices[j];
	        if (module.setters[index]) {
	          module.setters[index](depExports);
	        }
	      }
	    }
	  }

	  // An analog to loader.get covering execution of all three layers (real declarative, simulated declarative, simulated dynamic)
	  function getModule(name, loader) {
	    var exports;
	    var entry = loader.defined[name];

	    if (!entry) {
	      exports = loader.get(name);
	      if (!exports)
	        throw new Error('Unable to load dependency ' + name + '.');
	    }

	    else {
	      if (entry.declarative)
	        ensureEvaluated(name, [], loader);
	    
	      else if (!entry.evaluated)
	        linkDynamicModule(entry, loader);

	      exports = entry.module.exports;
	    }

	    if ((!entry || entry.declarative) && exports && exports.__useDefault)
	      return exports['default'];
	    
	    return exports;
	  }

	  function linkDynamicModule(entry, loader) {
	    if (entry.module)
	      return;

	    var exports = {};

	    var module = entry.module = { exports: exports, id: entry.name };

	    // AMD requires execute the tree first
	    if (!entry.executingRequire) {
	      for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	        var depName = entry.normalizedDeps[i];
	        // we know we only need to link dynamic due to linking algorithm
	        var depEntry = loader.defined[depName];
	        if (depEntry)
	          linkDynamicModule(depEntry, loader);
	      }
	    }

	    // now execute
	    entry.evaluated = true;
	    var output = entry.execute.call(__global, function(name) {
	      for (var i = 0, l = entry.deps.length; i < l; i++) {
	        if (entry.deps[i] != name)
	          continue;
	        return getModule(entry.normalizedDeps[i], loader);
	      }
	      // try and normalize the dependency to see if we have another form
	      var nameNormalized = loader.normalizeSync(name, entry.name);
	      if (indexOf.call(entry.normalizedDeps, nameNormalized) != -1)
	        return getModule(nameNormalized, loader);

	      throw new Error('Module ' + name + ' not declared as a dependency of ' + entry.name);
	    }, exports, module);
	    
	    if (output)
	      module.exports = output;

	    // create the esModule object, which allows ES6 named imports of dynamics
	    exports = module.exports;

	    // __esModule flag treats as already-named
	    if (exports && (exports.__esModule || exports instanceof Module))
	      entry.esModule = exports;
	    // set module as 'default' export, then fake named exports by iterating properties
	    else if (entry.esmExports && exports !== __global)
	      entry.esModule = getESModule(exports);
	    // just use the 'default' export
	    else
	      entry.esModule = { 'default': exports };
	  }

	  /*
	   * Given a module, and the list of modules for this current branch,
	   *  ensure that each of the dependencies of this module is evaluated
	   *  (unless one is a circular dependency already in the list of seen
	   *  modules, in which case we execute it)
	   *
	   * Then we evaluate the module itself depth-first left to right 
	   * execution to match ES6 modules
	   */
	  function ensureEvaluated(moduleName, seen, loader) {
	    var entry = loader.defined[moduleName];

	    // if already seen, that means it's an already-evaluated non circular dependency
	    if (!entry || entry.evaluated || !entry.declarative)
	      return;

	    // this only applies to declarative modules which late-execute

	    seen.push(moduleName);

	    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	      var depName = entry.normalizedDeps[i];
	      if (indexOf.call(seen, depName) == -1) {
	        if (!loader.defined[depName])
	          loader.get(depName);
	        else
	          ensureEvaluated(depName, seen, loader);
	      }
	    }

	    if (entry.evaluated)
	      return;

	    entry.evaluated = true;
	    entry.module.execute.call(__global);
	  }

	  // override the delete method to also clear the register caches
	  hook('delete', function(del) {
	    return function(name) {
	      delete this._loader.moduleRecords[name];
	      delete this.defined[name];
	      return del.call(this, name);
	    };
	  });

	  hook('fetch', function(fetch) {
	    return function(load) {
	      if (this.defined[load.name]) {
	        load.metadata.format = 'defined';
	        return '';
	      }

	      load.metadata.deps = load.metadata.deps || [];
	      
	      return fetch.call(this, load);
	    };
	  });

	  hook('translate', function(translate) {
	    // we run the meta detection here (register is after meta)
	    return function(load) {
	      load.metadata.deps = load.metadata.deps || [];
	      return Promise.resolve(translate.call(this, load)).then(function(source) {
	        // run detection for register format
	        if (load.metadata.format == 'register' || !load.metadata.format && detectRegisterFormat(load.source))
	          load.metadata.format = 'register';
	        return source;
	      });
	    };
	  });

	  hook('instantiate', function(instantiate) {
	    return function(load) {
	      if (load.metadata.format == 'detect')
	        load.metadata.format = undefined;

	      // assumes previous instantiate is sync
	      // (core json support)
	      instantiate.call(this, load);

	      var loader = this;

	      var entry;

	      // first we check if this module has already been defined in the registry
	      if (loader.defined[load.name]) {
	        entry = loader.defined[load.name];
	        // don't support deps for ES modules
	        if (!entry.declarative)
	          entry.deps = entry.deps.concat(load.metadata.deps);
	      }

	      // picked up already by an anonymous System.register script injection
	      // or via the dynamic formats
	      else if (load.metadata.entry) {
	        entry = load.metadata.entry;
	        entry.deps = entry.deps.concat(load.metadata.deps);
	      }

	      // Contains System.register calls
	      // (dont run bundles in the builder)
	      else if (!(loader.builder && load.metadata.bundle) 
	          && (load.metadata.format == 'register' || load.metadata.format == 'esm' || load.metadata.format == 'es6')) {
	        
	        if (typeof __exec != 'undefined')
	          __exec.call(loader, load);

	        if (!load.metadata.entry && !load.metadata.bundle)
	          throw new Error(load.name + ' detected as ' + load.metadata.format + ' but didn\'t execute.');

	        entry = load.metadata.entry;

	        // support metadata deps for System.register
	        if (entry && load.metadata.deps)
	          entry.deps = entry.deps.concat(load.metadata.deps);
	      }

	      // named bundles are just an empty module
	      if (!entry) {
	        entry = createEntry();
	        entry.deps = load.metadata.deps;
	        entry.execute = function() {};
	      }

	      // place this module onto defined for circular references
	      loader.defined[load.name] = entry;
	      
	      var grouped = group(entry.deps);
	      
	      entry.deps = grouped.names;
	      entry.originalIndices = grouped.indices;
	      entry.name = load.name;
	      entry.esmExports = load.metadata.esmExports !== false;

	      // first, normalize all dependencies
	      var normalizePromises = [];
	      for (var i = 0, l = entry.deps.length; i < l; i++)
	        normalizePromises.push(Promise.resolve(loader.normalize(entry.deps[i], load.name)));

	      return Promise.all(normalizePromises).then(function(normalizedDeps) {

	        entry.normalizedDeps = normalizedDeps;

	        return {
	          deps: entry.deps,
	          execute: function() {
	            // recursively ensure that the module and all its 
	            // dependencies are linked (with dependency group handling)
	            link(load.name, loader);

	            // now handle dependency execution in correct order
	            ensureEvaluated(load.name, [], loader);

	            // remove from the registry
	            loader.defined[load.name] = undefined;

	            // return the defined module object
	            return loader.newModule(entry.declarative ? entry.module.exports : entry.esModule);
	          }
	        };
	      });
	    };
	  });
	})();


	function getGlobalValue(exports) {
	  if (typeof exports == 'string')
	    return readMemberExpression(exports, __global);

	  if (!(exports instanceof Array))
	    throw new Error('Global exports must be a string or array.');

	  var globalValue = {};
	  var first = true;
	  for (var i = 0; i < exports.length; i++) {
	    var val = readMemberExpression(exports[i], __global);
	    if (first) {
	      globalValue['default'] = val;
	      first = false;
	    }
	    globalValue[exports[i].split('.').pop()] = val;
	  }
	  return globalValue;
	}

	hook('reduceRegister_', function(reduceRegister) {
	  return function(load, register) {
	    if (register || !load.metadata.exports)
	      return reduceRegister.call(this, load, register);

	    load.metadata.format = 'global';
	    var entry = load.metadata.entry = createEntry();
	    entry.deps = load.metadata.deps;
	    var globalValue = getGlobalValue(load.metadata.exports);
	    entry.execute = function() {
	      return globalValue;
	    };
	  };
	});

	hookConstructor(function(constructor) {
	  return function() {
	    var loader = this;
	    constructor.call(loader);

	    var hasOwnProperty = Object.prototype.hasOwnProperty;

	    // bare minimum ignores
	    var ignoredGlobalProps = ['_g', 'sessionStorage', 'localStorage', 'clipboardData', 'frames', 'frameElement', 'external', 
	      'mozAnimationStartTime', 'webkitStorageInfo', 'webkitIndexedDB', 'mozInnerScreenY', 'mozInnerScreenX'];

	    var globalSnapshot;

	    function forEachGlobal(callback) {
	      if (Object.keys)
	        Object.keys(__global).forEach(callback);
	      else
	        for (var g in __global) {
	          if (!hasOwnProperty.call(__global, g))
	            continue;
	          callback(g);
	        }
	    }

	    function forEachGlobalValue(callback) {
	      forEachGlobal(function(globalName) {
	        if (indexOf.call(ignoredGlobalProps, globalName) != -1)
	          return;
	        try {
	          var value = __global[globalName];
	        }
	        catch (e) {
	          ignoredGlobalProps.push(globalName);
	        }
	        callback(globalName, value);
	      });
	    }

	    loader.set('@@global-helpers', loader.newModule({
	      prepareGlobal: function(moduleName, exports, globals) {
	        // disable module detection
	        var curDefine = __global.define;
	        
	        __global.define = undefined;

	        // set globals
	        var oldGlobals;
	        if (globals) {
	          oldGlobals = {};
	          for (var g in globals) {
	            oldGlobals[g] = __global[g];
	            __global[g] = globals[g];
	          }
	        }

	        // store a complete copy of the global object in order to detect changes
	        if (!exports) {
	          globalSnapshot = {};

	          forEachGlobalValue(function(name, value) {
	            globalSnapshot[name] = value;
	          });
	        }

	        // return function to retrieve global
	        return function() {
	          var globalValue;

	          if (exports) {
	            globalValue = getGlobalValue(exports);
	          }
	          else {
	            globalValue = {};
	            var singleGlobal;
	            var multipleExports;

	            forEachGlobalValue(function(name, value) {
	              if (globalSnapshot[name] === value)
	                return;
	              if (typeof value == 'undefined')
	                return;
	              globalValue[name] = value;

	              if (typeof singleGlobal != 'undefined') {
	                if (!multipleExports && singleGlobal !== value)
	                  multipleExports = true;
	              }
	              else {
	                singleGlobal = value;
	              }
	            });
	            globalValue = multipleExports ? globalValue : singleGlobal;
	          }

	          // revert globals
	          if (oldGlobals) {
	            for (var g in oldGlobals)
	              __global[g] = oldGlobals[g];
	          }
	          __global.define = curDefine;

	          return globalValue;
	        };
	      }
	    }));
	  };
	});
	hookConstructor(function(constructor) {
	  return function() {
	    var loader = this;
	    constructor.call(loader);

	    if (typeof window != 'undefined' && typeof document != 'undefined' && window.location)
	      var windowOrigin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

	    function stripOrigin(path) {
	      if (path.substr(0, 8) == 'file:///')
	        return path.substr(7 + !!isWindows);
	      
	      if (windowOrigin && path.substr(0, windowOrigin.length) == windowOrigin)
	        return path.substr(windowOrigin.length);

	      return path;
	    }

	    loader.set('@@cjs-helpers', loader.newModule({
	      requireResolve: function(request, parentId) {
	        return stripOrigin(loader.normalizeSync(request, parentId));
	      },
	      getPathVars: function(moduleId) {
	        // remove any plugin syntax
	        var pluginIndex = moduleId.lastIndexOf('!');
	        var filename;
	        if (pluginIndex != -1)
	          filename = moduleId.substr(0, pluginIndex);
	        else
	          filename = moduleId;

	        var dirname = filename.split('/');
	        dirname.pop();
	        dirname = dirname.join('/');

	        return {
	          filename: stripOrigin(filename),
	          dirname: stripOrigin(dirname)
	        };
	      }
	    }))
	  };
	});/*
	 * AMD Helper function module
	 * Separated into its own file as this is the part needed for full AMD support in SFX builds
	 * NB since implementations have now diverged this can be merged back with amd.js
	 */

	hook('fetch', function(fetch) {
	  return function(load) {
	    // script load implies define global leak
	    if (load.metadata.scriptLoad && isBrowser)
	      __global.define = this.amdDefine;
	    return fetch.call(this, load);
	  };
	});
	 
	hookConstructor(function(constructor) {
	  return function() {
	    var loader = this;
	    constructor.call(this);

	    var commentRegEx = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
	    var cjsRequirePre = "(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])";
	    var cjsRequirePost = "\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)";
	    var fnBracketRegEx = /\(([^\)]*)\)/;
	    var wsRegEx = /^\s+|\s+$/g;
	    
	    var requireRegExs = {};

	    function getCJSDeps(source, requireIndex) {

	      // remove comments
	      source = source.replace(commentRegEx, '');

	      // determine the require alias
	      var params = source.match(fnBracketRegEx);
	      var requireAlias = (params[1].split(',')[requireIndex] || 'require').replace(wsRegEx, '');

	      // find or generate the regex for this requireAlias
	      var requireRegEx = requireRegExs[requireAlias] || (requireRegExs[requireAlias] = new RegExp(cjsRequirePre + requireAlias + cjsRequirePost, 'g'));

	      requireRegEx.lastIndex = 0;

	      var deps = [];

	      var match;
	      while (match = requireRegEx.exec(source))
	        deps.push(match[2] || match[3]);

	      return deps;
	    }

	    /*
	      AMD-compatible require
	      To copy RequireJS, set window.require = window.requirejs = loader.amdRequire
	    */
	    function require(names, callback, errback, referer) {
	      // in amd, first arg can be a config object... we just ignore
	      if (typeof names == 'object' && !(names instanceof Array))
	        return require.apply(null, Array.prototype.splice.call(arguments, 1, arguments.length - 1));

	      // amd require
	      if (typeof names == 'string' && typeof callback == 'function')
	        names = [names];
	      if (names instanceof Array) {
	        var dynamicRequires = [];
	        for (var i = 0; i < names.length; i++)
	          dynamicRequires.push(loader['import'](names[i], referer));
	        Promise.all(dynamicRequires).then(function(modules) {
	          if (callback)
	            callback.apply(null, modules);
	        }, errback);
	      }

	      // commonjs require
	      else if (typeof names == 'string') {
	        var defaultJSExtension = loader.defaultJSExtensions && names.substr(names.length - 3, 3) != '.js';
	        var normalized = loader.decanonicalize(names, referer);
	        if (defaultJSExtension && normalized.substr(normalized.length - 3, 3) == '.js')
	          normalized = normalized.substr(0, normalized.length - 3);
	        var module = loader.get(normalized);
	        if (!module)
	          throw new Error('Module not already loaded loading "' + names + '" as ' + normalized + (referer ? ' from "' + referer + '".' : '.'));
	        return module.__useDefault ? module['default'] : module;
	      }

	      else
	        throw new TypeError('Invalid require');
	    }

	    function define(name, deps, factory) {
	      if (typeof name != 'string') {
	        factory = deps;
	        deps = name;
	        name = null;
	      }
	      if (!(deps instanceof Array)) {
	        factory = deps;
	        deps = ['require', 'exports', 'module'].splice(0, factory.length);
	      }

	      if (typeof factory != 'function')
	        factory = (function(factory) {
	          return function() { return factory; }
	        })(factory);

	      // in IE8, a trailing comma becomes a trailing undefined entry
	      if (deps[deps.length - 1] === undefined)
	        deps.pop();

	      // remove system dependencies
	      var requireIndex, exportsIndex, moduleIndex;
	      
	      if ((requireIndex = indexOf.call(deps, 'require')) != -1) {
	        
	        deps.splice(requireIndex, 1);

	        // only trace cjs requires for non-named
	        // named defines assume the trace has already been done
	        if (!name)
	          deps = deps.concat(getCJSDeps(factory.toString(), requireIndex));
	      }

	      if ((exportsIndex = indexOf.call(deps, 'exports')) != -1)
	        deps.splice(exportsIndex, 1);
	      
	      if ((moduleIndex = indexOf.call(deps, 'module')) != -1)
	        deps.splice(moduleIndex, 1);

	      function execute(req, exports, module) {
	        var depValues = [];
	        for (var i = 0; i < deps.length; i++)
	          depValues.push(req(deps[i]));

	        module.uri = module.id;

	        module.config = function() {};

	        // add back in system dependencies
	        if (moduleIndex != -1)
	          depValues.splice(moduleIndex, 0, module);
	        
	        if (exportsIndex != -1)
	          depValues.splice(exportsIndex, 0, exports);
	        
	        if (requireIndex != -1) {
	          function contextualRequire(names, callback, errback) {
	            if (typeof names == 'string' && typeof callback != 'function')
	              return req(names);
	            return require.call(loader, names, callback, errback, module.id);
	          }
	          contextualRequire.toUrl = function(name) {
	            // normalize without defaultJSExtensions
	            var defaultJSExtension = loader.defaultJSExtensions && name.substr(name.length - 3, 3) != '.js';
	            var url = loader.decanonicalize(name, module.id);
	            if (defaultJSExtension && url.substr(url.length - 3, 3) == '.js')
	              url = url.substr(0, url.length - 3);
	            return url;
	          };
	          depValues.splice(requireIndex, 0, contextualRequire);
	        }

	        // set global require to AMD require
	        var curRequire = __global.require;
	        __global.require = require;

	        var output = factory.apply(exportsIndex == -1 ? __global : exports, depValues);

	        __global.require = curRequire;

	        if (typeof output == 'undefined' && module)
	          output = module.exports;

	        if (typeof output != 'undefined')
	          return output;
	      }

	      var entry = createEntry();
	      entry.name = name && (loader.decanonicalize || loader.normalize).call(loader, name);
	      entry.deps = deps;
	      entry.execute = execute;

	      loader.pushRegister_({
	        amd: true,
	        entry: entry
	      });
	    }
	    define.amd = {};

	    // reduction function to attach defines to a load record
	    hook('reduceRegister_', function(reduceRegister) {
	      return function(load, register) {
	        // only handle AMD registers here
	        if (!register || !register.amd)
	          return reduceRegister.call(this, load, register);

	        var curMeta = load && load.metadata;
	        var entry = register.entry;

	        if (curMeta) {
	          if (!curMeta.format || curMeta.format == 'detect')
	            curMeta.format = 'amd';
	          else if (!entry.name && curMeta.format != 'amd')
	            throw new Error('AMD define called while executing ' + curMeta.format + ' module ' + load.name);
	        }

	        // anonymous define
	        if (!entry.name) {
	          if (!curMeta)
	            throw new TypeError('Unexpected anonymous AMD define.');

	          if (curMeta.entry && !curMeta.entry.name)
	            throw new Error('Multiple anonymous defines in module ' + load.name);
	          
	          curMeta.entry = entry;
	        }
	        // named define
	        else {
	          // if we don't have any other defines, 
	          // then let this be an anonymous define
	          // this is just to support single modules of the form:
	          // define('jquery')
	          // still loading anonymously
	          // because it is done widely enough to be useful
	          // as soon as there is more than one define, this gets removed though
	          if (curMeta) {
	            if (!curMeta.entry && !curMeta.bundle)
	              curMeta.entry = entry;
	            else if (curMeta.entry && curMeta.entry.name)
	              curMeta.entry = undefined;

	            // note this is now a bundle
	            curMeta.bundle = true;
	          }

	          // define the module through the register registry
	          if (!(entry.name in this.defined))
	            this.defined[entry.name] = entry;
	        }
	      };
	    });

	    loader.amdDefine = define;
	    loader.amdRequire = require;
	  };
	});/*
	  SystemJS Loader Plugin Support

	  Supports plugin loader syntax with "!", or via metadata.loader

	  The plugin name is loaded as a module itself, and can override standard loader hooks
	  for the plugin resource. See the plugin section of the systemjs readme.
	*/

	(function() {
	  function getParentName(loader, parentName) {
	    // if parent is a plugin, normalize against the parent plugin argument only
	    if (parentName) {
	      var parentPluginIndex;
	      if (loader.pluginFirst) {
	        if ((parentPluginIndex = parentName.lastIndexOf('!')) != -1)
	          return parentName.substr(parentPluginIndex + 1);
	      }
	      else {
	        if ((parentPluginIndex = parentName.indexOf('!')) != -1)
	          return parentName.substr(0, parentPluginIndex);
	      }

	      return parentName;
	    }
	  }

	  function parsePlugin(loader, name) {
	    var argumentName;
	    var pluginName;

	    var pluginIndex = name.lastIndexOf('!');

	    if (pluginIndex == -1)
	      return;

	    if (loader.pluginFirst) {
	      argumentName = name.substr(pluginIndex + 1);
	      pluginName = name.substr(0, pluginIndex);
	    }
	    else {
	      argumentName = name.substr(0, pluginIndex);
	      pluginName = name.substr(pluginIndex + 1) || argumentName.substr(argumentName.lastIndexOf('.') + 1);
	    }

	    return {
	      argument: argumentName,
	      plugin: pluginName
	    };
	  }

	  // put name back together after parts have been normalized
	  function combinePluginParts(loader, argumentName, pluginName, defaultExtension) {
	    if (defaultExtension && argumentName.substr(argumentName.length - 3, 3) == '.js')
	      argumentName = argumentName.substr(0, argumentName.length - 3);

	    if (loader.pluginFirst) {
	      return pluginName + '!' + argumentName;
	    }
	    else {
	      return argumentName + '!' + pluginName;
	    }
	  }

	  // note if normalize will add a default js extension
	  // if so, remove for backwards compat
	  // this is strange and sucks, but will be deprecated
	  function checkDefaultExtension(loader, arg) {
	    return loader.defaultJSExtensions && arg.substr(arg.length - 3, 3) != '.js'; 
	  }

	  function createNormalizeSync(normalizeSync) {
	    return function(name, parentName, isPlugin) {
	      var loader = this;
	      
	      parentName = getParentName(this, parentName);
	      var parsed = parsePlugin(loader, name);

	      if (!parsed)
	        return normalizeSync.call(this, name, parentName, isPlugin);

	      // if this is a plugin, normalize the plugin name and the argument
	      var argumentName = loader.normalizeSync(parsed.argument, parentName, true);
	      var pluginName = loader.normalizeSync(parsed.plugin, parentName, true);
	      return combinePluginParts(loader, argumentName, pluginName, checkDefaultExtension(loader, parsed.argument));
	    };
	  }
	  
	  hook('decanonicalize', createNormalizeSync);
	  hook('normalizeSync', createNormalizeSync);

	  hook('normalize', function(normalize) {
	    return function(name, parentName, isPlugin) {
	      var loader = this;

	      parentName = getParentName(this, parentName);

	      var parsed = parsePlugin(loader, name);

	      if (!parsed)
	        return normalize.call(loader, name, parentName, isPlugin);

	      return Promise.all([
	        loader.normalize(parsed.argument, parentName, true),
	        loader.normalize(parsed.plugin, parentName)
	      ])
	      .then(function(normalized) {
	        return combinePluginParts(loader, normalized[0], normalized[1], checkDefaultExtension(loader, parsed.argument));
	      });
	    }
	  });

	  hook('locate', function(locate) {
	    return function(load) {
	      var loader = this;

	      var name = load.name;

	      // plugin syntax
	      var pluginSyntaxIndex;
	      if (loader.pluginFirst) {
	        if ((pluginSyntaxIndex = name.indexOf('!')) != -1) {
	          load.metadata.loader = name.substr(0, pluginSyntaxIndex);
	          load.name = name.substr(pluginSyntaxIndex + 1);
	        }
	      }
	      else {
	        if ((pluginSyntaxIndex = name.lastIndexOf('!')) != -1) {
	          load.metadata.loader = name.substr(pluginSyntaxIndex + 1);
	          load.name = name.substr(0, pluginSyntaxIndex);
	        }
	      }

	      return locate.call(loader, load)
	      .then(function(address) {
	        if (pluginSyntaxIndex != -1 || !load.metadata.loader)
	          return address;

	        // normalize plugin relative to parent in locate here when
	        // using plugin via loader metadata
	        return loader.normalize(load.metadata.loader, load.name)
	        .then(function(loaderNormalized) {
	          load.metadata.loader = loaderNormalized;
	          return address;
	        });
	      })
	      .then(function(address) {
	        var plugin = load.metadata.loader;

	        if (!plugin)
	          return address;

	        // don't allow a plugin to load itself
	        if (load.name == plugin)
	          throw new Error('Plugin ' + plugin + ' cannot load itself, make sure it is excluded from any wildcard meta configuration via a custom loader: false rule.');

	        // only fetch the plugin itself if this name isn't defined
	        if (loader.defined && loader.defined[name])
	          return address;

	        var pluginLoader = loader.pluginLoader || loader;

	        // load the plugin module and run standard locate
	        return pluginLoader['import'](plugin)
	        .then(function(loaderModule) {
	          // store the plugin module itself on the metadata
	          load.metadata.loaderModule = loaderModule;

	          load.address = address;
	          if (loaderModule.locate)
	            return loaderModule.locate.call(loader, load);

	          return address;
	        });
	      });
	    };
	  });

	  hook('fetch', function(fetch) {
	    return function(load) {
	      var loader = this;
	      if (load.metadata.loaderModule && load.metadata.loaderModule.fetch && load.metadata.format != 'defined') {
	        load.metadata.scriptLoad = false;
	        return load.metadata.loaderModule.fetch.call(loader, load, function(load) {
	          return fetch.call(loader, load);
	        });
	      }
	      else {
	        return fetch.call(loader, load);
	      }
	    };
	  });

	  hook('translate', function(translate) {
	    return function(load) {
	      var loader = this;
	      if (load.metadata.loaderModule && load.metadata.loaderModule.translate && load.metadata.format != 'defined') {
	        return Promise.resolve(load.metadata.loaderModule.translate.call(loader, load)).then(function(result) {
	          var sourceMap = load.metadata.sourceMap;

	          // sanitize sourceMap if an object not a JSON string
	          if (sourceMap) {
	            if (typeof sourceMap != 'object')
	              throw new Error('load.metadata.sourceMap must be set to an object.');

	            var originalName = load.name.split('!')[0];
	            
	            // force set the filename of the original file
	            sourceMap.file = originalName + '!transpiled';

	            // force set the sources list if only one source
	            if (!sourceMap.sources || sourceMap.sources.length <= 1)
	              sourceMap.sources = [originalName];
	          }

	          // if running on file:/// URLs, sourcesContent is necessary
	          // load.metadata.sourceMap.sourcesContent = [load.source];

	          if (typeof result == 'string')
	            load.source = result;
	          else
	            warn.call(this, 'Plugin ' + load.metadata.loader + ' should return the source in translate, instead of setting load.source directly. This support will be deprecated.');

	          return translate.call(loader, load);
	        });
	      }
	      else {
	        return translate.call(loader, load);
	      }
	    };
	  });

	  hook('instantiate', function(instantiate) {
	    return function(load) {
	      var loader = this;
	      var calledInstantiate = false;

	      if (load.metadata.loaderModule && load.metadata.loaderModule.instantiate && !loader.builder && load.metadata.format != 'defined')
	        return Promise.resolve(load.metadata.loaderModule.instantiate.call(loader, load, function(load) {
	          if (calledInstantiate)
	            throw new Error('Instantiate must only be called once.');
	          calledInstantiate = true;
	          return instantiate.call(loader, load);
	        })).then(function(result) {
	          if (calledInstantiate)
	            return result;

	          load.metadata.entry = createEntry();
	          load.metadata.entry.execute = function() {
	            return result;
	          }
	          load.metadata.entry.deps = load.metadata.deps;
	          load.metadata.format = 'defined';
	          return instantiate.call(loader, load);
	        });
	      else
	        return instantiate.call(loader, load);
	    };
	  });

	})();/*
	 * Conditions Extension
	 *
	 *   Allows a condition module to alter the resolution of an import via syntax:
	 *
	 *     import $ from 'jquery/#{browser}';
	 *
	 *   Will first load the module 'browser' via `SystemJS.import('browser')` and 
	 *   take the default export of that module.
	 *   If the default export is not a string, an error is thrown.
	 * 
	 *   We then substitute the string into the require to get the conditional resolution
	 *   enabling environment-specific variations like:
	 * 
	 *     import $ from 'jquery/ie'
	 *     import $ from 'jquery/firefox'
	 *     import $ from 'jquery/chrome'
	 *     import $ from 'jquery/safari'
	 *
	 *   It can be useful for a condition module to define multiple conditions.
	 *   This can be done via the `|` modifier to specify an export member expression:
	 *
	 *     import 'jquery/#{./browser.js|grade.version}'
	 *
	 *   Where the `grade` export `version` member in the `browser.js` module  is substituted.
	 *
	 *
	 * Boolean Conditionals
	 *
	 *   For polyfill modules, that are used as imports but have no module value,
	 *   a binary conditional allows a module not to be loaded at all if not needed:
	 *
	 *     import 'es5-shim#?./conditions.js|needs-es5shim'
	 *
	 *   These conditions can also be negated via:
	 *     
	 *     import 'es5-shim#?~./conditions.js|es6'
	 *
	 */

	  function parseCondition(condition) {
	    var conditionExport, conditionModule, negation;

	    var negation = condition[0] == '~';
	    var conditionExportIndex = condition.lastIndexOf('|');
	    if (conditionExportIndex != -1) {
	      conditionExport = condition.substr(conditionExportIndex + 1);
	      conditionModule = condition.substr(negation, conditionExportIndex - negation) || '@system-env';
	    }
	    else {
	      conditionExport = null;
	      conditionModule = condition.substr(negation);
	    }

	    return {
	      module: conditionModule,
	      prop: conditionExport,
	      negate: negation
	    };
	  }

	  function serializeCondition(conditionObj) {
	    return (conditionObj.negate ? '~' : '') + conditionObj.module + (conditionObj.prop ? '|' + conditionObj.prop : '');
	  }

	  function resolveCondition(conditionObj, parentName, bool) {
	    return this['import'](conditionObj.module, parentName)
	    .then(function(m) {
	      if (conditionObj.prop)
	        m = readMemberExpression(conditionObj.prop, m);
	      else if (typeof m == 'object' && m + '' == 'Module')
	        m = m['default'];

	      if (bool && typeof m != 'boolean')
	        throw new TypeError('Condition ' + serializeCondition(conditionObj) + ' did not resolve to a boolean.');

	      return conditionObj.negate ? !m : m;
	    });
	  }

	  var interpolationRegEx = /#\{[^\}]+\}/;
	  function interpolateConditional(name, parentName) {
	    // first we normalize the conditional
	    var conditionalMatch = name.match(interpolationRegEx);

	    if (!conditionalMatch)
	      return Promise.resolve(name);

	    var conditionObj = parseCondition(conditionalMatch[0].substr(2, conditionalMatch[0].length - 3));

	    // in builds, return normalized conditional
	    if (this.builder)
	      return this['normalize'](conditionObj.module, parentName)
	      .then(function(conditionModule) {
	        conditionObj.module = conditionModule;
	        return name.replace(interpolationRegEx, '#{' + serializeCondition(conditionObj) + '}');
	      });

	    return resolveCondition.call(this, conditionObj, parentName, false)
	    .then(function(conditionValue) {
	      if (typeof conditionValue !== 'string')
	        throw new TypeError('The condition value for ' + name + ' doesn\'t resolve to a string.');

	      if (conditionValue.indexOf('/') != -1)
	        throw new TypeError('Unabled to interpolate conditional ' + name + (parentName ? ' in ' + parentName : '') + '\n\tThe condition value ' + conditionValue + ' cannot contain a "/" separator.');

	      return name.replace(interpolationRegEx, conditionValue);
	    });
	  }

	  function booleanConditional(name, parentName) {
	    // first we normalize the conditional
	    var booleanIndex = name.lastIndexOf('#?');

	    if (booleanIndex == -1)
	      return Promise.resolve(name);

	    var conditionObj = parseCondition(name.substr(booleanIndex + 2));

	    // in builds, return normalized conditional
	    if (this.builder)
	      return this['normalize'](conditionObj.module, parentName)
	      .then(function(conditionModule) {
	        conditionObj.module = conditionModule;
	        return name.substr(0, booleanIndex) + '#?' + serializeCondition(conditionObj);
	      });

	    return resolveCondition.call(this, conditionObj, parentName, true)
	    .then(function(conditionValue) {
	      return conditionValue ? name.substr(0, booleanIndex) : '@empty';
	    });
	  }

	  // normalizeSync does not parse conditionals at all although it could
	  hook('normalize', function(normalize) {
	    return function(name, parentName, parentAddress) {
	      var loader = this;
	      return booleanConditional.call(loader, name, parentName)
	      .then(function(name) {
	        return normalize.call(loader, name, parentName, parentAddress);
	      })
	      .then(function(normalized) {
	        return interpolateConditional.call(loader, normalized, parentName);
	      });
	    };
	  });
	/*
	 * Alias Extension
	 *
	 * Allows a module to be a plain copy of another module by module name
	 *
	 * SystemJS.meta['mybootstrapalias'] = { alias: 'bootstrap' };
	 *
	 */
	(function() {
	  // aliases
	  hook('fetch', function(fetch) {
	    return function(load) {
	      var alias = load.metadata.alias;
	      var aliasDeps = load.metadata.deps || [];
	      if (alias) {
	        load.metadata.format = 'defined';
	        var entry = createEntry();
	        this.defined[load.name] = entry;
	        entry.declarative = true;
	        entry.deps = aliasDeps.concat([alias]);
	        entry.declare = function(_export) {
	          return {
	            setters: [function(module) {
	              for (var p in module)
	                _export(p, module[p]);
	              if (module.__useDefault)
	                entry.module.exports.__useDefault = true;
	            }],
	            execute: function() {}
	          };
	        };
	        return '';
	      }

	      return fetch.call(this, load);
	    };
	  });
	})();/*
	 * Meta Extension
	 *
	 * Sets default metadata on a load record (load.metadata) from
	 * loader.metadata via SystemJS.meta function.
	 *
	 *
	 * Also provides an inline meta syntax for module meta in source.
	 *
	 * Eg:
	 *
	 * loader.meta({
	 *   'my/module': { deps: ['jquery'] }
	 *   'my/*': { format: 'amd' }
	 * });
	 *
	 * Which in turn populates loader.metadata.
	 *
	 * load.metadata.deps and load.metadata.format will then be set
	 * for 'my/module'
	 *
	 * The same meta could be set with a my/module.js file containing:
	 *
	 * my/module.js
	 *   "format amd";
	 *   "deps[] jquery";
	 *   "globals.some value"
	 *   console.log('this is my/module');
	 *
	 * Configuration meta always takes preference to inline meta.
	 *
	 * Multiple matches in wildcards are supported and ammend the meta.
	 *
	 *
	 * The benefits of the function form is that paths are URL-normalized
	 * supporting say
	 *
	 * loader.meta({ './app': { format: 'cjs' } });
	 *
	 * Instead of needing to set against the absolute URL (https://site.com/app.js)
	 *
	 */

	(function() {

	  hookConstructor(function(constructor) {
	    return function() {
	      this.meta = {};
	      constructor.call(this);
	    };
	  });

	  hook('locate', function(locate) {
	    return function(load) {
	      var meta = this.meta;
	      var name = load.name;

	      // NB for perf, maybe introduce a fast-path wildcard lookup cache here
	      // which is checked first

	      // apply wildcard metas
	      var bestDepth = 0;
	      var wildcardIndex;
	      for (var module in meta) {
	        wildcardIndex = module.indexOf('*');
	        if (wildcardIndex === -1)
	          continue;
	        if (module.substr(0, wildcardIndex) === name.substr(0, wildcardIndex)
	            && module.substr(wildcardIndex + 1) === name.substr(name.length - module.length + wildcardIndex + 1)) {
	          var depth = module.split('/').length;
	          if (depth > bestDepth)
	            bestDepth = depth;
	          extendMeta(load.metadata, meta[module], bestDepth != depth);
	        }
	      }

	      // apply exact meta
	      if (meta[name])
	        extendMeta(load.metadata, meta[name]);

	      return locate.call(this, load);
	    };
	  });

	  // detect any meta header syntax
	  // only set if not already set
	  var metaRegEx = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/;
	  var metaPartRegEx = /\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;

	  function setMetaProperty(target, p, value) {
	    var pParts = p.split('.');
	    var curPart;
	    while (pParts.length > 1) {
	      curPart = pParts.shift();
	      target = target[curPart] = target[curPart] || {};
	    }
	    curPart = pParts.shift();
	    if (!(curPart in target))
	      target[curPart] = value;
	  }

	  hook('translate', function(translate) {
	    return function(load) {
	      // NB meta will be post-translate pending transpiler conversion to plugins
	      var meta = load.source.match(metaRegEx);
	      if (meta) {
	        var metaParts = meta[0].match(metaPartRegEx);

	        for (var i = 0; i < metaParts.length; i++) {
	          var curPart = metaParts[i];
	          var len = curPart.length;

	          var firstChar = curPart.substr(0, 1);
	          if (curPart.substr(len - 1, 1) == ';')
	            len--;

	          if (firstChar != '"' && firstChar != "'")
	            continue;

	          var metaString = curPart.substr(1, curPart.length - 3);
	          var metaName = metaString.substr(0, metaString.indexOf(' '));

	          if (metaName) {
	            var metaValue = metaString.substr(metaName.length + 1, metaString.length - metaName.length - 1);

	            if (metaName.substr(metaName.length - 2, 2) == '[]') {
	              metaName = metaName.substr(0, metaName.length - 2);
	              load.metadata[metaName] = load.metadata[metaName] || [];
	              load.metadata[metaName].push(metaValue);
	            }
	            else if (load.metadata[metaName] instanceof Array) {
	              // temporary backwards compat for previous "deps" syntax
	              warn.call(this, 'Module ' + load.name + ' contains deprecated "deps ' + metaValue + '" meta syntax.\nThis should be updated to "deps[] ' + metaValue + '" for pushing to array meta.');
	              load.metadata[metaName].push(metaValue);
	            }
	            else {
	              setMetaProperty(load.metadata, metaName, metaValue);
	            }
	          }
	          else {
	            load.metadata[metaString] = true;
	          }
	        }
	      }

	      return translate.call(this, load);
	    };
	  });
	})();
	/*
	  System bundles

	  Allows a bundle module to be specified which will be dynamically 
	  loaded before trying to load a given module.

	  For example:
	  SystemJS.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']

	  Will result in a load to "mybundle" whenever a load to "jquery"
	  or "bootstrap/js/bootstrap" is made.

	  In this way, the bundle becomes the request that provides the module
	*/

	(function() {
	  // bundles support (just like RequireJS)
	  // bundle name is module name of bundle itself
	  // bundle is array of modules defined by the bundle
	  // when a module in the bundle is requested, the bundle is loaded instead
	  // of the form SystemJS.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']
	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);
	      this.bundles = {};
	      this._loader.loadedBundles = {};
	    };
	  });

	  // assign bundle metadata for bundle loads
	  hook('locate', function(locate) {
	    return function(load) {
	      var loader = this;
	      var matched = false;

	      if (!(load.name in loader.defined))
	        for (var b in loader.bundles) {
	          for (var i = 0; i < loader.bundles[b].length; i++) {
	            var curModule = loader.bundles[b][i];

	            if (curModule == load.name) {
	              matched = true;
	              break;
	            }

	            // wildcard in bundles does not include / boundaries
	            if (curModule.indexOf('*') != -1) {
	              var parts = curModule.split('*');
	              if (parts.length != 2) {
	                loader.bundles[b].splice(i--, 1);
	                continue;
	              }
	              
	              if (load.name.substring(0, parts[0].length) == parts[0] &&
	                  load.name.substr(load.name.length - parts[1].length, parts[1].length) == parts[1] &&
	                  load.name.substr(parts[0].length, load.name.length - parts[1].length - parts[0].length).indexOf('/') == -1) {
	                matched = true;
	                break;
	              }
	            }
	          }

	          if (matched)
	            return loader['import'](b)
	            .then(function() {
	              return locate.call(loader, load);
	            });
	        }

	      return locate.call(loader, load);
	    };
	  });
	})();
	/*
	 * Dependency Tree Cache
	 * 
	 * Allows a build to pre-populate a dependency trace tree on the loader of 
	 * the expected dependency tree, to be loaded upfront when requesting the
	 * module, avoinding the n round trips latency of module loading, where 
	 * n is the dependency tree depth.
	 *
	 * eg:
	 * SystemJS.depCache = {
	 *  'app': ['normalized', 'deps'],
	 *  'normalized': ['another'],
	 *  'deps': ['tree']
	 * };
	 * 
	 * SystemJS.import('app') 
	 * // simultaneously starts loading all of:
	 * // 'normalized', 'deps', 'another', 'tree'
	 * // before "app" source is even loaded
	 *
	 */

	(function() {
	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);
	      this.depCache = {};
	    }
	  });

	  hook('locate', function(locate) {
	    return function(load) {
	      var loader = this;
	      // load direct deps, in turn will pick up their trace trees
	      var deps = loader.depCache[load.name];
	      if (deps)
	        for (var i = 0; i < deps.length; i++)
	          loader['import'](deps[i], load.name);

	      return locate.call(loader, load);
	    };
	  });
	})();
	  
	/*
	 * Script-only addition used for production loader
	 *
	 */
	hookConstructor(function(constructor) {
	  return function() {
	    constructor.apply(this, arguments);
	    __global.define = this.amdDefine;
	  };
	});

	hook('fetch', function(fetch) {
	  return function(load) {
	    load.metadata.scriptLoad = true;
	    return fetch.call(this, load);
	  };
	});System = new SystemJSLoader();

	__global.SystemJS = System;
	System.version = '0.19.27 CSP';
	  // -- exporting --

	  if (true)
	    module.exports = Loader;

	  __global.Reflect = __global.Reflect || {};
	  __global.Reflect.Loader = __global.Reflect.Loader || Loader;
	  __global.Reflect.global = __global.Reflect.global || __global;
	  __global.LoaderPolyfill = Loader;

	  if (!System) {
	    System = new SystemLoader();
	    System.constructor = SystemLoader;
	  }

	  if (true)
	    module.exports = System;

	  __global.System = System;

	})(typeof self != 'undefined' ? self : global);}

	// auto-load Promise polyfill if needed in the browser
	var doPolyfill = typeof Promise === 'undefined';

	// document.write
	if (typeof document !== 'undefined') {
	  var scripts = document.getElementsByTagName('script');
	  $__curScript = scripts[scripts.length - 1];
	  if (doPolyfill) {
	    var curPath = $__curScript.src;
	    var basePath = curPath.substr(0, curPath.lastIndexOf('/') + 1);
	    window.systemJSBootstrap = bootstrap;
	    document.write(
	      '<' + 'script type="text/javascript" src="' + basePath + 'system-polyfills.js">' + '<' + '/script>'
	    );
	  }
	  else {
	    bootstrap();
	  }
	}
	// importScripts
	else if (typeof importScripts !== 'undefined') {
	  var basePath = '';
	  try {
	    throw new Error('_');
	  } catch (e) {
	    e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/, function(m, url) {
	      $__curScript = { src: url };
	      basePath = url.replace(/\/[^\/]*$/, '/');
	    });
	  }
	  if (doPolyfill)
	    importScripts(basePath + 'system-polyfills.js');
	  bootstrap();
	}
	else {
	  $__curScript =  true ? { src: __filename } : null;
	  bootstrap();
	}


	})();
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1), "/index.js"))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/* WEBPACK VAR INJECTION */(function(global, process) {/*
	 * SystemJS Polyfills for URL and Promise providing IE8+ Support
	 */
	!function(t){!function(e){ true?module.exports=e():"function"==typeof t&&t.amd?t(e):"undefined"!=typeof window?window.Promise=e():"undefined"!=typeof global?global.Promise=e():"undefined"!=typeof self&&(self.Promise=e())}(function(){var t;return function e(t,n,o){function r(u,c){if(!n[u]){if(!t[u]){var f="function"==typeof require&&require;if(!c&&f)return require(u,!0);if(i)return i(u,!0);throw new Error("Cannot find module '"+u+"'")}var s=n[u]={exports:{}};t[u][0].call(s.exports,function(e){var n=t[u][1][e];return r(n?n:e)},s,s.exports,e,t,n,o)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<o.length;u++)r(o[u]);return r}({1:[function(t,e,n){var o=t("../lib/decorators/unhandledRejection"),r=o(t("../lib/Promise"));e.exports="undefined"!=typeof global?global.Promise=r:"undefined"!=typeof self?self.Promise=r:r},{"../lib/Promise":2,"../lib/decorators/unhandledRejection":4}],2:[function(e,n,o){!function(t){"use strict";t(function(t){var e=t("./makePromise"),n=t("./Scheduler"),o=t("./env").asap;return e({scheduler:new n(o)})})}("function"==typeof t&&t.amd?t:function(t){n.exports=t(e)})},{"./Scheduler":3,"./env":5,"./makePromise":7}],3:[function(e,n,o){!function(t){"use strict";t(function(){function t(t){this._async=t,this._running=!1,this._queue=this,this._queueLen=0,this._afterQueue={},this._afterQueueLen=0;var e=this;this.drain=function(){e._drain()}}return t.prototype.enqueue=function(t){this._queue[this._queueLen++]=t,this.run()},t.prototype.afterQueue=function(t){this._afterQueue[this._afterQueueLen++]=t,this.run()},t.prototype.run=function(){this._running||(this._running=!0,this._async(this.drain))},t.prototype._drain=function(){for(var t=0;t<this._queueLen;++t)this._queue[t].run(),this._queue[t]=void 0;for(this._queueLen=0,this._running=!1,t=0;t<this._afterQueueLen;++t)this._afterQueue[t].run(),this._afterQueue[t]=void 0;this._afterQueueLen=0},t})}("function"==typeof t&&t.amd?t:function(t){n.exports=t()})},{}],4:[function(e,n,o){!function(t){"use strict";t(function(t){function e(t){throw t}function n(){}var o=t("../env").setTimer,r=t("../format");return function(t){function i(t){t.handled||(l.push(t),a("Potentially unhandled rejection ["+t.id+"] "+r.formatError(t.value)))}function u(t){var e=l.indexOf(t);e>=0&&(l.splice(e,1),h("Handled previous rejection ["+t.id+"] "+r.formatObject(t.value)))}function c(t,e){p.push(t,e),null===d&&(d=o(f,0))}function f(){for(d=null;p.length>0;)p.shift()(p.shift())}var s,a=n,h=n;"undefined"!=typeof console&&(s=console,a="undefined"!=typeof s.error?function(t){s.error(t)}:function(t){s.log(t)},h="undefined"!=typeof s.info?function(t){s.info(t)}:function(t){s.log(t)}),t.onPotentiallyUnhandledRejection=function(t){c(i,t)},t.onPotentiallyUnhandledRejectionHandled=function(t){c(u,t)},t.onFatalRejection=function(t){c(e,t.value)};var p=[],l=[],d=null;return t}})}("function"==typeof t&&t.amd?t:function(t){n.exports=t(e)})},{"../env":5,"../format":6}],5:[function(e,n,o){!function(t){"use strict";t(function(t){function e(){return"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process)}function n(){return"function"==typeof MutationObserver&&MutationObserver||"function"==typeof WebKitMutationObserver&&WebKitMutationObserver}function o(t){function e(){var t=n;n=void 0,t()}var n,o=document.createTextNode(""),r=new t(e);r.observe(o,{characterData:!0});var i=0;return function(t){n=t,o.data=i^=1}}var r,i="undefined"!=typeof setTimeout&&setTimeout,u=function(t,e){return setTimeout(t,e)},c=function(t){return clearTimeout(t)},f=function(t){return i(t,0)};if(e())f=function(t){return process.nextTick(t)};else if(r=n())f=o(r);else if(!i){var s=t,a=s("vertx");u=function(t,e){return a.setTimer(e,t)},c=a.cancelTimer,f=a.runOnLoop||a.runOnContext}return{setTimer:u,clearTimer:c,asap:f}})}("function"==typeof t&&t.amd?t:function(t){n.exports=t(e)})},{}],6:[function(e,n,o){!function(t){"use strict";t(function(){function t(t){var n="object"==typeof t&&null!==t&&(t.stack||t.message)?t.stack||t.message:e(t);return t instanceof Error?n:n+" (WARNING: non-Error used)"}function e(t){var e=String(t);return"[object Object]"===e&&"undefined"!=typeof JSON&&(e=n(t,e)),e}function n(t,e){try{return JSON.stringify(t)}catch(n){return e}}return{formatError:t,formatObject:e,tryStringify:n}})}("function"==typeof t&&t.amd?t:function(t){n.exports=t()})},{}],7:[function(e,n,o){!function(t){"use strict";t(function(){return function(t){function e(t,e){this._handler=t===_?e:n(t)}function n(t){function e(t){r.resolve(t)}function n(t){r.reject(t)}function o(t){r.notify(t)}var r=new b;try{t(e,n,o)}catch(i){n(i)}return r}function o(t){return k(t)?t:new e(_,new x(v(t)))}function r(t){return new e(_,new x(new P(t)))}function i(){return $}function u(){return new e(_,new b)}function c(t,e){var n=new b(t.receiver,t.join().context);return new e(_,n)}function f(t){return a(B,null,t)}function s(t,e){return a(M,t,e)}function a(t,n,o){function r(e,r,u){u.resolved||h(o,i,e,t(n,r,e),u)}function i(t,e,n){a[t]=e,0===--s&&n.become(new q(a))}for(var u,c="function"==typeof n?r:i,f=new b,s=o.length>>>0,a=new Array(s),p=0;p<o.length&&!f.resolved;++p)u=o[p],void 0!==u||p in o?h(o,c,p,u,f):--s;return 0===s&&f.become(new q(a)),new e(_,f)}function h(t,e,n,o,r){if(U(o)){var i=m(o),u=i.state();0===u?i.fold(e,n,void 0,r):u>0?e(n,i.value,r):(r.become(i),p(t,n+1,i))}else e(n,o,r)}function p(t,e,n){for(var o=e;o<t.length;++o)l(v(t[o]),n)}function l(t,e){if(t!==e){var n=t.state();0===n?t.visit(t,void 0,t._unreport):0>n&&t._unreport()}}function d(t){return"object"!=typeof t||null===t?r(new TypeError("non-iterable passed to race()")):0===t.length?i():1===t.length?o(t[0]):y(t)}function y(t){var n,o,r,i=new b;for(n=0;n<t.length;++n)if(o=t[n],void 0!==o||n in t){if(r=v(o),0!==r.state()){i.become(r),p(t,n+1,r);break}r.visit(i,i.resolve,i.reject)}return new e(_,i)}function v(t){return k(t)?t._handler.join():U(t)?j(t):new q(t)}function m(t){return k(t)?t._handler.join():j(t)}function j(t){try{var e=t.then;return"function"==typeof e?new g(e,t):new q(t)}catch(n){return new P(n)}}function _(){}function w(){}function b(t,n){e.createContext(this,n),this.consumers=void 0,this.receiver=t,this.handler=void 0,this.resolved=!1}function x(t){this.handler=t}function g(t,e){b.call(this),G.enqueue(new E(t,e,this))}function q(t){e.createContext(this),this.value=t}function P(t){e.createContext(this),this.id=++Y,this.value=t,this.handled=!1,this.reported=!1,this._report()}function R(t,e){this.rejection=t,this.context=e}function C(t){this.rejection=t}function O(){return new P(new TypeError("Promise cycle"))}function T(t,e){this.continuation=t,this.handler=e}function Q(t,e){this.handler=e,this.value=t}function E(t,e,n){this._then=t,this.thenable=e,this.resolver=n}function L(t,e,n,o,r){try{t.call(e,n,o,r)}catch(i){o(i)}}function S(t,e,n,o){this.f=t,this.z=e,this.c=n,this.to=o,this.resolver=X,this.receiver=this}function k(t){return t instanceof e}function U(t){return("object"==typeof t||"function"==typeof t)&&null!==t}function H(t,n,o,r){return"function"!=typeof t?r.become(n):(e.enterContext(n),F(t,n.value,o,r),void e.exitContext())}function N(t,n,o,r,i){return"function"!=typeof t?i.become(o):(e.enterContext(o),W(t,n,o.value,r,i),void e.exitContext())}function J(t,n,o,r,i){return"function"!=typeof t?i.notify(n):(e.enterContext(o),z(t,n,r,i),void e.exitContext())}function M(t,e,n){try{return t(e,n)}catch(o){return r(o)}}function F(t,e,n,o){try{o.become(v(t.call(n,e)))}catch(r){o.become(new P(r))}}function W(t,e,n,o,r){try{t.call(o,e,n,r)}catch(i){r.become(new P(i))}}function z(t,e,n,o){try{o.notify(t.call(n,e))}catch(r){o.notify(r)}}function A(t,e){e.prototype=V(t.prototype),e.prototype.constructor=e}function B(t,e){return e}function K(){}function D(){return"undefined"!=typeof process&&null!==process&&"function"==typeof process.emit?function(t,e){return"unhandledRejection"===t?process.emit(t,e.value,e):process.emit(t,e)}:"undefined"!=typeof self&&"function"==typeof CustomEvent?function(t,e,n){var o=!1;try{var r=new n("unhandledRejection");o=r instanceof n}catch(i){}return o?function(t,o){var r=new n(t,{detail:{reason:o.value,key:o},bubbles:!1,cancelable:!0});return!e.dispatchEvent(r)}:t}(K,self,CustomEvent):K}var G=t.scheduler,I=D(),V=Object.create||function(t){function e(){}return e.prototype=t,new e};e.resolve=o,e.reject=r,e.never=i,e._defer=u,e._handler=v,e.prototype.then=function(t,e,n){var o=this._handler,r=o.join().state();if("function"!=typeof t&&r>0||"function"!=typeof e&&0>r)return new this.constructor(_,o);var i=this._beget(),u=i._handler;return o.chain(u,o.receiver,t,e,n),i},e.prototype["catch"]=function(t){return this.then(void 0,t)},e.prototype._beget=function(){return c(this._handler,this.constructor)},e.all=f,e.race=d,e._traverse=s,e._visitRemaining=p,_.prototype.when=_.prototype.become=_.prototype.notify=_.prototype.fail=_.prototype._unreport=_.prototype._report=K,_.prototype._state=0,_.prototype.state=function(){return this._state},_.prototype.join=function(){for(var t=this;void 0!==t.handler;)t=t.handler;return t},_.prototype.chain=function(t,e,n,o,r){this.when({resolver:t,receiver:e,fulfilled:n,rejected:o,progress:r})},_.prototype.visit=function(t,e,n,o){this.chain(X,t,e,n,o)},_.prototype.fold=function(t,e,n,o){this.when(new S(t,e,n,o))},A(_,w),w.prototype.become=function(t){t.fail()};var X=new w;A(_,b),b.prototype._state=0,b.prototype.resolve=function(t){this.become(v(t))},b.prototype.reject=function(t){this.resolved||this.become(new P(t))},b.prototype.join=function(){if(!this.resolved)return this;for(var t=this;void 0!==t.handler;)if(t=t.handler,t===this)return this.handler=O();return t},b.prototype.run=function(){var t=this.consumers,e=this.handler;this.handler=this.handler.join(),this.consumers=void 0;for(var n=0;n<t.length;++n)e.when(t[n])},b.prototype.become=function(t){this.resolved||(this.resolved=!0,this.handler=t,void 0!==this.consumers&&G.enqueue(this),void 0!==this.context&&t._report(this.context))},b.prototype.when=function(t){this.resolved?G.enqueue(new T(t,this.handler)):void 0===this.consumers?this.consumers=[t]:this.consumers.push(t)},b.prototype.notify=function(t){this.resolved||G.enqueue(new Q(t,this))},b.prototype.fail=function(t){var e="undefined"==typeof t?this.context:t;this.resolved&&this.handler.join().fail(e)},b.prototype._report=function(t){this.resolved&&this.handler.join()._report(t)},b.prototype._unreport=function(){this.resolved&&this.handler.join()._unreport()},A(_,x),x.prototype.when=function(t){G.enqueue(new T(t,this))},x.prototype._report=function(t){this.join()._report(t)},x.prototype._unreport=function(){this.join()._unreport()},A(b,g),A(_,q),q.prototype._state=1,q.prototype.fold=function(t,e,n,o){N(t,e,this,n,o)},q.prototype.when=function(t){H(t.fulfilled,this,t.receiver,t.resolver)};var Y=0;A(_,P),P.prototype._state=-1,P.prototype.fold=function(t,e,n,o){o.become(this)},P.prototype.when=function(t){"function"==typeof t.rejected&&this._unreport(),H(t.rejected,this,t.receiver,t.resolver)},P.prototype._report=function(t){G.afterQueue(new R(this,t))},P.prototype._unreport=function(){this.handled||(this.handled=!0,G.afterQueue(new C(this)))},P.prototype.fail=function(t){this.reported=!0,I("unhandledRejection",this),e.onFatalRejection(this,void 0===t?this.context:t)},R.prototype.run=function(){this.rejection.handled||this.rejection.reported||(this.rejection.reported=!0,I("unhandledRejection",this.rejection)||e.onPotentiallyUnhandledRejection(this.rejection,this.context))},C.prototype.run=function(){this.rejection.reported&&(I("rejectionHandled",this.rejection)||e.onPotentiallyUnhandledRejectionHandled(this.rejection))},e.createContext=e.enterContext=e.exitContext=e.onPotentiallyUnhandledRejection=e.onPotentiallyUnhandledRejectionHandled=e.onFatalRejection=K;var Z=new _,$=new e(_,Z);return T.prototype.run=function(){this.handler.join().when(this.continuation)},Q.prototype.run=function(){var t=this.handler.consumers;if(void 0!==t)for(var e,n=0;n<t.length;++n)e=t[n],J(e.progress,this.value,this.handler,e.receiver,e.resolver)},E.prototype.run=function(){function t(t){o.resolve(t)}function e(t){o.reject(t)}function n(t){o.notify(t)}var o=this.resolver;L(this._then,this.thenable,t,e,n)},S.prototype.fulfilled=function(t){this.f.call(this.c,this.z,t,this.to)},S.prototype.rejected=function(t){this.to.reject(t)},S.prototype.progress=function(t){this.to.notify(t)},e}})}("function"==typeof t&&t.amd?t:function(t){n.exports=t()})},{}]},{},[1])(1)}),"undefined"!=typeof systemJSBootstrap&&systemJSBootstrap()}();
	//# sourceMappingURL=system-polyfills.js.map

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1)))

/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/* WEBPACK VAR INJECTION */(function(global, process) {/*
	 * SystemJS Polyfills for URL and Promise providing IE8+ Support
	 */
	(function(define) {

	!function(e){ true?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.Promise=e():"undefined"!=typeof global?global.Promise=e():"undefined"!=typeof self&&(self.Promise=e())}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * ES6 global Promise shim
	 */
	var unhandledRejections = require('../lib/decorators/unhandledRejection');
	var PromiseConstructor = unhandledRejections(require('../lib/Promise'));

	module.exports = typeof global != 'undefined' ? (global.Promise = PromiseConstructor)
		           : typeof self   != 'undefined' ? (self.Promise   = PromiseConstructor)
		           : PromiseConstructor;

	},{"../lib/Promise":2,"../lib/decorators/unhandledRejection":4}],2:[function(require,module,exports){
	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	define(function (require) {

		var makePromise = require('./makePromise');
		var Scheduler = require('./Scheduler');
		var async = require('./env').asap;

		return makePromise({
			scheduler: new Scheduler(async)
		});

	});
	})(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); });

	},{"./Scheduler":3,"./env":5,"./makePromise":7}],3:[function(require,module,exports){
	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	define(function() {

		// Credit to Twisol (https://github.com/Twisol) for suggesting
		// this type of extensible queue + trampoline approach for next-tick conflation.

		/**
		 * Async task scheduler
		 * @param {function} async function to schedule a single async function
		 * @constructor
		 */
		function Scheduler(async) {
			this._async = async;
			this._running = false;

			this._queue = this;
			this._queueLen = 0;
			this._afterQueue = {};
			this._afterQueueLen = 0;

			var self = this;
			this.drain = function() {
				self._drain();
			};
		}

		/**
		 * Enqueue a task
		 * @param {{ run:function }} task
		 */
		Scheduler.prototype.enqueue = function(task) {
			this._queue[this._queueLen++] = task;
			this.run();
		};

		/**
		 * Enqueue a task to run after the main task queue
		 * @param {{ run:function }} task
		 */
		Scheduler.prototype.afterQueue = function(task) {
			this._afterQueue[this._afterQueueLen++] = task;
			this.run();
		};

		Scheduler.prototype.run = function() {
			if (!this._running) {
				this._running = true;
				this._async(this.drain);
			}
		};

		/**
		 * Drain the handler queue entirely, and then the after queue
		 */
		Scheduler.prototype._drain = function() {
			var i = 0;
			for (; i < this._queueLen; ++i) {
				this._queue[i].run();
				this._queue[i] = void 0;
			}

			this._queueLen = 0;
			this._running = false;

			for (i = 0; i < this._afterQueueLen; ++i) {
				this._afterQueue[i].run();
				this._afterQueue[i] = void 0;
			}

			this._afterQueueLen = 0;
		};

		return Scheduler;

	});
	}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

	},{}],4:[function(require,module,exports){
	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	define(function(require) {

		var setTimer = require('../env').setTimer;
		var format = require('../format');

		return function unhandledRejection(Promise) {

			var logError = noop;
			var logInfo = noop;
			var localConsole;

			if(typeof console !== 'undefined') {
				// Alias console to prevent things like uglify's drop_console option from
				// removing console.log/error. Unhandled rejections fall into the same
				// category as uncaught exceptions, and build tools shouldn't silence them.
				localConsole = console;
				logError = typeof localConsole.error !== 'undefined'
					? function (e) { localConsole.error(e); }
					: function (e) { localConsole.log(e); };

				logInfo = typeof localConsole.info !== 'undefined'
					? function (e) { localConsole.info(e); }
					: function (e) { localConsole.log(e); };
			}

			Promise.onPotentiallyUnhandledRejection = function(rejection) {
				enqueue(report, rejection);
			};

			Promise.onPotentiallyUnhandledRejectionHandled = function(rejection) {
				enqueue(unreport, rejection);
			};

			Promise.onFatalRejection = function(rejection) {
				enqueue(throwit, rejection.value);
			};

			var tasks = [];
			var reported = [];
			var running = null;

			function report(r) {
				if(!r.handled) {
					reported.push(r);
					logError('Potentially unhandled rejection [' + r.id + '] ' + format.formatError(r.value));
				}
			}

			function unreport(r) {
				var i = reported.indexOf(r);
				if(i >= 0) {
					reported.splice(i, 1);
					logInfo('Handled previous rejection [' + r.id + '] ' + format.formatObject(r.value));
				}
			}

			function enqueue(f, x) {
				tasks.push(f, x);
				if(running === null) {
					running = setTimer(flush, 0);
				}
			}

			function flush() {
				running = null;
				while(tasks.length > 0) {
					tasks.shift()(tasks.shift());
				}
			}

			return Promise;
		};

		function throwit(e) {
			throw e;
		}

		function noop() {}

	});
	}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

	},{"../env":5,"../format":6}],5:[function(require,module,exports){
	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/*global process,document,setTimeout,clearTimeout,MutationObserver,WebKitMutationObserver*/
	(function(define) { 'use strict';
	define(function(require) {
		/*jshint maxcomplexity:6*/

		// Sniff "best" async scheduling option
		// Prefer process.nextTick or MutationObserver, then check for
		// setTimeout, and finally vertx, since its the only env that doesn't
		// have setTimeout

		var MutationObs;
		var capturedSetTimeout = typeof setTimeout !== 'undefined' && setTimeout;

		// Default env
		var setTimer = function(f, ms) { return setTimeout(f, ms); };
		var clearTimer = function(t) { return clearTimeout(t); };
		var asap = function (f) { return capturedSetTimeout(f, 0); };

		// Detect specific env
		if (isNode()) { // Node
			asap = function (f) { return process.nextTick(f); };

		} else if (MutationObs = hasMutationObserver()) { // Modern browser
			asap = initMutationObserver(MutationObs);

		} else if (!capturedSetTimeout) { // vert.x
			var vertxRequire = require;
			var vertx = vertxRequire('vertx');
			setTimer = function (f, ms) { return vertx.setTimer(ms, f); };
			clearTimer = vertx.cancelTimer;
			asap = vertx.runOnLoop || vertx.runOnContext;
		}

		return {
			setTimer: setTimer,
			clearTimer: clearTimer,
			asap: asap
		};

		function isNode () {
			return typeof process !== 'undefined' &&
				Object.prototype.toString.call(process) === '[object process]';
		}

		function hasMutationObserver () {
			return (typeof MutationObserver === 'function' && MutationObserver) ||
				(typeof WebKitMutationObserver === 'function' && WebKitMutationObserver);
		}

		function initMutationObserver(MutationObserver) {
			var scheduled;
			var node = document.createTextNode('');
			var o = new MutationObserver(run);
			o.observe(node, { characterData: true });

			function run() {
				var f = scheduled;
				scheduled = void 0;
				f();
			}

			var i = 0;
			return function (f) {
				scheduled = f;
				node.data = (i ^= 1);
			};
		}
	});
	}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

	},{}],6:[function(require,module,exports){
	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	define(function() {

		return {
			formatError: formatError,
			formatObject: formatObject,
			tryStringify: tryStringify
		};

		/**
		 * Format an error into a string.  If e is an Error and has a stack property,
		 * it's returned.  Otherwise, e is formatted using formatObject, with a
		 * warning added about e not being a proper Error.
		 * @param {*} e
		 * @returns {String} formatted string, suitable for output to developers
		 */
		function formatError(e) {
			var s = typeof e === 'object' && e !== null && (e.stack || e.message) ? e.stack || e.message : formatObject(e);
			return e instanceof Error ? s : s + ' (WARNING: non-Error used)';
		}

		/**
		 * Format an object, detecting "plain" objects and running them through
		 * JSON.stringify if possible.
		 * @param {Object} o
		 * @returns {string}
		 */
		function formatObject(o) {
			var s = String(o);
			if(s === '[object Object]' && typeof JSON !== 'undefined') {
				s = tryStringify(o, s);
			}
			return s;
		}

		/**
		 * Try to return the result of JSON.stringify(x).  If that fails, return
		 * defaultValue
		 * @param {*} x
		 * @param {*} defaultValue
		 * @returns {String|*} JSON.stringify(x) or defaultValue
		 */
		function tryStringify(x, defaultValue) {
			try {
				return JSON.stringify(x);
			} catch(e) {
				return defaultValue;
			}
		}

	});
	}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

	},{}],7:[function(require,module,exports){
	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	define(function() {

		return function makePromise(environment) {

			var tasks = environment.scheduler;
			var emitRejection = initEmitRejection();

			var objectCreate = Object.create ||
				function(proto) {
					function Child() {}
					Child.prototype = proto;
					return new Child();
				};

			/**
			 * Create a promise whose fate is determined by resolver
			 * @constructor
			 * @returns {Promise} promise
			 * @name Promise
			 */
			function Promise(resolver, handler) {
				this._handler = resolver === Handler ? handler : init(resolver);
			}

			/**
			 * Run the supplied resolver
			 * @param resolver
			 * @returns {Pending}
			 */
			function init(resolver) {
				var handler = new Pending();

				try {
					resolver(promiseResolve, promiseReject, promiseNotify);
				} catch (e) {
					promiseReject(e);
				}

				return handler;

				/**
				 * Transition from pre-resolution state to post-resolution state, notifying
				 * all listeners of the ultimate fulfillment or rejection
				 * @param {*} x resolution value
				 */
				function promiseResolve (x) {
					handler.resolve(x);
				}
				/**
				 * Reject this promise with reason, which will be used verbatim
				 * @param {Error|*} reason rejection reason, strongly suggested
				 *   to be an Error type
				 */
				function promiseReject (reason) {
					handler.reject(reason);
				}

				/**
				 * @deprecated
				 * Issue a progress event, notifying all progress listeners
				 * @param {*} x progress event payload to pass to all listeners
				 */
				function promiseNotify (x) {
					handler.notify(x);
				}
			}

			// Creation

			Promise.resolve = resolve;
			Promise.reject = reject;
			Promise.never = never;

			Promise._defer = defer;
			Promise._handler = getHandler;

			/**
			 * Returns a trusted promise. If x is already a trusted promise, it is
			 * returned, otherwise returns a new trusted Promise which follows x.
			 * @param  {*} x
			 * @return {Promise} promise
			 */
			function resolve(x) {
				return isPromise(x) ? x
					: new Promise(Handler, new Async(getHandler(x)));
			}

			/**
			 * Return a reject promise with x as its reason (x is used verbatim)
			 * @param {*} x
			 * @returns {Promise} rejected promise
			 */
			function reject(x) {
				return new Promise(Handler, new Async(new Rejected(x)));
			}

			/**
			 * Return a promise that remains pending forever
			 * @returns {Promise} forever-pending promise.
			 */
			function never() {
				return foreverPendingPromise; // Should be frozen
			}

			/**
			 * Creates an internal {promise, resolver} pair
			 * @private
			 * @returns {Promise}
			 */
			function defer() {
				return new Promise(Handler, new Pending());
			}

			// Transformation and flow control

			/**
			 * Transform this promise's fulfillment value, returning a new Promise
			 * for the transformed result.  If the promise cannot be fulfilled, onRejected
			 * is called with the reason.  onProgress *may* be called with updates toward
			 * this promise's fulfillment.
			 * @param {function=} onFulfilled fulfillment handler
			 * @param {function=} onRejected rejection handler
			 * @param {function=} onProgress @deprecated progress handler
			 * @return {Promise} new promise
			 */
			Promise.prototype.then = function(onFulfilled, onRejected, onProgress) {
				var parent = this._handler;
				var state = parent.join().state();

				if ((typeof onFulfilled !== 'function' && state > 0) ||
					(typeof onRejected !== 'function' && state < 0)) {
					// Short circuit: value will not change, simply share handler
					return new this.constructor(Handler, parent);
				}

				var p = this._beget();
				var child = p._handler;

				parent.chain(child, parent.receiver, onFulfilled, onRejected, onProgress);

				return p;
			};

			/**
			 * If this promise cannot be fulfilled due to an error, call onRejected to
			 * handle the error. Shortcut for .then(undefined, onRejected)
			 * @param {function?} onRejected
			 * @return {Promise}
			 */
			Promise.prototype['catch'] = function(onRejected) {
				return this.then(void 0, onRejected);
			};

			/**
			 * Creates a new, pending promise of the same type as this promise
			 * @private
			 * @returns {Promise}
			 */
			Promise.prototype._beget = function() {
				return begetFrom(this._handler, this.constructor);
			};

			function begetFrom(parent, Promise) {
				var child = new Pending(parent.receiver, parent.join().context);
				return new Promise(Handler, child);
			}

			// Array combinators

			Promise.all = all;
			Promise.race = race;
			Promise._traverse = traverse;

			/**
			 * Return a promise that will fulfill when all promises in the
			 * input array have fulfilled, or will reject when one of the
			 * promises rejects.
			 * @param {array} promises array of promises
			 * @returns {Promise} promise for array of fulfillment values
			 */
			function all(promises) {
				return traverseWith(snd, null, promises);
			}

			/**
			 * Array<Promise<X>> -> Promise<Array<f(X)>>
			 * @private
			 * @param {function} f function to apply to each promise's value
			 * @param {Array} promises array of promises
			 * @returns {Promise} promise for transformed values
			 */
			function traverse(f, promises) {
				return traverseWith(tryCatch2, f, promises);
			}

			function traverseWith(tryMap, f, promises) {
				var handler = typeof f === 'function' ? mapAt : settleAt;

				var resolver = new Pending();
				var pending = promises.length >>> 0;
				var results = new Array(pending);

				for (var i = 0, x; i < promises.length && !resolver.resolved; ++i) {
					x = promises[i];

					if (x === void 0 && !(i in promises)) {
						--pending;
						continue;
					}

					traverseAt(promises, handler, i, x, resolver);
				}

				if(pending === 0) {
					resolver.become(new Fulfilled(results));
				}

				return new Promise(Handler, resolver);

				function mapAt(i, x, resolver) {
					if(!resolver.resolved) {
						traverseAt(promises, settleAt, i, tryMap(f, x, i), resolver);
					}
				}

				function settleAt(i, x, resolver) {
					results[i] = x;
					if(--pending === 0) {
						resolver.become(new Fulfilled(results));
					}
				}
			}

			function traverseAt(promises, handler, i, x, resolver) {
				if (maybeThenable(x)) {
					var h = getHandlerMaybeThenable(x);
					var s = h.state();

					if (s === 0) {
						h.fold(handler, i, void 0, resolver);
					} else if (s > 0) {
						handler(i, h.value, resolver);
					} else {
						resolver.become(h);
						visitRemaining(promises, i+1, h);
					}
				} else {
					handler(i, x, resolver);
				}
			}

			Promise._visitRemaining = visitRemaining;
			function visitRemaining(promises, start, handler) {
				for(var i=start; i<promises.length; ++i) {
					markAsHandled(getHandler(promises[i]), handler);
				}
			}

			function markAsHandled(h, handler) {
				if(h === handler) {
					return;
				}

				var s = h.state();
				if(s === 0) {
					h.visit(h, void 0, h._unreport);
				} else if(s < 0) {
					h._unreport();
				}
			}

			/**
			 * Fulfill-reject competitive race. Return a promise that will settle
			 * to the same state as the earliest input promise to settle.
			 *
			 * WARNING: The ES6 Promise spec requires that race()ing an empty array
			 * must return a promise that is pending forever.  This implementation
			 * returns a singleton forever-pending promise, the same singleton that is
			 * returned by Promise.never(), thus can be checked with ===
			 *
			 * @param {array} promises array of promises to race
			 * @returns {Promise} if input is non-empty, a promise that will settle
			 * to the same outcome as the earliest input promise to settle. if empty
			 * is empty, returns a promise that will never settle.
			 */
			function race(promises) {
				if(typeof promises !== 'object' || promises === null) {
					return reject(new TypeError('non-iterable passed to race()'));
				}

				// Sigh, race([]) is untestable unless we return *something*
				// that is recognizable without calling .then() on it.
				return promises.length === 0 ? never()
					 : promises.length === 1 ? resolve(promises[0])
					 : runRace(promises);
			}

			function runRace(promises) {
				var resolver = new Pending();
				var i, x, h;
				for(i=0; i<promises.length; ++i) {
					x = promises[i];
					if (x === void 0 && !(i in promises)) {
						continue;
					}

					h = getHandler(x);
					if(h.state() !== 0) {
						resolver.become(h);
						visitRemaining(promises, i+1, h);
						break;
					} else {
						h.visit(resolver, resolver.resolve, resolver.reject);
					}
				}
				return new Promise(Handler, resolver);
			}

			// Promise internals
			// Below this, everything is @private

			/**
			 * Get an appropriate handler for x, without checking for cycles
			 * @param {*} x
			 * @returns {object} handler
			 */
			function getHandler(x) {
				if(isPromise(x)) {
					return x._handler.join();
				}
				return maybeThenable(x) ? getHandlerUntrusted(x) : new Fulfilled(x);
			}

			/**
			 * Get a handler for thenable x.
			 * NOTE: You must only call this if maybeThenable(x) == true
			 * @param {object|function|Promise} x
			 * @returns {object} handler
			 */
			function getHandlerMaybeThenable(x) {
				return isPromise(x) ? x._handler.join() : getHandlerUntrusted(x);
			}

			/**
			 * Get a handler for potentially untrusted thenable x
			 * @param {*} x
			 * @returns {object} handler
			 */
			function getHandlerUntrusted(x) {
				try {
					var untrustedThen = x.then;
					return typeof untrustedThen === 'function'
						? new Thenable(untrustedThen, x)
						: new Fulfilled(x);
				} catch(e) {
					return new Rejected(e);
				}
			}

			/**
			 * Handler for a promise that is pending forever
			 * @constructor
			 */
			function Handler() {}

			Handler.prototype.when
				= Handler.prototype.become
				= Handler.prototype.notify // deprecated
				= Handler.prototype.fail
				= Handler.prototype._unreport
				= Handler.prototype._report
				= noop;

			Handler.prototype._state = 0;

			Handler.prototype.state = function() {
				return this._state;
			};

			/**
			 * Recursively collapse handler chain to find the handler
			 * nearest to the fully resolved value.
			 * @returns {object} handler nearest the fully resolved value
			 */
			Handler.prototype.join = function() {
				var h = this;
				while(h.handler !== void 0) {
					h = h.handler;
				}
				return h;
			};

			Handler.prototype.chain = function(to, receiver, fulfilled, rejected, progress) {
				this.when({
					resolver: to,
					receiver: receiver,
					fulfilled: fulfilled,
					rejected: rejected,
					progress: progress
				});
			};

			Handler.prototype.visit = function(receiver, fulfilled, rejected, progress) {
				this.chain(failIfRejected, receiver, fulfilled, rejected, progress);
			};

			Handler.prototype.fold = function(f, z, c, to) {
				this.when(new Fold(f, z, c, to));
			};

			/**
			 * Handler that invokes fail() on any handler it becomes
			 * @constructor
			 */
			function FailIfRejected() {}

			inherit(Handler, FailIfRejected);

			FailIfRejected.prototype.become = function(h) {
				h.fail();
			};

			var failIfRejected = new FailIfRejected();

			/**
			 * Handler that manages a queue of consumers waiting on a pending promise
			 * @constructor
			 */
			function Pending(receiver, inheritedContext) {
				Promise.createContext(this, inheritedContext);

				this.consumers = void 0;
				this.receiver = receiver;
				this.handler = void 0;
				this.resolved = false;
			}

			inherit(Handler, Pending);

			Pending.prototype._state = 0;

			Pending.prototype.resolve = function(x) {
				this.become(getHandler(x));
			};

			Pending.prototype.reject = function(x) {
				if(this.resolved) {
					return;
				}

				this.become(new Rejected(x));
			};

			Pending.prototype.join = function() {
				if (!this.resolved) {
					return this;
				}

				var h = this;

				while (h.handler !== void 0) {
					h = h.handler;
					if (h === this) {
						return this.handler = cycle();
					}
				}

				return h;
			};

			Pending.prototype.run = function() {
				var q = this.consumers;
				var handler = this.handler;
				this.handler = this.handler.join();
				this.consumers = void 0;

				for (var i = 0; i < q.length; ++i) {
					handler.when(q[i]);
				}
			};

			Pending.prototype.become = function(handler) {
				if(this.resolved) {
					return;
				}

				this.resolved = true;
				this.handler = handler;
				if(this.consumers !== void 0) {
					tasks.enqueue(this);
				}

				if(this.context !== void 0) {
					handler._report(this.context);
				}
			};

			Pending.prototype.when = function(continuation) {
				if(this.resolved) {
					tasks.enqueue(new ContinuationTask(continuation, this.handler));
				} else {
					if(this.consumers === void 0) {
						this.consumers = [continuation];
					} else {
						this.consumers.push(continuation);
					}
				}
			};

			/**
			 * @deprecated
			 */
			Pending.prototype.notify = function(x) {
				if(!this.resolved) {
					tasks.enqueue(new ProgressTask(x, this));
				}
			};

			Pending.prototype.fail = function(context) {
				var c = typeof context === 'undefined' ? this.context : context;
				this.resolved && this.handler.join().fail(c);
			};

			Pending.prototype._report = function(context) {
				this.resolved && this.handler.join()._report(context);
			};

			Pending.prototype._unreport = function() {
				this.resolved && this.handler.join()._unreport();
			};

			/**
			 * Wrap another handler and force it into a future stack
			 * @param {object} handler
			 * @constructor
			 */
			function Async(handler) {
				this.handler = handler;
			}

			inherit(Handler, Async);

			Async.prototype.when = function(continuation) {
				tasks.enqueue(new ContinuationTask(continuation, this));
			};

			Async.prototype._report = function(context) {
				this.join()._report(context);
			};

			Async.prototype._unreport = function() {
				this.join()._unreport();
			};

			/**
			 * Handler that wraps an untrusted thenable and assimilates it in a future stack
			 * @param {function} then
			 * @param {{then: function}} thenable
			 * @constructor
			 */
			function Thenable(then, thenable) {
				Pending.call(this);
				tasks.enqueue(new AssimilateTask(then, thenable, this));
			}

			inherit(Pending, Thenable);

			/**
			 * Handler for a fulfilled promise
			 * @param {*} x fulfillment value
			 * @constructor
			 */
			function Fulfilled(x) {
				Promise.createContext(this);
				this.value = x;
			}

			inherit(Handler, Fulfilled);

			Fulfilled.prototype._state = 1;

			Fulfilled.prototype.fold = function(f, z, c, to) {
				runContinuation3(f, z, this, c, to);
			};

			Fulfilled.prototype.when = function(cont) {
				runContinuation1(cont.fulfilled, this, cont.receiver, cont.resolver);
			};

			var errorId = 0;

			/**
			 * Handler for a rejected promise
			 * @param {*} x rejection reason
			 * @constructor
			 */
			function Rejected(x) {
				Promise.createContext(this);

				this.id = ++errorId;
				this.value = x;
				this.handled = false;
				this.reported = false;

				this._report();
			}

			inherit(Handler, Rejected);

			Rejected.prototype._state = -1;

			Rejected.prototype.fold = function(f, z, c, to) {
				to.become(this);
			};

			Rejected.prototype.when = function(cont) {
				if(typeof cont.rejected === 'function') {
					this._unreport();
				}
				runContinuation1(cont.rejected, this, cont.receiver, cont.resolver);
			};

			Rejected.prototype._report = function(context) {
				tasks.afterQueue(new ReportTask(this, context));
			};

			Rejected.prototype._unreport = function() {
				if(this.handled) {
					return;
				}
				this.handled = true;
				tasks.afterQueue(new UnreportTask(this));
			};

			Rejected.prototype.fail = function(context) {
				this.reported = true;
				emitRejection('unhandledRejection', this);
				Promise.onFatalRejection(this, context === void 0 ? this.context : context);
			};

			function ReportTask(rejection, context) {
				this.rejection = rejection;
				this.context = context;
			}

			ReportTask.prototype.run = function() {
				if(!this.rejection.handled && !this.rejection.reported) {
					this.rejection.reported = true;
					emitRejection('unhandledRejection', this.rejection) ||
						Promise.onPotentiallyUnhandledRejection(this.rejection, this.context);
				}
			};

			function UnreportTask(rejection) {
				this.rejection = rejection;
			}

			UnreportTask.prototype.run = function() {
				if(this.rejection.reported) {
					emitRejection('rejectionHandled', this.rejection) ||
						Promise.onPotentiallyUnhandledRejectionHandled(this.rejection);
				}
			};

			// Unhandled rejection hooks
			// By default, everything is a noop

			Promise.createContext
				= Promise.enterContext
				= Promise.exitContext
				= Promise.onPotentiallyUnhandledRejection
				= Promise.onPotentiallyUnhandledRejectionHandled
				= Promise.onFatalRejection
				= noop;

			// Errors and singletons

			var foreverPendingHandler = new Handler();
			var foreverPendingPromise = new Promise(Handler, foreverPendingHandler);

			function cycle() {
				return new Rejected(new TypeError('Promise cycle'));
			}

			// Task runners

			/**
			 * Run a single consumer
			 * @constructor
			 */
			function ContinuationTask(continuation, handler) {
				this.continuation = continuation;
				this.handler = handler;
			}

			ContinuationTask.prototype.run = function() {
				this.handler.join().when(this.continuation);
			};

			/**
			 * Run a queue of progress handlers
			 * @constructor
			 */
			function ProgressTask(value, handler) {
				this.handler = handler;
				this.value = value;
			}

			ProgressTask.prototype.run = function() {
				var q = this.handler.consumers;
				if(q === void 0) {
					return;
				}

				for (var c, i = 0; i < q.length; ++i) {
					c = q[i];
					runNotify(c.progress, this.value, this.handler, c.receiver, c.resolver);
				}
			};

			/**
			 * Assimilate a thenable, sending it's value to resolver
			 * @param {function} then
			 * @param {object|function} thenable
			 * @param {object} resolver
			 * @constructor
			 */
			function AssimilateTask(then, thenable, resolver) {
				this._then = then;
				this.thenable = thenable;
				this.resolver = resolver;
			}

			AssimilateTask.prototype.run = function() {
				var h = this.resolver;
				tryAssimilate(this._then, this.thenable, _resolve, _reject, _notify);

				function _resolve(x) { h.resolve(x); }
				function _reject(x)  { h.reject(x); }
				function _notify(x)  { h.notify(x); }
			};

			function tryAssimilate(then, thenable, resolve, reject, notify) {
				try {
					then.call(thenable, resolve, reject, notify);
				} catch (e) {
					reject(e);
				}
			}

			/**
			 * Fold a handler value with z
			 * @constructor
			 */
			function Fold(f, z, c, to) {
				this.f = f; this.z = z; this.c = c; this.to = to;
				this.resolver = failIfRejected;
				this.receiver = this;
			}

			Fold.prototype.fulfilled = function(x) {
				this.f.call(this.c, this.z, x, this.to);
			};

			Fold.prototype.rejected = function(x) {
				this.to.reject(x);
			};

			Fold.prototype.progress = function(x) {
				this.to.notify(x);
			};

			// Other helpers

			/**
			 * @param {*} x
			 * @returns {boolean} true iff x is a trusted Promise
			 */
			function isPromise(x) {
				return x instanceof Promise;
			}

			/**
			 * Test just enough to rule out primitives, in order to take faster
			 * paths in some code
			 * @param {*} x
			 * @returns {boolean} false iff x is guaranteed *not* to be a thenable
			 */
			function maybeThenable(x) {
				return (typeof x === 'object' || typeof x === 'function') && x !== null;
			}

			function runContinuation1(f, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.become(h);
				}

				Promise.enterContext(h);
				tryCatchReject(f, h.value, receiver, next);
				Promise.exitContext();
			}

			function runContinuation3(f, x, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.become(h);
				}

				Promise.enterContext(h);
				tryCatchReject3(f, x, h.value, receiver, next);
				Promise.exitContext();
			}

			/**
			 * @deprecated
			 */
			function runNotify(f, x, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.notify(x);
				}

				Promise.enterContext(h);
				tryCatchReturn(f, x, receiver, next);
				Promise.exitContext();
			}

			function tryCatch2(f, a, b) {
				try {
					return f(a, b);
				} catch(e) {
					return reject(e);
				}
			}

			/**
			 * Return f.call(thisArg, x), or if it throws return a rejected promise for
			 * the thrown exception
			 */
			function tryCatchReject(f, x, thisArg, next) {
				try {
					next.become(getHandler(f.call(thisArg, x)));
				} catch(e) {
					next.become(new Rejected(e));
				}
			}

			/**
			 * Same as above, but includes the extra argument parameter.
			 */
			function tryCatchReject3(f, x, y, thisArg, next) {
				try {
					f.call(thisArg, x, y, next);
				} catch(e) {
					next.become(new Rejected(e));
				}
			}

			/**
			 * @deprecated
			 * Return f.call(thisArg, x), or if it throws, *return* the exception
			 */
			function tryCatchReturn(f, x, thisArg, next) {
				try {
					next.notify(f.call(thisArg, x));
				} catch(e) {
					next.notify(e);
				}
			}

			function inherit(Parent, Child) {
				Child.prototype = objectCreate(Parent.prototype);
				Child.prototype.constructor = Child;
			}

			function snd(x, y) {
				return y;
			}

			function noop() {}

			function initEmitRejection() {
				/*global process, self, CustomEvent*/
				if(typeof process !== 'undefined' && process !== null
					&& typeof process.emit === 'function') {
					// Returning falsy here means to call the default
					// onPotentiallyUnhandledRejection API.  This is safe even in
					// browserify since process.emit always returns falsy in browserify:
					// https://github.com/defunctzombie/node-process/blob/master/browser.js#L40-L46
					return function(type, rejection) {
						return type === 'unhandledRejection'
							? process.emit(type, rejection.value, rejection)
							: process.emit(type, rejection);
					};
				} else if(typeof self !== 'undefined' && typeof CustomEvent === 'function') {
					return (function(noop, self, CustomEvent) {
						var hasCustomEvent = false;
						try {
							var ev = new CustomEvent('unhandledRejection');
							hasCustomEvent = ev instanceof CustomEvent;
						} catch (e) {}

						return !hasCustomEvent ? noop : function(type, rejection) {
							var ev = new CustomEvent(type, {
								detail: {
									reason: rejection.value,
									key: rejection
								},
								bubbles: false,
								cancelable: true
							});

							return !self.dispatchEvent(ev);
						};
					}(noop, self, CustomEvent));
				}

				return noop;
			}

			return Promise;
		};
	});
	}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

	},{}]},{},[1])
	(1)
	});
	;if (typeof systemJSBootstrap !== 'undefined')
	  systemJSBootstrap();})();

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1)))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/*
	 * SystemJS v0.19.27
	 */
	!function(e){function t(e,n){if("string"!=typeof e)throw new TypeError("URL must be a string");var r=String(e).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);if(!r)throw new RangeError("Invalid URL format");var a=r[1]||"",o=r[2]||"",i=r[3]||"",s=r[4]||"",d=r[5]||"",l=r[6]||"",u=r[7]||"",c=r[8]||"",f=r[9]||"";if(void 0!==n){var m=n instanceof t?n:new t(n),p=!a&&!s&&!o;!p||u||c||(c=m.search),p&&"/"!==u[0]&&(u=u?(!m.host&&!m.username||m.pathname?"":"/")+m.pathname.slice(0,m.pathname.lastIndexOf("/")+1)+u:m.pathname);var h=[];u.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(e){"/.."===e?h.pop():h.push(e)}),u=h.join("").replace(/^\//,"/"===u[0]?"/":""),p&&(l=m.port,d=m.hostname,s=m.host,i=m.password,o=m.username),a||(a=m.protocol)}"file:"==a&&(u=u.replace(/\\/g,"/")),this.origin=s?a+(""!==a||""!==s?"//":"")+s:"",this.href=a+(a&&s||"file:"==a?"//":"")+(""!==o?o+(""!==i?":"+i:"")+"@":"")+s+u+c+f,this.protocol=a,this.username=o,this.password=i,this.host=s,this.hostname=d,this.port=l,this.pathname=u,this.search=c,this.hash=f}e.URLPolyfill=t}("undefined"!=typeof self?self:global),function(e){function t(e,t){if(!e.originalErr)for(var n=(e.stack||e.message||e).split("\n"),r=[],a=0;a<n.length;a++)("undefined"==typeof $__curScript||-1==n[a].indexOf($__curScript.src))&&r.push(n[a]);var o=(r?r.join("\n	"):e.message)+"\n	"+t;b||(o=o.replace(w?/file:\/\/\//g:/file:\/\//g,""));var i=_?new Error(o,e.fileName,e.lineNumber):new Error(o);return b?i.stack=null:i.stack=o,i.originalErr=e.originalErr||e,i}function n(e,n,r){try{new Function(e).call(r)}catch(a){throw t(a,"Evaluating "+n)}}function r(){}function a(t){this._loader={loaderObj:this,loads:[],modules:{},importPromises:{},moduleRecords:{}},x(this,"global",{get:function(){return e}})}function o(){a.call(this),this.paths={}}function i(e,t){var n,r="",a=0;for(var o in e){var i=o.split("*");if(i.length>2)throw new TypeError("Only one wildcard in a path is permitted");if(1==i.length){if(t==o)return e[o];if(t.substr(0,o.length-1)==o.substr(0,o.length-1)&&(t.length<o.length||t[o.length-1]==o[o.length-1])&&"/"==e[o][e[o].length-1])return e[o].substr(0,e[o].length-1)+(t.length>o.length?"/"+t.substr(o.length):"")}else{var s=i[0].length;s>=a&&t.substr(0,i[0].length)==i[0]&&t.substr(t.length-i[1].length)==i[1]&&(a=s,r=o,n=t.substr(i[0].length,t.length-i[1].length-i[0].length))}}var d=e[r];return"string"==typeof n&&(d=d.replace("*",n)),d}function s(){}function d(){o.call(this),I.call(this)}function l(){}function u(e,t){d.prototype[e]=t(d.prototype[e]||function(){})}function c(e){I=e(I||function(){})}function f(e){for(var t=[],n=[],r=0,a=e.length;a>r;r++){var o=S.call(t,e[r]);-1===o?(t.push(e[r]),n.push([r])):n[o].push(r)}return{names:t,indices:n}}function m(e){var t={};if("object"==typeof e||"function"==typeof e){var n=e&&e.hasOwnProperty;if(D)for(var r in e)h(t,e,r)||p(t,e,r,n);else for(var r in e)p(t,e,r,n)}return t["default"]=e,x(t,"__useDefault",{value:!0}),t}function p(e,t,n,r){(!r||t.hasOwnProperty(n))&&(e[n]=t[n])}function h(e,t,n){try{var r;return(r=Object.getOwnPropertyDescriptor(t,n))&&x(e,n,r),!0}catch(a){return!1}}function v(e){var t=e.match(z);return t&&"System.register"==e.substr(t[0].length,15)}function g(){return{name:null,deps:null,originalIndices:null,declare:null,execute:null,executingRequire:!1,declarative:!1,normalizedDeps:null,groupIndex:null,evaluated:!1,module:null,esModule:null,esmExports:!1}}var y="undefined"==typeof window&&"undefined"!=typeof self&&"undefined"!=typeof importScripts,b="undefined"!=typeof window&&"undefined"!=typeof document,w="undefined"!=typeof process&&"undefined"!=typeof process.platform&&!!process.platform.match(/^win/);e.console||(e.console={assert:function(){}});var x,S=Array.prototype.indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(this[t]===e)return t;return-1};!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,t,n){try{e[t]=n.value||n.get.call(e)}catch(r){}}}}();var E,_="_"==new Error(0,"_").fileName;if("undefined"!=typeof document&&document.getElementsByTagName){if(E=document.baseURI,!E){var O=document.getElementsByTagName("base");E=O[0]&&O[0].href||window.location.href}E=E.split("#")[0].split("?")[0],E=E.substr(0,E.lastIndexOf("/")+1)}else if("undefined"!=typeof process&&process.cwd)E="file://"+(w?"/":"")+process.cwd()+"/",w&&(E=E.replace(/\\/g,"/"));else{if("undefined"==typeof location)throw new TypeError("No environment baseURI");E=e.location.href}try{var j="test:"==new e.URL("test:///").protocol}catch(P){}var k=j?e.URL:e.URLPolyfill;x(r.prototype,"toString",{value:function(){return"Module"}}),function(){function o(e){return{status:"loading",name:e,linkSets:[],dependencies:[],metadata:{}}}function i(e,t,n){return new Promise(c({step:n.address?"fetch":"locate",loader:e,moduleName:t,moduleMetadata:n&&n.metadata||{},moduleSource:n.source,moduleAddress:n.address}))}function s(e,t,n,r){return new Promise(function(a,o){a(e.loaderObj.normalize(t,n,r))}).then(function(t){var n;if(e.modules[t])return n=o(t),n.status="linked",n.module=e.modules[t],n;for(var r=0,a=e.loads.length;a>r;r++)if(n=e.loads[r],n.name==t)return n;return n=o(t),e.loads.push(n),d(e,n),n})}function d(e,t){l(e,t,Promise.resolve().then(function(){return e.loaderObj.locate({name:t.name,metadata:t.metadata})}))}function l(e,t,n){u(e,t,n.then(function(n){return"loading"==t.status?(t.address=n,e.loaderObj.fetch({name:t.name,metadata:t.metadata,address:n})):void 0}))}function u(t,r,a){a.then(function(a){return"loading"==r.status?Promise.resolve(t.loaderObj.translate({name:r.name,metadata:r.metadata,address:r.address,source:a})).then(function(e){return r.source=e,t.loaderObj.instantiate({name:r.name,metadata:r.metadata,address:r.address,source:e})}).then(function(a){if(void 0===a)return r.address=r.address||"<Anonymous Module "+ ++j+">",r.isDeclarative=!0,O.call(t.loaderObj,r).then(function(t){var a=e.System,o=a.register;a.register=function(e,t,n){"string"!=typeof e&&(n=t,t=e),r.declare=n,r.depsList=t},n(t,r.address,{}),a.register=o});if("object"!=typeof a)throw TypeError("Invalid instantiate return value");r.depsList=a.deps||[],r.execute=a.execute,r.isDeclarative=!1}).then(function(){r.dependencies=[];for(var e=r.depsList,n=[],a=0,o=e.length;o>a;a++)(function(e,a){n.push(s(t,e,r.name,r.address).then(function(t){if(r.dependencies[a]={key:e,value:t.name},"linked"!=t.status)for(var n=r.linkSets.concat([]),o=0,i=n.length;i>o;o++)m(n[o],t)}))})(e[a],a);return Promise.all(n)}).then(function(){r.status="loaded";for(var e=r.linkSets.concat([]),t=0,n=e.length;n>t;t++)h(e[t],r)}):void 0})["catch"](function(e){r.status="failed",r.exception=e;for(var t=r.linkSets.concat([]),n=0,a=t.length;a>n;n++)v(t[n],r,e)})}function c(e){return function(t,n){var r=e.loader,a=e.moduleName,i=e.step;if(r.modules[a])throw new TypeError('"'+a+'" already exists in the module table');for(var s,c=0,m=r.loads.length;m>c;c++)if(r.loads[c].name==a&&(s=r.loads[c],"translate"!=i||s.source||(s.address=e.moduleAddress,u(r,s,Promise.resolve(e.moduleSource))),s.linkSets.length&&s.linkSets[0].loads[0].name==s.name))return s.linkSets[0].done.then(function(){t(s)});var p=s||o(a);p.metadata=e.moduleMetadata;var h=f(r,p);r.loads.push(p),t(h.done),"locate"==i?d(r,p):"fetch"==i?l(r,p,Promise.resolve(e.moduleAddress)):(p.address=e.moduleAddress,u(r,p,Promise.resolve(e.moduleSource)))}}function f(e,t){var n={loader:e,loads:[],startingLoad:t,loadingCount:0};return n.done=new Promise(function(e,t){n.resolve=e,n.reject=t}),m(n,t),n}function m(e,t){if("failed"!=t.status){for(var n=0,r=e.loads.length;r>n;n++)if(e.loads[n]==t)return;e.loads.push(t),t.linkSets.push(e),"loaded"!=t.status&&e.loadingCount++;for(var a=e.loader,n=0,r=t.dependencies.length;r>n;n++)if(t.dependencies[n]){var o=t.dependencies[n].value;if(!a.modules[o])for(var i=0,s=a.loads.length;s>i;i++)if(a.loads[i].name==o){m(e,a.loads[i]);break}}}}function p(e){var t=!1;try{w(e,function(n,r){v(e,n,r),t=!0})}catch(n){v(e,null,n),t=!0}return t}function h(e,t){if(e.loadingCount--,!(e.loadingCount>0)){var n=e.startingLoad;if(e.loader.loaderObj.execute===!1){for(var r=[].concat(e.loads),a=0,o=r.length;o>a;a++){var t=r[a];t.module=t.isDeclarative?{name:t.name,module:P({}),evaluated:!0}:{module:P({})},t.status="linked",g(e.loader,t)}return e.resolve(n)}var i=p(e);i||e.resolve(n)}}function v(e,n,r){var a=e.loader;e:if(n)if(e.loads[0].name==n.name)r=t(r,"Error loading "+n.name);else{for(var o=0;o<e.loads.length;o++)for(var i=e.loads[o],s=0;s<i.dependencies.length;s++){var d=i.dependencies[s];if(d.value==n.name){r=t(r,"Error loading "+n.name+' as "'+d.key+'" from '+i.name);break e}}r=t(r,"Error loading "+n.name+" from "+e.loads[0].name)}else r=t(r,"Error linking "+e.loads[0].name);for(var l=e.loads.concat([]),o=0,u=l.length;u>o;o++){var n=l[o];a.loaderObj.failed=a.loaderObj.failed||[],-1==S.call(a.loaderObj.failed,n)&&a.loaderObj.failed.push(n);var c=S.call(n.linkSets,e);if(n.linkSets.splice(c,1),0==n.linkSets.length){var f=S.call(e.loader.loads,n);-1!=f&&e.loader.loads.splice(f,1)}}e.reject(r)}function g(e,t){if(e.loaderObj.trace){e.loaderObj.loads||(e.loaderObj.loads={});var n={};t.dependencies.forEach(function(e){n[e.key]=e.value}),e.loaderObj.loads[t.name]={name:t.name,deps:t.dependencies.map(function(e){return e.key}),depMap:n,address:t.address,metadata:t.metadata,source:t.source,kind:t.isDeclarative?"declarative":"dynamic"}}t.name&&(e.modules[t.name]=t.module);var r=S.call(e.loads,t);-1!=r&&e.loads.splice(r,1);for(var a=0,o=t.linkSets.length;o>a;a++)r=S.call(t.linkSets[a].loads,t),-1!=r&&t.linkSets[a].loads.splice(r,1);t.linkSets.splice(0,t.linkSets.length)}function y(e,t,n){try{var a=t.execute()}catch(o){return void n(t,o)}return a&&a instanceof r?a:void n(t,new TypeError("Execution must define a Module instance"))}function b(e,t,n){var r=e._loader.importPromises;return r[t]=n.then(function(e){return r[t]=void 0,e},function(e){throw r[t]=void 0,e})}function w(e,t){var n=e.loader;if(e.loads.length)for(var r=e.loads.concat([]),a=0;a<r.length;a++){var o=r[a],i=y(e,o,t);if(!i)return;o.module={name:o.name,module:i},o.status="linked",g(n,o)}}function E(e,t){return t.module.module}function _(){}function O(){throw new TypeError("ES6 transpilation is only provided in the dev module loader build.")}var j=0;a.prototype={constructor:a,define:function(e,t,n){if(this._loader.importPromises[e])throw new TypeError("Module is already loading.");return b(this,e,new Promise(c({step:"translate",loader:this._loader,moduleName:e,moduleMetadata:n&&n.metadata||{},moduleSource:t,moduleAddress:n&&n.address})))},"delete":function(e){var t=this._loader;return delete t.importPromises[e],delete t.moduleRecords[e],t.modules[e]?delete t.modules[e]:!1},get:function(e){return this._loader.modules[e]?(_(this._loader.modules[e],[],this),this._loader.modules[e].module):void 0},has:function(e){return!!this._loader.modules[e]},"import":function(e,t,n){"object"==typeof t&&(t=t.name);var r=this;return Promise.resolve(r.normalize(e,t)).then(function(e){var t=r._loader;return t.modules[e]?(_(t.modules[e],[],t._loader),t.modules[e].module):t.importPromises[e]||b(r,e,i(t,e,{}).then(function(n){return delete t.importPromises[e],E(t,n)}))})},load:function(e){var t=this._loader;return t.modules[e]?Promise.resolve():t.importPromises[e]||b(this,e,new Promise(c({step:"locate",loader:t,moduleName:e,moduleMetadata:{},moduleSource:void 0,moduleAddress:void 0})).then(function(){delete t.importPromises[e]}))},module:function(e,t){var n=o();n.address=t&&t.address;var r=f(this._loader,n),a=Promise.resolve(e),i=this._loader,s=r.done.then(function(){return E(i,n)});return u(i,n,a),s},newModule:function(e){if("object"!=typeof e)throw new TypeError("Expected object");var t=new r,n=[];if(Object.getOwnPropertyNames&&null!=e)n=Object.getOwnPropertyNames(e);else for(var a in e)n.push(a);for(var o=0;o<n.length;o++)(function(n){x(t,n,{configurable:!1,enumerable:!0,get:function(){return e[n]},set:function(){throw new Error("Module exports cannot be changed externally.")}})})(n[o]);return Object.freeze&&Object.freeze(t),t},set:function(e,t){if(!(t instanceof r))throw new TypeError("Loader.set("+e+", module) must be a module");this._loader.modules[e]={module:t}},normalize:function(e,t,n){return e},locate:function(e){return e.name},fetch:function(e){},translate:function(e){return e.source},instantiate:function(e){}};var P=a.prototype.newModule}();var R;s.prototype=a.prototype,o.prototype=new s;var M=/^([^\/]+:\/\/|\/)/;o.prototype.normalize=function(e,t,n){return e=e.match(M)||"."==e[0]?new k(e,t||E).href:new k(i(this.paths,e)||e,E).href},o.prototype.locate=function(e){return e.name},o.prototype.instantiate=function(t){var r=this;return Promise.resolve(r.normalize(r.transpiler)).then(function(a){return t.address===a?{deps:[],execute:function(){var a=e.System,o=e.Reflect.Loader;return n("(function(require,exports,module){"+t.source+"})();",t.address,e),e.System=a,e.Reflect.Loader=o,r.newModule({"default":e[r.transpiler],__useDefault:!0})}}:void 0})},l.prototype=o.prototype,d.prototype=new l,d.prototype.constructor=d,d.prototype.instantiate=function(){};var I,D=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(P){D=!1}!function(){function t(){if(i&&"interactive"===i.script.readyState)return i.load;for(var e=0;e<l.length;e++)if("interactive"==l[e].script.readyState)return i=l[e],i.load}function n(e,t){return new Promise(function(e,n){t.metadata.integrity&&n(new Error("Subresource integrity checking is not supported in web workers.")),s=t;try{importScripts(t.address)}catch(r){s=null,n(r)}s=null,t.metadata.entry||n(new Error(t.address+" did not call System.register or AMD define")),e("")})}if("undefined"!=typeof document)var r=document.getElementsByTagName("head")[0];var a,o,i,s=null,d=r&&function(){var e=document.createElement("script"),t="undefined"!=typeof opera&&"[object Opera]"===opera.toString();return e.attachEvent&&!(e.attachEvent.toString&&e.attachEvent.toString().indexOf("[native code")<0)&&!t}(),l=[],c=0,f=[];u("pushRegister_",function(e){return function(n){return e.call(this,n)?!1:(s?this.reduceRegister_(s,n):d?this.reduceRegister_(t(),n):c?f.push(n):this.reduceRegister_(null,n),!0)}}),u("fetch",function(t){return function(s){var u=this;return"json"!=s.metadata.format&&s.metadata.scriptLoad&&(b||y)?y?n(u,s):new Promise(function(t,n){function m(e){if(!v.readyState||"loaded"==v.readyState||"complete"==v.readyState){if(c--,s.metadata.entry||f.length){if(!d){for(var r=0;r<f.length;r++)u.reduceRegister_(s,f[r]);f=[]}}else u.reduceRegister_(s);h(),s.metadata.entry||s.metadata.bundle||n(new Error(s.name+" did not call System.register or AMD define. If loading a global module configure the global name via the meta exports property for script injection support.")),t("")}}function p(e){h(),n(new Error("Unable to load script "+s.address))}function h(){if(e.System=a,e.require=o,v.detachEvent){v.detachEvent("onreadystatechange",m);for(var t=0;t<l.length;t++)l[t].script==v&&(i&&i.script==v&&(i=null),l.splice(t,1))}else v.removeEventListener("load",m,!1),v.removeEventListener("error",p,!1);r.removeChild(v)}var v=document.createElement("script");v.async=!0,s.metadata.crossOrigin&&(v.crossOrigin=s.metadata.crossOrigin),s.metadata.integrity&&v.setAttribute("integrity",s.metadata.integrity),d?(v.attachEvent("onreadystatechange",m),l.push({script:v,load:s})):(v.addEventListener("load",m,!1),v.addEventListener("error",p,!1)),c++,a=e.System,o=e.require,v.src=s.address,r.appendChild(v)}):t.call(this,s)}})}();var z=/^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/;!function(){function t(e,n,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==S.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var a=0,o=e.normalizedDeps.length;o>a;a++){var i=e.normalizedDeps[a],s=n.defined[i];if(s&&!s.evaluated){var d=e.groupIndex+(s.declarative!=e.declarative);if(null===s.groupIndex||s.groupIndex<d){if(null!==s.groupIndex&&(r[s.groupIndex].splice(S.call(r[s.groupIndex],s),1),0==r[s.groupIndex].length))throw new Error("Mixed dependency cycle detected");s.groupIndex=d}t(s,n,r)}}}}function n(e,n){var r=n.defined[e];if(!r.module){r.groupIndex=0;var a=[];t(r,n,a);for(var o=!!r.declarative==a.length%2,s=a.length-1;s>=0;s--){for(var d=a[s],u=0;u<d.length;u++){var c=d[u];o?i(c,n):l(c,n)}o=!o}}}function a(){}function o(e,t){return t[e]||(t[e]={name:e,dependencies:[],exports:new a,importers:[]})}function i(t,n){if(!t.module){var r=n._loader.moduleRecords,a=t.module=o(t.name,r),s=t.module.exports,d=t.declare.call(e,function(e,t){if(a.locked=!0,"object"==typeof e)for(var n in e)s[n]=e[n];else s[e]=t;for(var r=0,o=a.importers.length;o>r;r++){var i=a.importers[r];if(!i.locked){var d=S.call(i.dependencies,a);i.setters[d](s)}}return a.locked=!1,t},{id:t.name});if(a.setters=d.setters,a.execute=d.execute,!a.setters||!a.execute)throw new TypeError("Invalid System.register form for "+t.name);for(var l=0,u=t.normalizedDeps.length;u>l;l++){var c,f=t.normalizedDeps[l],m=n.defined[f],p=r[f];p?c=p.exports:m&&!m.declarative?c=m.esModule:m?(i(m,n),p=m.module,c=p.exports):c=n.get(f),p&&p.importers?(p.importers.push(a),a.dependencies.push(p)):a.dependencies.push(null);for(var h=t.originalIndices[l],v=0,g=h.length;g>v;++v){var y=h[v];a.setters[y]&&a.setters[y](c)}}}}function s(e,t){var n,r=t.defined[e];if(r)r.declarative?p(e,[],t):r.evaluated||l(r,t),n=r.module.exports;else if(n=t.get(e),!n)throw new Error("Unable to load dependency "+e+".");return(!r||r.declarative)&&n&&n.__useDefault?n["default"]:n}function l(t,n){if(!t.module){var a={},o=t.module={exports:a,id:t.name};if(!t.executingRequire)for(var i=0,d=t.normalizedDeps.length;d>i;i++){var u=t.normalizedDeps[i],c=n.defined[u];c&&l(c,n)}t.evaluated=!0;var f=t.execute.call(e,function(e){for(var r=0,a=t.deps.length;a>r;r++)if(t.deps[r]==e)return s(t.normalizedDeps[r],n);var o=n.normalizeSync(e,t.name);if(-1!=S.call(t.normalizedDeps,o))return s(o,n);throw new Error("Module "+e+" not declared as a dependency of "+t.name)},a,o);f&&(o.exports=f),a=o.exports,a&&(a.__esModule||a instanceof r)?t.esModule=a:t.esmExports&&a!==e?t.esModule=m(a):t.esModule={"default":a}}}function p(t,n,r){var a=r.defined[t];if(a&&!a.evaluated&&a.declarative){n.push(t);for(var o=0,i=a.normalizedDeps.length;i>o;o++){var s=a.normalizedDeps[o];-1==S.call(n,s)&&(r.defined[s]?p(s,n,r):r.get(s))}a.evaluated||(a.evaluated=!0,a.module.execute.call(e))}}d.prototype.register=function(e,t,n){if("string"!=typeof e&&(n=t,t=e,e=null),"boolean"==typeof n)return this.registerDynamic.apply(this,arguments);var r=g();r.name=e&&(this.decanonicalize||this.normalize).call(this,e),r.declarative=!0,r.deps=t,r.declare=n,this.pushRegister_({amd:!1,entry:r})},d.prototype.registerDynamic=function(e,t,n,r){"string"!=typeof e&&(r=n,n=t,t=e,e=null);var a=g();a.name=e&&(this.decanonicalize||this.normalize).call(this,e),a.deps=t,a.execute=r,a.executingRequire=n,this.pushRegister_({amd:!1,entry:a})},u("reduceRegister_",function(){return function(e,t){if(t){var n=t.entry,r=e&&e.metadata;if(n.name&&(n.name in this.defined||(this.defined[n.name]=n),r&&(r.bundle=!0)),!n.name||e&&n.name==e.name){if(!r)throw new TypeError("Invalid System.register call. Anonymous System.register calls can only be made by modules loaded by SystemJS.import and not via script tags.");if(r.entry)throw"register"==r.format?new Error("Multiple anonymous System.register calls in module "+e.name+". If loading a bundle, ensure all the System.register calls are named."):new Error("Module "+e.name+" interpreted as "+r.format+" module format, but called System.register.");r.format||(r.format="register"),r.entry=n}}}}),c(function(e){return function(){e.call(this),this.defined={},this._loader.moduleRecords={}}}),x(a,"toString",{value:function(){return"Module"}}),u("delete",function(e){return function(t){return delete this._loader.moduleRecords[t],delete this.defined[t],e.call(this,t)}}),u("fetch",function(e){return function(t){return this.defined[t.name]?(t.metadata.format="defined",""):(t.metadata.deps=t.metadata.deps||[],e.call(this,t))}}),u("translate",function(e){return function(t){return t.metadata.deps=t.metadata.deps||[],Promise.resolve(e.call(this,t)).then(function(e){return("register"==t.metadata.format||!t.metadata.format&&v(t.source))&&(t.metadata.format="register"),e})}}),u("instantiate",function(e){return function(t){"detect"==t.metadata.format&&(t.metadata.format=void 0),e.call(this,t);var r,a=this;if(a.defined[t.name])r=a.defined[t.name],r.declarative||(r.deps=r.deps.concat(t.metadata.deps));else if(t.metadata.entry)r=t.metadata.entry,r.deps=r.deps.concat(t.metadata.deps);else if(!(a.builder&&t.metadata.bundle||"register"!=t.metadata.format&&"esm"!=t.metadata.format&&"es6"!=t.metadata.format)){if("undefined"!=typeof __exec&&__exec.call(a,t),!t.metadata.entry&&!t.metadata.bundle)throw new Error(t.name+" detected as "+t.metadata.format+" but didn't execute.");r=t.metadata.entry,r&&t.metadata.deps&&(r.deps=r.deps.concat(t.metadata.deps))}r||(r=g(),r.deps=t.metadata.deps,r.execute=function(){}),a.defined[t.name]=r;var o=f(r.deps);r.deps=o.names,r.originalIndices=o.indices,r.name=t.name,r.esmExports=t.metadata.esmExports!==!1;for(var i=[],s=0,d=r.deps.length;d>s;s++)i.push(Promise.resolve(a.normalize(r.deps[s],t.name)));return Promise.all(i).then(function(e){return r.normalizedDeps=e,{deps:r.deps,execute:function(){return n(t.name,a),p(t.name,[],a),a.defined[t.name]=void 0,a.newModule(r.declarative?r.module.exports:r.esModule)}}})}})}(),function(){c(function(e){return function(){e.call(this),this.bundles={},this._loader.loadedBundles={}}}),u("locate",function(e){return function(t){var n=this,r=!1;if(!(t.name in n.defined))for(var a in n.bundles){for(var o=0;o<n.bundles[a].length;o++){var i=n.bundles[a][o];if(i==t.name){r=!0;break}if(-1!=i.indexOf("*")){var s=i.split("*");if(2!=s.length){n.bundles[a].splice(o--,1);continue}if(t.name.substring(0,s[0].length)==s[0]&&t.name.substr(t.name.length-s[1].length,s[1].length)==s[1]&&-1==t.name.substr(s[0].length,t.name.length-s[1].length-s[0].length).indexOf("/")){r=!0;break}}}if(r)return n["import"](a).then(function(){return e.call(n,t)})}return e.call(n,t)}})}(),c(function(t){return function(){t.apply(this,arguments),e.define=this.amdDefine}}),u("fetch",function(e){return function(t){return t.metadata.scriptLoad=!0,e.call(this,t)}}),R=new d,e.SystemJS=R,R.version="0.19.27 Register Only","object"==typeof exports&&(module.exports=a),e.Reflect=e.Reflect||{},e.Reflect.Loader=e.Reflect.Loader||a,e.Reflect.global=e.Reflect.global||e,e.LoaderPolyfill=a,R||(R=new o,R.constructor=o),"object"==typeof exports&&(module.exports=R),e.System=R}("undefined"!=typeof self?self:global);
	//# sourceMappingURL=system-register-only.js.map

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1)))

/***/ },
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/*
	 * SystemJS v0.19.27
	 */
	// from https://gist.github.com/Yaffle/1088850
	(function(global) {
	function URLPolyfill(url, baseURL) {
	  if (typeof url != 'string')
	    throw new TypeError('URL must be a string');
	  var m = String(url).replace(/^\s+|\s+$/g, "").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
	  if (!m)
	    throw new RangeError('Invalid URL format');
	  var protocol = m[1] || "";
	  var username = m[2] || "";
	  var password = m[3] || "";
	  var host = m[4] || "";
	  var hostname = m[5] || "";
	  var port = m[6] || "";
	  var pathname = m[7] || "";
	  var search = m[8] || "";
	  var hash = m[9] || "";
	  if (baseURL !== undefined) {
	    var base = baseURL instanceof URLPolyfill ? baseURL : new URLPolyfill(baseURL);
	    var flag = !protocol && !host && !username;
	    if (flag && !pathname && !search)
	      search = base.search;
	    if (flag && pathname[0] !== "/")
	      pathname = (pathname ? (((base.host || base.username) && !base.pathname ? "/" : "") + base.pathname.slice(0, base.pathname.lastIndexOf("/") + 1) + pathname) : base.pathname);
	    // dot segments removal
	    var output = [];
	    pathname.replace(/^(\.\.?(\/|$))+/, "")
	      .replace(/\/(\.(\/|$))+/g, "/")
	      .replace(/\/\.\.$/, "/../")
	      .replace(/\/?[^\/]*/g, function (p) {
	        if (p === "/..")
	          output.pop();
	        else
	          output.push(p);
	      });
	    pathname = output.join("").replace(/^\//, pathname[0] === "/" ? "/" : "");
	    if (flag) {
	      port = base.port;
	      hostname = base.hostname;
	      host = base.host;
	      password = base.password;
	      username = base.username;
	    }
	    if (!protocol)
	      protocol = base.protocol;
	  }

	  // convert windows file URLs to use /
	  if (protocol == 'file:')
	    pathname = pathname.replace(/\\/g, '/');

	  this.origin = host ? protocol + (protocol !== "" || host !== "" ? "//" : "") + host : "";
	  this.href = protocol + (protocol && host || protocol == "file:" ? "//" : "") + (username !== "" ? username + (password !== "" ? ":" + password : "") + "@" : "") + host + pathname + search + hash;
	  this.protocol = protocol;
	  this.username = username;
	  this.password = password;
	  this.host = host;
	  this.hostname = hostname;
	  this.port = port;
	  this.pathname = pathname;
	  this.search = search;
	  this.hash = hash;
	}
	global.URLPolyfill = URLPolyfill;
	})(typeof self != 'undefined' ? self : global);(function(__global) {

	  var isWorker = typeof window == 'undefined' && typeof self != 'undefined' && typeof importScripts != 'undefined';
	  var isBrowser = typeof window != 'undefined' && typeof document != 'undefined';
	  var isWindows = typeof process != 'undefined' && typeof process.platform != 'undefined' && !!process.platform.match(/^win/);

	  if (!__global.console)
	    __global.console = { assert: function() {} };

	  // IE8 support
	  var indexOf = Array.prototype.indexOf || function(item) {
	    for (var i = 0, thisLen = this.length; i < thisLen; i++) {
	      if (this[i] === item) {
	        return i;
	      }
	    }
	    return -1;
	  };
	  
	  var defineProperty;
	  (function () {
	    try {
	      if (!!Object.defineProperty({}, 'a', {}))
	        defineProperty = Object.defineProperty;
	    }
	    catch (e) {
	      defineProperty = function(obj, prop, opt) {
	        try {
	          obj[prop] = opt.value || opt.get.call(obj);
	        }
	        catch(e) {}
	      }
	    }
	  })();

	  var errArgs = new Error(0, '_').fileName == '_';

	  function addToError(err, msg) {
	    // parse the stack removing loader code lines for simplification
	    if (!err.originalErr) {
	      var stack = (err.stack || err.message || err).split('\n');
	      var newStack = [];
	      for (var i = 0; i < stack.length; i++) {
	        if (typeof $__curScript == 'undefined' || stack[i].indexOf($__curScript.src) == -1)
	          newStack.push(stack[i]);
	      }
	    }

	    var newMsg = (newStack ? newStack.join('\n\t') : err.message) + '\n\t' + msg;

	    // Convert file:/// URLs to paths in Node
	    if (!isBrowser)
	      newMsg = newMsg.replace(isWindows ? /file:\/\/\//g : /file:\/\//g, '');

	    var newErr = errArgs ? new Error(newMsg, err.fileName, err.lineNumber) : new Error(newMsg);
	    
	    // Node needs stack adjustment for throw to show message
	    if (!isBrowser)
	      newErr.stack = newMsg;
	    // Clearing the stack stops unnecessary loader lines showing
	    else
	      newErr.stack = null;
	    
	    // track the original error
	    newErr.originalErr = err.originalErr || err;

	    return newErr;
	  }

	  function __eval(source, debugName, context) {
	    try {
	      new Function(source).call(context);
	    }
	    catch(e) {
	      throw addToError(e, 'Evaluating ' + debugName);
	    }
	  }

	  var baseURI;
	  // environent baseURI detection
	  if (typeof document != 'undefined' && document.getElementsByTagName) {
	    baseURI = document.baseURI;

	    if (!baseURI) {
	      var bases = document.getElementsByTagName('base');
	      baseURI = bases[0] && bases[0].href || window.location.href;
	    }

	    // sanitize out the hash and querystring
	    baseURI = baseURI.split('#')[0].split('?')[0];
	    baseURI = baseURI.substr(0, baseURI.lastIndexOf('/') + 1);
	  }
	  else if (typeof process != 'undefined' && process.cwd) {
	    baseURI = 'file://' + (isWindows ? '/' : '') + process.cwd() + '/';
	    if (isWindows)
	      baseURI = baseURI.replace(/\\/g, '/');
	  }
	  else if (typeof location != 'undefined') {
	    baseURI = __global.location.href;
	  }
	  else {
	    throw new TypeError('No environment baseURI');
	  }

	  try {
	    var nativeURL = new __global.URL('test:///').protocol == 'test:';
	  }
	  catch(e) {}

	  var URL = nativeURL ? __global.URL : __global.URLPolyfill;
	/*
	*********************************************************************************************

	  Dynamic Module Loader Polyfill

	    - Implemented exactly to the former 2014-08-24 ES6 Specification Draft Rev 27, Section 15
	      http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts#august_24_2014_draft_rev_27

	    - Functions are commented with their spec numbers, with spec differences commented.

	    - Spec bugs are commented in this code with links.

	    - Abstract functions have been combined where possible, and their associated functions
	      commented.

	    - Realm implementation is entirely omitted.

	*********************************************************************************************
	*/

	function Module() {}
	// http://www.ecma-international.org/ecma-262/6.0/#sec-@@tostringtag
	defineProperty(Module.prototype, 'toString', {
	  value: function() {
	    return 'Module';
	  }
	});
	function Loader(options) {
	  this._loader = {
	    loaderObj: this,
	    loads: [],
	    modules: {},
	    importPromises: {},
	    moduleRecords: {}
	  };

	  // 26.3.3.6
	  defineProperty(this, 'global', {
	    get: function() {
	      return __global;
	    }
	  });

	  // 26.3.3.13 realm not implemented
	}

	(function() {

	// Some Helpers

	// logs a linkset snapshot for debugging
	/* function snapshot(loader) {
	  console.log('---Snapshot---');
	  for (var i = 0; i < loader.loads.length; i++) {
	    var load = loader.loads[i];
	    var linkSetLog = '  ' + load.name + ' (' + load.status + '): ';

	    for (var j = 0; j < load.linkSets.length; j++) {
	      linkSetLog += '{' + logloads(load.linkSets[j].loads) + '} ';
	    }
	    console.log(linkSetLog);
	  }
	  console.log('');
	}
	function logloads(loads) {
	  var log = '';
	  for (var k = 0; k < loads.length; k++)
	    log += loads[k].name + (k != loads.length - 1 ? ' ' : '');
	  return log;
	} */


	/* function checkInvariants() {
	  // see https://bugs.ecmascript.org/show_bug.cgi?id=2603#c1

	  var loads = System._loader.loads;
	  var linkSets = [];

	  for (var i = 0; i < loads.length; i++) {
	    var load = loads[i];
	    console.assert(load.status == 'loading' || load.status == 'loaded', 'Each load is loading or loaded');

	    for (var j = 0; j < load.linkSets.length; j++) {
	      var linkSet = load.linkSets[j];

	      for (var k = 0; k < linkSet.loads.length; k++)
	        console.assert(loads.indexOf(linkSet.loads[k]) != -1, 'linkSet loads are a subset of loader loads');

	      if (linkSets.indexOf(linkSet) == -1)
	        linkSets.push(linkSet);
	    }
	  }

	  for (var i = 0; i < loads.length; i++) {
	    var load = loads[i];
	    for (var j = 0; j < linkSets.length; j++) {
	      var linkSet = linkSets[j];

	      if (linkSet.loads.indexOf(load) != -1)
	        console.assert(load.linkSets.indexOf(linkSet) != -1, 'linkSet contains load -> load contains linkSet');

	      if (load.linkSets.indexOf(linkSet) != -1)
	        console.assert(linkSet.loads.indexOf(load) != -1, 'load contains linkSet -> linkSet contains load');
	    }
	  }

	  for (var i = 0; i < linkSets.length; i++) {
	    var linkSet = linkSets[i];
	    for (var j = 0; j < linkSet.loads.length; j++) {
	      var load = linkSet.loads[j];

	      for (var k = 0; k < load.dependencies.length; k++) {
	        var depName = load.dependencies[k].value;
	        var depLoad;
	        for (var l = 0; l < loads.length; l++) {
	          if (loads[l].name != depName)
	            continue;
	          depLoad = loads[l];
	          break;
	        }

	        // loading records are allowed not to have their dependencies yet
	        // if (load.status != 'loading')
	        //  console.assert(depLoad, 'depLoad found');

	        // console.assert(linkSet.loads.indexOf(depLoad) != -1, 'linkset contains all dependencies');
	      }
	    }
	  }
	} */

	  // 15.2.3 - Runtime Semantics: Loader State

	  // 15.2.3.11
	  function createLoaderLoad(object) {
	    return {
	      // modules is an object for ES5 implementation
	      modules: {},
	      loads: [],
	      loaderObj: object
	    };
	  }

	  // 15.2.3.2 Load Records and LoadRequest Objects

	  // 15.2.3.2.1
	  function createLoad(name) {
	    return {
	      status: 'loading',
	      name: name,
	      linkSets: [],
	      dependencies: [],
	      metadata: {}
	    };
	  }

	  // 15.2.3.2.2 createLoadRequestObject, absorbed into calling functions

	  // 15.2.4

	  // 15.2.4.1
	  function loadModule(loader, name, options) {
	    return new Promise(asyncStartLoadPartwayThrough({
	      step: options.address ? 'fetch' : 'locate',
	      loader: loader,
	      moduleName: name,
	      // allow metadata for import https://bugs.ecmascript.org/show_bug.cgi?id=3091
	      moduleMetadata: options && options.metadata || {},
	      moduleSource: options.source,
	      moduleAddress: options.address
	    }));
	  }

	  // 15.2.4.2
	  function requestLoad(loader, request, refererName, refererAddress) {
	    // 15.2.4.2.1 CallNormalize
	    return new Promise(function(resolve, reject) {
	      resolve(loader.loaderObj.normalize(request, refererName, refererAddress));
	    })
	    // 15.2.4.2.2 GetOrCreateLoad
	    .then(function(name) {
	      var load;
	      if (loader.modules[name]) {
	        load = createLoad(name);
	        load.status = 'linked';
	        // https://bugs.ecmascript.org/show_bug.cgi?id=2795
	        load.module = loader.modules[name];
	        return load;
	      }

	      for (var i = 0, l = loader.loads.length; i < l; i++) {
	        load = loader.loads[i];
	        if (load.name != name)
	          continue;
	        console.assert(load.status == 'loading' || load.status == 'loaded', 'loading or loaded');
	        return load;
	      }

	      load = createLoad(name);
	      loader.loads.push(load);

	      proceedToLocate(loader, load);

	      return load;
	    });
	  }

	  // 15.2.4.3
	  function proceedToLocate(loader, load) {
	    proceedToFetch(loader, load,
	      Promise.resolve()
	      // 15.2.4.3.1 CallLocate
	      .then(function() {
	        return loader.loaderObj.locate({ name: load.name, metadata: load.metadata });
	      })
	    );
	  }

	  // 15.2.4.4
	  function proceedToFetch(loader, load, p) {
	    proceedToTranslate(loader, load,
	      p
	      // 15.2.4.4.1 CallFetch
	      .then(function(address) {
	        // adjusted, see https://bugs.ecmascript.org/show_bug.cgi?id=2602
	        if (load.status != 'loading')
	          return;
	        load.address = address;

	        return loader.loaderObj.fetch({ name: load.name, metadata: load.metadata, address: address });
	      })
	    );
	  }

	  var anonCnt = 0;

	  // 15.2.4.5
	  function proceedToTranslate(loader, load, p) {
	    p
	    // 15.2.4.5.1 CallTranslate
	    .then(function(source) {
	      if (load.status != 'loading')
	        return;

	      return Promise.resolve(loader.loaderObj.translate({ name: load.name, metadata: load.metadata, address: load.address, source: source }))

	      // 15.2.4.5.2 CallInstantiate
	      .then(function(source) {
	        load.source = source;
	        return loader.loaderObj.instantiate({ name: load.name, metadata: load.metadata, address: load.address, source: source });
	      })

	      // 15.2.4.5.3 InstantiateSucceeded
	      .then(function(instantiateResult) {
	        if (instantiateResult === undefined) {
	          load.address = load.address || '<Anonymous Module ' + ++anonCnt + '>';

	          // instead of load.kind, use load.isDeclarative
	          load.isDeclarative = true;
	          return transpile.call(loader.loaderObj, load)
	          .then(function(transpiled) {
	            // Hijack System.register to set declare function
	            var curSystem = __global.System;
	            var curRegister = curSystem.register;
	            curSystem.register = function(name, deps, declare) {
	              if (typeof name != 'string') {
	                declare = deps;
	                deps = name;
	              }
	              // store the registered declaration as load.declare
	              // store the deps as load.deps
	              load.declare = declare;
	              load.depsList = deps;
	            }
	            // empty {} context is closest to undefined 'this' we can get
	            __eval(transpiled, load.address, {});
	            curSystem.register = curRegister;
	          });
	        }
	        else if (typeof instantiateResult == 'object') {
	          load.depsList = instantiateResult.deps || [];
	          load.execute = instantiateResult.execute;
	          load.isDeclarative = false;
	        }
	        else
	          throw TypeError('Invalid instantiate return value');
	      })
	      // 15.2.4.6 ProcessLoadDependencies
	      .then(function() {
	        load.dependencies = [];
	        var depsList = load.depsList;

	        var loadPromises = [];
	        for (var i = 0, l = depsList.length; i < l; i++) (function(request, index) {
	          loadPromises.push(
	            requestLoad(loader, request, load.name, load.address)

	            // 15.2.4.6.1 AddDependencyLoad (load is parentLoad)
	            .then(function(depLoad) {

	              // adjusted from spec to maintain dependency order
	              // this is due to the System.register internal implementation needs
	              load.dependencies[index] = {
	                key: request,
	                value: depLoad.name
	              };

	              if (depLoad.status != 'linked') {
	                var linkSets = load.linkSets.concat([]);
	                for (var i = 0, l = linkSets.length; i < l; i++)
	                  addLoadToLinkSet(linkSets[i], depLoad);
	              }

	              // console.log('AddDependencyLoad ' + depLoad.name + ' for ' + load.name);
	              // snapshot(loader);
	            })
	          );
	        })(depsList[i], i);

	        return Promise.all(loadPromises);
	      })

	      // 15.2.4.6.2 LoadSucceeded
	      .then(function() {
	        // console.log('LoadSucceeded ' + load.name);
	        // snapshot(loader);

	        console.assert(load.status == 'loading', 'is loading');

	        load.status = 'loaded';

	        var linkSets = load.linkSets.concat([]);
	        for (var i = 0, l = linkSets.length; i < l; i++)
	          updateLinkSetOnLoad(linkSets[i], load);
	      });
	    })
	    // 15.2.4.5.4 LoadFailed
	    ['catch'](function(exc) {
	      load.status = 'failed';
	      load.exception = exc;

	      var linkSets = load.linkSets.concat([]);
	      for (var i = 0, l = linkSets.length; i < l; i++) {
	        linkSetFailed(linkSets[i], load, exc);
	      }

	      console.assert(load.linkSets.length == 0, 'linkSets not removed');
	    });
	  }

	  // 15.2.4.7 PromiseOfStartLoadPartwayThrough absorbed into calling functions

	  // 15.2.4.7.1
	  function asyncStartLoadPartwayThrough(stepState) {
	    return function(resolve, reject) {
	      var loader = stepState.loader;
	      var name = stepState.moduleName;
	      var step = stepState.step;

	      if (loader.modules[name])
	        throw new TypeError('"' + name + '" already exists in the module table');

	      // adjusted to pick up existing loads
	      var existingLoad;
	      for (var i = 0, l = loader.loads.length; i < l; i++) {
	        if (loader.loads[i].name == name) {
	          existingLoad = loader.loads[i];

	          if (step == 'translate' && !existingLoad.source) {
	            existingLoad.address = stepState.moduleAddress;
	            proceedToTranslate(loader, existingLoad, Promise.resolve(stepState.moduleSource));
	          }

	          // a primary load -> use that existing linkset if it is for the direct load here
	          // otherwise create a new linkset unit
	          if (existingLoad.linkSets.length && existingLoad.linkSets[0].loads[0].name == existingLoad.name)
	            return existingLoad.linkSets[0].done.then(function() {
	              resolve(existingLoad);
	            });
	        }
	      }

	      var load = existingLoad || createLoad(name);

	      load.metadata = stepState.moduleMetadata;

	      var linkSet = createLinkSet(loader, load);

	      loader.loads.push(load);

	      resolve(linkSet.done);

	      if (step == 'locate')
	        proceedToLocate(loader, load);

	      else if (step == 'fetch')
	        proceedToFetch(loader, load, Promise.resolve(stepState.moduleAddress));

	      else {
	        console.assert(step == 'translate', 'translate step');
	        load.address = stepState.moduleAddress;
	        proceedToTranslate(loader, load, Promise.resolve(stepState.moduleSource));
	      }
	    }
	  }

	  // Declarative linking functions run through alternative implementation:
	  // 15.2.5.1.1 CreateModuleLinkageRecord not implemented
	  // 15.2.5.1.2 LookupExport not implemented
	  // 15.2.5.1.3 LookupModuleDependency not implemented

	  // 15.2.5.2.1
	  function createLinkSet(loader, startingLoad) {
	    var linkSet = {
	      loader: loader,
	      loads: [],
	      startingLoad: startingLoad, // added see spec bug https://bugs.ecmascript.org/show_bug.cgi?id=2995
	      loadingCount: 0
	    };
	    linkSet.done = new Promise(function(resolve, reject) {
	      linkSet.resolve = resolve;
	      linkSet.reject = reject;
	    });
	    addLoadToLinkSet(linkSet, startingLoad);
	    return linkSet;
	  }
	  // 15.2.5.2.2
	  function addLoadToLinkSet(linkSet, load) {
	    if (load.status == 'failed')
	      return;

	    console.assert(load.status == 'loading' || load.status == 'loaded', 'loading or loaded on link set');

	    for (var i = 0, l = linkSet.loads.length; i < l; i++)
	      if (linkSet.loads[i] == load)
	        return;

	    linkSet.loads.push(load);
	    load.linkSets.push(linkSet);

	    // adjustment, see https://bugs.ecmascript.org/show_bug.cgi?id=2603
	    if (load.status != 'loaded') {
	      linkSet.loadingCount++;
	    }

	    var loader = linkSet.loader;

	    for (var i = 0, l = load.dependencies.length; i < l; i++) {
	      if (!load.dependencies[i])
	        continue;

	      var name = load.dependencies[i].value;

	      if (loader.modules[name])
	        continue;

	      for (var j = 0, d = loader.loads.length; j < d; j++) {
	        if (loader.loads[j].name != name)
	          continue;

	        addLoadToLinkSet(linkSet, loader.loads[j]);
	        break;
	      }
	    }
	    // console.log('add to linkset ' + load.name);
	    // snapshot(linkSet.loader);
	  }

	  // linking errors can be generic or load-specific
	  // this is necessary for debugging info
	  function doLink(linkSet) {
	    var error = false;
	    try {
	      link(linkSet, function(load, exc) {
	        linkSetFailed(linkSet, load, exc);
	        error = true;
	      });
	    }
	    catch(e) {
	      linkSetFailed(linkSet, null, e);
	      error = true;
	    }
	    return error;
	  }

	  // 15.2.5.2.3
	  function updateLinkSetOnLoad(linkSet, load) {
	    // console.log('update linkset on load ' + load.name);
	    // snapshot(linkSet.loader);

	    console.assert(load.status == 'loaded' || load.status == 'linked', 'loaded or linked');

	    linkSet.loadingCount--;

	    if (linkSet.loadingCount > 0)
	      return;

	    // adjusted for spec bug https://bugs.ecmascript.org/show_bug.cgi?id=2995
	    var startingLoad = linkSet.startingLoad;

	    // non-executing link variation for loader tracing
	    // on the server. Not in spec.
	    /***/
	    if (linkSet.loader.loaderObj.execute === false) {
	      var loads = [].concat(linkSet.loads);
	      for (var i = 0, l = loads.length; i < l; i++) {
	        var load = loads[i];
	        load.module = !load.isDeclarative ? {
	          module: _newModule({})
	        } : {
	          name: load.name,
	          module: _newModule({}),
	          evaluated: true
	        };
	        load.status = 'linked';
	        finishLoad(linkSet.loader, load);
	      }
	      return linkSet.resolve(startingLoad);
	    }
	    /***/

	    var abrupt = doLink(linkSet);

	    if (abrupt)
	      return;

	    console.assert(linkSet.loads.length == 0, 'loads cleared');

	    linkSet.resolve(startingLoad);
	  }

	  // 15.2.5.2.4
	  function linkSetFailed(linkSet, load, exc) {
	    var loader = linkSet.loader;
	    var requests;

	    checkError: 
	    if (load) {
	      if (linkSet.loads[0].name == load.name) {
	        exc = addToError(exc, 'Error loading ' + load.name);
	      }
	      else {
	        for (var i = 0; i < linkSet.loads.length; i++) {
	          var pLoad = linkSet.loads[i];
	          for (var j = 0; j < pLoad.dependencies.length; j++) {
	            var dep = pLoad.dependencies[j];
	            if (dep.value == load.name) {
	              exc = addToError(exc, 'Error loading ' + load.name + ' as "' + dep.key + '" from ' + pLoad.name);
	              break checkError;
	            }
	          }
	        }
	        exc = addToError(exc, 'Error loading ' + load.name + ' from ' + linkSet.loads[0].name);
	      }
	    }
	    else {
	      exc = addToError(exc, 'Error linking ' + linkSet.loads[0].name);
	    }


	    var loads = linkSet.loads.concat([]);
	    for (var i = 0, l = loads.length; i < l; i++) {
	      var load = loads[i];

	      // store all failed load records
	      loader.loaderObj.failed = loader.loaderObj.failed || [];
	      if (indexOf.call(loader.loaderObj.failed, load) == -1)
	        loader.loaderObj.failed.push(load);

	      var linkIndex = indexOf.call(load.linkSets, linkSet);
	      console.assert(linkIndex != -1, 'link not present');
	      load.linkSets.splice(linkIndex, 1);
	      if (load.linkSets.length == 0) {
	        var globalLoadsIndex = indexOf.call(linkSet.loader.loads, load);
	        if (globalLoadsIndex != -1)
	          linkSet.loader.loads.splice(globalLoadsIndex, 1);
	      }
	    }
	    linkSet.reject(exc);
	  }

	  // 15.2.5.2.5
	  function finishLoad(loader, load) {
	    // add to global trace if tracing
	    if (loader.loaderObj.trace) {
	      if (!loader.loaderObj.loads)
	        loader.loaderObj.loads = {};
	      var depMap = {};
	      load.dependencies.forEach(function(dep) {
	        depMap[dep.key] = dep.value;
	      });
	      loader.loaderObj.loads[load.name] = {
	        name: load.name,
	        deps: load.dependencies.map(function(dep){ return dep.key }),
	        depMap: depMap,
	        address: load.address,
	        metadata: load.metadata,
	        source: load.source,
	        kind: load.isDeclarative ? 'declarative' : 'dynamic'
	      };
	    }
	    // if not anonymous, add to the module table
	    if (load.name) {
	      console.assert(!loader.modules[load.name], 'load not in module table');
	      loader.modules[load.name] = load.module;
	    }
	    var loadIndex = indexOf.call(loader.loads, load);
	    if (loadIndex != -1)
	      loader.loads.splice(loadIndex, 1);
	    for (var i = 0, l = load.linkSets.length; i < l; i++) {
	      loadIndex = indexOf.call(load.linkSets[i].loads, load);
	      if (loadIndex != -1)
	        load.linkSets[i].loads.splice(loadIndex, 1);
	    }
	    load.linkSets.splice(0, load.linkSets.length);
	  }

	  function doDynamicExecute(linkSet, load, linkError) {
	    try {
	      var module = load.execute();
	    }
	    catch(e) {
	      linkError(load, e);
	      return;
	    }
	    if (!module || !(module instanceof Module))
	      linkError(load, new TypeError('Execution must define a Module instance'));
	    else
	      return module;
	  }

	  // 26.3 Loader

	  // 26.3.1.1
	  // defined at top

	  // importPromises adds ability to import a module twice without error - https://bugs.ecmascript.org/show_bug.cgi?id=2601
	  function createImportPromise(loader, name, promise) {
	    var importPromises = loader._loader.importPromises;
	    return importPromises[name] = promise.then(function(m) {
	      importPromises[name] = undefined;
	      return m;
	    }, function(e) {
	      importPromises[name] = undefined;
	      throw e;
	    });
	  }

	  Loader.prototype = {
	    // 26.3.3.1
	    constructor: Loader,
	    // 26.3.3.2
	    define: function(name, source, options) {
	      // check if already defined
	      if (this._loader.importPromises[name])
	        throw new TypeError('Module is already loading.');
	      return createImportPromise(this, name, new Promise(asyncStartLoadPartwayThrough({
	        step: 'translate',
	        loader: this._loader,
	        moduleName: name,
	        moduleMetadata: options && options.metadata || {},
	        moduleSource: source,
	        moduleAddress: options && options.address
	      })));
	    },
	    // 26.3.3.3
	    'delete': function(name) {
	      var loader = this._loader;
	      delete loader.importPromises[name];
	      delete loader.moduleRecords[name];
	      return loader.modules[name] ? delete loader.modules[name] : false;
	    },
	    // 26.3.3.4 entries not implemented
	    // 26.3.3.5
	    get: function(key) {
	      if (!this._loader.modules[key])
	        return;
	      doEnsureEvaluated(this._loader.modules[key], [], this);
	      return this._loader.modules[key].module;
	    },
	    // 26.3.3.7
	    has: function(name) {
	      return !!this._loader.modules[name];
	    },
	    // 26.3.3.8
	    'import': function(name, parentName, parentAddress) {
	      if (typeof parentName == 'object')
	        parentName = parentName.name;

	      // run normalize first
	      var loaderObj = this;

	      // added, see https://bugs.ecmascript.org/show_bug.cgi?id=2659
	      return Promise.resolve(loaderObj.normalize(name, parentName))
	      .then(function(name) {
	        var loader = loaderObj._loader;

	        if (loader.modules[name]) {
	          doEnsureEvaluated(loader.modules[name], [], loader._loader);
	          return loader.modules[name].module;
	        }

	        return loader.importPromises[name] || createImportPromise(loaderObj, name,
	          loadModule(loader, name, {})
	          .then(function(load) {
	            delete loader.importPromises[name];
	            return evaluateLoadedModule(loader, load);
	          }));
	      });
	    },
	    // 26.3.3.9 keys not implemented
	    // 26.3.3.10
	    load: function(name) {
	      var loader = this._loader;
	      if (loader.modules[name])
	        return Promise.resolve();
	      return loader.importPromises[name] || createImportPromise(this, name, new Promise(asyncStartLoadPartwayThrough({
	        step: 'locate',
	        loader: loader,
	        moduleName: name,
	        moduleMetadata: {},
	        moduleSource: undefined,
	        moduleAddress: undefined
	      }))
	      .then(function() {
	        delete loader.importPromises[name];
	      }));
	    },
	    // 26.3.3.11
	    module: function(source, options) {
	      var load = createLoad();
	      load.address = options && options.address;
	      var linkSet = createLinkSet(this._loader, load);
	      var sourcePromise = Promise.resolve(source);
	      var loader = this._loader;
	      var p = linkSet.done.then(function() {
	        return evaluateLoadedModule(loader, load);
	      });
	      proceedToTranslate(loader, load, sourcePromise);
	      return p;
	    },
	    // 26.3.3.12
	    newModule: function (obj) {
	      if (typeof obj != 'object')
	        throw new TypeError('Expected object');

	      var m = new Module();

	      var pNames = [];
	      if (Object.getOwnPropertyNames && obj != null)
	        pNames = Object.getOwnPropertyNames(obj);
	      else
	        for (var key in obj)
	          pNames.push(key);

	      for (var i = 0; i < pNames.length; i++) (function(key) {
	        defineProperty(m, key, {
	          configurable: false,
	          enumerable: true,
	          get: function () {
	            return obj[key];
	          },
	          set: function() {
	            throw new Error('Module exports cannot be changed externally.');
	          }
	        });
	      })(pNames[i]);

	      if (Object.freeze)
	        Object.freeze(m);

	      return m;
	    },
	    // 26.3.3.14
	    set: function(name, module) {
	      if (!(module instanceof Module))
	        throw new TypeError('Loader.set(' + name + ', module) must be a module');
	      this._loader.modules[name] = {
	        module: module
	      };
	    },
	    // 26.3.3.15 values not implemented
	    // 26.3.3.16 @@iterator not implemented
	    // 26.3.3.17 @@toStringTag not implemented

	    // 26.3.3.18.1
	    normalize: function(name, referrerName, referrerAddress) {
	      return name;
	    },
	    // 26.3.3.18.2
	    locate: function(load) {
	      return load.name;
	    },
	    // 26.3.3.18.3
	    fetch: function(load) {
	    },
	    // 26.3.3.18.4
	    translate: function(load) {
	      return load.source;
	    },
	    // 26.3.3.18.5
	    instantiate: function(load) {
	    }
	  };

	  var _newModule = Loader.prototype.newModule;
	/*
	 * ES6 Module Declarative Linking Code - Dev Build Only
	 */
	  function link(linkSet, linkError) {

	    var loader = linkSet.loader;

	    if (!linkSet.loads.length)
	      return;

	    var loads = linkSet.loads.concat([]);

	    for (var i = 0; i < loads.length; i++) {
	      var load = loads[i];

	      var module = doDynamicExecute(linkSet, load, linkError);
	      if (!module)
	        return;
	      load.module = {
	        name: load.name,
	        module: module
	      };
	      load.status = 'linked';

	      finishLoad(loader, load);
	    }
	  }

	  function evaluateLoadedModule(loader, load) {
	    console.assert(load.status == 'linked', 'is linked ' + load.name);
	    return load.module.module;
	  }

	  function doEnsureEvaluated() {}

	  function transpile() {
	    throw new TypeError('ES6 transpilation is only provided in the dev module loader build.');
	  }
	})();/*
	*********************************************************************************************

	  System Loader Implementation

	    - Implemented to https://github.com/jorendorff/js-loaders/blob/master/browser-loader.js

	    - <script type="module"> supported

	*********************************************************************************************
	*/

	var System;

	function SystemLoader() {
	  Loader.call(this);
	  this.paths = {};
	}

	// NB no specification provided for System.paths, used ideas discussed in https://github.com/jorendorff/js-loaders/issues/25
	function applyPaths(paths, name) {
	  // most specific (most number of slashes in path) match wins
	  var pathMatch = '', wildcard, maxWildcardPrefixLen = 0;

	  // check to see if we have a paths entry
	  for (var p in paths) {
	    var pathParts = p.split('*');
	    if (pathParts.length > 2)
	      throw new TypeError('Only one wildcard in a path is permitted');

	    // exact path match
	    if (pathParts.length == 1) {
	      if (name == p)
	        return paths[p];
	      
	      // support trailing / in paths rules
	      else if (name.substr(0, p.length - 1) == p.substr(0, p.length - 1) && (name.length < p.length || name[p.length - 1] == p[p.length - 1]) && paths[p][paths[p].length - 1] == '/')
	        return paths[p].substr(0, paths[p].length - 1) + (name.length > p.length ? '/' + name.substr(p.length) : '');
	    }
	    // wildcard path match
	    else {
	      var wildcardPrefixLen = pathParts[0].length;
	      if (wildcardPrefixLen >= maxWildcardPrefixLen &&
	          name.substr(0, pathParts[0].length) == pathParts[0] &&
	          name.substr(name.length - pathParts[1].length) == pathParts[1]) {
	            maxWildcardPrefixLen = wildcardPrefixLen;
	            pathMatch = p;
	            wildcard = name.substr(pathParts[0].length, name.length - pathParts[1].length - pathParts[0].length);
	          }
	    }
	  }

	  var outPath = paths[pathMatch];
	  if (typeof wildcard == 'string')
	    outPath = outPath.replace('*', wildcard);

	  return outPath;
	}

	// inline Object.create-style class extension
	function LoaderProto() {}
	LoaderProto.prototype = Loader.prototype;
	SystemLoader.prototype = new LoaderProto();
	var absURLRegEx = /^([^\/]+:\/\/|\/)/;

	// Normalization with module names as absolute URLs
	SystemLoader.prototype.normalize = function(name, parentName, parentAddress) {
	  // NB does `import 'file.js'` import relative to the parent name or baseURL?
	  //    have assumed that it is baseURL-relative here, but spec may well align with URLs to be the latter
	  //    safe option for users is to always use "./file.js" for relative

	  // not absolute or relative -> apply paths (what will be sites)
	  if (!name.match(absURLRegEx) && name[0] != '.')
	    name = new URL(applyPaths(this.paths, name) || name, baseURI).href;
	  // apply parent-relative normalization, parentAddress is already normalized
	  else
	    name = new URL(name, parentName || baseURI).href;

	  return name;
	};

	SystemLoader.prototype.locate = function(load) {
	  return load.name;
	};


	// ensure the transpiler is loaded correctly
	SystemLoader.prototype.instantiate = function(load) {
	  var self = this;
	  return Promise.resolve(self.normalize(self.transpiler))
	  .then(function(transpilerNormalized) {
	    // load transpiler as a global (avoiding System clobbering)
	    if (load.address === transpilerNormalized) {
	      return {
	        deps: [],
	        execute: function() {
	          var curSystem = __global.System;
	          var curLoader = __global.Reflect.Loader;
	          // ensure not detected as CommonJS
	          __eval('(function(require,exports,module){' + load.source + '})();', load.address, __global);
	          __global.System = curSystem;
	          __global.Reflect.Loader = curLoader;
	          return self.newModule({ 'default': __global[self.transpiler], __useDefault: true });
	        }
	      };
	    }
	  });
	};// SystemJS Loader Class and Extension helpers

	function SystemJSLoader() {
	  SystemLoader.call(this);

	  systemJSConstructor.call(this);
	}

	// inline Object.create-style class extension
	function SystemProto() {};
	SystemProto.prototype = SystemLoader.prototype;
	SystemJSLoader.prototype = new SystemProto();
	SystemJSLoader.prototype.constructor = SystemJSLoader;

	// remove ESML instantiate
	SystemJSLoader.prototype.instantiate = function() {};

	var systemJSConstructor;

	function hook(name, hook) {
	  SystemJSLoader.prototype[name] = hook(SystemJSLoader.prototype[name] || function() {});
	}
	function hookConstructor(hook) {
	  systemJSConstructor = hook(systemJSConstructor || function() {});
	}

	function dedupe(deps) {
	  var newDeps = [];
	  for (var i = 0, l = deps.length; i < l; i++)
	    if (indexOf.call(newDeps, deps[i]) == -1)
	      newDeps.push(deps[i])
	  return newDeps;
	}

	function group(deps) {
	  var names = [];
	  var indices = [];
	  for (var i = 0, l = deps.length; i < l; i++) {
	    var index = indexOf.call(names, deps[i]);
	    if (index === -1) {
	      names.push(deps[i]);
	      indices.push([i]);
	    }
	    else {
	      indices[index].push(i);
	    }
	  }
	  return { names: names, indices: indices };
	}

	var getOwnPropertyDescriptor = true;
	try {
	  Object.getOwnPropertyDescriptor({ a: 0 }, 'a');
	}
	catch(e) {
	  getOwnPropertyDescriptor = false;
	}

	// converts any module.exports object into an object ready for SystemJS.newModule
	function getESModule(exports) {
	  var esModule = {};
	  // don't trigger getters/setters in environments that support them
	  if (typeof exports == 'object' || typeof exports == 'function') {
	    var hasOwnProperty = exports && exports.hasOwnProperty;
	    if (getOwnPropertyDescriptor) {
	      for (var p in exports) {
	        if (!trySilentDefineProperty(esModule, exports, p))
	          setPropertyIfHasOwnProperty(esModule, exports, p, hasOwnProperty);
	      }
	    }
	    else {
	      for (var p in exports)
	        setPropertyIfHasOwnProperty(esModule, exports, p, hasOwnProperty);
	    }
	  }
	  esModule['default'] = exports;
	  defineProperty(esModule, '__useDefault', {
	    value: true
	  });
	  return esModule;
	}

	function setPropertyIfHasOwnProperty(targetObj, sourceObj, propName, hasOwnProperty) {
	  if (!hasOwnProperty || sourceObj.hasOwnProperty(propName))
	    targetObj[propName] = sourceObj[propName];
	}

	function trySilentDefineProperty(targetObj, sourceObj, propName) {
	  try {
	    var d;
	    if (d = Object.getOwnPropertyDescriptor(sourceObj, propName))
	      defineProperty(targetObj, propName, d);

	    return true;
	  } catch (ex) {
	    // Object.getOwnPropertyDescriptor threw an exception, fall back to normal set property.
	    return false;
	  }
	}

	function extend(a, b, prepend) {
	  for (var p in b) {
	    if (!prepend || !(p in a))
	      a[p] = b[p];
	  }
	  return a;
	}

	// package configuration options
	var packageProperties = ['main', 'format', 'defaultExtension', 'meta', 'map', 'basePath', 'depCache'];

	// meta first-level extends where:
	// array + array appends
	// object + object extends
	// other properties replace
	function extendMeta(a, b, prepend) {
	  for (var p in b) {
	    var val = b[p];
	    if (!(p in a))
	      a[p] = val;
	    else if (val instanceof Array && a[p] instanceof Array)
	      a[p] = [].concat(prepend ? val : a[p]).concat(prepend ? a[p] : val);
	    else if (typeof val == 'object' && val !== null && typeof a[p] == 'object')
	      a[p] = extend(extend({}, a[p]), val, prepend);
	    else if (!prepend)
	      a[p] = val;
	  }
	}

	function warn(msg) {
	  if (this.warnings && typeof console != 'undefined' && console.warn)
	    console.warn(msg);
	}
	/*
	 * Script tag fetch
	 *
	 * When load.metadata.scriptLoad is true, we load via script tag injection.
	 */
	(function() {

	  if (typeof document != 'undefined')
	    var head = document.getElementsByTagName('head')[0];

	  var curSystem;
	  var curRequire;

	  // if doing worker executing, this is set to the load record being executed
	  var workerLoad = null;
	  
	  // interactive mode handling method courtesy RequireJS
	  var ieEvents = head && (function() {
	    var s = document.createElement('script');
	    var isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]';
	    return s.attachEvent && !(s.attachEvent.toString && s.attachEvent.toString().indexOf('[native code') < 0) && !isOpera;
	  })();

	  // IE interactive-only part
	  // we store loading scripts array as { script: <script>, load: {...} }
	  var interactiveLoadingScripts = [];
	  var interactiveScript;
	  function getInteractiveScriptLoad() {
	    if (interactiveScript && interactiveScript.script.readyState === 'interactive')
	      return interactiveScript.load;

	    for (var i = 0; i < interactiveLoadingScripts.length; i++)
	      if (interactiveLoadingScripts[i].script.readyState == 'interactive') {
	        interactiveScript = interactiveLoadingScripts[i];
	        return interactiveScript.load;
	      }
	  }
	  
	  // System.register, System.registerDynamic, AMD define pipeline
	  // this is called by the above methods when they execute
	  // we then run the reduceRegister_ collection function either immediately
	  // if we are in IE and know the currently executing script (interactive)
	  // or later if we need to wait for the synchronous load callback to know the script
	  var loadingCnt = 0;
	  var registerQueue = [];
	  hook('pushRegister_', function(pushRegister) {
	    return function(register) {
	      // if using eval-execution then skip
	      if (pushRegister.call(this, register))
	        return false;

	      // if using worker execution, then we're done
	      if (workerLoad)
	        this.reduceRegister_(workerLoad, register);

	      // detect if we know the currently executing load (IE)
	      // if so, immediately call reduceRegister
	      else if (ieEvents)
	        this.reduceRegister_(getInteractiveScriptLoad(), register);

	      // otherwise, add to our execution queue
	      // to call reduceRegister on sync script load event
	      else if (loadingCnt)
	        registerQueue.push(register);

	      // if we're not currently loading anything though
	      // then do the reduction against a null load
	      // (out of band named define or named register)
	      // note even in non-script environments, this catch is used
	      else
	        this.reduceRegister_(null, register);

	      return true;
	    };
	  });

	  function webWorkerImport(loader, load) {
	    return new Promise(function(resolve, reject) {
	      if (load.metadata.integrity)
	        reject(new Error('Subresource integrity checking is not supported in web workers.'));

	      workerLoad = load;
	      try {
	        importScripts(load.address);
	      }
	      catch(e) {
	        workerLoad = null;
	        reject(e);
	      }
	      workerLoad = null;

	      // if nothing registered, then something went wrong
	      if (!load.metadata.entry)
	        reject(new Error(load.address + ' did not call System.register or AMD define'));

	      resolve('');
	    });
	  }

	  // override fetch to use script injection
	  hook('fetch', function(fetch) {
	    return function(load) {
	      var loader = this;

	      if (load.metadata.format == 'json' || !load.metadata.scriptLoad || (!isBrowser && !isWorker))
	        return fetch.call(this, load);

	      if (isWorker)
	        return webWorkerImport(loader, load);

	      return new Promise(function(resolve, reject) {
	        var s = document.createElement('script');
	        
	        s.async = true;

	        if (load.metadata.crossOrigin)
	          s.crossOrigin = load.metadata.crossOrigin;

	        if (load.metadata.integrity)
	          s.setAttribute('integrity', load.metadata.integrity);

	        if (ieEvents) {
	          s.attachEvent('onreadystatechange', complete);
	          interactiveLoadingScripts.push({
	            script: s,
	            load: load
	          });
	        }
	        else {
	          s.addEventListener('load', complete, false);
	          s.addEventListener('error', error, false);
	        }

	        loadingCnt++;

	        curSystem = __global.System;
	        curRequire = __global.require;

	        s.src = load.address;
	        head.appendChild(s);

	        function complete(evt) {
	          if (s.readyState && s.readyState != 'loaded' && s.readyState != 'complete')
	            return;

	          loadingCnt--;

	          // complete call is sync on execution finish
	          // (in ie already done reductions)
	          if (!load.metadata.entry && !registerQueue.length) {
	            loader.reduceRegister_(load);
	          }
	          else if (!ieEvents) {
	            for (var i = 0; i < registerQueue.length; i++)
	              loader.reduceRegister_(load, registerQueue[i]);
	            registerQueue = [];
	          }

	          cleanup();

	          // if nothing registered, then something went wrong
	          if (!load.metadata.entry && !load.metadata.bundle)
	            reject(new Error(load.name + ' did not call System.register or AMD define. If loading a global module configure the global name via the meta exports property for script injection support.'));

	          resolve('');
	        }

	        function error(evt) {
	          cleanup();
	          reject(new Error('Unable to load script ' + load.address));
	        }

	        function cleanup() {
	          __global.System = curSystem;
	          __global.require = curRequire;

	          if (s.detachEvent) {
	            s.detachEvent('onreadystatechange', complete);
	            for (var i = 0; i < interactiveLoadingScripts.length; i++)
	              if (interactiveLoadingScripts[i].script == s) {
	                if (interactiveScript && interactiveScript.script == s)
	                  interactiveScript = null;
	                interactiveLoadingScripts.splice(i, 1);
	              }
	          }
	          else {
	            s.removeEventListener('load', complete, false);
	            s.removeEventListener('error', error, false);
	          }

	          head.removeChild(s);
	        }
	      });
	    };
	  });
	})();
	/*
	 * Instantiate registry extension
	 *
	 * Supports Traceur System.register 'instantiate' output for loading ES6 as ES5.
	 *
	 * - Creates the loader.register function
	 * - Also supports metadata.format = 'register' in instantiate for anonymous register modules
	 * - Also supports metadata.deps, metadata.execute and metadata.executingRequire
	 *     for handling dynamic modules alongside register-transformed ES6 modules
	 *
	 *
	 * The code here replicates the ES6 linking groups algorithm to ensure that
	 * circular ES6 compiled into System.register can work alongside circular AMD 
	 * and CommonJS, identically to the actual ES6 loader.
	 *
	 */


	/*
	 * Registry side table entries in loader.defined
	 * Registry Entry Contains:
	 *    - name
	 *    - deps 
	 *    - declare for declarative modules
	 *    - execute for dynamic modules, different to declarative execute on module
	 *    - executingRequire indicates require drives execution for circularity of dynamic modules
	 *    - declarative optional boolean indicating which of the above
	 *
	 * Can preload modules directly on SystemJS.defined['my/module'] = { deps, execute, executingRequire }
	 *
	 * Then the entry gets populated with derived information during processing:
	 *    - normalizedDeps derived from deps, created in instantiate
	 *    - groupIndex used by group linking algorithm
	 *    - evaluated indicating whether evaluation has happend
	 *    - module the module record object, containing:
	 *      - exports actual module exports
	 *
	 *    For dynamic we track the es module with:
	 *    - esModule actual es module value
	 *    - esmExports whether to extend the esModule with named exports
	 *      
	 *    Then for declarative only we track dynamic bindings with the 'module' records:
	 *      - name
	 *      - exports
	 *      - setters declarative setter functions
	 *      - dependencies, module records of dependencies
	 *      - importers, module records of dependents
	 *
	 * After linked and evaluated, entries are removed, declarative module records remain in separate
	 * module binding table
	 *
	 */

	var leadingCommentAndMetaRegEx = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/;
	function detectRegisterFormat(source) {
	  var leadingCommentAndMeta = source.match(leadingCommentAndMetaRegEx);
	  return leadingCommentAndMeta && source.substr(leadingCommentAndMeta[0].length, 15) == 'System.register';
	}

	function createEntry() {
	  return {
	    name: null,
	    deps: null,
	    originalIndices: null,
	    declare: null,
	    execute: null,
	    executingRequire: false,
	    declarative: false,
	    normalizedDeps: null,
	    groupIndex: null,
	    evaluated: false,
	    module: null,
	    esModule: null,
	    esmExports: false
	  };
	}

	(function() {

	  /*
	   * There are two variations of System.register:
	   * 1. System.register for ES6 conversion (2-3 params) - System.register([name, ]deps, declare)
	   *    see https://github.com/ModuleLoader/es6-module-loader/wiki/System.register-Explained
	   *
	   * 2. System.registerDynamic for dynamic modules (3-4 params) - System.registerDynamic([name, ]deps, executingRequire, execute)
	   * the true or false statement 
	   *
	   * this extension implements the linking algorithm for the two variations identical to the spec
	   * allowing compiled ES6 circular references to work alongside AMD and CJS circular references.
	   *
	   */
	  SystemJSLoader.prototype.register = function(name, deps, declare) {
	    if (typeof name != 'string') {
	      declare = deps;
	      deps = name;
	      name = null;
	    }

	    // dynamic backwards-compatibility
	    // can be deprecated eventually
	    if (typeof declare == 'boolean')
	      return this.registerDynamic.apply(this, arguments);

	    var entry = createEntry();
	    // ideally wouldn't apply map config to bundle names but 
	    // dependencies go through map regardless so we can't restrict
	    // could reconsider in shift to new spec
	    entry.name = name && (this.decanonicalize || this.normalize).call(this, name);
	    entry.declarative = true;
	    entry.deps = deps;
	    entry.declare = declare;

	    this.pushRegister_({
	      amd: false,
	      entry: entry
	    });
	  };
	  SystemJSLoader.prototype.registerDynamic = function(name, deps, declare, execute) {
	    if (typeof name != 'string') {
	      execute = declare;
	      declare = deps;
	      deps = name;
	      name = null;
	    }

	    // dynamic
	    var entry = createEntry();
	    entry.name = name && (this.decanonicalize || this.normalize).call(this, name);
	    entry.deps = deps;
	    entry.execute = execute;
	    entry.executingRequire = declare;

	    this.pushRegister_({
	      amd: false,
	      entry: entry
	    });
	  };
	  hook('reduceRegister_', function() {
	    return function(load, register) {
	      if (!register)
	        return;

	      var entry = register.entry;
	      var curMeta = load && load.metadata;

	      // named register
	      if (entry.name) {
	        if (!(entry.name in this.defined))
	          this.defined[entry.name] = entry;

	        if (curMeta)
	          curMeta.bundle = true;
	      }
	      // anonymous register
	      if (!entry.name || load && entry.name == load.name) {
	        if (!curMeta)
	          throw new TypeError('Invalid System.register call. Anonymous System.register calls can only be made by modules loaded by SystemJS.import and not via script tags.');
	        if (curMeta.entry) {
	          if (curMeta.format == 'register')
	            throw new Error('Multiple anonymous System.register calls in module ' + load.name + '. If loading a bundle, ensure all the System.register calls are named.');
	          else
	            throw new Error('Module ' + load.name + ' interpreted as ' + curMeta.format + ' module format, but called System.register.');
	        }
	        if (!curMeta.format)
	          curMeta.format = 'register';
	        curMeta.entry = entry;
	      }
	    };
	  });

	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);

	      this.defined = {};
	      this._loader.moduleRecords = {};
	    };
	  });

	  function buildGroups(entry, loader, groups) {
	    groups[entry.groupIndex] = groups[entry.groupIndex] || [];

	    if (indexOf.call(groups[entry.groupIndex], entry) != -1)
	      return;

	    groups[entry.groupIndex].push(entry);

	    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	      var depName = entry.normalizedDeps[i];
	      var depEntry = loader.defined[depName];
	      
	      // not in the registry means already linked / ES6
	      if (!depEntry || depEntry.evaluated)
	        continue;
	      
	      // now we know the entry is in our unlinked linkage group
	      var depGroupIndex = entry.groupIndex + (depEntry.declarative != entry.declarative);

	      // the group index of an entry is always the maximum
	      if (depEntry.groupIndex === null || depEntry.groupIndex < depGroupIndex) {
	        
	        // if already in a group, remove from the old group
	        if (depEntry.groupIndex !== null) {
	          groups[depEntry.groupIndex].splice(indexOf.call(groups[depEntry.groupIndex], depEntry), 1);

	          // if the old group is empty, then we have a mixed depndency cycle
	          if (groups[depEntry.groupIndex].length == 0)
	            throw new Error("Mixed dependency cycle detected");
	        }

	        depEntry.groupIndex = depGroupIndex;
	      }

	      buildGroups(depEntry, loader, groups);
	    }
	  }

	  function link(name, loader) {
	    var startEntry = loader.defined[name];

	    // skip if already linked
	    if (startEntry.module)
	      return;

	    startEntry.groupIndex = 0;

	    var groups = [];

	    buildGroups(startEntry, loader, groups);

	    var curGroupDeclarative = !!startEntry.declarative == groups.length % 2;
	    for (var i = groups.length - 1; i >= 0; i--) {
	      var group = groups[i];
	      for (var j = 0; j < group.length; j++) {
	        var entry = group[j];

	        // link each group
	        if (curGroupDeclarative)
	          linkDeclarativeModule(entry, loader);
	        else
	          linkDynamicModule(entry, loader);
	      }
	      curGroupDeclarative = !curGroupDeclarative; 
	    }
	  }

	  // module binding records
	  function ModuleRecord() {}
	  defineProperty(ModuleRecord, 'toString', {
	    value: function() {
	      return 'Module';
	    }
	  });

	  function getOrCreateModuleRecord(name, moduleRecords) {
	    return moduleRecords[name] || (moduleRecords[name] = {
	      name: name,
	      dependencies: [],
	      exports: new ModuleRecord(), // start from an empty module and extend
	      importers: []
	    });
	  }

	  function linkDeclarativeModule(entry, loader) {
	    // only link if already not already started linking (stops at circular)
	    if (entry.module)
	      return;

	    var moduleRecords = loader._loader.moduleRecords;
	    var module = entry.module = getOrCreateModuleRecord(entry.name, moduleRecords);
	    var exports = entry.module.exports;

	    var declaration = entry.declare.call(__global, function(name, value) {
	      module.locked = true;

	      if (typeof name == 'object') {
	        for (var p in name)
	          exports[p] = name[p];
	      }
	      else {
	        exports[name] = value;
	      }

	      for (var i = 0, l = module.importers.length; i < l; i++) {
	        var importerModule = module.importers[i];
	        if (!importerModule.locked) {
	          var importerIndex = indexOf.call(importerModule.dependencies, module);
	          importerModule.setters[importerIndex](exports);
	        }
	      }

	      module.locked = false;
	      return value;
	    }, { id: entry.name });
	    
	    module.setters = declaration.setters;
	    module.execute = declaration.execute;

	    if (!module.setters || !module.execute) {
	      throw new TypeError('Invalid System.register form for ' + entry.name);
	    }

	    // now link all the module dependencies
	    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	      var depName = entry.normalizedDeps[i];
	      var depEntry = loader.defined[depName];
	      var depModule = moduleRecords[depName];

	      // work out how to set depExports based on scenarios...
	      var depExports;

	      if (depModule) {
	        depExports = depModule.exports;
	      }
	      // dynamic, already linked in our registry
	      else if (depEntry && !depEntry.declarative) {
	        depExports = depEntry.esModule;
	      }
	      // in the loader registry
	      else if (!depEntry) {
	        depExports = loader.get(depName);
	      }
	      // we have an entry -> link
	      else {
	        linkDeclarativeModule(depEntry, loader);
	        depModule = depEntry.module;
	        depExports = depModule.exports;
	      }

	      // only declarative modules have dynamic bindings
	      if (depModule && depModule.importers) {
	        depModule.importers.push(module);
	        module.dependencies.push(depModule);
	      }
	      else {
	        module.dependencies.push(null);
	      }
	      
	      // run setters for all entries with the matching dependency name
	      var originalIndices = entry.originalIndices[i];
	      for (var j = 0, len = originalIndices.length; j < len; ++j) {
	        var index = originalIndices[j];
	        if (module.setters[index]) {
	          module.setters[index](depExports);
	        }
	      }
	    }
	  }

	  // An analog to loader.get covering execution of all three layers (real declarative, simulated declarative, simulated dynamic)
	  function getModule(name, loader) {
	    var exports;
	    var entry = loader.defined[name];

	    if (!entry) {
	      exports = loader.get(name);
	      if (!exports)
	        throw new Error('Unable to load dependency ' + name + '.');
	    }

	    else {
	      if (entry.declarative)
	        ensureEvaluated(name, [], loader);
	    
	      else if (!entry.evaluated)
	        linkDynamicModule(entry, loader);

	      exports = entry.module.exports;
	    }

	    if ((!entry || entry.declarative) && exports && exports.__useDefault)
	      return exports['default'];
	    
	    return exports;
	  }

	  function linkDynamicModule(entry, loader) {
	    if (entry.module)
	      return;

	    var exports = {};

	    var module = entry.module = { exports: exports, id: entry.name };

	    // AMD requires execute the tree first
	    if (!entry.executingRequire) {
	      for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	        var depName = entry.normalizedDeps[i];
	        // we know we only need to link dynamic due to linking algorithm
	        var depEntry = loader.defined[depName];
	        if (depEntry)
	          linkDynamicModule(depEntry, loader);
	      }
	    }

	    // now execute
	    entry.evaluated = true;
	    var output = entry.execute.call(__global, function(name) {
	      for (var i = 0, l = entry.deps.length; i < l; i++) {
	        if (entry.deps[i] != name)
	          continue;
	        return getModule(entry.normalizedDeps[i], loader);
	      }
	      // try and normalize the dependency to see if we have another form
	      var nameNormalized = loader.normalizeSync(name, entry.name);
	      if (indexOf.call(entry.normalizedDeps, nameNormalized) != -1)
	        return getModule(nameNormalized, loader);

	      throw new Error('Module ' + name + ' not declared as a dependency of ' + entry.name);
	    }, exports, module);
	    
	    if (output)
	      module.exports = output;

	    // create the esModule object, which allows ES6 named imports of dynamics
	    exports = module.exports;

	    // __esModule flag treats as already-named
	    if (exports && (exports.__esModule || exports instanceof Module))
	      entry.esModule = exports;
	    // set module as 'default' export, then fake named exports by iterating properties
	    else if (entry.esmExports && exports !== __global)
	      entry.esModule = getESModule(exports);
	    // just use the 'default' export
	    else
	      entry.esModule = { 'default': exports };
	  }

	  /*
	   * Given a module, and the list of modules for this current branch,
	   *  ensure that each of the dependencies of this module is evaluated
	   *  (unless one is a circular dependency already in the list of seen
	   *  modules, in which case we execute it)
	   *
	   * Then we evaluate the module itself depth-first left to right 
	   * execution to match ES6 modules
	   */
	  function ensureEvaluated(moduleName, seen, loader) {
	    var entry = loader.defined[moduleName];

	    // if already seen, that means it's an already-evaluated non circular dependency
	    if (!entry || entry.evaluated || !entry.declarative)
	      return;

	    // this only applies to declarative modules which late-execute

	    seen.push(moduleName);

	    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	      var depName = entry.normalizedDeps[i];
	      if (indexOf.call(seen, depName) == -1) {
	        if (!loader.defined[depName])
	          loader.get(depName);
	        else
	          ensureEvaluated(depName, seen, loader);
	      }
	    }

	    if (entry.evaluated)
	      return;

	    entry.evaluated = true;
	    entry.module.execute.call(__global);
	  }

	  // override the delete method to also clear the register caches
	  hook('delete', function(del) {
	    return function(name) {
	      delete this._loader.moduleRecords[name];
	      delete this.defined[name];
	      return del.call(this, name);
	    };
	  });

	  hook('fetch', function(fetch) {
	    return function(load) {
	      if (this.defined[load.name]) {
	        load.metadata.format = 'defined';
	        return '';
	      }

	      load.metadata.deps = load.metadata.deps || [];
	      
	      return fetch.call(this, load);
	    };
	  });

	  hook('translate', function(translate) {
	    // we run the meta detection here (register is after meta)
	    return function(load) {
	      load.metadata.deps = load.metadata.deps || [];
	      return Promise.resolve(translate.call(this, load)).then(function(source) {
	        // run detection for register format
	        if (load.metadata.format == 'register' || !load.metadata.format && detectRegisterFormat(load.source))
	          load.metadata.format = 'register';
	        return source;
	      });
	    };
	  });

	  hook('instantiate', function(instantiate) {
	    return function(load) {
	      if (load.metadata.format == 'detect')
	        load.metadata.format = undefined;

	      // assumes previous instantiate is sync
	      // (core json support)
	      instantiate.call(this, load);

	      var loader = this;

	      var entry;

	      // first we check if this module has already been defined in the registry
	      if (loader.defined[load.name]) {
	        entry = loader.defined[load.name];
	        // don't support deps for ES modules
	        if (!entry.declarative)
	          entry.deps = entry.deps.concat(load.metadata.deps);
	      }

	      // picked up already by an anonymous System.register script injection
	      // or via the dynamic formats
	      else if (load.metadata.entry) {
	        entry = load.metadata.entry;
	        entry.deps = entry.deps.concat(load.metadata.deps);
	      }

	      // Contains System.register calls
	      // (dont run bundles in the builder)
	      else if (!(loader.builder && load.metadata.bundle) 
	          && (load.metadata.format == 'register' || load.metadata.format == 'esm' || load.metadata.format == 'es6')) {
	        
	        if (typeof __exec != 'undefined')
	          __exec.call(loader, load);

	        if (!load.metadata.entry && !load.metadata.bundle)
	          throw new Error(load.name + ' detected as ' + load.metadata.format + ' but didn\'t execute.');

	        entry = load.metadata.entry;

	        // support metadata deps for System.register
	        if (entry && load.metadata.deps)
	          entry.deps = entry.deps.concat(load.metadata.deps);
	      }

	      // named bundles are just an empty module
	      if (!entry) {
	        entry = createEntry();
	        entry.deps = load.metadata.deps;
	        entry.execute = function() {};
	      }

	      // place this module onto defined for circular references
	      loader.defined[load.name] = entry;
	      
	      var grouped = group(entry.deps);
	      
	      entry.deps = grouped.names;
	      entry.originalIndices = grouped.indices;
	      entry.name = load.name;
	      entry.esmExports = load.metadata.esmExports !== false;

	      // first, normalize all dependencies
	      var normalizePromises = [];
	      for (var i = 0, l = entry.deps.length; i < l; i++)
	        normalizePromises.push(Promise.resolve(loader.normalize(entry.deps[i], load.name)));

	      return Promise.all(normalizePromises).then(function(normalizedDeps) {

	        entry.normalizedDeps = normalizedDeps;

	        return {
	          deps: entry.deps,
	          execute: function() {
	            // recursively ensure that the module and all its 
	            // dependencies are linked (with dependency group handling)
	            link(load.name, loader);

	            // now handle dependency execution in correct order
	            ensureEvaluated(load.name, [], loader);

	            // remove from the registry
	            loader.defined[load.name] = undefined;

	            // return the defined module object
	            return loader.newModule(entry.declarative ? entry.module.exports : entry.esModule);
	          }
	        };
	      });
	    };
	  });
	})();
	/*
	  System bundles

	  Allows a bundle module to be specified which will be dynamically 
	  loaded before trying to load a given module.

	  For example:
	  SystemJS.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']

	  Will result in a load to "mybundle" whenever a load to "jquery"
	  or "bootstrap/js/bootstrap" is made.

	  In this way, the bundle becomes the request that provides the module
	*/

	(function() {
	  // bundles support (just like RequireJS)
	  // bundle name is module name of bundle itself
	  // bundle is array of modules defined by the bundle
	  // when a module in the bundle is requested, the bundle is loaded instead
	  // of the form SystemJS.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']
	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);
	      this.bundles = {};
	      this._loader.loadedBundles = {};
	    };
	  });

	  // assign bundle metadata for bundle loads
	  hook('locate', function(locate) {
	    return function(load) {
	      var loader = this;
	      var matched = false;

	      if (!(load.name in loader.defined))
	        for (var b in loader.bundles) {
	          for (var i = 0; i < loader.bundles[b].length; i++) {
	            var curModule = loader.bundles[b][i];

	            if (curModule == load.name) {
	              matched = true;
	              break;
	            }

	            // wildcard in bundles does not include / boundaries
	            if (curModule.indexOf('*') != -1) {
	              var parts = curModule.split('*');
	              if (parts.length != 2) {
	                loader.bundles[b].splice(i--, 1);
	                continue;
	              }
	              
	              if (load.name.substring(0, parts[0].length) == parts[0] &&
	                  load.name.substr(load.name.length - parts[1].length, parts[1].length) == parts[1] &&
	                  load.name.substr(parts[0].length, load.name.length - parts[1].length - parts[0].length).indexOf('/') == -1) {
	                matched = true;
	                break;
	              }
	            }
	          }

	          if (matched)
	            return loader['import'](b)
	            .then(function() {
	              return locate.call(loader, load);
	            });
	        }

	      return locate.call(loader, load);
	    };
	  });
	})();
	/*
	 * Script-only addition used for production loader
	 *
	 */
	hookConstructor(function(constructor) {
	  return function() {
	    constructor.apply(this, arguments);
	    __global.define = this.amdDefine;
	  };
	});

	hook('fetch', function(fetch) {
	  return function(load) {
	    load.metadata.scriptLoad = true;
	    return fetch.call(this, load);
	  };
	});System = new SystemJSLoader();

	__global.SystemJS = System;
	System.version = '0.19.27 Register Only';
	  // -- exporting --

	  if (true)
	    module.exports = Loader;

	  __global.Reflect = __global.Reflect || {};
	  __global.Reflect.Loader = __global.Reflect.Loader || Loader;
	  __global.Reflect.global = __global.Reflect.global || __global;
	  __global.LoaderPolyfill = Loader;

	  if (!System) {
	    System = new SystemLoader();
	    System.constructor = SystemLoader;
	  }

	  if (true)
	    module.exports = System;

	  __global.System = System;

	})(typeof self != 'undefined' ? self : global);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1)))

/***/ }
/******/ ]);