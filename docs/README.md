Lokalo

# Lokalo

## Table of contents

### Interfaces

- [IStorageLoggerEvent](interfaces/istorageloggerevent.md)
- [IStorageLoggerEvents](interfaces/istorageloggerevents.md)
- [IStorageLoggerOptions](interfaces/istorageloggeroptions.md)

### Type aliases

- [LogLevel](README.md#loglevel)
- [StorageLoggerEvent](README.md#storageloggerevent)
- [StorageLoggerOptions](README.md#storageloggeroptions)
- [StorageLoggerPayload](README.md#storageloggerpayload)
- [Style](README.md#style)
- [Styles](README.md#styles)

### Variables

- [DEFAULTS](README.md#defaults)
- [ENV\_LOG\_LEVEL](README.md#env_log_level)
- [LOG\_LEVELS](README.md#log_levels)
- [STYLES](README.md#styles)
- [defaultLogger](README.md#defaultlogger)

## Type aliases

### LogLevel

Ƭ **LogLevel**: *typeof* [*LOG\_LEVELS*](README.md#log_levels)[*number*]

Defined in: [types.ts:33](https://github.com/blujedis/lokalo/blob/8d89221/src/types.ts#L33)

___

### StorageLoggerEvent

Ƭ **StorageLoggerEvent**<K, U\>: *Record*<keyof K, string \| number\> & [*IStorageLoggerEvent*](interfaces/istorageloggerevent.md)<U\>

#### Type parameters

| Name | Type | Default |
| :------ | :------ | :------ |
| `K` | *string* | ``"$uid"`` |
| `U` | *Record*<string, any\> | *Record*<string, any\> |

Defined in: [types.ts:35](https://github.com/blujedis/lokalo/blob/8d89221/src/types.ts#L35)

___

### StorageLoggerOptions

Ƭ **StorageLoggerOptions**: *Omit*<[*IStorageLoggerOptions*](interfaces/istorageloggeroptions.md), ``"parent"``\>

Defined in: [types.ts:18](https://github.com/blujedis/lokalo/blob/8d89221/src/types.ts#L18)

___

### StorageLoggerPayload

Ƭ **StorageLoggerPayload**: *string* \| *number* \| *boolean* \| Error & { [key: string]: *any*;  } \| *Record*<string, any\>

Defined in: [types.ts:16](https://github.com/blujedis/lokalo/blob/8d89221/src/types.ts#L16)

___

### Style

Ƭ **Style**: keyof [*Styles*](README.md#styles)

Defined in: [types.ts:39](https://github.com/blujedis/lokalo/blob/8d89221/src/types.ts#L39)

___

### Styles

Ƭ **Styles**: *typeof* [*STYLES*](README.md#styles)

Defined in: [types.ts:37](https://github.com/blujedis/lokalo/blob/8d89221/src/types.ts#L37)

## Variables

### DEFAULTS

• `Const` **DEFAULTS**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `consoleOutput` | *undefined* \| ``"development"`` \| ``"always"`` |
| `key` | *undefined* \| ``"$uid"`` |
| `keyValue` | () => *number* |
| `level` | ``"log"`` \| ``"fatal"`` \| ``"error"`` \| ``"warn"`` \| ``"info"`` \| ``"debug"`` |
| `maxLines` | *number* |
| `styles` | *object* |
| `styles.debug` | *string* |
| `styles.dim` | *string* |
| `styles.error` | *string* |
| `styles.fatal` | *string* |
| `styles.info` | *string* |
| `styles.inherit` | *string* |
| `styles.log` | *string* |
| `styles.warn` | *string* |
| `type` | ``"local"`` |
| `userKey` | *string* |

Defined in: [constants.ts:18](https://github.com/blujedis/lokalo/blob/8d89221/src/constants.ts#L18)

___

### ENV\_LOG\_LEVEL

• `Const` **ENV\_LOG\_LEVEL**: *undefined* \| *string*

Defined in: [constants.ts:3](https://github.com/blujedis/lokalo/blob/8d89221/src/constants.ts#L3)

___

### LOG\_LEVELS

• `Const` **LOG\_LEVELS**: readonly [``"log"``, ``"fatal"``, ``"error"``, ``"warn"``, ``"info"``, ``"debug"``]

Defined in: [constants.ts:5](https://github.com/blujedis/lokalo/blob/8d89221/src/constants.ts#L5)

___

### STYLES

• `Const` **STYLES**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug` | *string* |
| `dim` | *string* |
| `error` | *string* |
| `fatal` | *string* |
| `info` | *string* |
| `inherit` | *string* |
| `log` | *string* |
| `warn` | *string* |

Defined in: [constants.ts:7](https://github.com/blujedis/lokalo/blob/8d89221/src/constants.ts#L7)

___

### defaultLogger

• `Const` **defaultLogger**: (`level`: [*LogLevel*](README.md#loglevel), `payload`: [*StorageLoggerPayload*](README.md#storageloggerpayload)) => Logger(`payload`: [*StorageLoggerPayload*](README.md#storageloggerpayload)) => Logger

Default logger instance.

#### Type declaration

▸ (`level`: [*LogLevel*](README.md#loglevel), `payload`: [*StorageLoggerPayload*](README.md#storageloggerpayload)): Logger

Logs a payload by log level.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `level` | [*LogLevel*](README.md#loglevel) | the level being logged. |
| `payload` | [*StorageLoggerPayload*](README.md#storageloggerpayload) | the value or payload to log. |

**Returns:** Logger

Defined in: [logger.ts:189](https://github.com/blujedis/lokalo/blob/8d89221/src/logger.ts#L189)

▸ (`payload`: [*StorageLoggerPayload*](README.md#storageloggerpayload)): Logger

Logs a payload by default level.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [*StorageLoggerPayload*](README.md#storageloggerpayload) | the value or payload to log. |

**Returns:** Logger

Defined in: [logger.ts:196](https://github.com/blujedis/lokalo/blob/8d89221/src/logger.ts#L196)

| Name | Type |
| :------ | :------ |
| `level` | *Omit*<``"log"`` \| ``"fatal"`` \| ``"error"`` \| ``"warn"`` \| ``"info"`` \| ``"debug"``, ``"log"``\> |
| `namespace` | *string* |
| `namespaces` | *string*[] |
| `child` | (`ns`: *string*) => { (level: "log" \| "fatal" \| "error" \| "warn" \| "info" \| "debug", payload: StorageLoggerPayload): ...; (payload: StorageLoggerPayload): ...; ... 14 more ...; purge(lines?: number): void; } |
| `clear` | () => *void* |
| `clearAll` | () => *void* |
| `debug` | (`payload`: [*StorageLoggerPayload*](README.md#storageloggerpayload)) => { (level: "log" \| "fatal" \| "error" \| "warn" \| "info" \| "debug", payload: StorageLoggerPayload): ...; (payload: StorageLoggerPayload): ...; ... 14 more ...; purge(lines?: number): void; } |
| `error` | (`payload`: [*StorageLoggerPayload*](README.md#storageloggerpayload)) => { (level: "log" \| "fatal" \| "error" \| "warn" \| "info" \| "debug", payload: StorageLoggerPayload): ...; (payload: StorageLoggerPayload): ...; ... 14 more ...; purge(lines?: number): void; } |
| `fatal` | (`payload`: [*StorageLoggerPayload*](README.md#storageloggerpayload)) => { (level: "log" \| "fatal" \| "error" \| "warn" \| "info" \| "debug", payload: StorageLoggerPayload): ...; (payload: StorageLoggerPayload): ...; ... 14 more ...; purge(lines?: number): void; } |
| `info` | (`payload`: [*StorageLoggerPayload*](README.md#storageloggerpayload)) => { (level: "log" \| "fatal" \| "error" \| "warn" \| "info" \| "debug", payload: StorageLoggerPayload): ...; (payload: StorageLoggerPayload): ...; ... 14 more ...; purge(lines?: number): void; } |
| `log` | (`payload`: [*StorageLoggerPayload*](README.md#storageloggerpayload)) => { (level: "log" \| "fatal" \| "error" \| "warn" \| "info" \| "debug", payload: StorageLoggerPayload): ...; (payload: StorageLoggerPayload): ...; ... 14 more ...; purge(lines?: number): void; } |
| `purge` | (`lines`: *number*) => *void* |
| `rows` | (`limit`: *number*) => [*StorageLoggerEvent*](README.md#storageloggerevent)<``"$uid"``, Record<string, any\>\>[] |
| `size` | () => *number* |
| `warn` | (`payload`: [*StorageLoggerPayload*](README.md#storageloggerpayload)) => { (level: "log" \| "fatal" \| "error" \| "warn" \| "info" \| "debug", payload: StorageLoggerPayload): ...; (payload: StorageLoggerPayload): ...; ... 14 more ...; purge(lines?: number): void; } |

Defined in: [logger.ts:357](https://github.com/blujedis/lokalo/blob/8d89221/src/logger.ts#L357)
