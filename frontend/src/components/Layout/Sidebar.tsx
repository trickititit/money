import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  ChartBarIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  ArrowsRightLeftIcon,
  ChartPieIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  BanknotesIcon as BanknotesIconSolid,
  BuildingOfficeIcon as BuildingOfficeIconSolid,
  CurrencyDollarIcon as CurrencyDollarIconSolid,
  SparklesIcon as SparklesIconSolid,
  ArrowsRightLeftIcon as ArrowsRightLeftIconSolid,
  ChartPieIcon as ChartPieIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid
} from '@heroicons/react/24/solid';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconSolid: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, iconSolid: HomeIconSolid },
  { name: 'Stocks', href: '/assets/stocks', icon: ChartBarIcon, iconSolid: ChartBarIconSolid },
  { name: 'Real Estate', href: '/assets/real-estate', icon: BuildingOfficeIcon, iconSolid: BuildingOfficeIconSolid },
  { name: 'Cryptocurrency', href: '/assets/crypto', icon: CurrencyDollarIcon, iconSolid: CurrencyDollarIconSolid },
  { name: 'Cash', href: '/assets/cash', icon: BanknotesIcon, iconSolid: BanknotesIconSolid },
  { name: 'Precious Metals', href: '/assets/precious-metals', icon: SparklesIcon, iconSolid: SparklesIconSolid },
  { name: 'Transactions', href: '/transactions', icon: ArrowsRightLeftIcon, iconSolid: ArrowsRightLeftIconSolid },
  { name: 'Analytics', href: '/analytics', icon: ChartPieIcon, iconSolid: ChartPieIconSolid },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon, iconSolid: Cog6ToothIconSolid },
];

const Sidebar: React.FC = () => {
  return (
    <div className="fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg">
      <div className="flex flex-col h-full pt-20"> {/* pt-20 to account for header height */}
        {/* Navigation */}
        <nav className="flex-1 px-4 pb-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <item.iconSolid className="mr-3 h-5 w-5 flex-shrink-0" />
                  ) : (
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  )}
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Portfolio Summary */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-2">Total Portfolio Value</div>
            <div className="text-2xl font-bold text-gray-900">$0.00</div>
            <div className="text-sm text-gray-500 mt-1">
              <span className="text-green-600">+0.00% today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;