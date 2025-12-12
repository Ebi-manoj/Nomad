import type { SosLogResDTO } from '../../domain/dto/SosDTO';
import { ISosNotifier } from './ISosNotifier';
import { ISosContactRepository } from '../repositories/ISosContactRepository';
import { IEmailTransporter } from '../providers/IEmailTransporter';

export class SosEmailNotifier implements ISosNotifier {
  constructor(
    private readonly _sosContactRepository: ISosContactRepository,
    private readonly _emailTransporter: IEmailTransporter
  ) {}

  async notify(log: SosLogResDTO): Promise<void> {
    const contacts = await this._sosContactRepository.findByUserId(log.userId);
    const contactsWithEmail = contacts
      .map(c => c.getEmail())
      .filter((e): e is string => !!e && e.trim().length > 0);

    if (contactsWithEmail.length === 0) return;

    const subject = 'Emergency SOS Alert - Nomad';
    const { location } = log;
    const mapLink = location
      ? `https://maps.google.com/?q=${location.lat},${location.lng}`
      : undefined;

    const lines: string[] = [
      'An emergency SOS has been triggered.',
      log.bookingId ? `Booking ID: ${log.bookingId}` : undefined,
      log.rideId ? `Ride ID: ${log.rideId}` : undefined,
      mapLink ? `Live location: ${mapLink}` : undefined,
      '',
      'This is an automated alert from Nomad. Please reach out to the user immediately.',
    ].filter(Boolean) as string[];

    const text = lines.join('\n');
    const html = `
      <div>
        <p>An emergency <strong>SOS</strong> has been triggered.</p>
        ${
          log.bookingId
            ? `<p>Booking ID: <strong>${log.bookingId}</strong></p>`
            : ''
        }
        ${log.rideId ? `<p>Ride ID: <strong>${log.rideId}</strong></p>` : ''}
        ${
          mapLink
            ? `<p>Live location: <a href="${mapLink}">${mapLink}</a></p>`
            : ''
        }
        <p>This is an automated alert from <strong>Nomad</strong>. Please reach out to the user immediately.</p>
      </div>
    `;

    await Promise.all(
      contactsWithEmail.map(email =>
        this._emailTransporter.sendCustomEmail(email, subject, text, html)
      )
    );
  }
}
