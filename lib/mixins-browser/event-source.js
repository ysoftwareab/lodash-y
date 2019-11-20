"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.EventSource = exports.EventSourceCustomEvent = void 0;var _lodash = _interopRequireDefault(require("lodash"));
var _globalThis = _interopRequireDefault(require("./.global-this"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







class EventSourceCustomEvent extends _globalThis.default.CustomEvent {}


/**
                                                                         * EventSource implements a core subset of an EventEmitter for the browser runtime.
                                                                         */exports.EventSourceCustomEvent = EventSourceCustomEvent;
class EventSource {constructor() {_defineProperty(this, "_element",
    document.createElement('div'));_defineProperty(this, "_listeners",

    []);}






  _addEventListener(type, listener, options) {
    _lodash.default.defaults(options, {
      capture: true,
      passive: true });

    let listenerProxy = function (event) {
      let eventDetail;
      if (event instanceof EventSourceCustomEvent) {
        eventDetail = event.detail;
      } else {
        eventDetail = event;
      }

      listener(eventDetail);
    };

    this._listeners.push({
      type,
      listener,
      options,
      listenerProxy });

    this._element.addEventListener(type, listenerProxy, options);
  }

  _removeEventListener(type, listener, options) {
    _lodash.default.defaults(options, {
      capture: true,
      passive: true });


    let existingListener = _lodash.default.find(this._listeners, {
      type,
      listener,
      options });


    if (_lodash.default.isUndefined(existingListener)) {
      return;
    }

    let {
      listenerProxy } =
    existingListener;

    // eslint-disable-next-line lodash/prefer-immutable-method
    _lodash.default.pull(this._listeners, existingListener);
    this._element.removeEventListener(type, listenerProxy, options);
  }

  /**
     * Add a listener for a specific event type.
     */
  on(type, listener) {
    this._addEventListener(type, listener);
  }

  /**
     * Add a listener for a specific event type, that will only be called once.
     */
  once(type, listener) {
    let options = {
      once: true };


    this._addEventListener(type, listener, options);
  }

  /**
     * Remove a listener for a specific event type.
     */
  off(type, listener) {
    this._removeEventListener(type, listener);
  }

  /**
     * Emit an event and call relevant listeners.
     */
  emit(eventOrType, detail) {
    let event;

    if (eventOrType instanceof CustomEvent) {
      event = eventOrType;
    } else {
      event = new EventSourceCustomEvent(eventOrType, {
        detail });

    }

    this._element.dispatchEvent(event);
  }}exports.EventSource = EventSource;

//# sourceMappingURL=event-source.js.map