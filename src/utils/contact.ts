import type { ContactInfo } from '@/types';

/** Deja sólo dígitos: wa.me no acepta símbolos ni espacios. */
const digitsOnly = (value: string): string => value.replace(/\D/g, '');

/**
 * Link de WhatsApp con mensaje prellenado.
 * Es el CTA principal de todo el producto, así que vive en un solo lugar.
 */
export const whatsappLink = (phone: string, message?: string): string => {
  const base = `https://wa.me/${digitsOnly(phone)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const telLink = (phone: string): string => `tel:+${digitsOnly(phone)}`;

export const mailtoLink = (email: string, subject?: string): string =>
  subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;

/** Mensaje por defecto del CTA de WhatsApp. */
export const defaultGreeting = (repName: string, cityName: string): string =>
  `¡Hola ${repName}! Te escribo desde GPS Vecinalista. Soy parte de la red y voy a estar viajando a ${cityName}. ¿Podemos coordinar un encuentro?`;

/** ¿Tiene al menos un canal de contacto cargado? */
export const hasAnyContact = (contact: ContactInfo): boolean =>
  Boolean(
    contact.whatsapp ||
      contact.phone ||
      contact.email ||
      contact.social?.facebook ||
      contact.social?.instagram ||
      contact.social?.website,
  );
