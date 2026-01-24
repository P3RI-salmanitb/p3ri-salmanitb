import Link from "next/link";

interface ProgramCardProps {
  slug: string;
  title: string;
  date_display: string;
  summary: string;
}

const ProgramCard = ({ slug, title, date_display, summary }: ProgramCardProps) => {
  return (
    <Link href={`/program/${slug}`} className="block h-full">
      <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl border-2 border-white hover:border-[#ADCD61] transition-all flex flex-col h-full">
        <h3 className="text-[#21272A] font-montserrat text-lg md:text-xl font-bold mb-1 md:mb-2">
          {title}
        </h3>
        
        <p className="text-[#21272A] font-montserrat text-base md:text-lg font-semibold mb-4 md:mb-5">
          {date_display}
        </p>
        
        <p className="text-[#21272A] font-montserrat text-sm md:text-base font-medium mb-5 md:mb-6 flex-1">
          {summary}
        </p>
        
        <div className="flex items-center gap-2 text-[#8F9F00] font-montserrat text-sm sm:text-base font-semibold">
          More Info
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4h-4">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ProgramCard;