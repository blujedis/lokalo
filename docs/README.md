Lokalo

# Lokalo

## Table of contents

### Classes

- [Lokalo](classes/lokalo.md)

### Interfaces

- [ILokaloEvent](interfaces/ilokaloevent.md)
- [ILokaloEvents](interfaces/ilokaloevents.md)
- [ILokaloOptions](interfaces/ilokalooptions.md)
- [ILokaloStoreOptions](interfaces/ilokalostoreoptions.md)

### Type aliases

- [ILokaloPayload](README.md#ilokalopayload)
- [LogLevel](README.md#loglevel)
- [LogLevelInternal](README.md#loglevelinternal)
- [LokaloOptions](README.md#lokalooptions)
- [Style](README.md#style)
- [Styles](README.md#styles)

### Properties

- [default](README.md#default)

### Variables

- [DEFAULTS](README.md#defaults)
- [LOG\_LEVELS](README.md#log_levels)
- [STYLES](README.md#styles)

## Type aliases

### ILokaloPayload

Ƭ **ILokaloPayload**: *string* \| *number* \| *boolean* \| Error & { [key: string]: *any*;  } \| *Record*<string, any\>

Defined in: [types.ts:3](https://github.com/blujedis/lokalo/blob/25b549d/src/types.ts#L3)

___

### LogLevel

Ƭ **LogLevel**: *Omit*<[*LogLevelInternal*](README.md#loglevelinternal), ``"log"``\>

Defined in: [types.ts:6](https://github.com/blujedis/lokalo/blob/25b549d/src/types.ts#L6)

___

### LogLevelInternal

Ƭ **LogLevelInternal**: *typeof* [*LOG\_LEVELS*](README.md#log_levels)[*number*]

Defined in: [types.ts:5](https://github.com/blujedis/lokalo/blob/25b549d/src/types.ts#L5)

___

### LokaloOptions

Ƭ **LokaloOptions**: *Omit*<[*ILokaloOptions*](interfaces/ilokalooptions.md), ``"parent"``\>

Defined in: [types.ts:4](https://github.com/blujedis/lokalo/blob/25b549d/src/types.ts#L4)

___

### Style

Ƭ **Style**: keyof [*Styles*](README.md#styles)

Defined in: [types.ts:8](https://github.com/blujedis/lokalo/blob/25b549d/src/types.ts#L8)

___

### Styles

Ƭ **Styles**: *typeof* [*STYLES*](README.md#styles)

Defined in: [types.ts:7](https://github.com/blujedis/lokalo/blob/25b549d/src/types.ts#L7)

## Properties

### default

• **default**: [*Lokalo*](classes/lokalo.md)

## Variables

### DEFAULTS

• `Const` **DEFAULTS**: [*ILokaloOptions*](interfaces/ilokalooptions.md)

Defined in: [constants.ts:16](https://github.com/blujedis/lokalo/blob/25b549d/src/constants.ts#L16)

___

### LOG\_LEVELS

• `Const` **LOG\_LEVELS**: readonly [``"log"``, ``"fatal"``, ``"error"``, ``"warn"``, ``"info"``, ``"debug"``]

Defined in: [constants.ts:3](https://github.com/blujedis/lokalo/blob/25b549d/src/constants.ts#L3)

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

Defined in: [constants.ts:5](https://github.com/blujedis/lokalo/blob/25b549d/src/constants.ts#L5)
