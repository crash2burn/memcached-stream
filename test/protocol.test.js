describe('memcached-stream', function () {
  'use strict';

  var chai = require('chai')
    , expect = chai.expect;

  chai.Assertion.includeStack = true;

  var stream = require('../index')
    , Parser = stream.Parser;

  describe('Protocol', function () {
    describe('CLIENT_ERROR', function () {
      var data = 'CLIENT_ERROR Syntax error: cas <key> <flags> <exptime> <bytes> <casid> [noreply]\r\n';

      it('emits an `error` event when encountered', function (done) {
        var memcached = new Parser();

        memcached.on('error:response', function (err) {
          expect(err).to.be.an.instanceOf(Error);
          expect(err.message).to.include('Syntax error');
          expect(err.message).to.include('cas <key>');

          // should clear the cache
          process.nextTick(function () {
            expect(memcached.queue).to.equal('');

            done();
          });
        });

        memcached.write(data);
      });

      it('correctly cleans the queue', function (done) {
        var memcached = new Parser();

        memcached.on('error:response', function (err) {
          process.nextTick(function () {
            expect(memcached.queue).to.equal('BANANANANA');

            done();
          });
        });

        memcached.write(data+ 'BANANANANA');
      });
    });

    describe('DELETED', function () {
      var data = 'DELETED\r\n';

      it('emits an `response` event when encountered', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (command, data) {
          expect(command).to.equal('DELETED');
          expect(data).to.equal(true);

          // should clear the cache
          process.nextTick(function () {
            expect(memcached.queue).to.equal('');
            done();
          });
        });

        memcached.write(data);
      });

      it('correctly cleans the queue', function (done) {
        var memcached = new Parser();

        memcached.on('response', function () {
          process.nextTick(function () {
            expect(memcached.queue).to.equal('BANANANANA');

            done();
          });
        });

        memcached.write(data+ 'BANANANANA');
      });
    });

    describe('END', function () {
      var data = 'END\r\n';

      it('emits an `response` event when encountered', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (command, data) {
          expect(command).to.equal('END');
          expect(data).to.equal(true);

          // should clear the cache
          process.nextTick(function () {
            expect(memcached.queue).to.equal('');

            done();
          });
        });

        memcached.write(data);
      });

      it('correctly cleans the queue', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (err) {
          process.nextTick(function () {
            expect(memcached.queue).to.equal('BANANANANA');

            done();
          });
        });

        memcached.write(data+ 'BANANANANA');
      });
    });

    describe('ERROR', function () {
      var data = 'ERROR\r\n';

      it('emits an `error` event when encountered', function (done) {
        var memcached = new Parser();

        memcached.on('error:response', function (err) {
          expect(err).to.be.an.instanceOf(Error);
          expect(err.message).to.include('Command not known');
          expect(err.message).to.include('by server');

          // should clear the cache
          process.nextTick(function () {
            expect(memcached.queue).to.equal('');

            done();
          });
        });

        memcached.write(data);
      });

      it('correctly cleans the queue', function (done) {
        var memcached = new Parser();

        memcached.on('error:response', function (err) {
          process.nextTick(function () {
            expect(memcached.queue).to.equal('BANANANANA');

            done();
          });
        });

        memcached.write(data+ 'BANANANANA');
      });
    });

    describe('EXISTS', function () {
      var data = 'EXISTS\r\n';

      it('emits an `response` event when encountered', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (command, data) {
          expect(command).to.equal('EXISTS');
          expect(data).to.equal(false);

          // should clear the cache
          process.nextTick(function () {
            expect(memcached.queue).to.equal('');

            done();
          });
        });

        memcached.write(data);
      });

      it('correctly cleans the queue', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (err) {
          process.nextTick(function () {
            expect(memcached.queue).to.equal('BANANANANA');

            done();
          });
        });

        memcached.write(data+ 'BANANANANA');
      });
    });

    describe('NOT_FOUND', function () {
      var data = 'NOT_FOUND\r\n';

      it('emits an `response` event when encountered', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (command, data) {
          expect(command).to.equal('NOT_FOUND');
          expect(data).to.equal(false);

          // should clear the cache
          process.nextTick(function () {
            expect(memcached.queue).to.equal('');

            done();
          });
        });

        memcached.write(data);
      });

      it('correctly cleans the queue', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (err) {
          process.nextTick(function () {
            expect(memcached.queue).to.equal('BANANANANA');

            done();
          });
        });

        memcached.write(data+ 'BANANANANA');
      });
    });

    describe('NOT_STORED', function () {
      var data = 'NOT_STORED\r\n';

      it('emits an `response` event when encountered', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (command, data) {
          expect(command).to.equal('NOT_STORED');
          expect(data).to.equal(false);

          // should clear the cache
          process.nextTick(function () {
            expect(memcached.queue).to.equal('');

            done();
          });
        });

        memcached.write(data);
      });

      it('correctly cleans the queue', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (err) {
          process.nextTick(function () {
            expect(memcached.queue).to.equal('BANANANANA');

            done();
          });
        });

        memcached.write(data+ 'BANANANANA');
      });
    });

    describe('OK', function () {
      var data = 'OK\r\n';

      it('emits an `response` event when encountered', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (command, data) {
          expect(command).to.equal('OK');
          expect(data).to.equal(true);

          // should clear the cache
          process.nextTick(function () {
            expect(memcached.queue).to.equal('');

            done();
          });
        });

        memcached.write(data);
      });

      it('correctly cleans the queue', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (err) {
          process.nextTick(function () {
            expect(memcached.queue).to.equal('BANANANANA');

            done();
          });
        });

        memcached.write(data+ 'BANANANANA');
      });
    });

    describe('SERVER_ERROR', function () {
      var data = 'SERVER_ERROR out of memory storing object with memcached\r\n';

      it('emits an `error` event when encountered', function (done) {
        var memcached = new Parser();

        memcached.on('error:response', function (err) {
          expect(err).to.be.an.instanceOf(Error);
          expect(err.message).to.include('out of memory');
          expect(err.message).to.include('storing object');

          // should clear the cache
          process.nextTick(function () {
            expect(memcached.queue).to.equal('');

            done();
          });
        });

        memcached.write(data);
      });

      it('correctly cleans the queue', function (done) {
        var memcached = new Parser();

        memcached.on('error:response', function (err) {
          process.nextTick(function () {
            expect(memcached.queue).to.equal('BANANANANA');

            done();
          });
        });

        memcached.write(data+ 'BANANANANA');
      });
    });

    describe('STAT', function () {
      var data = 'STAT listen_disabled_num 1000\r\n';

      it('emits an `response` event when encountered', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (command, key, value) {
          expect(command).to.equal('STAT');
          expect(key).to.equal('listen_disabled_num');
          expect(value).to.equal('1000');

          // should clear the cache
          process.nextTick(function () {
            expect(memcached.queue).to.equal('');

            done();
          });
        });

        memcached.write(data);
      });

      it('correctly cleans the queue', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (err) {
          process.nextTick(function () {
            expect(memcached.queue).to.equal('BANANANANA');

            done();
          });
        });

        memcached.write(data+ 'BANANANANA');
      });
    });

    describe('STORED', function () {
      var data = 'STORED\r\n';

      it('emits an `response` event when encountered', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (command, data) {
          expect(command).to.equal('STORED');
          expect(data).to.equal(true);

          // should clear the cache
          process.nextTick(function () {
            expect(memcached.queue).to.equal('');

            done();
          });
        });

        memcached.write(data);
      });

      it('correctly cleans the queue', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (err) {
          process.nextTick(function () {
            expect(memcached.queue).to.equal('BANANANANA');

            done();
          });
        });

        memcached.write(data+ 'BANANANANA');
      });
    });

    describe('TOUCHED', function () {
      var data = 'TOUCHED\r\n';

      it('emits an `response` event when encountered', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (command, data) {
          expect(command).to.equal('TOUCHED');
          expect(data).to.equal(true);

          // should clear the cache
          process.nextTick(function () {
            expect(memcached.queue).to.equal('');

            done();
          });
        });

        memcached.write(data);
      });

      it('correctly cleans the queue', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (err) {
          process.nextTick(function () {
            expect(memcached.queue).to.equal('BANANANANA');

            done();
          });
        });

        memcached.write(data+ 'BANANANANA');
      });
    });

    describe('VALUE', function () {
      var data = 'VALUE füübar 1 60 9\r\nпривет мир, Memcached и nodejs для победы\r\n';

      it('emits an `response` event when encountered', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (command, value, flags, cas, key) {
          expect(command).to.equal('VALUE');
          expect(value).to.equal('привет мир, Memcached и nodejs для победы');
          expect(flags).to.equal('1');
          expect(cas).to.equal('9');
          expect(key).to.equal('füübar');

          // should clear the cache
          process.nextTick(function () {
            expect(memcached.queue).to.equal('');

            done();
          });
        });

        memcached.write(data);
      });

      it('optionally parsers the cas value', function (done) {
        var data = 'VALUE füübar 123 60\r\nпривет мир, Memcached и nodejs для победы\r\n'
          , memcached = new Parser();

        memcached.on('response', function (command, value, flags, cas, key) {
          expect(command).to.equal('VALUE');
          expect(value).to.equal('привет мир, Memcached и nodejs для победы');
          expect(flags).to.equal('123');
          expect(key).to.equal('füübar');

          // should clear the cache
          process.nextTick(function () {
            expect(memcached.queue).to.equal('');

            done();
          });
        });

        memcached.write(data);
      });

      it('correctly cleans the queue', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (err) {
          process.nextTick(function () {
            expect(memcached.queue).to.equal('BANANANANA');

            done();
          });
        });

        memcached.write(data+ 'BANANANANA');
      });
    });

    describe('VERSION', function () {
      var data = 'VERSION 1.2.2\r\n';

      it('emits an `response` event when encountered', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (command, data) {
          expect(command).to.equal('VERSION');
          expect(data).to.equal('1.2.2');

          // should clear the cache
          process.nextTick(function () {
            expect(memcached.queue).to.equal('');

            done();
          });
        });

        memcached.write(data);
      });

      it('correctly cleans the queue', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (err) {
          process.nextTick(function () {
            expect(memcached.queue).to.equal('BANANANANA');

            done();
          });
        });

        memcached.write(data+ 'BANANANANA');
      });
    });

    describe('INCR/DECR', function () {
      var data = '131447\r\n';

      it('emits an `response` event when encountered', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (command, data) {
          expect(command).to.equal('INCR/DECR');
          expect(data).to.equal(131447);

          // should clear the cache
          process.nextTick(function () {
            expect(memcached.queue).to.equal('');

            done();
          });
        });

        memcached.write(data);
      });

      it('correctly cleans the queue', function (done) {
        var memcached = new Parser();

        memcached.on('response', function (err) {
          process.nextTick(function () {
            expect(memcached.queue).to.equal('BANANANANA');

            done();
          });
        });

        memcached.write(data+ 'BANANANANA');
      });
    });

    describe('INVALID response', function () {
      var data = 'END\r\nHELLO WORLD\r\n';

      it('emits an error event when it encounters invalid data', function (done) {
        var memcached = new Parser();

        memcached.on('error', function (err) {
          expect(err).to.be.instanceOf(Error);
          expect(err.code).to.equal('EPARSERFUCKUPLULZ');
          expect(err.data).to.equal('HELLO WORLD\r\n');

          // should clear the cache
          process.nextTick(function () {
            expect(memcached.queue).to.equal('');

            done();
          });
        });

        memcached.write(data);
      });

      it('correctly cleans the queue', function (done) {
        var memcached = new Parser();

        memcached.on('error', function (err) {
          process.nextTick(function () {
            expect(memcached.queue).to.equal('');

            done();
          });
        });

        memcached.write(data+ 'BANANANANA');
      });

      it('destroys the parser', function (done) {
        var memcached = new Parser();

        memcached.on('error', function (err) {
          expect(memcached.writable).to.equal(false);
          expect(memcached.destroyed).to.equal(true);

          done();
        });

        memcached.write(data);
      });
    });
  });

  describe('extendend protocol support', function () {
    describe('garantiadata.com', function () {
      describe('KEYS', function () {
        var data = 'KEY 4 four\r\n';

        it('emits an `response` event when encountered', function (done) {
          var memcached = new Parser();

          memcached.on('response', function (command, data) {
            expect(command).to.equal('KEY');
            expect(data).to.equal('four');

            // should clear the cache
            process.nextTick(function () {
              expect(memcached.queue).to.equal('');

              done();
            });
          });

          memcached.write(data);
        });

        it('correctly cleans the queue', function (done) {
          var memcached = new Parser();

          memcached.on('response', function (err) {
            process.nextTick(function () {
              expect(memcached.queue).to.equal('BANANANANA');

              done();
            });
          });

          memcached.write(data+ 'BANANANANA');
        });
      });
    });
  });
});
