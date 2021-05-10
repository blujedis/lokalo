[Lokalo](../README.md) / IStorageLoggerEvent

# Interface: IStorageLoggerEvent<U\>

## Type parameters

| Name | Type | Default |
| :------ | :------ | :------ |
| `U` | *Record*<string, any\> | *Record*<string, any\> |

## Indexable

▪ [key: *string*]: *any*

## Table of contents

### Properties

- [level](istorageloggerevent.md#level)
- [message](istorageloggerevent.md#message)
- [namespace](istorageloggerevent.md#namespace)
- [timestamp](istorageloggerevent.md#timestamp)
- [user](istorageloggerevent.md#user)

## Properties

### level

• **level**: ``"log"`` \| ``"fatal"`` \| ``"error"`` \| ``"warn"`` \| ``"info"`` \| ``"debug"``

Defined in: [types.ts:21](https://github.com/blujedis/lokalo/blob/3c1f136/src/types.ts#L21)

___

### message

• **message**: *string*

Defined in: [types.ts:24](https://github.com/blujedis/lokalo/blob/3c1f136/src/types.ts#L24)

___

### namespace

• **namespace**: *string*

Defined in: [types.ts:23](https://github.com/blujedis/lokalo/blob/3c1f136/src/types.ts#L23)

___

### timestamp

• **timestamp**: *string*

Defined in: [types.ts:22](https://github.com/blujedis/lokalo/blob/3c1f136/src/types.ts#L22)

___

### user

• `Optional` **user**: U

Defined in: [types.ts:25](https://github.com/blujedis/lokalo/blob/3c1f136/src/types.ts#L25)
