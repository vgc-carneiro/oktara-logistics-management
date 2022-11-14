function flatObject(object: any, prefix = ''): Record<string, any> {
  return Object.entries(object).reduce((acc, [key, val]) => {
    if (!val) return acc
    if (typeof val === 'object' && !Array.isArray(val)) {
      const nested = flatObject(val, `${prefix}${key}.`)
      return { ...acc, ...nested }
    } else {
      return { ...acc, [prefix + key]: val }
    }
  }, {})
}

export function formatUrlSearchParams(value: Record<string, any>) {
  const flatten = flatObject(value)
  return new URLSearchParams(flatten)
}
