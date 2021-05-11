/*!
 * lokalo v0.0.1
 * (c) Blujedis LLC blujedicorp@gmail.com
 * Released under the MIT License.
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Lokalo = {}));
}(this, (function (exports) { 'use strict';

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

    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
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
            return __spreadArray([_tokens.join(' ')], __read(_styles));
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
        var segments = __spreadArray(__spreadArray([], __read(parent.split('.'))), [ns]);
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
        namespace: 'lokalo',
        level: 'error',
        uid: function () { return Date.now(); },
        type: 'local',
        maxLines: 3,
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
            console.groupCollapsed.apply(console, __spreadArray([], __read(groupLabel)));
            console.log(payload);
            console.groupEnd();
        };
        /**
         * Writes the payload to storage by namespace.
         *
         * @param payload the payload to be written.
         */
        LokaloStore.prototype.writePayload = function (payload) {
            var rows = __spreadArray(__spreadArray([], __read(this.getNamespace())), [payload]);
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
                rows = __spreadArray(__spreadArray([], __read(this.queue)), __read(rows));
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

    var isObj$1 = value => {
    	const type = typeof value;
    	return value !== null && (type === 'object' || type === 'function');
    };

    const isObj = isObj$1;

    const disallowedKeys = new Set([
    	'__proto__',
    	'prototype',
    	'constructor'
    ]);

    const isValidPath = pathSegments => !pathSegments.some(segment => disallowedKeys.has(segment));

    function getPathSegments(path) {
    	const pathArray = path.split('.');
    	const parts = [];

    	for (let i = 0; i < pathArray.length; i++) {
    		let p = pathArray[i];

    		while (p[p.length - 1] === '\\' && pathArray[i + 1] !== undefined) {
    			p = p.slice(0, -1) + '.';
    			p += pathArray[++i];
    		}

    		parts.push(p);
    	}

    	if (!isValidPath(parts)) {
    		return [];
    	}

    	return parts;
    }

    var dotProp = {
    	get(object, path, value) {
    		if (!isObj(object) || typeof path !== 'string') {
    			return value === undefined ? object : value;
    		}

    		const pathArray = getPathSegments(path);
    		if (pathArray.length === 0) {
    			return;
    		}

    		for (let i = 0; i < pathArray.length; i++) {
    			object = object[pathArray[i]];

    			if (object === undefined || object === null) {
    				// `object` is either `undefined` or `null` so we want to stop the loop, and
    				// if this is not the last bit of the path, and
    				// if it did't return `undefined`
    				// it would return `null` if `object` is `null`
    				// but we want `get({foo: null}, 'foo.bar')` to equal `undefined`, or the supplied value, not `null`
    				if (i !== pathArray.length - 1) {
    					return value;
    				}

    				break;
    			}
    		}

    		return object === undefined ? value : object;
    	},

    	set(object, path, value) {
    		if (!isObj(object) || typeof path !== 'string') {
    			return object;
    		}

    		const root = object;
    		const pathArray = getPathSegments(path);

    		for (let i = 0; i < pathArray.length; i++) {
    			const p = pathArray[i];

    			if (!isObj(object[p])) {
    				object[p] = {};
    			}

    			if (i === pathArray.length - 1) {
    				object[p] = value;
    			}

    			object = object[p];
    		}

    		return root;
    	},

    	delete(object, path) {
    		if (!isObj(object) || typeof path !== 'string') {
    			return false;
    		}

    		const pathArray = getPathSegments(path);

    		for (let i = 0; i < pathArray.length; i++) {
    			const p = pathArray[i];

    			if (i === pathArray.length - 1) {
    				delete object[p];
    				return true;
    			}

    			object = object[p];

    			if (!isObj(object)) {
    				return false;
    			}
    		}
    	},

    	has(object, path) {
    		if (!isObj(object) || typeof path !== 'string') {
    			return false;
    		}

    		const pathArray = getPathSegments(path);
    		if (pathArray.length === 0) {
    			return false;
    		}

    		// eslint-disable-next-line unicorn/no-for-loop
    		for (let i = 0; i < pathArray.length; i++) {
    			if (isObj(object)) {
    				if (!(pathArray[i] in object)) {
    					return false;
    				}

    				object = object[pathArray[i]];
    			} else {
    				return false;
    			}
    		}

    		return true;
    	}
    };

    var Lokalo = /** @class */ (function (_super) {
        __extends(Lokalo, _super);
        function Lokalo(options) {
            var _this = _super.call(this, typeof options === 'string' ? { namespace: options } : options) || this;
            _this.loggers = new Set();
            _this.loggers.add(_this);
            return _this;
        }
        Lokalo.prototype.clearAll = function () {
            var loggers = __spreadArray([], __read(this.loggers.values()));
            loggers.forEach(function (logger) { return logger.clear(); });
        };
        /**
         * Creates single object from all loggers/namespaces.
         */
        Lokalo.prototype.toObject = function () {
            var obj = {};
            __spreadArray([], __read(this.loggers.values())).forEach(function (logger) {
                var namespace = logger.namespace;
                var rows = logger.rows();
                dotProp.set(obj, namespace, rows);
            });
            return obj;
        };
        return Lokalo;
    }(LokaloLogger));
    var defaultInstance = new Lokalo({ namespace: 'lokalo' });

    exports.DEFAULTS = DEFAULTS;
    exports.LOG_LEVELS = LOG_LEVELS;
    exports.Lokalo = Lokalo;
    exports.STYLES = STYLES;
    exports.default = defaultInstance;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
