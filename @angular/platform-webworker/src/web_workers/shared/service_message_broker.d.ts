/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Type } from '@angular/core';
import { MessageBus } from '../shared/message_bus';
import { Serializer } from '../shared/serializer';
/**
 * @experimental WebWorker support in Angular is currently experimental.
 */
export declare abstract class ServiceMessageBrokerFactory {
    /**
     * Initializes the given channel and attaches a new {@link ServiceMessageBroker} to it.
     */
    abstract createMessageBroker(channel: string, runInZone?: boolean): ServiceMessageBroker;
}
export declare class ServiceMessageBrokerFactory_ extends ServiceMessageBrokerFactory {
    private _messageBus;
    constructor(_messageBus: MessageBus, _serializer: Serializer);
    createMessageBroker(channel: string, runInZone?: boolean): ServiceMessageBroker;
}
/**
 * Helper class for UIComponents that allows components to register methods.
 * If a registered method message is received from the broker on the worker,
 * the UIMessageBroker deserializes its arguments and calls the registered method.
 * If that method returns a promise, the UIMessageBroker returns the result to the worker.
 *
 * @experimental WebWorker support in Angular is currently experimental.
 */
export declare abstract class ServiceMessageBroker {
    abstract registerMethod(methodName: string, signature: Type<any>[], method: Function, returnType?: Type<any>): void;
}
export declare class ServiceMessageBroker_ extends ServiceMessageBroker {
    private _serializer;
    channel: any;
    private _sink;
    private _methods;
    constructor(messageBus: MessageBus, _serializer: Serializer, channel: any);
    registerMethod(methodName: string, signature: Type<any>[], method: (..._: any[]) => Promise<any> | void, returnType?: Type<any>): void;
    private _handleMessage(map);
    private _wrapWebWorkerPromise(id, promise, type);
}
/**
 * @experimental WebWorker support in Angular is currently experimental.
 */
export declare class ReceivedMessage {
    method: string;
    args: any[];
    id: string;
    type: string;
    constructor(data: {
        [key: string]: any;
    });
}
