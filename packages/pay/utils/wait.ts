/**
 * Wait for a given amount of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to wait.
 *
 * @returns {Promise<void>} A promise that resolves after the given amount of milliseconds.
 */
export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
