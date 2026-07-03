import Link from 'next/link';

export function ArtistCard({ 
    id, 
    name, 
    role, 
    imageSrc, 
    imageAlt = "Card image", 
    actionLinks = [], // Array of objects: { href: '', iconSrc: '', label: '' }
    children // For adding badges, tags, or extra content dynamically
}) {
    return (
        <div className="glass rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(229,9,20,0.1)] hover:border-overlay/20 flex flex-col h-full">
            {/* Clickable Card Body */}
            <Link href={`/u/${id}`} className="flex-1 flex flex-col w-full">
                {/* Image Container */}
                <div className="h-64 overflow-hidden relative w-full">
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        /* Gray placeholder block if no image source is provided */
                        <div className="w-full h-full bg-overlay/10 animate-pulse" />
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-1 flex flex-col">
                    {name && (
                        <h3 className="font-heading font-bold text-xl mb-1 truncate">
                            {name}
                        </h3>
                    )}
                    
                   

                    {/* Slot for custom components like RoleBadges, tags, or prices */}
                    {children && (
                        <div className="mt-auto pt-2">
                            {children}
                        </div>
                    )}
                </div>
            </Link>
            
            {/* Action/Social Links Footer */}
            {actionLinks && actionLinks.length > 0 && (
                <div className="px-6 pb-6 mt-auto">
                    <div className="flex gap-3">
                        {actionLinks.map((link, index) => (
                            <a 
                                key={index}
                                href={link.href} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-8 h-8 rounded border border-overlay/10 flex items-center justify-center text-muted-foreground hover:text-content hover:border-accent hover:bg-accent/10 transition-colors"
                                title={link.label}
                            >
                                <img src={link.iconSrc} alt="" width="14" height="14" />
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}