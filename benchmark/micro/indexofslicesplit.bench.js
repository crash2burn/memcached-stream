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
var str = 'STAT limit_maxbytes 52428800\r\n';

(
  new benchmark.Suite()
).add('str.split( )[1]', function test1() {
  var version = str.split(' ')[1];
}).add('str.slice() & indexOf', function test2() {
  var version = str.slice(str.indexOf('', 8));
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
