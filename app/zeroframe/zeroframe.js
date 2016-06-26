var Class,
  slice = [].slice;

Class = (function() {
  function Class() {}

  Class.prototype.trace = true;

  Class.prototype.log = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (!this.trace) {
      return;
    }
    if (typeof console === 'undefined') {
      return;
    }
    args.unshift("[" + this.constructor.name + "]");
    console.log.apply(console, args);
    return this;
  };

  Class.prototype.logStart = function() {
    var args, name;
    name = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (!this.trace) {
      return;
    }
    this.logtimers || (this.logtimers = {});
    this.logtimers[name] = +(new Date);
    if (args.length > 0) {
      this.log.apply(this, ["" + name].concat(slice.call(args), ["(started)"]));
    }
    return this;
  };

  Class.prototype.logEnd = function() {
    var args, ms, name;
    name = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    ms = +(new Date) - this.logtimers[name];
    this.log.apply(this, ["" + name].concat(slice.call(args), ["(Done in " + ms + "ms)"]));
    return this;
  };

  return Class;

})();

window.Class = Class;

var ZeroFrame,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ZeroFrame = (function(superClass) {
  extend(ZeroFrame, superClass);

  function ZeroFrame(url) {
    this.onCloseWebsocket = bind(this.onCloseWebsocket, this);
    this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
    this.onRequest = bind(this.onRequest, this);
    this.onMessage = bind(this.onMessage, this);
    this.url = url;
    this.waiting_cb = {};
    this.connect();
    this.next_message_id = 1;
    this.init();
  }

  ZeroFrame.prototype.init = function() {
    return this;
  };

  ZeroFrame.prototype.connect = function() {
    this.target = window.parent;
    window.addEventListener("message", this.onMessage, false);
    return this.cmd("innerReady");
  };

  ZeroFrame.prototype.onMessage = function(e) {
    var cmd, message;
    message = e.data;
    cmd = message.cmd;
    if (cmd === "response") {
      if (this.waiting_cb[message.to] != null) {
        return this.waiting_cb[message.to](message.result);
      } else {
        return this.log("Websocket callback not found:", message);
      }
    } else if (cmd === "wrapperReady") {
      return this.cmd("innerReady");
    } else if (cmd === "ping") {
      return this.response(message.id, "pong");
    } else if (cmd === "wrapperOpenedWebsocket") {
      return this.onOpenWebsocket();
    } else if (cmd === "wrapperClosedWebsocket") {
      return this.onCloseWebsocket();
    } else {
      return this.onRequest(cmd, message.params);
    }
  };

  ZeroFrame.prototype.onRequest = function(cmd, message) {
    return this.log("Unknown request", message);
  };

  ZeroFrame.prototype.response = function(to, result) {
    return this.send({
      "cmd": "response",
      "to": to,
      "result": result
    });
  };

  ZeroFrame.prototype.cmd = function(cmd, params, cb) {
    if (params == null) {
      params = {};
    }
    if (cb == null) {
      cb = null;
    }
    return this.send({
      "cmd": cmd,
      "params": params
    }, cb);
  };

  ZeroFrame.prototype.send = function(message, cb) {
    if (cb == null) {
      cb = null;
    }
    message.id = this.next_message_id;
    this.next_message_id += 1;
    this.target.postMessage(message, "*");
    if (cb) {
      return this.waiting_cb[message.id] = cb;
    }
  };

  ZeroFrame.prototype.onOpenWebsocket = function() {
    return this.log("Websocket open");
  };

  ZeroFrame.prototype.onCloseWebsocket = function() {
    return this.log("Websocket close");
  };

  return ZeroFrame;

})(Class);

window.ZeroFrame = new ZeroFrame();
