
interface SectionHeaderProps {
  icon: any;
  title: string;
}

export const SectionHeader = ({ icon: Icon, title }: SectionHeaderProps) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800">
      <Icon className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
    </div>
    <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-500">
      {title}
    </h3>
  </div>
);
