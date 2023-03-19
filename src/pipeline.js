// From https://muniftanjim.dev/blog/basic-middleware-pattern-in-javascript/

function Pipeline(...middlewares) {
    const stack = middlewares
  
    const push = (...middlewares) => {
      stack.push(...middlewares)
    }
  
    const execute = async (context) => {
      let prevIndex = -1
  
      const runner = async (index) => {
        if (index === prevIndex) {
          throw new Error('next() called multiple times')
        }
  
        prevIndex = index
  
        const middleware = stack[index]
  
        if (middleware) {
          await middleware(context, () => {
            return runner(index + 1)
          })
        }
      }
  
      await runner(0)
      return context
    }
  
    return { push, execute }
  }

  export { Pipeline }