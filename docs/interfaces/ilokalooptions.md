[Lokalo](../README.md) / ILokaloOptions

# Interface: ILokaloOptions

## Hierarchy

- [*ILokaloStoreOptions*](ilokalostoreoptions.md)

  ↳ **ILokaloOptions**

## Table of contents

### Properties

- [displayOutput](ilokalooptions.md#displayoutput)
- [level](ilokalooptions.md#level)
- [maxLines](ilokalooptions.md#maxlines)
- [namespace](ilokalooptions.md#namespace)
- [parent](ilokalooptions.md#parent)
- [styles](ilokalooptions.md#styles)
- [type](ilokalooptions.md#type)
- [uid](ilokalooptions.md#uid)

## Properties

### displayOutput

• `Optional` **displayOutput**: *boolean*

Inherited from: [ILokaloStoreOptions](ilokalostoreoptions.md).[displayOutput](ilokalostoreoptions.md#displayoutput)

Defined in: [types.ts:15](https://github.com/blujedis/lokalo/blob/25b549d/src/types.ts#L15)

___

### level

• `Optional` **level**: [*LogLevel*](../README.md#loglevel)

Defined in: [types.ts:21](https://github.com/blujedis/lokalo/blob/25b549d/src/types.ts#L21)

___

### maxLines

• `Optional` **maxLines**: *number*

Inherited from: [ILokaloStoreOptions](ilokalostoreoptions.md).[maxLines](ilokalostoreoptions.md#maxlines)

Defined in: [types.ts:13](https://github.com/blujedis/lokalo/blob/25b549d/src/types.ts#L13)

___

### namespace

• **namespace**: *string*

Inherited from: [ILokaloStoreOptions](ilokalostoreoptions.md).[namespace](ilokalostoreoptions.md#namespace)

Defined in: [types.ts:12](https://github.com/blujedis/lokalo/blob/25b549d/src/types.ts#L12)

___

### parent

• `Optional` `Readonly` **parent**: *string*

Inherited from: [ILokaloStoreOptions](ilokalostoreoptions.md).[parent](ilokalostoreoptions.md#parent)

Defined in: [types.ts:11](https://github.com/blujedis/lokalo/blob/25b549d/src/types.ts#L11)

___

### styles

• `Optional` **styles**: *Record*<``"log"`` \| ``"fatal"`` \| ``"error"`` \| ``"warn"`` \| ``"info"`` \| ``"debug"`` \| ``"inherit"`` \| ``"dim"``, string\>

Inherited from: [ILokaloStoreOptions](ilokalostoreoptions.md).[styles](ilokalostoreoptions.md#styles)

Defined in: [types.ts:16](https://github.com/blujedis/lokalo/blob/25b549d/src/types.ts#L16)

___

### type

• `Optional` **type**: ``"local"`` \| ``"session"``

Inherited from: [ILokaloStoreOptions](ilokalostoreoptions.md).[type](ilokalostoreoptions.md#type)

Defined in: [types.ts:14](https://github.com/blujedis/lokalo/blob/25b549d/src/types.ts#L14)

___

### uid

• `Optional` **uid**: () => *string* \| *number*

#### Type declaration

▸ (): *string* \| *number*

**Returns:** *string* \| *number*

Defined in: [types.ts:20](https://github.com/blujedis/lokalo/blob/25b549d/src/types.ts#L20)

Defined in: [types.ts:20](https://github.com/blujedis/lokalo/blob/25b549d/src/types.ts#L20)
