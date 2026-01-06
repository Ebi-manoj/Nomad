export const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ElementType;
  gradient: string;
  subtitle?: string;
}> = ({ title, value, icon: Icon, gradient, subtitle }) => (
  <div
    className={`relative overflow-hidden rounded-2xl p-6 ${gradient} text-white shadow-lg`}
  >
    <div className="absolute top-0 right-0 opacity-10">
      <Icon className="w-32 h-32" />
    </div>
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5" />
        <p className="text-sm font-medium opacity-90">{title}</p>
      </div>
      <h3 className="text-3xl font-bold mb-1">{value}</h3>
      {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
    </div>
  </div>
);
