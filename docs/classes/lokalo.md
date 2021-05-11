[Lokalo](../README.md) / Lokalo

# Class: Lokalo

## Hierarchy

- *LokaloLogger*

  ↳ **Lokalo**

## Table of contents

### Constructors

- [constructor](lokalo.md#constructor)

### Properties

- [loggers](lokalo.md#loggers)
- [namespace](lokalo.md#namespace)
- [options](lokalo.md#options)
- [parent](lokalo.md#parent)
- [queue](lokalo.md#queue)
- [queueId](lokalo.md#queueid)
- [store](lokalo.md#store)

### Accessors

- [level](lokalo.md#level)

### Methods

- [checkMaxLines](lokalo.md#checkmaxlines)
- [child](lokalo.md#child)
- [clear](lokalo.md#clear)
- [clearAll](lokalo.md#clearall)
- [clearQueue](lokalo.md#clearqueue)
- [debug](lokalo.md#debug)
- [error](lokalo.md#error)
- [fatal](lokalo.md#fatal)
- [getNamespace](lokalo.md#getnamespace)
- [info](lokalo.md#info)
- [isActiveLevel](lokalo.md#isactivelevel)
- [log](lokalo.md#log)
- [mute](lokalo.md#mute)
- [purge](lokalo.md#purge)
- [queuePayload](lokalo.md#queuepayload)
- [remove](lokalo.md#remove)
- [removeNamespace](lokalo.md#removenamespace)
- [resetQueue](lokalo.md#resetqueue)
- [rows](lokalo.md#rows)
- [setNamespace](lokalo.md#setnamespace)
- [size](lokalo.md#size)
- [startQueue](lokalo.md#startqueue)
- [toObject](lokalo.md#toobject)
- [unmute](lokalo.md#unmute)
- [warn](lokalo.md#warn)
- [writePayload](lokalo.md#writepayload)

## Constructors

### constructor

\+ **new Lokalo**(`options`: *string* \| *Omit*<[*ILokaloOptions*](../interfaces/ilokalooptions.md), ``"parent"``\>): [*Lokalo*](lokalo.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | *string* \| *Omit*<[*ILokaloOptions*](../interfaces/ilokalooptions.md), ``"parent"``\> |

**Returns:** [*Lokalo*](lokalo.md)

Overrides: LokaloLogger.constructor

Defined in: [lokalo.ts:7](https://github.com/blujedis/lokalo/blob/25b549d/src/lokalo.ts#L7)

## Properties

### loggers

• **loggers**: *Set*<LokaloLogger\>

Defined in: [lokalo.ts:7](https://github.com/blujedis/lokalo/blob/25b549d/src/lokalo.ts#L7)

___

### namespace

• **namespace**: *string*

Inherited from: LokaloLogger.namespace

Defined in: [store.ts:6](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L6)

___

### options

• **options**: *Required*<[*ILokaloOptions*](../interfaces/ilokalooptions.md)\>

Inherited from: LokaloLogger.options

Defined in: [logger.ts:15](https://github.com/blujedis/lokalo/blob/25b549d/src/logger.ts#L15)

___

### parent

• `Optional` **parent**: *LokaloLogger*

Inherited from: LokaloLogger.parent

___

### queue

• **queue**: [*ILokaloEvent*](../interfaces/ilokaloevent.md)[]= []

Inherited from: LokaloLogger.queue

Defined in: [store.ts:8](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L8)

___

### queueId

• **queueId**: *any*

Inherited from: LokaloLogger.queueId

Defined in: [store.ts:9](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L9)

___

### store

• **store**: Storage

Inherited from: LokaloLogger.store

Defined in: [store.ts:7](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L7)

## Accessors

### level

• get **level**(): [*LogLevel*](../README.md#loglevel)

**Returns:** [*LogLevel*](../README.md#loglevel)

Defined in: [logger.ts:61](https://github.com/blujedis/lokalo/blob/25b549d/src/logger.ts#L61)

## Methods

### checkMaxLines

▸ `Protected` **checkMaxLines**(): *void*

Checks the maximum lines size.

**Returns:** *void*

Inherited from: LokaloLogger.checkMaxLines

Defined in: [store.ts:52](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L52)

___

### child

▸ **child**(`namespace`: *string*): *LokaloLogger*

Creates a child logger instance.

**`example`**
import defLogger from './path/to/logger'
const logger = defLogger.child('your.namespace');

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namespace` | *string* | the namspace of the child to create. |

**Returns:** *LokaloLogger*

Inherited from: LokaloLogger.child

Defined in: [logger.ts:129](https://github.com/blujedis/lokalo/blob/25b549d/src/logger.ts#L129)

___

### clear

▸ **clear**(): *void*

Clears the current namespace.

**Returns:** *void*

Inherited from: LokaloLogger.clear

Defined in: [store.ts:159](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L159)

___

### clearAll

▸ **clearAll**(): *void*

**Returns:** *void*

Defined in: [lokalo.ts:14](https://github.com/blujedis/lokalo/blob/25b549d/src/lokalo.ts#L14)

___

### clearQueue

▸ **clearQueue**(): *void*

Clears the log queue.

**Returns:** *void*

Inherited from: LokaloLogger.clearQueue

Defined in: [store.ts:175](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L175)

___

### debug

▸ **debug**(`payload`: [*ILokaloPayload*](../README.md#ilokalopayload)): *void*

Logs a payload by debug log level.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [*ILokaloPayload*](../README.md#ilokalopayload) | the payload to be logged. |

**Returns:** *void*

Inherited from: LokaloLogger.debug

Defined in: [logger.ts:118](https://github.com/blujedis/lokalo/blob/25b549d/src/logger.ts#L118)

___

### error

▸ **error**(`payload`: [*ILokaloPayload*](../README.md#ilokalopayload)): *void*

Logs a payload by error log level.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [*ILokaloPayload*](../README.md#ilokalopayload) | the payload to be logged. |

**Returns:** *void*

Inherited from: LokaloLogger.error

Defined in: [logger.ts:97](https://github.com/blujedis/lokalo/blob/25b549d/src/logger.ts#L97)

___

### fatal

▸ **fatal**(`payload`: [*ILokaloPayload*](../README.md#ilokalopayload)): *void*

Logs a payload by fatal log level.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [*ILokaloPayload*](../README.md#ilokalopayload) | the payload to be logged. |

**Returns:** *void*

Inherited from: LokaloLogger.fatal

Defined in: [logger.ts:90](https://github.com/blujedis/lokalo/blob/25b549d/src/logger.ts#L90)

___

### getNamespace

▸ `Protected` **getNamespace**(): [*ILokaloEvent*](../interfaces/ilokaloevent.md)[]

Gets namespaced value by key.

**Returns:** [*ILokaloEvent*](../interfaces/ilokaloevent.md)[]

Inherited from: LokaloLogger.getNamespace

Defined in: [store.ts:23](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L23)

___

### info

▸ **info**(`payload`: [*ILokaloPayload*](../README.md#ilokalopayload)): *void*

Logs a payload by info log level.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [*ILokaloPayload*](../README.md#ilokalopayload) | the payload to be logged. |

**Returns:** *void*

Inherited from: LokaloLogger.info

Defined in: [logger.ts:111](https://github.com/blujedis/lokalo/blob/25b549d/src/logger.ts#L111)

___

### isActiveLevel

▸ **isActiveLevel**(`level`: ``"log"`` \| ``"fatal"`` \| ``"error"`` \| ``"warn"`` \| ``"info"`` \| ``"debug"``): *boolean*

Checks if a level is active.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `level` | ``"log"`` \| ``"fatal"`` \| ``"error"`` \| ``"warn"`` \| ``"info"`` \| ``"debug"`` | the level to inspect as active. |

**Returns:** *boolean*

Inherited from: LokaloLogger.isActiveLevel

Defined in: [logger.ts:70](https://github.com/blujedis/lokalo/blob/25b549d/src/logger.ts#L70)

___

### log

▸ **log**(`payload`: [*ILokaloPayload*](../README.md#ilokalopayload)): [*Lokalo*](lokalo.md)

Logs a payload by default level.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [*ILokaloPayload*](../README.md#ilokalopayload) | the payload to be logged. |

**Returns:** [*Lokalo*](lokalo.md)

Inherited from: LokaloLogger.log

Defined in: [logger.ts:83](https://github.com/blujedis/lokalo/blob/25b549d/src/logger.ts#L83)

___

### mute

▸ **mute**(): *void*

Mutes the output to console only logs.

**Returns:** *void*

Inherited from: LokaloLogger.mute

Defined in: [store.ts:106](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L106)

___

### purge

▸ **purge**(`lines?`: *number*): *void*

Purges lines from the logger.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `lines` | *number* | 1 | the number of lines to purge. |

**Returns:** *void*

Inherited from: LokaloLogger.purge

Defined in: [store.ts:168](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L168)

___

### queuePayload

▸ `Protected` **queuePayload**(`payload`: [*ILokaloEvent*](../interfaces/ilokaloevent.md)): *void*

Queues the payload.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [*ILokaloEvent*](../interfaces/ilokaloevent.md) | the payload to be queued. |

**Returns:** *void*

Inherited from: LokaloLogger.queuePayload

Defined in: [store.ts:69](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L69)

___

### remove

▸ **remove**(`count?`: *number*): *void*

Deletes rows for the given namespace.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `count` | *number* | 1 | the number of rows to delete if not 1. |

**Returns:** *void*

Inherited from: LokaloLogger.remove

Defined in: [store.ts:122](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L122)

___

### removeNamespace

▸ `Protected` **removeNamespace**(): *void*

Removes from storage by namespace.

**Returns:** *void*

Inherited from: LokaloLogger.removeNamespace

Defined in: [store.ts:44](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L44)

___

### resetQueue

▸ **resetQueue**(): *void*

Resets queue timer but leaves queue payloads.

**Returns:** *void*

Inherited from: LokaloLogger.resetQueue

Defined in: [store.ts:184](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L184)

___

### rows

▸ **rows**(`limit?`: *number*): [*ILokaloEvent*](../interfaces/ilokaloevent.md)[]

Returns rows for the active namespace.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `limit` | *number* | 0 | value used to limit returned rows. |

**Returns:** [*ILokaloEvent*](../interfaces/ilokaloevent.md)[]

Inherited from: LokaloLogger.rows

Defined in: [store.ts:147](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L147)

___

### setNamespace

▸ `Protected` **setNamespace**(`data`: [*ILokaloEvent*](../interfaces/ilokaloevent.md) \| [*ILokaloEvent*](../interfaces/ilokaloevent.md)[]): *void*

Sets a namespace's value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [*ILokaloEvent*](../interfaces/ilokaloevent.md) \| [*ILokaloEvent*](../interfaces/ilokaloevent.md)[] | the value to set to the namespace. |

**Returns:** *void*

Inherited from: LokaloLogger.setNamespace

Defined in: [store.ts:33](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L33)

___

### size

▸ **size**(): *number*

Gets the number of rows for a namespace.

**Returns:** *number*

Inherited from: LokaloLogger.size

Defined in: [store.ts:138](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L138)

___

### startQueue

▸ **startQueue**(): *void*

Starts the log queue.

**Returns:** *void*

Inherited from: LokaloLogger.startQueue

Defined in: [store.ts:192](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L192)

___

### toObject

▸ **toObject**(): *Record*<string, any\>

Creates single object from all loggers/namespaces.

**Returns:** *Record*<string, any\>

Defined in: [lokalo.ts:22](https://github.com/blujedis/lokalo/blob/25b549d/src/lokalo.ts#L22)

___

### unmute

▸ **unmute**(): *void*

Unmutes the output to console and displays in console.

**Returns:** *void*

Inherited from: LokaloLogger.unmute

Defined in: [store.ts:113](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L113)

___

### warn

▸ **warn**(`payload`: [*ILokaloPayload*](../README.md#ilokalopayload)): *void*

Logs a payload by warn log level.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [*ILokaloPayload*](../README.md#ilokalopayload) | the payload to be logged. |

**Returns:** *void*

Inherited from: LokaloLogger.warn

Defined in: [logger.ts:104](https://github.com/blujedis/lokalo/blob/25b549d/src/logger.ts#L104)

___

### writePayload

▸ `Protected` **writePayload**(`payload`: [*ILokaloEvent*](../interfaces/ilokaloevent.md)): *void*

Writes the payload to storage by namespace.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [*ILokaloEvent*](../interfaces/ilokaloevent.md) | the payload to be written. |

**Returns:** *void*

Inherited from: LokaloLogger.writePayload

Defined in: [store.ts:98](https://github.com/blujedis/lokalo/blob/25b549d/src/store.ts#L98)
