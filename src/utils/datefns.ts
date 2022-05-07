import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import _ from 'lodash';

export function formatDate(date): string {
  const initialDate = format(new Date(date), 'dd MMM yyyy', {
    locale: ptBR,
  });

  const dateSplitted = initialDate.split(' ');

  const formattedDate = dateSplitted.map(piece => _.capitalize(piece));

  return formattedDate.join(' ');
}
