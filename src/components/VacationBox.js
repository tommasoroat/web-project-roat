import Image from 'next/image';

export default function VacationBox({ message }) {
    return (
        <div className="glass-card p-8 text-center">
            <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-6">
                <Image
                    src="/sea-holydays.png"
                    alt="Spiaggia con mare e sole — siamo in vacanza"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <p className="text-text-primary font-bold text-xl sm:text-2xl leading-relaxed">
                {message}
            </p>
        </div>
    );
}
