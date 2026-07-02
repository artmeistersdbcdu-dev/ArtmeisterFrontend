import Link from 'next/link';
import { RoleBadge } from "./RoleBadge";

export function ArtistCard({ id, name, role, img, instagram, youtube }) {

    
    return (
        <div className="glass rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(229,9,20,0.1)] hover:border-overlay/20 flex flex-col h-full">
            <Link href={`/u/${id}`} className="flex-1 flex flex-col">
                <div className="h-64 overflow-hidden relative">
                    <img
                        src={img}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-heading font-bold text-xl mb-1">{name}</h3>
                    <RoleBadge role={role} />
                </div>
            </Link>
            <div className="px-6 pb-6 mt-auto">
                <div className="flex gap-3">
                    <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded border border-overlay/10 flex items-center justify-center text-muted-foreground hover:text-content hover:border-accent hover:bg-accent/10 transition-colors">
                        <img src="/instagram.svg" alt="Instagram" width="14" height="14" />
                    </a>
                    <a href={youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded border border-overlay/10 flex items-center justify-center text-muted-foreground hover:text-content hover:border-accent hover:bg-accent/10 transition-colors">
                        <img src="/youtube.svg" alt="YouTube" width="14" height="14" />
                    </a>
                </div>
            </div>
        </div>
    );
}
