import type { LucideIcon } from 'lucide-react';
import {
  Calculator, ArrowLeftRight, TrendingUp, Target, Percent, Tag, LineChart,
  Users, Package, UserPlus, Megaphone, Fuel, Clock, Calendar, ChefHat, Palette,
  Square, Hourglass, Gift, Coffee, Cpu, Layers, BarChart, TrendingDown, Receipt,
  Image, Repeat, Briefcase, Divide, Dices, GitMerge, Compass, Binary, Sigma,
  Hash, Zap, GraduationCap, Award, FileCheck, BookOpen, Weight, Trophy,
  UserCheck, Book, Activity, Apple, PieChart, Heart, Scale, Droplet, Baby,
  Timer, Dumbbell, Moon, Cake, GitBranch, Plug, RotateCw, Ruler, Settings,
  Landmark, Home, BadgeCheck, PiggyBank, Lock, Coins, CreditCard, Wallet,
  Utensils, FileText, Shield, Umbrella, FunctionSquare,
} from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  TrendingUp, Target, Percent, Tag, LineChart, Users, Package, UserPlus, Megaphone,
  Fuel, Clock, Calendar, ChefHat, Palette, Square, Hourglass, Gift, Coffee, Cpu,
  Layers, BarChart, TrendingDown, Receipt, Image, Repeat, Briefcase, Divide, Dices,
  GitMerge, Compass, Binary, Sigma, Hash, Zap, GraduationCap, Award, FileCheck,
  BookOpen, Weight, Trophy, UserCheck, Book, Activity, Apple, PieChart, Heart, Scale,
  Droplet, Baby, Timer, Dumbbell, Moon, Cake, GitBranch, Plug, RotateCw, Ruler,
  Settings, Landmark, Home, BadgeCheck, PiggyBank, Lock, Coins, CreditCard, Wallet,
  Utensils, FileText, Shield, Umbrella, FunctionSquare, ArrowLeftRight, Calculator,
};

export const CATEGORY_GRADIENTS: Record<string, string> = {
  finance:      'from-primary-dim to-primary',
  health:       'from-tertiary-dim to-tertiary',
  math:         'from-secondary-dim to-secondary',
  crypto:       'from-primary to-secondary',
  engineering:  'from-secondary to-tertiary',
  'daily-life': 'from-primary to-tertiary',
  education:    'from-secondary to-primary',
  business:     'from-tertiary to-primary',
};

const SIZES = {
  sm: { wrap: 'w-10 h-10 rounded-xl',  icon: 'w-4 h-4' },
  md: { wrap: 'w-12 h-12 rounded-xl',  icon: 'w-5 h-5' },
  lg: { wrap: 'w-16 h-16 rounded-2xl', icon: 'w-7 h-7' },
};

interface Props {
  icon: string;
  category: string;
  size?: 'sm' | 'md' | 'lg';
  idle?: boolean; // always-on subtle animation (for detail pages)
}

export default function CalculatorIcon({ icon, category, size = 'md', idle = false }: Props) {
  const IconComponent = ICON_MAP[icon] ?? Calculator;
  const gradient = CATEGORY_GRADIENTS[category] ?? 'from-primary-dim to-primary';
  const { wrap, icon: iconSize } = SIZES[size];

  return (
    <div
      className={`${wrap} bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg icon-anim-${category} ${idle ? 'icon-idle' : ''}`}
    >
      <IconComponent className={`${iconSize} text-white icon-inner`} strokeWidth={2} />
    </div>
  );
}
