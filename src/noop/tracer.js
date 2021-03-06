'use strict'

const Tracer = require('opentracing').Tracer
const Span = require('./span')

const span = new Span()

class NoopTracer extends Tracer {
  constructor (config) {
    super(config)

    let ScopeManager

    if (process.env.DD_CONTEXT_PROPAGATION === 'false') {
      ScopeManager = require('../scope/noop/scope_manager')
    } else {
      ScopeManager = require('../scope/scope_manager')
    }

    this._scopeManager = new ScopeManager()
  }

  trace (operationName, options, callback) {
    callback(this.startSpan())
  }

  scopeManager () {
    return this._scopeManager
  }

  currentSpan () {
    return null
  }

  _startSpan (name, options) {
    return span
  }
}

module.exports = NoopTracer
