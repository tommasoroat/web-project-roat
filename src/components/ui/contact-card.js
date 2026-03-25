import React from 'react';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';

export function ContactCard({
	title = 'Contact With Us',
	description = 'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.',
	contactInfo,
	className,
	formSectionClassName,
	children,
	...props
}) {
	return (
		<div
			className={cn(
				'bg-white/50 backdrop-blur-xl border border-surface-600/50 rounded-2xl relative grid h-full w-full shadow-xl md:grid-cols-2 lg:grid-cols-3 overflow-hidden',
				className,
			)}
			{...props}
		>
			<PlusIcon className="absolute -top-3 -left-3 h-6 w-6 text-primary/30" strokeWidth={1.5} aria-hidden="true" />
			<PlusIcon className="absolute -top-3 -right-3 h-6 w-6 text-primary/30" strokeWidth={1.5} aria-hidden="true" />
			<PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6 text-primary/30" strokeWidth={1.5} aria-hidden="true" />
			<PlusIcon className="absolute -right-3 -bottom-3 h-6 w-6 text-primary/30" strokeWidth={1.5} aria-hidden="true" />
            
			<div className="flex flex-col justify-between lg:col-span-1 border-b md:border-b-0 md:border-r border-surface-600/30 bg-gradient-to-br from-white/70 to-surface-50/30">
				<div className="relative h-full space-y-6 px-6 py-10 md:p-10">
					<h2 className="text-3xl font-extrabold md:text-4xl text-text-primary">
						{title}
					</h2>
					<div className="text-text-secondary text-sm md:text-base leading-relaxed max-w-sm" dangerouslySetInnerHTML={{ __html: description }} />
                    
                    <div className="w-12 h-1 bg-primary/20 rounded-full my-8"></div>

					<div className="grid gap-6">
						{contactInfo?.map((info, index) => (
							<ContactInfo key={index} {...info} />
						))}
					</div>
				</div>
			</div>

			<div
				className={cn(
					'bg-white/20 flex h-full w-full items-center p-6 sm:p-8 md:p-10 lg:col-span-2 relative',
					formSectionClassName,
				)}
			>
                {/* Decorative blob behind form */}
                <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10 pointer-events-none" aria-hidden="true"></div>
                <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/5 rounded-full blur-[60px] -z-10 pointer-events-none" aria-hidden="true"></div>
				
                <div className="w-full relative z-10">
                    {children}
                </div>
			</div>
		</div>
	);
}

function ContactInfo({
	icon: Icon,
	label,
	value,
	className,
	...props
}) {
	return (
		<div className={cn('flex items-start gap-4', className)} {...props}>
			<div className="bg-primary/10 rounded-xl p-3 text-primary shrink-0 transition-transform hover:scale-105 hover:bg-primary/20">
				<Icon className="h-5 w-5" strokeWidth={2} />
			</div>
			<div className="flex-1">
				<p className="font-bold text-text-primary text-sm mb-1">{label}</p>
				<div className="text-text-secondary text-sm leading-snug prose prose-sm max-w-none prose-p:my-0 prose-strong:text-text-primary" dangerouslySetInnerHTML={{ __html: value }} />
			</div>
		</div>
	);
}
