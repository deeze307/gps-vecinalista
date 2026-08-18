import { Button, Icon } from '@/components/atoms';
import type { ContactInfo } from '@/types';
import { defaultGreeting, hasAnyContact, mailtoLink, telLink, whatsappLink } from '@/utils';
import styles from './ContactActions.module.css';

export interface ContactActionsProps {
  contact: ContactInfo;
  /** Para armar el saludo prellenado del WhatsApp. */
  representativeName: string;
  cityName: string;
  /** `hero` da el botón grande de WhatsApp; `compact` lo achica para listados. */
  layout?: 'hero' | 'compact';
}

/**
 * Bloque de contacto. WhatsApp es siempre el CTA principal y todo lo demás
 * queda subordinado: es la acción que resuelve el caso de uso real.
 */
export const ContactActions = ({
  contact,
  representativeName,
  cityName,
  layout = 'hero',
}: ContactActionsProps) => {
  if (!hasAnyContact(contact)) {
    return <p className={styles.empty}>Este referente todavía no cargó sus datos de contacto.</p>;
  }

  const size = layout === 'hero' ? 'lg' : 'sm';
  const { social } = contact;

  return (
    <div className={styles.stack}>
      {contact.whatsapp && (
        <Button
          as="a"
          href={whatsappLink(contact.whatsapp, defaultGreeting(representativeName, cityName))}
          target="_blank"
          variant="whatsapp"
          size={size}
          fullWidth
          iconLeft="whatsapp"
        >
          Contactar por WhatsApp
        </Button>
      )}

      <div className={styles.secondaryRow}>
        {contact.phone && (
          <Button as="a" href={telLink(contact.phone)} variant="outline" size="sm" iconLeft="phone">
            {layout === 'hero' ? contact.phone : 'Llamar'}
          </Button>
        )}
        {contact.email && (
          <Button
            as="a"
            href={mailtoLink(contact.email, `Contacto desde GPS Vecinalista — ${cityName}`)}
            variant="outline"
            size="sm"
            iconLeft="mail"
          >
            {layout === 'hero' ? 'Enviar email' : 'Email'}
          </Button>
        )}
      </div>

      {social && (social.facebook || social.instagram || social.website) && (
        <div className={styles.socialRow}>
          {social.facebook && (
            <a
              className={styles.socialLink}
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Facebook de ${representativeName}`}
            >
              <Icon name="facebook" />
            </a>
          )}
          {social.instagram && (
            <a
              className={styles.socialLink}
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram de ${representativeName}`}
            >
              <Icon name="instagram" />
            </a>
          )}
          {social.website && (
            <a
              className={styles.socialLink}
              href={social.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Sitio web de ${representativeName}`}
            >
              <Icon name="globe" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};
