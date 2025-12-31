import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'Kanada\'da Üniversite Eğitimi: Başvuru Rehberi',
    excerpt: 'Kanada\'daki üniversitelere başvuru yapmak için bilmeniz gereken her şey...',
    image: '🇨🇦',
    date: '15 Ocak 2025',
    category: 'Üniversite',
    readTime: '5 dk'
  },
  {
    id: 2,
    title: 'İngiltere\'de Öğrenci Vizesi Nasıl Alınır?',
    excerpt: 'İngiltere öğrenci vizesi başvuru süreci, gerekli belgeler ve ipuçları...',
    image: '🇬🇧',
    date: '12 Ocak 2025',
    category: 'Vize',
    readTime: '7 dk'
  },
  {
    id: 3,
    title: 'Yurtdışında Dil Okulu Seçerken Dikkat Edilmesi Gerekenler',
    excerpt: 'En uygun dil okulunu seçmek için rehberiniz...',
    image: '📚',
    date: '10 Ocak 2025',
    category: 'Dil Okulu',
    readTime: '4 dk'
  },
  {
    id: 4,
    title: 'MBA Programları: Hangi Ülke, Hangi Üniversite?',
    excerpt: 'Dünyanın en iyi MBA programlarını keşfedin...',
    image: '🎓',
    date: '8 Ocak 2025',
    category: 'Master/MBA',
    readTime: '6 dk'
  },
  {
    id: 5,
    title: 'Amerika\'da Lise Eğitimi: Fırsatlar ve Zorluklar',
    excerpt: 'Amerika\'da lise eğitimi hakkında bilmeniz gerekenler...',
    image: '🇺🇸',
    date: '5 Ocak 2025',
    category: 'Lise',
    readTime: '5 dk'
  },
  {
    id: 6,
    title: 'Yaz Okulu Programları: Çocuğunuz İçin En İyi Seçim',
    excerpt: 'Yaz okulu programları hakkında detaylı bilgi...',
    image: '☀️',
    date: '3 Ocak 2025',
    category: 'Yaz Okulu',
    readTime: '4 dk'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog
          </h1>
          <p className="text-xl text-indigo-100">
            Yurtdışı eğitim hakkında güncel haberler ve rehberler
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden group border border-gray-100 hover:border-indigo-300"
            >
              <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-6xl">
                {post.image}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{post.date}</span>
                  <span className="text-indigo-600 font-semibold group-hover:text-indigo-700">
                    Devamını Oku →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}









