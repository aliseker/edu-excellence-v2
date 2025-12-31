import Link from 'next/link';
import Image from 'next/image';

interface CountryCardProps {
  name: string;
  slug: string;
  flag: string;
  count: number;
  description?: string;
  image?: string;
}

const CountryCard = ({ name, slug, flag, count, description, image }: CountryCardProps) => {
  return (
    <Link
      href={`/universite/${slug}`}
      className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-300 transform hover:-translate-y-2"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-5xl">{flag}</div>
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
        {name}
      </h3>
      
      {description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {description}
        </p>
      )}
      
      <div className="flex items-center justify-between">
        <p className="text-gray-600 text-sm">
          {count} Üniversite
        </p>
        <span className="text-blue-600 font-semibold text-sm group-hover:text-blue-700 flex items-center">
          Keşfet
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
};

export default CountryCard;









