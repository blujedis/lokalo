[Lokalo](../README.md) / IStorageLoggerOptions

# Interface: IStorageLoggerOptions<K\>

## Type parameters

| Name | Type | Default |
| :------ | :------ | :------ |
| `K` | *string* | ``"$uid"`` |

## Table of contents

### Properties

- [consoleOutput](istorageloggeroptions.md#consoleoutput)
- [key](istorageloggeroptions.md#key)
- [keyValue](istorageloggeroptions.md#keyvalue)
- [level](istorageloggeroptions.md#level)
- [maxLines](istorageloggeroptions.md#maxlines)
- [namespace](istorageloggeroptions.md#namespace)
- [parent](istorageloggeroptions.md#parent)
- [styles](istorageloggeroptions.md#styles)
- [type](istorageloggeroptions.md#type)
- [userKey](istorageloggeroptions.md#userkey)

## Properties

### consoleOutput

• `Optional` **consoleOutput**: ``"development"`` \| ``"always"``

Defined in: [types.ts:12](https://github.com/blujedis/lokalo/blob/3c1f136/src/types.ts#L12)

___

### key

• `Optional` **key**: K

Defined in: [types.ts:8](https://github.com/blujedis/lokalo/blob/3c1f136/src/types.ts#L8)

___

### keyValue

• `Optional` **keyValue**: () => *string* \| *number*

#### Type declaration

▸ (): *string* \| *number*

**Returns:** *string* \| *number*

Defined in: [types.ts:9](https://github.com/blujedis/lokalo/blob/3c1f136/src/types.ts#L9)

Defined in: [types.ts:9](https://github.com/blujedis/lokalo/blob/3c1f136/src/types.ts#L9)

___

### level

• `Optional` **level**: *Omit*<``"log"`` \| ``"fatal"`` \| ``"error"`` \| ``"warn"`` \| ``"info"`` \| ``"debug"``, ``"log"``\>

Defined in: [types.ts:11](https://github.com/blujedis/lokalo/blob/3c1f136/src/types.ts#L11)

___

### maxLines

• `Optional` **maxLines**: *number*

Defined in: [types.ts:7](https://github.com/blujedis/lokalo/blob/3c1f136/src/types.ts#L7)

___

### namespace

• **namespace**: *string*

Defined in: [types.ts:6](https://github.com/blujedis/lokalo/blob/3c1f136/src/types.ts#L6)

___

### parent

• `Readonly` **parent**: *string*

Defined in: [types.ts:4](https://github.com/blujedis/lokalo/blob/3c1f136/src/types.ts#L4)

___

### styles

• `Optional` **styles**: *Record*<``"log"`` \| ``"fatal"`` \| ``"error"`` \| ``"warn"`` \| ``"info"`` \| ``"debug"`` \| ``"inherit"`` \| ``"dim"``, string\>

Defined in: [types.ts:13](https://github.com/blujedis/lokalo/blob/3c1f136/src/types.ts#L13)

___

### type

• `Optional` **type**: ``"session"`` \| ``"local"``

Defined in: [types.ts:5](https://github.com/blujedis/lokalo/blob/3c1f136/src/types.ts#L5)

___

### userKey

• `Optional` **userKey**: *string*

Defined in: [types.ts:10](https://github.com/blujedis/lokalo/blob/3c1f136/src/types.ts#L10)
