import { getGeo } from "./getGeo"
import { getWhoami } from "./getWhoami"
import { getUA } from "./useUA"

type AnyFunction = (...args: any[]) => any

function memoize<T extends AnyFunction>(
  func: T,
  resolver?: (...args: Parameters<T>) => any,
): T & { cache: Map<any, any> } {
  if (
    typeof func !== "function" ||
    (resolver != null && typeof resolver !== "function")
  ) {
    throw new TypeError("Expected a function")
  }

  const memoized = function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver.apply(this, args) : args[0]
    const cache = memoized.cache

    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = func.apply(this, args)
    memoized.cache = cache.set(key, result) || cache
    return result
  } as T & { cache: Map<any, any> }

  memoized.cache = new (memoize.Cache || Map)()
  return memoized
}

memoize.Cache = Map

export const getInfo = memoize(async () => {
  const info = await getWhoami()
  const { longitude, latitude } = info

  const geo = await getGeo({ longitude, latitude })

  const location = geo.data.city.name

  const ua = getUA()

  return {
    ...info,
    location,
    ...ua,
  }
})
