/*
 * Wait for a given amount of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to wait.
 */
export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
