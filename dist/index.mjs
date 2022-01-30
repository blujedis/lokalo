/*!
 * lokalo v0.0.2
 * (c) Blujedis LLC blujedicorp@gmail.com
 * Released under the MIT License.
 */

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/**
 * Creates instance of simple formatter.
 */
function formatter(styles) {
    var _tokens = [];
    var _styles = [];
    var api = {
        tokens: _tokens,
        styles: _styles,
        add: add,
        unstyled: unstyled,
        toString: toString
    };
    /**
     * Adds a styled value to tokens to be formatted.
     *
     * @param style the style to be applied.
     * @param label the value to apply style to.
     */
    function add(style, label) {
        _tokens.push("%c" + label);
        _styles.push(styles[style]);
        return api;
    }
    /**
     * Add unstyled value.
     *
     * @param label the value to be unstyled.
     */
    function unstyled(label) {
        return add('inherit', label);
    }
    /**
     * Converts tokens and values to styled result for logging.
     */
    function toString() {
        return __spreadArray([_tokens.join(' ')], __read(_styles), false);
    }
    return api;
}
/**
 * Gets a timestamp.
 *
 * @param date optional date.
 */
function getTimestamp(date) {
    if (date === void 0) { date = Date.now(); }
    return (new Date(date)).toISOString();
}
/**
 * Normalizes a namespace.
 *
 * @param ns the namespace to format.
 * @param parent the parent to be prefixed.
 */
function formatNamespace(ns, parent) {
    var segments = __spreadArray(__spreadArray([], __read(parent.split('.')), false), [ns], false);
    return segments.join('.');
}
/**
 * Converts an error to object literal.
 *
 * @param err the error to convert to object
 */
function serializeError(err) {
    if (!(err instanceof Error))
        return err;
    var result = Object.getOwnPropertyNames(err).reduce(function (a, c) {
        a[c] = err[c];
        return a;
    }, {});
    if (err.name && !result.name)
        result.name = err.name;
    return result;
}
/**
 * Generate UUID v4.
 */
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

var LOG_LEVELS = ['log', 'fatal', 'error', 'warn', 'info', 'debug'];
var STYLES = {
    inherit: 'color: inherit',
    dim: 'color: #666',
    log: 'color: lightslategray',
    fatal: 'color: red',
    error: 'color: firebrick',
    warn: 'color: gold',
    info: 'color: deepskyblue',
    debug: 'color: magenta'
};
var DEFAULTS = {
    namespace: 'default',
    level: 'error',
    uid: function () { return uuidv4(); },
    type: 'local',
    maxLines: 50,
    displayOutput: true,
    styles: __assign({}, STYLES)
};

var LokaloStore = /** @class */ (function () {
    function LokaloStore(options) {
        this.store = localStorage;
        this.queue = [];
        this.namespace = options.parent ? formatNamespace(options.namespace, options.parent) : options.namespace;
        this.store = options.type === 'local' ? localStorage : sessionStorage;
        this.options = options;
    }
    /**
     * Gets namespaced value by key.
     *
     */
    LokaloStore.prototype.getNamespace = function () {
        var obj = this.store.getItem(this.namespace);
        return obj && obj.length ? JSON.parse(obj) : [];
    };
    /**
     * Sets a namespace's value.
     *
     * @param data the value to set to the namespace.
     */
    LokaloStore.prototype.setNamespace = function (data) {
        if (!data)
            return;
        if (!Array.isArray(data))
            data = [data];
        var str = JSON.stringify(data);
        this.store.setItem(this.namespace, str);
    };
    /**
     * Removes from storage by namespace.
     */
    LokaloStore.prototype.removeNamespace = function () {
        this.clearQueue();
        this.store.removeItem(this.namespace);
    };
    /**
     * Checks the maximum lines size.
     */
    LokaloStore.prototype.checkMaxLines = function () {
        if (!this.options.maxLines)
            return;
        var count = this.size();
        if (count === this.options.maxLines) {
            this.remove();
        }
        else if (count > this.options.maxLines) {
            var adj = count - this.options.maxLines;
            this.remove(adj);
        }
    };
    /**
     * Queues the payload.
     *
     * @param payload the payload to be queued.
     */
    LokaloStore.prototype.queuePayload = function (payload) {
        var _a, _b;
        this.queue.push(payload);
        this.resetQueue();
        if (!this.options.displayOutput)
            return;
        var tsKey = (_b = (_a = getTimestamp().split('T')) === null || _a === void 0 ? void 0 : _a.pop()) === null || _b === void 0 ? void 0 : _b.slice(0, -1).trim(); // time only.
        var truncMessage = payload.message.slice(0, 20);
        var groupLabel = formatter(this.options.styles)
            .add(payload.level, tsKey)
            .unstyled(this.namespace)
            .unstyled('-')
            .add('dim', truncMessage)
            .toString();
        console.groupCollapsed.apply(console, __spreadArray([], __read(groupLabel), false));
        console.log(payload);
        console.groupEnd();
    };
    /**
     * Writes the payload to storage by namespace.
     *
     * @param payload the payload to be written.
     */
    LokaloStore.prototype.writePayload = function (payload) {
        var rows = __spreadArray(__spreadArray([], __read(this.getNamespace()), false), [payload], false);
        this.setNamespace(rows);
    };
    /**
    * Mutes the output to console only logs.
    */
    LokaloStore.prototype.mute = function () {
        this.options.displayOutput = false;
    };
    /**
    * Unmutes the output to console and displays in console.
    */
    LokaloStore.prototype.unmute = function () {
        this.options.displayOutput = true;
    };
    /**
     * Deletes rows for the given namespace.
     *
     * @param count the number of rows to delete if not 1.
     */
    LokaloStore.prototype.remove = function (count) {
        if (count === void 0) { count = 1; }
        var rows = this.getNamespace();
        rows = rows.sort(function (a, b) {
            if (a.timestamp > b.timestamp)
                return 1;
            else if (a.timestamp < b.timestamp)
                return -1;
            else
                return 0;
        }).slice(count);
        this.setNamespace(rows);
    };
    /**
     * Gets the number of rows for a namespace.
     */
    LokaloStore.prototype.size = function () {
        return this.getNamespace().length;
    };
    /**
     * Returns rows for the active namespace.
     *
     * @param limit value used to limit returned rows.
     */
    LokaloStore.prototype.rows = function (limit) {
        if (limit === void 0) { limit = 0; }
        var rows = this.getNamespace().reverse();
        if (this.queue.length)
            rows = __spreadArray(__spreadArray([], __read(this.queue), false), __read(rows), false);
        if (limit)
            rows = rows.slice(0, limit);
        return rows;
    };
    /**
     * Clears the current namespace.
     */
    LokaloStore.prototype.clear = function () {
        return this.removeNamespace();
    };
    /**
     * Purges lines from the logger.
     *
     * @param lines the number of lines to purge.
     */
    LokaloStore.prototype.purge = function (lines) {
        if (lines === void 0) { lines = 1; }
        return this.remove(lines);
    };
    /**
    * Clears the log queue.
    */
    LokaloStore.prototype.clearQueue = function () {
        if (this.queueId)
            clearInterval(this.queueId);
        this.queue = [];
    };
    /**
     * Resets queue timer but leaves queue payloads.
     */
    LokaloStore.prototype.resetQueue = function () {
        clearInterval(this.queueId);
        this.startQueue();
    };
    /**
     * Starts the log queue.
     */
    LokaloStore.prototype.startQueue = function () {
        var _this = this;
        this.queueId = setInterval(function () {
            var payload = _this.queue.shift();
            if (payload)
                _this.writePayload(payload);
            if (!_this.queue.length)
                _this.clearQueue();
        }, 100);
    };
    return LokaloStore;
}());

var LokaloLogger = /** @class */ (function (_super) {
    __extends(LokaloLogger, _super);
    function LokaloLogger(options, parent) {
        var _this = _super.call(this, __assign(__assign(__assign({}, DEFAULTS), { parent: '' }), options)) || this;
        _this.parent = parent;
        _this.options = __assign(__assign({}, DEFAULTS), options);
        _this.checkMaxLines();
        return _this;
    }
    LokaloLogger.prototype._logger = function (level, payload) {
        // We don't want to log empty lines in local storage.
        if (typeof level === 'undefined')
            return this;
        if (!payload) {
            payload = level;
            level = '';
        }
        level = level || 'log';
        if (!this.isActiveLevel(this.level))
            return this;
        if (typeof payload === 'string')
            payload = { message: payload };
        else if (payload instanceof Error)
            payload = serializeError(payload);
        this.checkMaxLines();
        var _payload = payload;
        _payload.id = this.options.uid();
        _payload.namespace = this.namespace;
        _payload.timestamp = getTimestamp();
        _payload.message = _payload.message || '';
        _payload.level = level;
        // Add to the queue.
        this.queuePayload(_payload);
        return this;
    };
    Object.defineProperty(LokaloLogger.prototype, "level", {
        get: function () {
            return this.options.level;
        },
        enumerable: false,
        configurable: true
    });
    LokaloLogger.prototype.setOption = function (keyOrOptions, value) {
        if (arguments.length === 2) {
            var key = keyOrOptions;
            this.options[key] = value;
        }
        else {
            this.options = __assign(__assign({}, this.options), keyOrOptions);
        }
    };
    /**
     * Checks if a level is active.
     *
     * @param level the level to inspect as active.
     */
    LokaloLogger.prototype.isActiveLevel = function (level) {
        if (level === 'log')
            return true;
        var curIndex = LOG_LEVELS.indexOf(level);
        var loggerIndex = LOG_LEVELS.indexOf(this.level);
        return curIndex <= loggerIndex;
    };
    /**
      * Logs a payload by default level.
      *
      * @param payload the payload to be logged.
      */
    LokaloLogger.prototype.log = function (payload) { return this._logger('log', payload); };
    /**
     * Logs a payload by fatal log level.
     *
     * @param payload the payload to be logged.
     */
    LokaloLogger.prototype.fatal = function (payload) { this._logger('fatal', payload); };
    /**
     * Logs a payload by error log level.
     *
     * @param payload the payload to be logged.
     */
    LokaloLogger.prototype.error = function (payload) { this._logger('error', payload); };
    /**
     * Logs a payload by warn log level.
     *
     * @param payload the payload to be logged.
     */
    LokaloLogger.prototype.warn = function (payload) { this._logger('warn', payload); };
    /**
     * Logs a payload by info log level.
     *
     * @param payload the payload to be logged.
     */
    LokaloLogger.prototype.info = function (payload) { this._logger('info', payload); };
    /**
     * Logs a payload by debug log level.
     *
     * @param payload the payload to be logged.
     */
    LokaloLogger.prototype.debug = function (payload) { this._logger('debug', payload); };
    /**
     * Creates a child logger instance.
     *
     * @example
     * import defLogger from './path/to/logger'
     * const logger = defLogger.child('your.namespace');
     *
     * @param namespace the namspace of the child to create.
     */
    LokaloLogger.prototype.child = function (namespace) {
        return new LokaloLogger(__assign(__assign({}, this.options), { parent: this.namespace, namespace: namespace }), this);
    };
    return LokaloLogger;
}(LokaloStore));

const isObject = value => {
	const type = typeof value;
	return value !== null && (type === 'object' || type === 'function');
};

const disallowedKeys = new Set([
	'__proto__',
	'prototype',
	'constructor',
]);

const digits = new Set('0123456789');

function getPathSegments(path) {
	const parts = [];
	let currentSegment = '';
	let currentPart = 'start';
	let isIgnoring = false;

	for (const character of path) {
		switch (character) {
			case '\\':
				if (currentPart === 'index') {
					throw new Error('Invalid character in an index');
				}

				if (currentPart === 'indexEnd') {
					throw new Error('Invalid character after an index');
				}

				if (isIgnoring) {
					currentSegment += character;
				}

				currentPart = 'property';
				isIgnoring = !isIgnoring;
				break;

			case '.':
				if (currentPart === 'index') {
					throw new Error('Invalid character in an index');
				}

				if (currentPart === 'indexEnd') {
					currentPart = 'property';
					break;
				}

				if (isIgnoring) {
					isIgnoring = false;
					currentSegment += character;
					break;
				}

				if (disallowedKeys.has(currentSegment)) {
					return [];
				}

				parts.push(currentSegment);
				currentSegment = '';
				currentPart = 'property';
				break;

			case '[':
				if (currentPart === 'index') {
					throw new Error('Invalid character in an index');
				}

				if (currentPart === 'indexEnd') {
					currentPart = 'index';
					break;
				}

				if (isIgnoring) {
					isIgnoring = false;
					currentSegment += character;
					break;
				}

				if (currentPart === 'property') {
					if (disallowedKeys.has(currentSegment)) {
						return [];
					}

					parts.push(currentSegment);
					currentSegment = '';
				}

				currentPart = 'index';
				break;

			case ']':
				if (currentPart === 'index') {
					parts.push(Number.parseInt(currentSegment, 10));
					currentSegment = '';
					currentPart = 'indexEnd';
					break;
				}

				if (currentPart === 'indexEnd') {
					throw new Error('Invalid character after an index');
				}

				// Falls through

			default:
				if (currentPart === 'index' && !digits.has(character)) {
					throw new Error('Invalid character in an index');
				}

				if (currentPart === 'indexEnd') {
					throw new Error('Invalid character after an index');
				}

				if (currentPart === 'start') {
					currentPart = 'property';
				}

				if (isIgnoring) {
					isIgnoring = false;
					currentSegment += '\\';
				}

				currentSegment += character;
		}
	}

	if (isIgnoring) {
		currentSegment += '\\';
	}

	switch (currentPart) {
		case 'property': {
			if (disallowedKeys.has(currentSegment)) {
				return [];
			}

			parts.push(currentSegment);

			break;
		}

		case 'index': {
			throw new Error('Index was not closed');
		}

		case 'start': {
			parts.push('');

			break;
		}
	// No default
	}

	return parts;
}

function isStringIndex(object, key) {
	if (typeof key !== 'number' && Array.isArray(object)) {
		const index = Number.parseInt(key, 10);
		return Number.isInteger(index) && object[index] === object[key];
	}

	return false;
}

function assertNotStringIndex(object, key) {
	if (isStringIndex(object, key)) {
		throw new Error('Cannot use string index');
	}
}

function setProperty(object, path, value) {
	if (!isObject(object) || typeof path !== 'string') {
		return object;
	}

	const root = object;
	const pathArray = getPathSegments(path);

	for (let index = 0; index < pathArray.length; index++) {
		const key = pathArray[index];

		assertNotStringIndex(object, key);

		if (index === pathArray.length - 1) {
			object[key] = value;
		} else if (!isObject(object[key])) {
			object[key] = typeof pathArray[index + 1] === 'number' ? [] : {};
		}

		object = object[key];
	}

	return root;
}

var Lokalo = /** @class */ (function (_super) {
    __extends(Lokalo, _super);
    function Lokalo(options) {
        var _this = _super.call(this, typeof options === 'string' ? { namespace: options } : options) || this;
        _this.loggers = new Set();
        _this.loggers.add(_this);
        return _this;
    }
    Lokalo.prototype.clearAll = function () {
        var loggers = __spreadArray([], __read(this.loggers.values()), false);
        loggers.forEach(function (logger) { return logger.clear(); });
    };
    /**
     * Creates single object from all loggers/namespaces.
     */
    Lokalo.prototype.toObject = function () {
        var obj = {};
        __spreadArray([], __read(this.loggers.values()), false).forEach(function (logger) {
            var namespace = logger.namespace;
            var rows = logger.rows();
            setProperty(obj, namespace, rows);
        });
        return obj;
    };
    return Lokalo;
}(LokaloLogger));
var defaultInstance = new Lokalo({ namespace: 'lokalo' });

export { DEFAULTS, LOG_LEVELS, Lokalo, STYLES, defaultInstance as default };
//# sourceMappingURL=index.mjs.map
