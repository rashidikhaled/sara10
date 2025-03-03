/**
 * how to using:
 * this.queues = new Queues({ delay: 100, cacheable: true, maxCacheCapacity: 50 })
 * this.queues.add(key1, request1, cb1)
 * this.queues.add(key2, request2, cb2)
 * this.queues.add(key3, request3, cb3)
 * await this.queues.run()
 * @returns {Promise<void>}
 */
export class Queues {
  constructor (options) {
    const {
      delay = 100,
      cacheable = true,
      maxCacheCapacity = 100
    } = options || {}

    this.queues = new Map()
    this._cache = new Map()
    this.cacheable = cacheable
    this.maxCacheCapacity = maxCacheCapacity
    this.timer = null
    this.delay = delay
    this.doneFunc = null

    this.executeQueue.bind(this)
  }

  clearCache () {
    this._cache.clear()
  }

  async executeAsync (key, func, cb) {
    return new Promise(async (resolve, reject) => {
      if (this.cacheable && this._cache.has(key)) {
        const result = this._cache.get(key)
        cb(result)
        return resolve()
      }

      if (typeof func !== "function") return resolve()

      try {
        const result = await func(cb)
        if (this.cacheable) {
          if (this._cache.size >= this.maxCacheCapacity) {
            this._cache.delete([...this._cache].at(0)[0])
          }
          this._cache.set(key, result)
        }
        cb(result)
        resolve(result)
      } catch (ex) {
        reject(ex)
      }
    })
  }

  async executeQueue () {
    // console.log("%%%%%%% ", this)
    if (this.queues.size) {
      const key = [...this.queues.keys()].at(0)
      const current = this.queues.get(key)
      // console.log(current)
      const { queue, cb } = current
      try {
        await this.executeAsync(key, queue, cb)
        // let result = await queue()
        // cb(result)
      } catch (ex) {
        console.log(ex)
      }
      // console.log("RESULT", result)

      this.queues.delete(key)

      this.timer = setTimeout(this.executeQueue.bind(this), this.delay)
    } else {
      this.stop()
    }
  }

  stop () {
    clearTimeout(this.timer)
    if (typeof this.doneFunc === "function") {
      this.doneFunc()
    }
  }

  clear () {
    this.stop()
    this.queues.clear()
  }

  async run () {
    const self = this
    return new Promise(async (resolve) => {
      this.doneFunc = resolve
      await self.executeQueue()
    })
  }

  add (key, queue, cb) {
    this.queues.set(key, {
      queue,
      cb
    })
  }

  remove (key) {
    this.queues.delete(key)
  }
}
