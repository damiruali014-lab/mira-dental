// Contact details for the (fictional) clinic. Swap these for a real client's details.
export const SITE_URL = 'https://mira-dental.vercel.app'
export const WHATSAPP_NUMBER = '77000000000'
export const PHONE_DISPLAY = '+7 700 000 00 00'
export const PHONE_TEL = '+77000000000'
export const EMAIL = 'hello@miradental.example'
export const MAP = { lat: 43.2353, lon: 76.9566 }
export const MAP_LINK = `https://www.openstreetmap.org/?mlat=${MAP.lat}&mlon=${MAP.lon}#map=17/${MAP.lat}/${MAP.lon}`
export const AUTHOR_URL = 'https://damiruali014-lab.github.io'

/** Opening hours by weekday (0 = Sunday), in Almaty time. null = closed. */
export const HOURS: Record<number, [number, number] | null> = {
  0: null,
  1: [9, 20],
  2: [9, 20],
  3: [9, 20],
  4: [9, 20],
  5: [9, 20],
  6: [10, 17],
}

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/** 18000 → "18 000 ₸" with non-breaking spaces so prices never wrap. */
export function tenge(amount: number) {
  return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₸`
}
