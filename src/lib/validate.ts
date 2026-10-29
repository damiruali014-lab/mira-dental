export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
export const digitCount = (v: string) => v.replace(/\D/g, '').length
