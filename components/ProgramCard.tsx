import Link from 'next/link';

interface ProgramCardProps {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  gradient: string;
  count?: number;
}

const ProgramCard = ({ title, description, icon, href, gradient, count }: ProgramCardProps) => {
  return (
    <Link
      href={href}
      className="group bg-white p-6 border-4 border-gray-900 hover:border-purple-600 transition-all duration-200 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] hover:shadow-[8px_8px_0_0_rgba(147,51,234,0.3)] hover:-translate-x-1 hover:-translate-y-1"
    >
      <div className={`w-14 h-14 bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 border-4 border-gray-900 group-hover:rotate-6 transition-transform duration-200`}>
        {icon}
      </div>
      
      <h3 className="text-xl font-black text-gray-900 group-hover:text-purple-600 transition-colors mb-3 uppercase tracking-tight">
        {title}
      </h3>
      
      <p className="text-gray-700 text-sm mb-5 line-clamp-2 font-medium">
        {description}
      </p>
      
      {count !== undefined && (
        <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
          <span className="text-gray-600 text-xs font-bold uppercase">
            {count} Program
          </span>
          <span className="text-purple-600 font-black text-sm group-hover:text-purple-700 flex items-center uppercase tracking-wide">
            Detaylar
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      )}
    </Link>
  );
};

export default ProgramCard;




