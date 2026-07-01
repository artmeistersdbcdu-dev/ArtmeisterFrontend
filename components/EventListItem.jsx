import { MoveRight } from "lucide-react";
import Link from "next/link";

export function EventListItem({ id, date, month, title, desc, active }) {
    return (
        <Link href={`/event/${id}`} className={`glass rounded-2xl p-6 flex items-center gap-6 cursor-pointer transition-all duration-300 ${active ? 'border-accent/30 shadow-[0_0_20px_rgba(229,9,20,0.1)]' : 'hover:border-overlay/20 hover:bg-overlay/5'}`}>
            <div className="text-center  min-w-[60px]">
                <div className={`font-heading font-bold text-3xl leading-none ${active ? 'text-accent' : 'text-content'}`}>{date}</div>
                <div className="text-xs font-bold tracking-widest text-gray-500 mt-1">{month}</div>
            </div>
            <div className="w-px h-12 bg-overlay/10"></div>
            <div className="flex-1">
                <h4 className="font-heading font-bold text-xl mb-1 text-red-500">{title}</h4>
                <p className="text-sm text-gray-400">{desc.slice(0,45)}....</p>
            </div>
            <MoveRight className={`transition-transform duration-300 ${active ? 'text-accent' : 'text-gray-600'} ${active ? 'translate-x-0' : '-translate-x-2'}`} size={20} />
        </Link>
    );
}