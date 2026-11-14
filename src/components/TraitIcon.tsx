import {
  Activity,
  Bone,
  Brain,
  Compass,
  Cpu,
  Dna,
  Ear,
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
  Zap,
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
    case 'bone':
      return <Bone {...props} />;
    case 'ear':
      return <Ear {...props} />;
    case 'zap':
      return <Zap {...props} />;
    case 'activity':
      return <Activity {...props} />;
    case 'sparkles':
    default:
      return <Sparkles {...props} />;
  }
}
