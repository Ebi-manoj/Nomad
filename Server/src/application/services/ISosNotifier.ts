import type { SosLogResDTO } from '../../domain/dto/SosDTO';

export interface ISosNotifier {
  notify(log: SosLogResDTO): Promise<void>;
}
