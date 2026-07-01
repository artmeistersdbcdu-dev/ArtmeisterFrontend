
export function CategoryItem({ icon, title, subtitle, active }) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer p-2 rounded-xl hover:bg-overlay/5 transition-colors">
      <div className={`p-3 rounded-xl transition-all duration-300 ${active ? 'bg-accent/10 shadow-[0_0_15px_rgba(229,9,20,0.3)]' : 'bg-overlay/5 group-hover:bg-overlay/10'}`}>
        {icon}
      </div>
      <div>
        <h4 className={`font-heading font-bold text-lg leading-tight ${active ? 'text-content' : 'text-gray-300 group-hover:text-content transition-colors'}`}>{title}</h4>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}