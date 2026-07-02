import { Calendar } from 'lucide-react'
import { Clock } from 'lucide-react'
import { MapPin } from 'lucide-react'
import { MoveRight } from 'lucide-react'
import React from 'react'
export const FeaturedEvent = () => {
    return (
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden group glass h-[400px]">
            <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>

            <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="bg-accent text-content text-xs font-bold px-3 py-1 rounded uppercase tracking-wider mb-4 inline-block">
                    {event.badge}
                </span>
                <h3 className="font-heading font-bold text-3xl mb-2">{event.title}</h3>
                <p className="text-muted-foreground mb-6">{event.subtitle}</p>

                <div className="flex flex-wrap gap-6 mb-8 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><Calendar size={16} className="text-accent" /> {event.date}</div>
                    <div className="flex items-center gap-2"><MapPin size={16} className="text-accent" /> {event.location}</div>
                    <div className="flex items-center gap-2"><Clock size={16} className="text-accent" /> {event.time}</div>
                </div>

                <button className="bg-accent hover:bg-red-700 text-content px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-all">
                    LEARN MORE <MoveRight size={16} />
                </button>
            </div>
        </div>
    )
}
