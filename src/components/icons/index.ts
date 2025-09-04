// Base Icon component
export { Icon, type IconProps, type BaseIconProps } from './Icon';

// Individual icons
export { CheckIcon } from './CheckIcon';
export { OpenNavIcon } from './OpenNavIcon';
export { CloseIcon } from './CloseIcon';
export { CloseNavIcon } from './CloseNavIcon';
export { VarmeverketIcon } from './VarmeverketIcon';

// Icon name type for type safety
export type IconName =
  | 'check'
  | 'open-nav'
  | 'close'
  | 'close-nav'
  | 'varmeverket';

// Icon mapping for dynamic usage
import { CheckIcon } from './CheckIcon';
import { OpenNavIcon } from './OpenNavIcon';
import { CloseIcon } from './CloseIcon';
import { CloseNavIcon } from './CloseNavIcon';
import { VarmeverketIcon } from './VarmeverketIcon';
import { IconProps } from './Icon';

export const ICONS: Record<IconName, React.ComponentType<IconProps>> = {
  check: CheckIcon,
  'open-nav': OpenNavIcon,
  close: CloseIcon,
  'close-nav': CloseNavIcon,
  varmeverket: VarmeverketIcon,
};
