import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  Search, 
  Bell, 
  Menu,
  X,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Activity,
  CreditCard
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data
const chartData = [
  { name: 'Mon', revenue: 4000, users: 2400 },
  { name: 'Tue', revenue: 3000, users: 1398 },
  { name: 'Wed', revenue: 9800, users: 4800 },
  { name: 'Thu', revenue: 3908, users: 3908 },
  { name: 'Fri', revenue: 4800, users: 4800 },
  { name: 'Sat', revenue: 3800, users: 3800 },
  { name: 'Sun', revenue: 4300, users: 4300 },
];

const transactions = [
    { id: 1, user: "Alice Walker", amount: "+$240.00", status: "Success", date: "2 mins ago", icon: DollarSign },
    { id: 2, user: "Robert Fox", amount: "+$120.50", status: "Pending", date: "15 mins ago", icon: CreditCard },
    { id: 3, user: "Guy Hawkins", amount: "-$32.00", status: "Failed", date: "1 hour ago", icon: Activity },
];

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Header />
        
        <main className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
                        <p className="text-slate-500 mt-1">Welcome back, here's what's happening today.</p>
                    </div>
                    <div className="flex gap-3">
                         <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">Download Report</button>
                         <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">Add Widget</button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Revenue" value="$45,231.89" trend="+20.1%" trendUp={true} icon={<DollarSign className="w-5 h-5 text-emerald-600" />} />
                    <StatCard title="Active Users" value="2,350" trend="+15.2%" trendUp={true} icon={<Users className="w-5 h-5 text-blue-600" />} />
                    <StatCard title="Bounce Rate" value="42.3%" trend="-4.5%" trendUp={false} icon={<Activity className="w-5 h-5 text-rose-600" />} />
                    <StatCard title="Active Subs" value="573" trend="+12.5%" trendUp={true} icon={<CreditCard className="w-5 h-5 text-indigo-600" />} />
                </div>

                {/* Chart & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Chart */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
                    >
                        <h3 className="text-lg font-semibold mb-6">Revenue & Traffic</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        itemStyle={{ color: '#1e293b' }}
                                    />
                                    <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                    <Area type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Recent Transactions */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 className="text-lg font-semibold mb-6">Recent Transactions</h3>
                        <div className="space-y-4">
                            {transactions.map((t, i) => (
                                <motion.div 
                                    key={t.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                                            <t.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">{t.user}</p>
                                            <p className="text-xs text-slate-500">{t.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-medium ${t.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-900'}`}>{t.amount}</p>
                                        <p className={`text-xs ${t.status === 'Success' ? 'text-emerald-500' : t.status === 'Pending' ? 'text-amber-500' : 'text-slate-400'}`}>{t.status}</p>
                                    </div>
                                </motion.div>
                            ))}
                            <button className="w-full mt-4 py-2 text-sm text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition-colors">View All Transactions</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}

function Sidebar({ isOpen, setIsOpen }) {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: BarChart3, label: "Analytics", active: false },
    { icon: Users, label: "Customers", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <motion.aside 
        initial={false}
        animate={{ width: isOpen ? 256 : 80 }}
        className="fixed left-0 top-0 h-full bg-white border-r border-slate-200 z-50 flex flex-col shadow-xl shadow-slate-200/50"
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            {isOpen && <span className="font-bold text-xl text-slate-900">Nebula</span>}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
            <button key={item.label} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${item.active ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                <item.icon className="w-5 h-5 shrink-0" />
                {isOpen && <span className="font-medium">{item.label}</span>}
            </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button className="flex items-center gap-3 w-full px-3 py-3 hover:bg-slate-50 rounded-xl transition-colors text-slate-500">
             <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
             </div>
             {isOpen && (
                 <div className="text-left overflow-hidden">
                     <p className="text-sm font-medium text-slate-900 truncate">Alex Morgon</p>
                     <p className="text-xs text-slate-400 truncate">alex@nebula.com</p>
                 </div>
             )}
        </button>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-600 shadow-sm hover:shadow-md transition-all"
      >
        {isOpen ? <Menu className="w-3 h-3" /> : <Menu className="w-3 h-3" />}
      </button>
    </motion.aside>
  );
}

function Header() {
    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
            {/* Search */}
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-200 w-96 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                <Search className="w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search analytics..." className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400" />
                <span className="text-xs text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">⌘K</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>
            </div>
        </header>
    );
}

function StatCard({ title, value, trend, trendUp, icon }) {
    return (
        <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-white group-hover:shadow-md transition-all">
                    {icon}
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {trend}
                </div>
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
            </div>
        </motion.div>
    );
}

