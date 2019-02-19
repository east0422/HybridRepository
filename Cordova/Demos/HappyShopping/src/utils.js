/**
 * Transform a function taking callbacks in front of all arguments,
 * to a function returning Promise and not taking callbacks.
 *
 * @param { function } f The function to be transformed
 */
export function cbPre (f) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      f(resolve, reject, ...args)
    })
  }
}

/**
 * Transform a function taking callbacks after other arguments,
 * to a function returning Promise and not taking callbacks.
 *
 * @param { function } f The function to be transformed
 */
export function cbPost (f) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      f(...args, resolve, reject)
    })
  }
}
