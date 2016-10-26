/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, RenderComponentType, RootRenderer } from '@angular/core';
import { MessageBus } from '../shared/message_bus';
import { EVENT_CHANNEL, RENDERER_CHANNEL } from '../shared/messaging_api';
import { RenderStore } from '../shared/render_store';
import { PRIMITIVE, RenderStoreObject, Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
import { EventDispatcher } from '../ui/event_dispatcher';
export var MessageBasedRenderer = (function () {
    function MessageBasedRenderer(_brokerFactory, _bus, _serializer, _renderStore, _rootRenderer) {
        this._brokerFactory = _brokerFactory;
        this._bus = _bus;
        this._serializer = _serializer;
        this._renderStore = _renderStore;
        this._rootRenderer = _rootRenderer;
    }
    MessageBasedRenderer.prototype.start = function () {
        var broker = this._brokerFactory.createMessageBroker(RENDERER_CHANNEL);
        this._bus.initChannel(EVENT_CHANNEL);
        this._eventDispatcher = new EventDispatcher(this._bus.to(EVENT_CHANNEL), this._serializer);
        broker.registerMethod('renderComponent', [RenderComponentType, PRIMITIVE], this._renderComponent.bind(this));
        broker.registerMethod('selectRootElement', [RenderStoreObject, PRIMITIVE, PRIMITIVE], this._selectRootElement.bind(this));
        broker.registerMethod('createElement', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], this._createElement.bind(this));
        broker.registerMethod('createViewRoot', [RenderStoreObject, RenderStoreObject, PRIMITIVE], this._createViewRoot.bind(this));
        broker.registerMethod('createTemplateAnchor', [RenderStoreObject, RenderStoreObject, PRIMITIVE], this._createTemplateAnchor.bind(this));
        broker.registerMethod('createText', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], this._createText.bind(this));
        broker.registerMethod('projectNodes', [RenderStoreObject, RenderStoreObject, RenderStoreObject], this._projectNodes.bind(this));
        broker.registerMethod('attachViewAfter', [RenderStoreObject, RenderStoreObject, RenderStoreObject], this._attachViewAfter.bind(this));
        broker.registerMethod('detachView', [RenderStoreObject, RenderStoreObject], this._detachView.bind(this));
        broker.registerMethod('destroyView', [RenderStoreObject, RenderStoreObject, RenderStoreObject], this._destroyView.bind(this));
        broker.registerMethod('setElementProperty', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], this._setElementProperty.bind(this));
        broker.registerMethod('setElementAttribute', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], this._setElementAttribute.bind(this));
        broker.registerMethod('setBindingDebugInfo', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], this._setBindingDebugInfo.bind(this));
        broker.registerMethod('setElementClass', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], this._setElementClass.bind(this));
        broker.registerMethod('setElementStyle', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], this._setElementStyle.bind(this));
        broker.registerMethod('invokeElementMethod', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], this._invokeElementMethod.bind(this));
        broker.registerMethod('setText', [RenderStoreObject, RenderStoreObject, PRIMITIVE], this._setText.bind(this));
        broker.registerMethod('listen', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], this._listen.bind(this));
        broker.registerMethod('listenGlobal', [RenderStoreObject, PRIMITIVE, PRIMITIVE, PRIMITIVE], this._listenGlobal.bind(this));
        broker.registerMethod('listenDone', [RenderStoreObject, RenderStoreObject], this._listenDone.bind(this));
    };
    MessageBasedRenderer.prototype._renderComponent = function (renderComponentType, rendererId) {
        var renderer = this._rootRenderer.renderComponent(renderComponentType);
        this._renderStore.store(renderer, rendererId);
    };
    MessageBasedRenderer.prototype._selectRootElement = function (renderer, selector, elId) {
        this._renderStore.store(renderer.selectRootElement(selector, null), elId);
    };
    MessageBasedRenderer.prototype._createElement = function (renderer, parentElement, name, elId) {
        this._renderStore.store(renderer.createElement(parentElement, name, null), elId);
    };
    MessageBasedRenderer.prototype._createViewRoot = function (renderer, hostElement, elId) {
        var viewRoot = renderer.createViewRoot(hostElement);
        if (this._renderStore.serialize(hostElement) !== elId) {
            this._renderStore.store(viewRoot, elId);
        }
    };
    MessageBasedRenderer.prototype._createTemplateAnchor = function (renderer, parentElement, elId) {
        this._renderStore.store(renderer.createTemplateAnchor(parentElement, null), elId);
    };
    MessageBasedRenderer.prototype._createText = function (renderer, parentElement, value, elId) {
        this._renderStore.store(renderer.createText(parentElement, value, null), elId);
    };
    MessageBasedRenderer.prototype._projectNodes = function (renderer, parentElement, nodes) {
        renderer.projectNodes(parentElement, nodes);
    };
    MessageBasedRenderer.prototype._attachViewAfter = function (renderer, node, viewRootNodes) {
        renderer.attachViewAfter(node, viewRootNodes);
    };
    MessageBasedRenderer.prototype._detachView = function (renderer, viewRootNodes) {
        renderer.detachView(viewRootNodes);
    };
    MessageBasedRenderer.prototype._destroyView = function (renderer, hostElement, viewAllNodes) {
        renderer.destroyView(hostElement, viewAllNodes);
        for (var i = 0; i < viewAllNodes.length; i++) {
            this._renderStore.remove(viewAllNodes[i]);
        }
    };
    MessageBasedRenderer.prototype._setElementProperty = function (renderer, renderElement, propertyName, propertyValue) {
        renderer.setElementProperty(renderElement, propertyName, propertyValue);
    };
    MessageBasedRenderer.prototype._setElementAttribute = function (renderer, renderElement, attributeName, attributeValue) {
        renderer.setElementAttribute(renderElement, attributeName, attributeValue);
    };
    MessageBasedRenderer.prototype._setBindingDebugInfo = function (renderer, renderElement, propertyName, propertyValue) {
        renderer.setBindingDebugInfo(renderElement, propertyName, propertyValue);
    };
    MessageBasedRenderer.prototype._setElementClass = function (renderer, renderElement, className, isAdd) {
        renderer.setElementClass(renderElement, className, isAdd);
    };
    MessageBasedRenderer.prototype._setElementStyle = function (renderer, renderElement, styleName, styleValue) {
        renderer.setElementStyle(renderElement, styleName, styleValue);
    };
    MessageBasedRenderer.prototype._invokeElementMethod = function (renderer, renderElement, methodName, args) {
        renderer.invokeElementMethod(renderElement, methodName, args);
    };
    MessageBasedRenderer.prototype._setText = function (renderer, renderNode, text) {
        renderer.setText(renderNode, text);
    };
    MessageBasedRenderer.prototype._listen = function (renderer, renderElement, eventName, unlistenId) {
        var _this = this;
        var unregisterCallback = renderer.listen(renderElement, eventName, function (event /** TODO #9100 */) {
            return _this._eventDispatcher.dispatchRenderEvent(renderElement, null, eventName, event);
        });
        this._renderStore.store(unregisterCallback, unlistenId);
    };
    MessageBasedRenderer.prototype._listenGlobal = function (renderer, eventTarget, eventName, unlistenId) {
        var _this = this;
        var unregisterCallback = renderer.listenGlobal(eventTarget, eventName, function (event /** TODO #9100 */) {
            return _this._eventDispatcher.dispatchRenderEvent(null, eventTarget, eventName, event);
        });
        this._renderStore.store(unregisterCallback, unlistenId);
    };
    MessageBasedRenderer.prototype._listenDone = function (renderer, unlistenCallback) { unlistenCallback(); };
    MessageBasedRenderer.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MessageBasedRenderer.ctorParameters = [
        { type: ServiceMessageBrokerFactory, },
        { type: MessageBus, },
        { type: Serializer, },
        { type: RenderStore, },
        { type: RootRenderer, },
    ];
    return MessageBasedRenderer;
}());
//# sourceMappingURL=renderer.js.map