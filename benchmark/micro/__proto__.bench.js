'use strict';

/**
 * Benchmark related modules.
 */
var benchmark = require('benchmark')
  , microtime = require('microtime');

/**
 * Logger
 */
var logger = new(require('devnull'))({ timestamp: false, namespacing: 0 });

/**
 * Preparation code.
 */
var EventEmitter = require('events').EventEmitter
  , util = require('util');

// Prototype based initalization
function Foo() {
  EventEmitter.apply(this, arguments);
}

Foo.prototype = new EventEmitter;
Foo.prototype.constructor = Foo;

// __proto__
function Bar() {

}

Bar.prototype.__proto__ = EventEmitter.prototype;

// utils.inherit
function Baz() {
  EventEmitter.apply(this, arguments);
}

util.inherits(Baz, EventEmitter);

(
  new benchmark.Suite()
).add('Standard prototype inherit invocation', function test1() {
  var x = new Foo();
}).add('__proto__ inherit invocation', function test2() {
  var x = new Bar();
}).add('util.inhertis', function test3() {
  var x = new Baz();
}).on('cycle', function cycle(e) {
  var details = e.target;

  logger.log('Finished benchmarking: "%s"', details.name);
  logger.metric('Count (%d), Cycles (%d), Elapsed (%d), Hz (%d)'
    , details.count
    , details.cycles
    , details.times.elapsed
    , details.hz
  );
}).on('complete', function completed() {
  logger.info('Benchmark: "%s" is was the fastest.'
    , this.filter('fastest').pluck('name')
  );
}).run();
