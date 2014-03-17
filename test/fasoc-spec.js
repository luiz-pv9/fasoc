var fc = require('../fasoc.js');
var should = require('should');

describe("fasoc module", function() {
  describe("#attrGetterSetter", function() {

    it("exists", function() {
      fc.attrGetterSetter.should.be.ok;
    });

    describe('common usage', function() {
      var context = {};
      beforeEach(function() {
        fc.attrGetterSetter(context, 'width');
      });

      it("sets a value and returns the context", function() {
        context.width(40).should.equal(context);
      });

      it("gets a value", function() {
        context.width(40);
        context.width().should.equal(40);
      });
    });

    it("sets with default value", function() {
      var context = {};
      fc.attrGetterSetter(context, 'width', {defaultValue: 30});
      context.width().should.equal(30);
    });

    it("accepts valid value", function() {
      var context = {};
      fc.attrGetterSetter(context, 'width', {accept: function(v) {
        return v > 20;
      }});
      context.width(15).should.be.false;
      should.not.exist(context.width());
      context.width(21).should.equal(context);
    });

  });

  describe('#listGetterSetter', function() {
    describe('common usage', function() {
      var context = {};
      beforeEach(function() {
        fc.listGetterSetter(context, 'books');
      });

      it('adds a value to the list', function() {
        context.books('Harry Potter').should.equal(context);
      });

      it('overrides the list', function() {
        context.books(['Harry', 'Potter']).should.equal(context);
        context.books().should.eql(['Harry', 'Potter']);
      });

      it('gets the list', function() {
        context.books('Harry Potter');
        context.books().should.eql(['Harry Potter']);
      });
    });
    describe('push strategy', function() {
      var context = {};
      beforeEach(function() {
        fc.listGetterSetter(context, 'books', {strategy: 'push'});
      });
      it("pushes repeated values", function() {
        context.books('foo');
        context.books('foo');
        context.books().should.eql(['foo', 'foo']);
      });
    });
    describe('toggle strategy', function() {
      var context = {};
      beforeEach(function() {
        fc.listGetterSetter(context, 'books', {strategy: 'toggle'});
      });
      it('toggle repeated values', function() {
        context.books('foo');
        context.books().should.eql(['foo']);
        context.books('foo');
        context.books().should.eql([]);
        context.books('foo');
        context.books().should.eql(['foo']);
      });
    });
    describe("accept function", function() {
      var context = {};
      beforeEach(function() {
        fc.listGetterSetter(context, 'books', {strategy: 'toggle', accept: function(v) {
          return v > 20;
        }});
      });
      it("runs the accept function", function() {
        context.books(10).should.be.false;
        context.books(21).should.equal(context);
        context.books().should.eql([21]); // does not register 10
      });
    });
  });

  describe("#hashListGetterSetter", function() {
    describe('common usage', function() {

      var context = {};
      beforeEach(function() {
        fc.hashListGetterSetter(context, 'style', {
          attributes: ['name', 'value']
        });
      });

      it('sets through attributes', function() {
        context.style('border', 'red').should.equal(context);
        context.style().should.eql([{name: 'border', value: 'red'}]);
      });

      it('sets through object', function() {
        context.style({name: 'border', value: 'red'}).should.equal(context);
        context.style().should.eql([{name: 'border', value: 'red'}]);
      });

      it('sets an array', function() {
        context.style([{name: 'border', value: 'red'}]).should.equal(context);
        context.style().should.eql([{name: 'border', value: 'red'}]);
      });

      it('gets all styles', function() {
        context.style('border', 'red').should.equal(context);
        context.style().should.eql([{name: 'border', value: 'red'}]);
      });

      it('gets all hashes by id', function() {
        context.style('border', 'red').should.equal(context);
        context.style('border').should.eql({name: 'border', value: 'red'});
        context.style('border', 'blue').should.equal(context);
        context.style('border').should.eql([
          {name: 'border', value: 'red'},
          {name: 'border', value: 'blue'}
        ]);
      });
    });

    describe('replace strategy', function() {
      var context = {};
      beforeEach(function() {
        fc.hashListGetterSetter(context, 'style', {
          attributes: ['name', 'value'],
          strategy: 'replace'
        });
      });

      it('replaces a hash if id is already in list by attributes', function() {
        context.style('color', 'red');
        context.style('color', 'blue');
        context.style().should.eql([{name: 'color', value: 'blue'}]);
      });

      it('replaces a hash if id is already in list by object', function() {
        context.style('color', 'red');
        context.style({name: 'color', value: 'blue'});
        context.style().should.eql([{name: 'color', value: 'blue'}]);
      });
    });
  });

  describe('#hashGetterSetter', function() {
    var context = {};
    describe('common usage', function() {
      beforeEach(function() {
        fc.hashGetterSetter(context, 'place');
      });

      it('writes in the hash', function() {
        context.place('brazil', 'blue').should.equal(context);
      });

      it('gets the content', function() {
        context.place('brazil', 'blue');
        context.place('brazil').should.equal('blue');
      });

      it('gets the whole hash', function() {
        context.place('brazil', 'blue');
        context.place().should.eql({'brazil': 'blue'});
      });

      it('accepts an accept function', function() {
        fc.hashGetterSetter(context, 'place', {
          accept: function(v) {
            return v > 20;
          }
        });
        context.place('brazil', 15).should.be.false;
        context.place('brazil', 21).should.equal(context);
      });
    });
  });
});