import {
  Brain,
  Compass,
  Cpu,
  Dna,
  Eye,
  Feather,
  Flame,
  Footprints,
  Hand,
  Heart,
  Layers,
  Leaf,
  Shell,
  Shield,
  Sparkles,
  Sprout,
  Users,
  Waves,
  Wind,
  type LucideProps,
} from 'lucide-react';
import type { TraitIconName } from '../data/treeOfLifeData';

interface TraitIconProps extends LucideProps {
  name: TraitIconName;
}

export function TraitIcon({ name, ...props }: TraitIconProps) {
  switch (name) {
    case 'dna':
      return <Dna {...props} />;
    case 'cpu':
      return <Cpu {...props} />;
    case 'leaf':
      return <Leaf {...props} />;
    case 'layers':
      return <Layers {...props} />;
    case 'shield':
      return <Shield {...props} />;
    case 'footprints':
      return <Footprints {...props} />;
    case 'wind':
      return <Wind {...props} />;
    case 'flame':
      return <Flame {...props} />;
    case 'heart':
      return <Heart {...props} />;
    case 'hand':
      return <Hand {...props} />;
    case 'eye':
      return <Eye {...props} />;
    case 'brain':
      return <Brain {...props} />;
    case 'users':
      return <Users {...props} />;
    case 'compass':
      return <Compass {...props} />;
    case 'waves':
      return <Waves {...props} />;
    case 'feather':
      return <Feather {...props} />;
    case 'sprout':
      return <Sprout {...props} />;
    case 'shell':
      return <Shell {...props} />;
    case 'sparkles':
    default:
      return <Sparkles {...props} />;
  }
}
