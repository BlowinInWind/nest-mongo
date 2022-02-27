import { SetMetadata } from '@nestjs/common';
import { KEEP_KEY } from '../constants';

export const Keep = () => SetMetadata(KEEP_KEY, true);
