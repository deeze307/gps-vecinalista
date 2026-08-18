import { provincesService } from '@/services';
import { useAsync } from './useAsync';

export const useProvinces = () => useAsync(() => provincesService.getAll(), []);
