/*!
 * lokalo v0.0.1
 * (c) Blujedis LLC blujedicorp@gmail.com
 * Released under the MIT License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

var ENV_LOG_LEVEL = typeof process !== 'undefined' ? process.env['REACT_APP_LOG_LEVEL'] : 'error';
var LOG_LEVELS = ['log', 'fatal', 'error', 'warn', 'info', 'debug'];
var STYLES = {
    inherit: 'color: inherit',
    dim: 'color: #666',
    log: 'color: lightslategray',
    fatal: 'color: gold; background-color: firebrick',
    error: 'color: firebrick',
    warn: 'color: gold',
    info: 'color: deepskyblue',
    debug: 'color: magenta'
};
var DEFAULTS = {
    type: 'local',
    maxLines: 10,
    key: '$uid',
    keyValue: function () { return Date.now(); },
    userKey: 'user',
    level: ENV_LOG_LEVEL,
    consoleOutput: 'development',
    styles: __assign({}, STYLES)
};

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
        return __spreadArray([_tokens.join(' ')], _styles);
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
    var segments = __spreadArray(__spreadArray([], parent.split('.')), [ns]);
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
 * Creates a new storage logger instance.
 *
 * @param options storage logger options.
 * @param namespaces currently loaded namespaces.
 */
function createStorageLogger(options, namespaces) {
    if (namespaces === void 0) { namespaces = []; }
    options = __assign(__assign({}, DEFAULTS), options);
    var store = options.type === 'local' ? localStorage : sessionStorage;
    var _a = options, parent = _a.parent, namespace = _a.namespace, maxLines = _a.maxLines, key = _a.key, keyValue = _a.keyValue, userKey = _a.userKey, initLevel = _a.level, consoleOutput = _a.consoleOutput, styles = _a.styles;
    var activeNamespace = formatNamespace(namespace, parent);
    var _queue = [];
    var _queueId;
    if (!namespaces.includes(activeNamespace))
        namespaces.push(activeNamespace);
    /**
     * Clears the log queue.
     */
    function clearQueue() {
        if (!_queueId)
            return;
        clearInterval(_queueId);
        _queue = [];
    }
    /**
     * Starts the log queue.
     */
    function startQueue() {
        _queueId = setInterval(function () {
            if (!_queue.length)
                return clearQueue();
            writePayload(activeNamespace, _queue.shift());
        }, 150);
    }
    /**
     * Gets namespaced value by key.
     *
     * @param ns the namespace to get.
     */
    function getKey(ns) {
        var obj = store.getItem(ns);
        return obj && obj.length ? JSON.parse(obj) : [];
    }
    /**
     * Gets a user from storage.
     * NOTE: always uses localStorage.
     *
     * @param key the user key for retrieving user object.
     */
    function getUser(key) {
        var user = localStorage.getItem(key);
        var item = store.getItem(key);
        if (!user || !item)
            return null;
        return JSON.parse(item);
    }
    /**
     * Sets a namespace's value.
     *
     * @param ns the names apce to be set.
     * @param data the value to set to the namespace.
     */
    function setKey(ns, data) {
        if (!data)
            return;
        if (!Array.isArray(data))
            data = [data];
        var str = JSON.stringify(data);
        store.setItem(ns, str);
    }
    function removeKey(ns) {
        store.removeItem(ns);
    }
    /**
     * Deletes rows for the given namespace.
     *
     * @param ns the namespace to delete rows for.
     * @param count the number of rows to delete if not 1.
     */
    function deleteRows(ns, count) {
        if (count === void 0) { count = 1; }
        var rows = getKey(ns);
        rows.sort(function (a, b) {
            if (a.timestamp > b.timestamp)
                return 1;
            else if (a.timestamp < b.timestamp)
                return -1;
            else
                return 0;
        }).splice(0, count);
        setKey(ns, rows);
    }
    /**
     * Gets the number of rows for a namespace.
     *
     * @param ns the namespace to get row count for.
     */
    function rowsCount(ns) {
        return getKey(ns).length;
    }
    /**
     * Gets the size of a namespace.
     *
     * @param ns the namespace to get size for.
     */
    function checkSize(ns) {
        if (!maxLines)
            return;
        var count = rowsCount(ns);
        if (count === maxLines) {
            deleteRows(ns);
        }
        else if (count > maxLines) {
            var adj = count - maxLines;
            deleteRows(ns, adj);
        }
    }
    /**
     * Checks if a level is active.
     *
     * @param level the level to inspect as active.
     */
    function isActiveLevel(level) {
        var curIndex = LOG_LEVELS.indexOf(level);
        var loggerIndex = LOG_LEVELS.indexOf(logger.level);
        return curIndex <= loggerIndex;
    }
    /**
     * Checks if should output to console as well as log to storage.
     */
    function shouldOutput() {
        return (consoleOutput === 'always' || process.env['NODE_ENV'] !== 'production');
    }
    /**
     * Writes the payload to storage by namespace.
     *
     * @param ns the namespace to be written.
     * @param payload the payload to be written.
     */
    function writePayload(ns, payload) {
        var _a;
        var rows = __spreadArray(__spreadArray([], getKey(ns)), [payload]);
        if (shouldOutput()) {
            var tsKey = (_a = getTimestamp(payload[key]).split('.').shift()) === null || _a === void 0 ? void 0 : _a.split('T').join(' ');
            var trimNs = ns.replace(/^logger\./, '');
            var truncMessage = payload.message.slice(0, 25);
            var groupLabel = formatter(styles)
                .add(payload.level, tsKey)
                .unstyled(trimNs)
                .unstyled('-')
                .add('dim', truncMessage)
                .toString();
            console.groupCollapsed.apply(console, groupLabel);
            console.log(payload);
            console.groupEnd();
        }
        setKey(ns, rows);
    }
    function logger(level, payload) {
        // We don't want to log empty lines in local storage.
        if (typeof level === 'undefined')
            return logger;
        if (!payload) {
            payload = level;
            level = '';
        }
        level = level || 'log';
        if (!isActiveLevel(logger.level))
            return logger;
        if (typeof payload === 'string')
            payload = { message: payload };
        else if (payload instanceof Error)
            payload = serializeError(payload);
        checkSize(activeNamespace);
        var _payload = payload;
        _payload[key] = keyValue();
        _payload.namespace = activeNamespace;
        _payload.timestamp = getTimestamp();
        _payload.message = _payload.message || '';
        if (userKey)
            _payload.user = getUser(userKey);
        // Add to the queue.
        _queue.push(_payload);
        if (!_queueId)
            startQueue();
        return logger;
    }
    /**
     * The current enabled log level.
     */
    logger.level = initLevel;
    /**
     * The active namespace.
     */
    logger.namespace = activeNamespace;
    /**
     * An array of logger namespaces.
     */
    logger.namespaces = namespaces;
    /**
     * Logs a payload by default level.
     *
     * @param payload the payload to be logged.
     */
    logger.log = function (payload) { return logger('log', payload); };
    /**
     * Logs a payload by fatal log level.
     *
     * @param payload the payload to be logged.
     */
    logger.fatal = function (payload) { return logger('fatal', payload); };
    /**
     * Logs a payload by error log level.
     *
     * @param payload the payload to be logged.
     */
    logger.error = function (payload) { return logger('error', payload); };
    /**
     * Logs a payload by warn log level.
     *
     * @param payload the payload to be logged.
     */
    logger.warn = function (payload) { return logger('warn', payload); };
    /**
     * Logs a payload by info log level.
     *
     * @param payload the payload to be logged.
     */
    logger.info = function (payload) { return logger('info', payload); };
    /**
     * Logs a payload by debug log level.
     *
     * @param payload the payload to be logged.
     */
    logger.debug = function (payload) { return logger('debug', payload); };
    /**
     * Creates a child logger instance.
     *
     * @example
     * import defLogger from './path/to/logger'
     * const logger = defLogger.child('your.namespace');
     *
     * @param ns the namspace of the child to create.
     */
    logger.child = function (ns) {
        var nextParent = /global$/.test(activeNamespace) ? 'logger' : activeNamespace;
        return createStorageLogger(__assign(__assign({}, options), { parent: nextParent, namespace: ns }), namespaces);
    };
    /**
     * Returns rows for the active namespace.
     *
     * @param limit value used to limit returned rows.
     */
    logger.rows = function (limit) {
        if (limit === void 0) { limit = 0; }
        var rows = getKey(activeNamespace).reverse();
        if (limit)
            rows = rows.slice(0, limit);
        return rows;
    };
    /**
     * Gets the size of the namespace by row count.
     */
    logger.size = function () { return rowsCount(activeNamespace); };
    /**
     * Clears the current namespace.
     */
    logger.clear = function () {
        removeKey(activeNamespace);
    };
    /**
     * Clears all namespaces.
     */
    logger.clearAll = function () { return namespaces.forEach(function (ns) { return removeKey(ns); }); };
    /**
     * Purges lines from the logger.
     *
     * @param lines the number of lines to purge.
     */
    logger.purge = function (lines) {
        if (lines === void 0) { lines = 1; }
        deleteRows(activeNamespace, lines);
    };
    return logger;
}
/**
 * Default logger instance.
 */
createStorageLogger({ parent: 'logger', namespace: 'global' });

exports.DEFAULTS = DEFAULTS;
exports.ENV_LOG_LEVEL = ENV_LOG_LEVEL;
exports.LOG_LEVELS = LOG_LEVELS;
exports.STYLES = STYLES;
//# sourceMappingURL=index.js.map
