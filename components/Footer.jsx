import { Heart } from 'lucide-react'
import { Send } from 'lucide-react'
import React from 'react'
import data from "@/data.json";

const footer = data.footer;

export const Footer = () => {
    return (
        <footer className="border-t border-overlay/10 pt-16 pb-8 bg-frosty">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-center">
                        <div className="flex items-center gap-3 mb-6 justify-center">
                            <div className="w-10 h-10 bg-accent text-content font-heading font-bold text-xl flex items-center justify-center transform -skew-x-12">
                                {data.logoLetter}
                            </div>
                            <span className="font-heading font-bold text-xl tracking-wider">{data.siteName}</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {footer.description}
                        </p>
                        <div className="flex gap-4 justify-center">
                            {footer.socialLinks.map((social) => (
                                <a key={social.platform} href={social.href} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-accent transition-colors">
                                    <img src={social.icon} alt={social.platform} width="18" height="18" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-overlay/10 text-xs text-gray-500">
                    <p>{footer.copyright}</p>
                    <p className="mt-2 md:mt-0 flex items-center gap-1">Designed with <Heart size={12} className="text-accent" /> by Art Meisters Team</p>
                </div>
            </div>
        </footer>
    )
}
