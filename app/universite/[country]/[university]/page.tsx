'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import { use } from 'react';
import { convertYouTubeUrlToEmbed } from '@/utils/youtube';

// Mock data - Later this will come from API
const universityData: Record<string, Record<string, {
  name: string;
  country: string;
  city: string;
  flag: string;
  description: string;
  intro?: string; // Pazarlama/Tanıtım yazısı
  videoUrl?: string; // YouTube video URL
  established?: string;
  students?: string;
  ranking?: string;
  features: string[];
  programs: Array<{ name: string; description: string; level: string }>;
  requirements: {
    language: string[];
    academic: string[];
    documents: string[];
  };
  location: string;
  campus: string[];
  accommodation?: Array<{ type: string; description: string }>;
  scholarships?: string[];
}>> = {
  ingiltere: {
    'birmingham-city-university': {
      name: 'Birmingham City University',
      country: 'İngiltere',
      city: 'Birmingham',
      flag: '🇬🇧',
      description: 'Birmingham City University, modern kampüsü, güçlü endüstri bağlantıları ve pratik odaklı eğitim anlayışı ile öne çıkan bir üniversitedir. Öğrencilere gerçek dünya deneyimi kazandıran programları ve kapsamlı destek hizmetleri sunar.',
      videoUrl: 'https://www.youtube.com/watch?v=9VQ3A6hgeU8',
      established: '1992',
      students: '25,000+',
      ranking: 'UK Top 100',
      features: [
        'Modern ve donanımlı kampüsler',
        'Güçlü endüstri bağlantıları',
        'Pratik odaklı eğitim',
        'İşe yerleştirme imkanları',
        'Çeşitli bölüm seçenekleri',
        'Uluslararası öğrenci desteği',
      ],
      programs: [
        { name: 'İşletme ve Yönetim', description: 'Pratik odaklı işletme programları', level: 'Lisans, Yüksek Lisans' },
        { name: 'Mühendislik', description: 'Modern mühendislik programları', level: 'Lisans, Yüksek Lisans' },
        { name: 'Sanat ve Tasarım', description: 'Yaratıcı sanat programları', level: 'Lisans, Yüksek Lisans' },
        { name: 'Sağlık Bilimleri', description: 'Sağlık alanında kapsamlı programlar', level: 'Lisans, Yüksek Lisans' },
        { name: 'Hukuk', description: 'Profesyonel hukuk eğitimi', level: 'Lisans, Yüksek Lisans' },
        { name: 'Medya ve İletişim', description: 'Modern medya programları', level: 'Lisans, Yüksek Lisans' },
      ],
      requirements: {
        language: [
          'IELTS: 6.0-7.0 (bölüme göre değişir)',
          'TOEFL: 78-100 (bölüme göre değişir)',
          'Pearson PTE: 51-67',
        ],
        academic: [
          'Lise diploması (bazı bölümler için Foundation gerekli)',
          'A Level veya eşdeğer sertifika',
          'Yüksek lisans için lisans diploması',
        ],
        documents: [
          'Başvuru formu',
          'Akademik transkriptler',
          'Dil sınavı sonuçları',
          'Referans mektupları',
          'Niyet mektubu (Statement of Purpose)',
        ],
      },
      location: 'Birmingham, İngiltere',
      campus: [
        'City Centre Campus',
        'City South Campus',
        'City North Campus',
      ],
      accommodation: [
        { type: 'Üniversite Yurdu', description: 'Kampüs içinde ve yakınında modern yurt seçenekleri' },
        { type: 'Özel Konaklama', description: 'Birmingham şehir merkezinde özel daire ve ev seçenekleri' },
      ],
      scholarships: [
        'Uluslararası öğrenci bursları',
        'Akademik başarı bursları',
        'Bölüme özel burslar',
      ],
    },
    'university-of-birmingham': {
      name: 'University of Birmingham',
      country: 'İngiltere',
      city: 'Birmingham',
      flag: '🇬🇧',
      description: 'Russell Group üyesi, araştırma odaklı prestijli üniversite. Dünya çapında tanınan akademik programları ve güçlü araştırma altyapısı ile öne çıkar.',
      // videoUrl: '', // Gerçek üniversite tanıtım video URL'si buraya eklenecek
      established: '1900',
      students: '34,000+',
      ranking: 'UK Top 20',
      features: [
        'Russell Group üyesi',
        'Dünya çapında tanınan araştırma',
        'Prestijli akademik programlar',
        'Güçlü öğretim kadrosu',
        'Modern araştırma tesisleri',
        'Geniş kütüphane koleksiyonu',
      ],
      programs: [
        { name: 'Mühendislik', description: 'Çeşitli mühendislik disiplinleri', level: 'Lisans, Yüksek Lisans, Doktora' },
        { name: 'Tıp ve Sağlık', description: 'Tıp ve sağlık bilimleri programları', level: 'Lisans, Yüksek Lisans' },
        { name: 'İşletme', description: 'Birmingham Business School programları', level: 'Lisans, MBA, Yüksek Lisans' },
        { name: 'Sosyal Bilimler', description: 'Kapsamlı sosyal bilimler programları', level: 'Lisans, Yüksek Lisans' },
      ],
      requirements: {
        language: [
          'IELTS: 6.5-7.5 (bölüme göre)',
          'TOEFL: 88-102',
        ],
        academic: [
          'A Level veya eşdeğer',
          'Foundation programı (bazı öğrenciler için)',
        ],
        documents: [
          'Akademik transkriptler',
          'Dil sınavı sonuçları',
          'Referans mektupları',
          'Niyet mektubu',
        ],
      },
      location: 'Birmingham, İngiltere',
      campus: ['Edgbaston Campus', 'Selly Oak Campus'],
    },
    'kings-college-london': {
      name: 'King\'s College London',
      country: 'İngiltere',
      city: 'Londra',
      flag: '🇬🇧',
      description: 'Dünya çapında tanınan, merkezi Londra konumunda prestijli üniversite. Russell Group üyesi, güçlü araştırma programları ve çeşitli akademik disiplinler ile öne çıkar.',
      // videoUrl: '', // Gerçek üniversite tanıtım video URL'si buraya eklenecek
      intro: 'King\'s College London, İngiltere\'nin en prestijli üniversitelerinden biri olarak, öğrencilerine Londra\'nın kalbinde eşsiz bir eğitim deneyimi sunar. Russell Group üyesi olan bu üniversite, özellikle sağlık bilimleri, hukuk, uluslararası ilişkiler ve beşeri bilimler alanlarında dünya çapında tanınır. Merkezi Londra konumu sayesinde öğrenciler, staj ve iş imkanlarına kolayca erişebilir. Kraliyet ailesi ile yakın bağları, zengin kütüphane kaynakları ve uluslararası öğrenci topluluğu ile King\'s College, global bir kariyer için ideal başlangıç noktasıdır.',
      established: '1829',
      students: '33,000+',
      ranking: 'UK Top 10, Dünya Top 40',
      features: [
        'Russell Group üyesi',
        'Merkezi Londra konumu',
        'Dünya çapında tanınan araştırma',
        'Prestijli akademik programlar',
        'Tarihi kampüs',
        'Güçlü öğretim kadrosu',
      ],
      programs: [
        { name: 'Hukuk', description: 'The Dickson Poon School of Law', level: 'Lisans, Yüksek Lisans' },
        { name: 'Tıp', description: 'King\'s College London Medical School', level: 'Tıp Doktorası' },
        { name: 'İşletme', description: 'King\'s Business School', level: 'Lisans, MBA, Yüksek Lisans' },
        { name: 'Sosyal Bilimler', description: 'Çeşitli sosyal bilim programları', level: 'Lisans, Yüksek Lisans' },
      ],
      requirements: {
        language: ['IELTS: 6.5-7.5', 'TOEFL: 90-100'],
        academic: ['A Level', 'Foundation programı (bazı öğrenciler için)'],
        documents: ['Akademik transkriptler', 'Dil sınavı sonuçları', 'Referans mektupları'],
      },
      location: 'Londra, İngiltere',
      campus: ['Strand Campus', 'Waterloo Campus', 'Guy\'s Campus'],
    },
    'university-college-london': {
      name: 'University College London (UCL)',
      country: 'İngiltere',
      city: 'Londra',
      flag: '🇬🇧',
      description: 'QS sıralamasında ilk 10\'da yer alan, araştırma odaklı üniversite. Russell Group üyesi, dünya çapında tanınan akademik mükemmelliği ile öne çıkar.',
      // videoUrl: '', // Gerçek üniversite tanıtım video URL'si buraya eklenecek
      intro: 'University College London (UCL), dünya sıralamalarında ilk 10\'da yer alan, İngiltere\'nin en prestijli ve araştırma odaklı üniversitelerinden biridir. Russell Group üyesi olan UCL, özellikle mimarlık, eğitim, tıp ve mühendislik alanlarında dünya lideridir. 30\'dan fazla Nobel ödüllü araştırmacı UCL ile bağlantılıdır. Londra\'nın merkezinde yer alan kampüs, öğrencilere hem akademik hem de kültürel bir deneyim sunar. Çeşitli program seçenekleri, uluslararası işbirlikleri ve güçlü mezun ağı ile UCL, kariyerinizin zirvesine çıkmanız için mükemmel bir fırsattır.',
      established: '1826',
      students: '41,000+',
      ranking: 'UK Top 5, Dünya Top 10',
      features: [
        'Russell Group üyesi',
        'Dünya çapında prestijli üniversite',
        'Güçlü araştırma programları',
        'Merkezi Londra konumu',
        'Nobel ödüllü öğretim kadrosu',
        'Çeşitli akademik disiplinler',
      ],
      programs: [
        { name: 'Mimarlık', description: 'Bartlett School of Architecture', level: 'Lisans, Yüksek Lisans' },
        { name: 'Eğitim', description: 'UCL Institute of Education', level: 'Lisans, Yüksek Lisans' },
        { name: 'Tıp', description: 'UCL Medical School', level: 'Tıp Doktorası' },
        { name: 'Mühendislik', description: 'UCL Engineering', level: 'Lisans, Yüksek Lisans, Doktora' },
      ],
      requirements: {
        language: ['IELTS: 6.5-7.5', 'TOEFL: 92-109'],
        academic: ['A Level', 'Foundation programı'],
        documents: ['Akademik transkriptler', 'Dil sınavı sonuçları', 'Referans mektupları'],
      },
      location: 'Londra, İngiltere',
      campus: ['Bloomsbury Campus'],
    },
    'london-school-of-economics': {
      name: 'London School of Economics (LSE)',
      country: 'İngiltere',
      city: 'Londra',
      flag: '🇬🇧',
      description: 'Sosyal bilimler alanında dünya lideri, prestijli üniversite. Russell Group üyesi, ekonomi, siyaset bilimi ve sosyal bilimler alanlarında güçlü programları ile öne çıkar.',
      // videoUrl: '', // Gerçek üniversite tanıtım video URL'si buraya eklenecek
      established: '1895',
      students: '11,000+',
      ranking: 'UK Top 5, Dünya Top 50',
      features: [
        'Russell Group üyesi',
        'Sosyal bilimler dünya lideri',
        'Merkezi Londra konumu',
        'Güçlü araştırma programları',
        'Prestijli öğretim kadrosu',
        'Uluslararası öğrenci topluluğu',
      ],
      programs: [
        { name: 'Ekonomi', description: 'Ekonomi ve finans programları', level: 'Lisans, Yüksek Lisans' },
        { name: 'Siyaset Bilimi', description: 'Siyaset ve uluslararası ilişkiler', level: 'Lisans, Yüksek Lisans' },
        { name: 'İşletme', description: 'LSE Business School', level: 'Lisans, MBA, Yüksek Lisans' },
        { name: 'Hukuk', description: 'LSE Law School', level: 'Lisans, Yüksek Lisans' },
      ],
      requirements: {
        language: ['IELTS: 7.0+', 'TOEFL: 100+'],
        academic: ['A Level', 'Yüksek GPA'],
        documents: ['Akademik transkriptler', 'Dil sınavı sonuçları', 'Referans mektupları'],
      },
      location: 'Londra, İngiltere',
      campus: ['Houghton Street Campus'],
    },
    'university-of-manchester': {
      name: 'University of Manchester',
      country: 'İngiltere',
      city: 'Manchester',
      flag: '🇬🇧',
      description: 'Russell Group üyesi, güçlü araştırma altyapısı. Dünya çapında tanınan akademik programları ve canlı şehir yaşamı ile öne çıkar.',
      // videoUrl: '', // Gerçek üniversite tanıtım video URL'si buraya eklenecek
      intro: 'University of Manchester, İngiltere\'nin en büyük ve en prestijli üniversitelerinden biri olarak, öğrencilerine kapsamlı bir eğitim deneyimi sunar. Russell Group üyesi olan bu üniversite, güçlü araştırma altyapısı ve dünya çapında tanınan akademik programları ile öne çıkar. 25 Nobel ödüllü araştırmacı Manchester ile bağlantılıdır. Canlı şehir yaşamı, uygun yaşam maliyetleri ve güçlü endüstri bağlantıları ile Manchester, öğrenciler için ideal bir eğitim şehridir. Bu üniversitede aldığınız eğitim, size hem akademik hem de profesyonel kariyerinizde başarılı olmanız için gerekli tüm araçları sağlar.',
      established: '1824',
      students: '40,000+',
      ranking: 'UK Top 20, Dünya Top 30',
      features: [
        'Russell Group üyesi',
        'Güçlü araştırma altyapısı',
        'Çeşitli akademik programlar',
        'Modern kampüs tesisleri',
        'Canlı şehir yaşamı',
        'Uluslararası öğrenci topluluğu',
      ],
      programs: [
        { name: 'Mühendislik', description: 'Çeşitli mühendislik disiplinleri', level: 'Lisans, Yüksek Lisans, Doktora' },
        { name: 'İşletme', description: 'Alliance Manchester Business School', level: 'Lisans, MBA, Yüksek Lisans' },
        { name: 'Tıp', description: 'Manchester Medical School', level: 'Tıp Doktorası' },
        { name: 'Bilim', description: 'Fen bilimleri programları', level: 'Lisans, Yüksek Lisans, Doktora' },
      ],
      requirements: {
        language: ['IELTS: 6.5-7.5', 'TOEFL: 90-100'],
        academic: ['A Level', 'Foundation programı'],
        documents: ['Akademik transkriptler', 'Dil sınavı sonuçları', 'Referans mektupları'],
      },
      location: 'Manchester, İngiltere',
      campus: ['Main Campus'],
    },
  },
  amerika: {
    'new-york-university': {
      name: 'New York University (NYU)',
      country: 'Amerika',
      city: 'New York',
      flag: '🇺🇸',
      description: 'Manhattan merkezinde, dünya çapında tanınan NYU, çeşitli akademik programları ve güçlü şehir bağlantıları ile öne çıkar.',
      // videoUrl: '', // Gerçek üniversite tanıtım video URL'si buraya eklenecek
      intro: 'New York University, dünyanın en dinamik şehirlerinden biri olan Manhattan\'ın kalbinde yer alan bir eğitim fırsatı sunuyor. Bu prestijli üniversite, öğrencilerine sadece sınıf içinde değil, şehrin kendisinde öğrenme imkanı sağlar. NYU\'nun güçlü endüstri bağlantıları, staj imkanları ve mezun ağı sayesinde öğrenciler kariyerlerine erken başlama şansı yakalar. Finans, medya, sanat ve teknoloji sektörlerinde lider konumda olan NYU, mezunlarının iş dünyasında öne çıkmalarını sağlar.',
      established: '1831',
      students: '50,000+',
      ranking: 'US Top 30',
      features: [
        'Manhattan merkezi konum',
        'Dünya çapında kampüsler',
        'Güçlü şehir bağlantıları',
        'Çeşitli akademik programlar',
        'Prestijli öğretim kadrosu',
      ],
      programs: [
        { name: 'İşletme', description: 'Stern School of Business', level: 'Lisans, MBA, Yüksek Lisans' },
        { name: 'Sanat', description: 'Tisch School of the Arts', level: 'Lisans, Yüksek Lisans' },
        { name: 'Medya', description: 'Steinhardt School', level: 'Lisans, Yüksek Lisans' },
      ],
      requirements: {
        language: ['TOEFL: 100+', 'IELTS: 7.5+'],
        academic: ['SAT/ACT', 'Lise diploması'],
        documents: ['Akademik transkriptler', 'SAT/ACT skorları', 'Referanslar'],
      },
      location: 'Manhattan, New York',
      campus: ['Washington Square Campus', 'Brooklyn Campus'],
    },
    'columbia-university': {
      name: 'Columbia University',
      country: 'Amerika',
      city: 'New York',
      flag: '🇺🇸',
      description: 'Ivy League üyesi, dünyanın en prestijli üniversitelerinden biri. Manhattan\'da konumlanan Columbia, dünya çapında tanınan akademik mükemmelliği ile öne çıkar.',
      // videoUrl: '', // Gerçek üniversite tanıtım video URL'si buraya eklenecek
      intro: 'Columbia University, 270 yılı aşkın tarihi ile dünyanın en prestijli eğitim kurumlarından biridir. Ivy League üyesi olan Columbia, akademik mükemmellik, araştırma kalitesi ve mezun başarıları ile küresel çapta tanınır. Manhattan\'ın kalbinde yer alan kampüs, öğrencilere hem akademik hem de profesyonel gelişim için eşsiz fırsatlar sunar. Nobel ödüllü öğretim kadrosu, zengin kütüphane kaynakları ve güçlü mezun ağı ile Columbia, kariyer hedeflerinize ulaşmanızda size en iyi desteği sağlar.',
      established: '1754',
      students: '33,000+',
      ranking: 'Ivy League, US Top 5',
      features: [
        'Ivy League üyesi',
        'Dünya çapında prestijli üniversite',
        'Güçlü araştırma programları',
        'Manhattan merkezi konum',
        'Nobel ödüllü öğretim kadrosu',
        'Kapsamlı kütüphane sistemi',
      ],
      programs: [
        { name: 'İşletme', description: 'Columbia Business School - MBA programı', level: 'MBA, Yüksek Lisans' },
        { name: 'Hukuk', description: 'Columbia Law School', level: 'Hukuk Doktorası, Yüksek Lisans' },
        { name: 'Gazetecilik', description: 'Columbia Journalism School', level: 'Yüksek Lisans' },
        { name: 'Mühendislik', description: 'Fu Foundation School of Engineering', level: 'Lisans, Yüksek Lisans, Doktora' },
        { name: 'Sanat ve Bilimler', description: 'Columbia College ve GSAS', level: 'Lisans, Yüksek Lisans, Doktora' },
      ],
      requirements: {
        language: ['TOEFL: 100+', 'IELTS: 7.5+'],
        academic: ['SAT: 1500+ veya ACT: 33+', 'Lise diploması', 'Yüksek GPA'],
        documents: ['Akademik transkriptler', 'SAT/ACT skorları', 'Referans mektupları', 'Niyet mektubu', 'CV'],
      },
      location: 'Manhattan, New York City',
      campus: ['Morningside Heights Campus'],
    },
    'ucla': {
      name: 'University of California, Los Angeles (UCLA)',
      country: 'Amerika',
      city: 'Los Angeles',
      flag: '🇺🇸',
      description: 'Sunset Boulevard yakınında, California\'nın en prestijli üniversitelerinden biri. Güçlü akademik programlar, araştırma imkanları ve Los Angeles\'ın canlı kültürel ortamı ile öne çıkar.',
      // videoUrl: '', // Gerçek üniversite tanıtım video URL'si buraya eklenecek
      intro: 'UCLA, dünyanın en iyi kamu araştırma üniversitelerinden biri olarak, öğrencilerine mükemmel bir eğitim deneyimi sunar. Los Angeles\'ın kalbinde yer alan kampüs, öğrencilere hem akademik hem de kültürel bir deneyim yaşatır. Film endüstrisi, teknoloji, işletme ve sağlık bilimleri gibi alanlarda lider konumda olan UCLA, mezunlarının kariyerlerinde başarılı olmalarını destekler. Çeşitli program seçenekleri, modern tesisler ve güçlü araştırma olanakları ile UCLA, eğitim hedeflerinizi gerçekleştirmeniz için ideal bir seçenektir.',
      established: '1919',
      students: '45,000+',
      ranking: 'US Top 25, Public University Top 5',
      features: [
        'Sunset Boulevard yakını, merkezi konum',
        'Güçlü araştırma programları',
        'Çeşitli akademik bölümler',
        'Modern kampüs tesisleri',
        'Kültürel çeşitlilik',
        'İş dünyası bağlantıları',
      ],
      programs: [
        { name: 'İşletme', description: 'Anderson School of Management', level: 'MBA, Yüksek Lisans' },
        { name: 'Mühendislik', description: 'Samueli School of Engineering', level: 'Lisans, Yüksek Lisans, Doktora' },
        { name: 'Film ve Televizyon', description: 'School of Theater, Film and Television', level: 'Lisans, Yüksek Lisans' },
        { name: 'Tıp', description: 'David Geffen School of Medicine', level: 'Tıp Doktorası' },
        { name: 'Hukuk', description: 'UCLA School of Law', level: 'Hukuk Doktorası' },
        { name: 'Sanat ve Mimarlık', description: 'School of the Arts and Architecture', level: 'Lisans, Yüksek Lisans' },
      ],
      requirements: {
        language: ['TOEFL: 100+', 'IELTS: 7.0+'],
        academic: ['SAT: 1400+ veya ACT: 31+', 'Lise diploması', 'Yüksek GPA'],
        documents: ['Akademik transkriptler', 'SAT/ACT skorları', 'Referans mektupları', 'Niyet mektubu'],
      },
      location: 'Los Angeles, California',
      campus: ['Westwood Campus'],
      accommodation: [
        { type: 'Üniversite Yurdu', description: 'Kampüs içinde modern yurt seçenekleri' },
        { type: 'Off-Campus Konaklama', description: 'Westwood ve çevresinde özel konaklama seçenekleri' },
      ],
    },
    'stanford-university': {
      name: 'Stanford University',
      country: 'Amerika',
      city: 'California',
      flag: '🇺🇸',
      description: 'Silicon Valley yakınında, teknoloji ve inovasyon merkezi. Dünyanın en prestijli üniversitelerinden biri, güçlü araştırma altyapısı ve girişimcilik kültürü ile öne çıkar.',
      // videoUrl: '', // Gerçek üniversite tanıtım video URL'si buraya eklenecek
      intro: 'Stanford University, dünyanın en prestijli ve yenilikçi üniversitelerinden biridir. Silicon Valley\'in kalbinde yer alan Stanford, teknoloji, girişimcilik ve inovasyon alanlarında global bir liderdir. Google, Yahoo, Netflix gibi dünya devi şirketlerin kurucuları Stanford mezunudur. Bu üniversite sadece akademik bilgi vermez, aynı zamanda öğrencilerine girişimcilik ruhu kazandırır ve onları geleceğin liderleri olmaya hazırlar. Modern kampüs tesisleri, dünya standartlarında araştırma laboratuvarları ve güçlü endüstri bağlantıları ile Stanford, kariyerinizin zirvesine çıkmanızı sağlar.',
      established: '1885',
      students: '17,000+',
      ranking: 'US Top 5, Dünya Top 5',
      features: [
        'Silicon Valley konumu',
        'Teknoloji ve inovasyon merkezi',
        'Güçlü araştırma programları',
        'Girişimcilik ekosistemi',
        'Prestijli öğretim kadrosu',
        'Geniş kampüs alanı',
      ],
      programs: [
        { name: 'Mühendislik', description: 'School of Engineering', level: 'Lisans, Yüksek Lisans, Doktora' },
        { name: 'İşletme', description: 'Stanford Graduate School of Business', level: 'MBA, Yüksek Lisans' },
        { name: 'Bilgisayar Bilimleri', description: 'Computer Science Department', level: 'Lisans, Yüksek Lisans, Doktora' },
        { name: 'Tıp', description: 'Stanford School of Medicine', level: 'Tıp Doktorası, Yüksek Lisans' },
        { name: 'Hukuk', description: 'Stanford Law School', level: 'Hukuk Doktorası' },
      ],
      requirements: {
        language: ['TOEFL: 100+', 'IELTS: 7.5+'],
        academic: ['SAT: 1500+ veya ACT: 33+', 'Yüksek GPA', 'Güçlü akademik geçmiş'],
        documents: ['Akademik transkriptler', 'SAT/ACT skorları', 'Referans mektupları', 'Niyet mektubu'],
      },
      location: 'Stanford, California (Silicon Valley)',
      campus: ['Main Campus'],
    },
    'harvard-university': {
      name: 'Harvard University',
      country: 'Amerika',
      city: 'Massachusetts',
      flag: '🇺🇸',
      description: 'Ivy League üyesi, dünyanın en prestijli üniversitesi. Cambridge, Massachusetts\'te konumlanan Harvard, 380 yıllık tarihi, Nobel ödüllü öğretim kadrosu ve dünya çapında tanınan programları ile öne çıkar.',
      // videoUrl: '', // Gerçek üniversite tanıtım video URL'si buraya eklenecek
      intro: 'Harvard University, 1636\'dan beri eğitim veren, dünyanın en prestijli ve tanınmış üniversitesidir. 380 yıllık köklü geçmişi, Nobel ödüllü öğretim kadrosu ve dünya çapında tanınan mezunları ile Harvard, akademik mükemmelliğin sembolüdür. 8 ABD Başkanı, 150 Nobel ödüllü ve sayısız lider Harvard mezunudur. Bu üniversitede eğitim almak sadece bir diploma almak değil, aynı zamanda dünyanın en seçkin akademik topluluklarından biri olmanın ayrıcalığını yaşamaktır. Harvard, size sadece bilgi değil, liderlik vasıfları, eleştirel düşünme yeteneği ve global bir vizyon kazandırır.',
      established: '1636',
      students: '23,000+',
      ranking: 'Ivy League, US #1, Dünya Top 3',
      features: [
        'Dünyanın en prestijli üniversitesi',
        'Ivy League üyesi',
        'Nobel ödüllü öğretim kadrosu',
        'Güçlü araştırma programları',
        'Tarihi kampüs',
        'Kapsamlı kütüphane sistemi',
      ],
      programs: [
        { name: 'İşletme', description: 'Harvard Business School', level: 'MBA, Yüksek Lisans' },
        { name: 'Hukuk', description: 'Harvard Law School', level: 'Hukuk Doktorası' },
        { name: 'Tıp', description: 'Harvard Medical School', level: 'Tıp Doktorası' },
        { name: 'Sanat ve Bilimler', description: 'Harvard College ve GSAS', level: 'Lisans, Yüksek Lisans, Doktora' },
        { name: 'Mühendislik', description: 'Harvard John A. Paulson School of Engineering', level: 'Lisans, Yüksek Lisans, Doktora' },
      ],
      requirements: {
        language: ['TOEFL: 100+', 'IELTS: 7.5+'],
        academic: ['SAT: 1500+ veya ACT: 34+', 'Mükemmel GPA', 'Olağanüstü akademik geçmiş'],
        documents: ['Akademik transkriptler', 'SAT/ACT skorları', 'Güçlü referans mektupları', 'Niyet mektubu', 'CV'],
      },
      location: 'Cambridge, Massachusetts',
      campus: ['Harvard Yard', 'Allston Campus'],
    },
    'mit': {
      name: 'Massachusetts Institute of Technology (MIT)',
      country: 'Amerika',
      city: 'Massachusetts',
      flag: '🇺🇸',
      description: 'Teknoloji ve mühendislik alanında dünya lideri. Cambridge, Massachusetts\'te konumlanan MIT, inovasyon, araştırma ve pratik uygulamalar odaklı eğitim anlayışı ile öne çıkar.',
      // videoUrl: '', // Gerçek üniversite tanıtım video URL'si buraya eklenecek
      intro: 'MIT, dünyanın en iyi teknoloji ve mühendislik üniversitesi olarak, öğrencilerine teorik bilgiyi pratik uygulamalarla birleştiren bir eğitim sunar. 1861\'den beri inovasyon ve araştırma alanında öncü olan MIT, öğrencilerini geleceğin teknolojilerini geliştirmeye hazırlar. Robotik, yapay zeka, biyoteknoloji ve sürdürülebilir enerji gibi alanlarda dünya lideri olan MIT, mezunlarının kendi şirketlerini kurmalarına veya dünya devi teknoloji şirketlerinde çalışmalarına imkan sağlar. Burada aldığınız eğitim, size sadece bir kariyer değil, dünyayı değiştirme gücü verir.',
      established: '1861',
      students: '11,000+',
      ranking: 'US Top 5, Dünya Top 5',
      features: [
        'Teknoloji ve mühendislik dünya lideri',
        'Güçlü araştırma altyapısı',
        'İnovasyon odaklı eğitim',
        'Endüstri bağlantıları',
        'Nobel ödüllü öğretim kadrosu',
        'Pratik uygulama imkanları',
      ],
      programs: [
        { name: 'Mühendislik', description: 'School of Engineering', level: 'Lisans, Yüksek Lisans, Doktora' },
        { name: 'Bilgisayar Bilimleri', description: 'Computer Science and Artificial Intelligence', level: 'Lisans, Yüksek Lisans, Doktora' },
        { name: 'İşletme', description: 'MIT Sloan School of Management', level: 'MBA, Yüksek Lisans' },
        { name: 'Mimarlık', description: 'School of Architecture and Planning', level: 'Lisans, Yüksek Lisans, Doktora' },
        { name: 'Bilim', description: 'School of Science', level: 'Lisans, Yüksek Lisans, Doktora' },
      ],
      requirements: {
        language: ['TOEFL: 90+', 'IELTS: 7.0+'],
        academic: ['SAT: 1500+ veya ACT: 34+', 'Yüksek GPA', 'Güçlü matematik ve fen altyapısı'],
        documents: ['Akademik transkriptler', 'SAT/ACT skorları', 'Referans mektupları', 'Niyet mektubu'],
      },
      location: 'Cambridge, Massachusetts',
      campus: ['Main Campus'],
    },
  },
  kanada: {
    'university-of-toronto': {
      name: 'University of Toronto',
      country: 'Kanada',
      city: 'Toronto',
      flag: '🇨🇦',
      description: 'Kanada\'nın en prestijli üniversitesi, dünya çapında tanınan programlar. Güçlü araştırma altyapısı, çeşitli akademik disiplinler ve çok kültürlü şehir deneyimi sunar.',
      // videoUrl: '', // Gerçek üniversite tanıtım video URL'si buraya eklenecek
      intro: 'University of Toronto, Kanada\'nın en prestijli ve en büyük üniversitesi olarak, öğrencilerine dünya standartlarında bir eğitim sunar. Dünya sıralamalarında ilk 20\'de yer alan bu üniversite, özellikle tıp, mühendislik, işletme ve beşeri bilimler alanlarında global bir liderdir. Toronto, dünyanın en çok kültürlü ve güvenli şehirlerinden biri olarak, öğrencilere hem eğitim hem de yaşam kalitesi açısından mükemmel bir deneyim sunar. Kanada\'nın göçmen dostu politikaları sayesinde, mezunlarının çoğu eğitim sonrası burada kalmayı seçer ve kariyerlerini Kanada\'da devam ettirir.',
      established: '1827',
      students: '90,000+',
      ranking: 'Kanada #1, Dünya Top 30',
      features: [
        'Kanada\'nın en prestijli üniversitesi',
        'Güçlü araştırma programları',
        'Çeşitli akademik disiplinler',
        'Çok kültürlü kampüs',
        'Modern tesisler',
        'Güçlü iş dünyası bağlantıları',
      ],
      programs: [
        { name: 'İşletme', description: 'Rotman School of Management', level: 'Lisans, MBA, Yüksek Lisans' },
        { name: 'Mühendislik', description: 'Faculty of Applied Science & Engineering', level: 'Lisans, Yüksek Lisans, Doktora' },
        { name: 'Tıp', description: 'Temerty Faculty of Medicine', level: 'Tıp Doktorası' },
        { name: 'Hukuk', description: 'Faculty of Law', level: 'Hukuk Doktorası' },
      ],
      requirements: {
        language: ['TOEFL: 100+', 'IELTS: 6.5-7.0'],
        academic: ['Lise diploması', 'Yüksek GPA'],
        documents: ['Akademik transkriptler', 'Dil sınavı sonuçları', 'Referans mektupları'],
      },
      location: 'Toronto, Kanada',
      campus: ['St. George Campus', 'Scarborough Campus', 'Mississauga Campus'],
    },
    'ubc': {
      name: 'University of British Columbia (UBC)',
      country: 'Kanada',
      city: 'Vancouver',
      flag: '🇨🇦',
      description: 'Körfez manzaralı kampüs, güçlü araştırma programları. Kanada\'nın en prestijli üniversitelerinden biri, doğal güzellikler ve modern şehir yaşamının birleştiği lokasyonda.',
      // videoUrl: '', // Gerçek üniversite tanıtım video URL'si buraya eklenecek
      established: '1908',
      students: '66,000+',
      ranking: 'Kanada Top 3, Dünya Top 50',
      features: [
        'Körfez manzaralı kampüs',
        'Güçlü araştırma programları',
        'Doğal güzellikler',
        'Modern şehir yaşamı',
        'Çeşitli akademik programlar',
        'Sıcak atmosfer',
      ],
      programs: [
        { name: 'İşletme', description: 'Sauder School of Business', level: 'Lisans, MBA, Yüksek Lisans' },
        { name: 'Mühendislik', description: 'Faculty of Applied Science', level: 'Lisans, Yüksek Lisans, Doktora' },
        { name: 'Bilim', description: 'Faculty of Science', level: 'Lisans, Yüksek Lisans, Doktora' },
        { name: 'Sanat', description: 'Faculty of Arts', level: 'Lisans, Yüksek Lisans' },
      ],
      requirements: {
        language: ['TOEFL: 90+', 'IELTS: 6.5+'],
        academic: ['Lise diploması', 'Yüksek GPA'],
        documents: ['Akademik transkriptler', 'Dil sınavı sonuçları', 'Referans mektupları'],
      },
      location: 'Vancouver, Kanada',
      campus: ['Vancouver Campus', 'Okanagan Campus'],
    },
  },
  almanya: {
    'humboldt-university-berlin': {
      name: 'Humboldt University of Berlin',
      country: 'Almanya',
      city: 'Berlin',
      flag: '🇩🇪',
      description: 'Tarihi üniversite, güçlü araştırma altyapısı. Almanya\'nın en prestijli üniversitelerinden biri, araştırma ve öğretim geleneği ile öne çıkar.',
      // videoUrl: '', // Gerçek üniversite tanıtım video URL'si buraya eklenecek
      intro: 'Humboldt University of Berlin, 1810\'da kurulmuş, dünyanın en prestijli üniversitelerinden biridir. Modern üniversite sisteminin doğduğu yer olarak kabul edilen bu üniversite, 29 Nobel ödüllü mezunu ile gurur duyar. Almanya\'nın başkenti Berlin\'de yer alan kampüs, öğrencilere hem tarihi hem de modern bir şehir deneyimi sunar. Almanya\'daki devlet üniversitelerinin çoğunda olduğu gibi, öğrenim ücreti düşük veya ücretsizdir, bu da kaliteli eğitimi herkese erişilebilir kılar. Güçlü araştırma altyapısı, çeşitli program seçenekleri ve Avrupa\'nın kalbinde yer alan konumu ile Humboldt, uluslararası öğrenciler için mükemmel bir seçenektir.',
      established: '1810',
      students: '35,000+',
      ranking: 'Almanya Top 10, Dünya Top 100',
      features: [
        'Tarihi üniversite',
        'Güçlü araştırma altyapısı',
        'Berlin merkezi konum',
        'Çeşitli akademik programlar',
        'Nobel ödüllü öğretim kadrosu',
        'Uluslararası öğrenci topluluğu',
      ],
      programs: [
        { name: 'Beşeri Bilimler', description: 'Çeşitli beşeri bilimler programları', level: 'Lisans, Yüksek Lisans, Doktora' },
        { name: 'Fen Bilimleri', description: 'Fen bilimleri programları', level: 'Lisans, Yüksek Lisans, Doktora' },
        { name: 'Sosyal Bilimler', description: 'Sosyal bilimler programları', level: 'Lisans, Yüksek Lisans' },
      ],
      requirements: {
        language: ['TestDaF: 4x4', 'DSH: 2', 'IELTS: 6.5+'],
        academic: ['Lise diploması', 'Abitur eşdeğeri'],
        documents: ['Akademik transkriptler', 'Dil sınavı sonuçları', 'Referans mektupları'],
      },
      location: 'Berlin, Almanya',
      campus: ['Campus Mitte', 'Campus Nord'],
    },
    'free-university-berlin': {
      name: 'Free University of Berlin',
      country: 'Almanya',
      city: 'Berlin',
      flag: '🇩🇪',
      description: 'Özgür araştırma geleneği, çeşitli program seçenekleri. Berlin\'de konumlanan prestijli üniversite, araştırma odaklı eğitim anlayışı ile öne çıkar.',
      // videoUrl: '', // Gerçek üniversite tanıtım video URL'si buraya eklenecek
      established: '1948',
      students: '38,000+',
      ranking: 'Almanya Top 10',
      features: [
        'Özgür araştırma geleneği',
        'Çeşitli program seçenekleri',
        'Berlin konumu',
        'Modern kampüs',
        'Güçlü araştırma programları',
        'Uluslararası işbirlikleri',
      ],
      programs: [
        { name: 'Beşeri Bilimler', description: 'Beşeri bilimler programları', level: 'Lisans, Yüksek Lisans' },
        { name: 'Fen Bilimleri', description: 'Fen bilimleri programları', level: 'Lisans, Yüksek Lisans' },
        { name: 'İşletme', description: 'İşletme ve ekonomi programları', level: 'Lisans, Yüksek Lisans' },
      ],
      requirements: {
        language: ['TestDaF: 4x4', 'DSH: 2'],
        academic: ['Lise diploması'],
        documents: ['Akademik transkriptler', 'Dil sınavı sonuçları'],
      },
      location: 'Berlin, Almanya',
      campus: ['Dahlem Campus'],
    },
    'technical-university-munich': {
      name: 'Technical University of Munich',
      country: 'Almanya',
      city: 'Münih',
      flag: '🇩🇪',
      description: 'Teknik alanlarda güçlü, endüstri bağlantıları. Almanya\'nın en iyi teknik üniversitelerinden biri, mühendislik ve teknoloji alanlarında öne çıkar.',
      established: '1868',
      students: '42,000+',
      ranking: 'Almanya Top 3 Teknik Üniversite',
      features: [
        'Teknik alanlarda güçlü',
        'Endüstri bağlantıları',
        'Araştırma odaklı',
        'Modern laboratuvarlar',
        'Girişimcilik desteği',
        'Uluslararası işbirlikleri',
      ],
      programs: [
        { name: 'Mühendislik', description: 'Çeşitli mühendislik disiplinleri', level: 'Lisans, Yüksek Lisans, Doktora' },
        { name: 'Bilgisayar Bilimleri', description: 'Bilgisayar ve yazılım mühendisliği', level: 'Lisans, Yüksek Lisans' },
        { name: 'İşletme', description: 'Teknoloji ve inovasyon yönetimi', level: 'Lisans, Yüksek Lisans' },
      ],
      requirements: {
        language: ['TestDaF: 4x4', 'DSH: 2'],
        academic: ['Lise diploması', 'Güçlü matematik/fen altyapısı'],
        documents: ['Akademik transkriptler', 'Dil sınavı sonuçları'],
      },
      location: 'Münih, Almanya',
      campus: ['Main Campus', 'Garching Campus'],
    },
    'lmu-munich': {
      name: 'Ludwig Maximilian University of Munich',
      country: 'Almanya',
      city: 'Münih',
      flag: '🇩🇪',
      description: 'Araştırma odaklı, prestijli üniversite. Almanya\'nın en eski ve prestijli üniversitelerinden biri, çeşitli akademik disiplinler ile öne çıkar.',
      established: '1472',
      students: '52,000+',
      ranking: 'Almanya Top 5',
      features: [
        'Araştırma odaklı',
        'Prestijli üniversite',
        'Çeşitli akademik disiplinler',
        'Nobel ödüllü öğretim kadrosu',
        'Tarihi kampüs',
        'Güçlü kütüphane sistemi',
      ],
      programs: [
        { name: 'Beşeri Bilimler', description: 'Çeşitli beşeri bilimler programları', level: 'Lisans, Yüksek Lisans' },
        { name: 'Fen Bilimleri', description: 'Fen bilimleri programları', level: 'Lisans, Yüksek Lisans, Doktora' },
        { name: 'Tıp', description: 'Tıp fakültesi', level: 'Tıp Doktorası' },
        { name: 'İşletme', description: 'İşletme ve ekonomi programları', level: 'Lisans, Yüksek Lisans' },
      ],
      requirements: {
        language: ['TestDaF: 4x4', 'DSH: 2'],
        academic: ['Lise diploması'],
        documents: ['Akademik transkriptler', 'Dil sınavı sonuçları'],
      },
      location: 'Münih, Almanya',
      campus: ['Main Campus'],
    },
  },
  italya: {
    'sapienza-university-rome': {
      name: 'Sapienza University of Rome',
      country: 'İtalya',
      city: 'Roma',
      flag: '🇮🇹',
      description: 'Avrupa\'nın en büyük üniversitelerinden biri, tarihi şehir merkezi. Çeşitli akademik programlar ve İtalyan kültürünü yakından tanıma fırsatı sunar.',
      // videoUrl: '', // Gerçek üniversite tanıtım video URL'si buraya eklenecek
      established: '1303',
      students: '112,000+',
      ranking: 'İtalya Top 5',
      features: [
        'Avrupa\'nın en büyük üniversitelerinden biri',
        'Tarihi şehir merkezi',
        'Çeşitli akademik programlar',
        'İtalyan kültürü',
        'Modern tesisler',
        'Uluslararası öğrenci topluluğu',
      ],
      programs: [
        { name: 'Mimarlık', description: 'Mimarlık ve tasarım programları', level: 'Lisans, Yüksek Lisans' },
        { name: 'Beşeri Bilimler', description: 'İtalyan dili ve kültürü programları', level: 'Lisans, Yüksek Lisans' },
        { name: 'Mühendislik', description: 'Mühendislik programları', level: 'Lisans, Yüksek Lisans' },
      ],
      requirements: {
        language: ['İtalyanca: B2 seviyesi', 'IELTS: 6.0+ (İngilizce programlar için)'],
        academic: ['Lise diploması'],
        documents: ['Akademik transkriptler', 'Dil sınavı sonuçları'],
      },
      location: 'Roma, İtalya',
      campus: ['Main Campus'],
    },
    'bocconi-university': {
      name: 'Bocconi University',
      country: 'İtalya',
      city: 'Milano',
      flag: '🇮🇹',
      description: 'İşletme ve ekonomi alanında Avrupa\'nın en prestijli üniversitelerinden biri. Milano\'da konumlanan Bocconi, güçlü iş dünyası bağlantıları ve pratik odaklı eğitim ile öne çıkar.',
      established: '1902',
      students: '14,000+',
      ranking: 'İtalya #1 İşletme, Avrupa Top 10',
      features: [
        'İşletme ve ekonomi alanında prestijli',
        'Güçlü iş dünyası bağlantıları',
        'Pratik odaklı eğitim',
        'Milano merkezi konum',
        'Uluslararası öğrenci topluluğu',
        'Kariyer desteği',
      ],
      programs: [
        { name: 'İşletme', description: 'İşletme ve yönetim programları', level: 'Lisans, MBA, Yüksek Lisans' },
        { name: 'Ekonomi', description: 'Ekonomi ve finans programları', level: 'Lisans, Yüksek Lisans, Doktora' },
        { name: 'Hukuk', description: 'İş hukuku programları', level: 'Lisans, Yüksek Lisans' },
      ],
      requirements: {
        language: ['TOEFL: 100+', 'IELTS: 7.0+', 'İtalyanca: B2'],
        academic: ['Lise diploması', 'Yüksek GPA'],
        documents: ['Akademik transkriptler', 'Dil sınavı sonuçları', 'Referans mektupları'],
      },
      location: 'Milano, İtalya',
      campus: ['Main Campus'],
    },
  },
};

export default function UniversityDetailPage({ params }: { params: Promise<{ country: string; university: string }> }) {
  const resolvedParams = use(params);
  const country = resolvedParams.country;
  const university = resolvedParams.university;
  const countryKey = country.toLowerCase();
  const universityKey = university.toLowerCase();
  const data = universityData[countryKey]?.[universityKey];

  // University data for sidebar
  const universityCountries = {
    ingiltere: [
      { title: 'Birmingham City University', href: '/universite/ingiltere/birmingham-city-university', slug: 'birmingham-city-university' },
      { title: 'University of Birmingham', href: '/universite/ingiltere/university-of-birmingham', slug: 'university-of-birmingham' },
      { title: 'King\'s College London', href: '/universite/ingiltere/kings-college-london', slug: 'kings-college-london' },
      { title: 'University College London (UCL)', href: '/universite/ingiltere/university-college-london', slug: 'university-college-london' },
      { title: 'London School of Economics (LSE)', href: '/universite/ingiltere/london-school-of-economics', slug: 'london-school-of-economics' },
      { title: 'University of Manchester', href: '/universite/ingiltere/university-of-manchester', slug: 'university-of-manchester' },
    ],
    amerika: [
      { title: 'New York University (NYU)', href: '/universite/amerika/new-york-university', slug: 'new-york-university' },
      { title: 'Columbia University', href: '/universite/amerika/columbia-university', slug: 'columbia-university' },
      { title: 'University of California, Los Angeles (UCLA)', href: '/universite/amerika/ucla', slug: 'ucla' },
      { title: 'Stanford University', href: '/universite/amerika/stanford-university', slug: 'stanford-university' },
      { title: 'Harvard University', href: '/universite/amerika/harvard-university', slug: 'harvard-university' },
      { title: 'Massachusetts Institute of Technology (MIT)', href: '/universite/amerika/mit', slug: 'mit' },
    ],
    kanada: [
      { title: 'University of Toronto', href: '/universite/kanada/university-of-toronto', slug: 'university-of-toronto' },
      { title: 'University of British Columbia (UBC)', href: '/universite/kanada/ubc', slug: 'ubc' },
    ],
    almanya: [
      { title: 'Humboldt University of Berlin', href: '/universite/almanya/humboldt-university-berlin', slug: 'humboldt-university-berlin' },
      { title: 'Free University of Berlin', href: '/universite/almanya/free-university-berlin', slug: 'free-university-berlin' },
      { title: 'Technical University of Munich', href: '/universite/almanya/technical-university-munich', slug: 'technical-university-munich' },
      { title: 'Ludwig Maximilian University of Munich', href: '/universite/almanya/lmu-munich', slug: 'lmu-munich' },
    ],
    italya: [
      { title: 'Sapienza University of Rome', href: '/universite/italya/sapienza-university-rome', slug: 'sapienza-university-rome' },
      { title: 'Bocconi University', href: '/universite/italya/bocconi-university', slug: 'bocconi-university' },
    ],
  };

  const currentCountryUniversities = universityCountries[countryKey as keyof typeof universityCountries] || [];
  const otherUniversities = currentCountryUniversities.filter(u => u.slug !== universityKey);
  const otherCountries = Object.entries(universityCountries).filter(([key]) => key !== countryKey);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Üniversite Bulunamadı</h1>
          <Link href={`/universite/${country}`} className="text-blue-600 font-bold hover:underline">
            {country} üniversiteleri sayfasına dön
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <section className="bg-white border-b-4 border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-600">
            <Link href="/universite" className="hover:text-blue-600 transition-colors">Üniversiteler</Link>
            <span>/</span>
            <Link href={`/universite/${country}`} className="hover:text-blue-600 transition-colors">{data.country}</Link>
            <span>/</span>
            <span className="text-gray-900">{data.name}</span>
          </div>
        </div>
      </section>

      {/* Header */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-6 border-b-4 border-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm border-4 border-white/30 transform -skew-x-12 mb-3">
            <span className="transform skew-x-12 text-xs font-black uppercase tracking-wider">{data.flag} {data.city}, {data.country}</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3 leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            {data.name.toUpperCase()}
          </h1>
          <p className="text-base md:text-lg text-blue-100 font-medium max-w-3xl leading-relaxed mb-4">
            {data.description}
          </p>
          <div className="flex flex-wrap gap-4">
            {data.established && (
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm border-2 border-white/30">
                <div className="text-sm font-bold text-blue-100">Kuruluş</div>
                <div className="text-lg font-black">{data.established}</div>
              </div>
            )}
            {data.students && (
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm border-2 border-white/30">
                <div className="text-sm font-bold text-blue-100">Öğrenci</div>
                <div className="text-lg font-black">{data.students}</div>
              </div>
            )}
            {data.ranking && (
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm border-2 border-white/30">
                <div className="text-sm font-bold text-blue-100">Sıralama</div>
                <div className="text-lg font-black">{data.ranking}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Video Section - Hero'dan hemen sonra */}
            {data.videoUrl && (
              <section className="py-6">
                <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-6 md:p-8">
                  <div className="inline-block px-5 py-2.5 bg-red-600 text-white border-4 border-red-800 transform -skew-x-12 mb-6">
                    <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🎥 Tanıtım Videosu</h2>
                  </div>
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full border-4 border-gray-900"
                      src={convertYouTubeUrlToEmbed(data.videoUrl)}
                      title={`${data.name} Tanıtım Videosu`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </section>
            )}

            {/* Intro/Marketing Section */}
            {data.intro && (
              <section className="py-6">
                <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-4 border-purple-200 shadow-[8px_8px_0_0_rgba(147,51,234,0.2)] p-8 md:p-12">
                  <div className="max-w-4xl mx-auto">
                    <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-6">
                      <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🎓 Neden Bu Üniversite?</h2>
                    </div>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-800 text-lg md:text-xl leading-relaxed font-medium">
                        {data.intro}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Features */}
            <section className="py-6">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-6 md:p-8 mb-6">
          <div className="inline-block px-5 py-2.5 bg-blue-600 text-white border-4 border-blue-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">✨ Üniversite Özellikleri</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.features.map((feature, index) => (
              <div key={index} className="p-4 bg-blue-50 border-4 border-blue-200 transform hover:-skew-x-1 transition-all duration-200">
                <div className="transform skew-x-1">
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3 font-black text-xl">✓</span>
                    <span className="font-bold text-gray-900">{feature}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Programs */}
            <section className="py-6">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-6 md:p-8 mb-6">
          <div className="inline-block px-5 py-2.5 bg-indigo-600 text-white border-4 border-indigo-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📚 Programlar</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.programs.map((program, index) => (
              <div key={index} className="p-6 bg-gray-50 border-4 border-gray-300 transform hover:-skew-x-1 transition-all duration-200">
                <div className="transform skew-x-1">
                  <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-tight">{program.name}</h3>
                  <p className="text-gray-700 font-medium leading-relaxed mb-3">{program.description}</p>
                  <div className="px-3 py-1 bg-indigo-100 border-2 border-indigo-300 inline-block">
                    <span className="text-sm font-black text-gray-900">{program.level}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Requirements */}
            <section className="py-6">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-6 md:p-8 mb-6">
          <div className="inline-block px-5 py-2.5 bg-purple-600 text-white border-4 border-purple-800 transform -skew-x-12 mb-6">
            <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📋 Giriş Koşulları</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Language Requirements */}
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-wider">Dil Gereksinimleri</h3>
              <ul className="space-y-2">
                {data.requirements.language.map((req, index) => (
                  <li key={index} className="p-3 bg-purple-50 border-2 border-purple-200">
                    <span className="font-bold text-gray-900">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Academic Requirements */}
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-wider">Akademik Gereksinimler</h3>
              <ul className="space-y-2">
                {data.requirements.academic.map((req, index) => (
                  <li key={index} className="p-3 bg-purple-50 border-2 border-purple-200">
                    <span className="font-bold text-gray-900">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents */}
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-wider">Gerekli Belgeler</h3>
              <ul className="space-y-2">
                {data.requirements.documents.map((doc, index) => (
                  <li key={index} className="p-3 bg-purple-50 border-2 border-purple-200">
                    <span className="font-bold text-gray-900">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

            {/* Location & Campus */}
            <section className="py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10">
            <div className="inline-block px-5 py-2.5 bg-green-600 text-white border-4 border-green-800 transform -skew-x-12 mb-6">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">📍 Lokasyon</h2>
            </div>
            <p className="text-gray-700 font-bold text-lg leading-relaxed">{data.location}</p>
          </div>

          <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10">
            <div className="inline-block px-5 py-2.5 bg-yellow-600 text-white border-4 border-yellow-800 transform -skew-x-12 mb-6">
              <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🏛️ Kampüsler</h2>
            </div>
            <ul className="space-y-3">
              {data.campus.map((campus, index) => (
                <li key={index} className="p-4 bg-yellow-50 border-2 border-yellow-200">
                  <span className="font-bold text-gray-900">{campus}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

            {/* Accommodation & Scholarships */}
            {(data.accommodation || data.scholarships) && (
              <section className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.accommodation && (
              <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10">
                <div className="inline-block px-5 py-2.5 bg-pink-600 text-white border-4 border-pink-800 transform -skew-x-12 mb-6">
                  <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🏠 Konaklama</h2>
                </div>
                <div className="space-y-4">
                  {data.accommodation.map((acc, index) => (
                    <div key={index} className="p-4 bg-pink-50 border-2 border-pink-200">
                      <h3 className="font-black text-gray-900 mb-2 uppercase">{acc.type}</h3>
                      <p className="text-gray-700 font-medium">{acc.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.scholarships && (
              <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-8 md:p-10">
                <div className="inline-block px-5 py-2.5 bg-teal-600 text-white border-4 border-teal-800 transform -skew-x-12 mb-6">
                  <h2 className="transform skew-x-12 text-xl font-black uppercase tracking-wider">🎓 Burslar</h2>
                </div>
                <ul className="space-y-3">
                  {data.scholarships.map((scholarship, index) => (
                    <li key={index} className="p-4 bg-teal-50 border-2 border-teal-200">
                      <span className="font-bold text-gray-900">{scholarship}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
              </div>
              </section>
            )}

            {/* CTA */}
            <section className="py-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-wider">
            {data.name}'a Başvurmaya Hazır mısınız?
          </h2>
          <p className="text-xl text-blue-100 mb-8 font-medium">
            Profesyonel danışmanlarımız size yardımcı olmak için burada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/basvuru"
              className="inline-block px-10 py-5 bg-white text-blue-600 font-black text-lg uppercase tracking-wider border-4 border-blue-800 hover:bg-blue-50 transition-all duration-200 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1"
            >
              Hemen Başvur
            </Link>
            <Link
              href={`/universite/${country}`}
              className="inline-block px-10 py-5 bg-transparent text-white font-black text-lg uppercase tracking-wider border-4 border-white hover:bg-white/10 transition-all duration-200"
            >
              Diğer Üniversiteleri Gör
            </Link>
              </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Same Country Universities */}
              {otherUniversities.length > 0 && (
                <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-5">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-4 border-blue-800 transform -skew-x-12 mb-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                    <h3 className="transform skew-x-12 text-xs font-black uppercase tracking-wider">
                      {data.country}'deki Diğer Üniversiteler
                    </h3>
                  </div>
                  <ul className="space-y-2.5">
                    {otherUniversities.slice(0, 5).map((uni, index) => (
                      <li key={index}>
                        <Link
                          href={uni.href}
                          className="block p-3 bg-gradient-to-r from-blue-50 to-blue-100/50 border-2 border-blue-300 hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 hover:shadow-md transition-all duration-200 transform hover:-translate-x-1 hover:scale-[1.02] rounded-sm"
                        >
                          <span className="font-bold text-sm text-gray-900 leading-tight">{uni.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {currentCountryUniversities.length > 6 && (
                    <Link
                      href={`/universite/${country}`}
                      className="block mt-4 text-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black text-xs uppercase border-2 border-blue-800 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] hover:translate-x-0.5 hover:translate-y-0.5 rounded-sm"
                    >
                      Tümünü Gör
                    </Link>
                  )}
                </div>
              )}

              {/* Other Countries */}
              <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] p-5">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white border-4 border-purple-800 transform -skew-x-12 mb-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                  <h3 className="transform skew-x-12 text-xs font-black uppercase tracking-wider">
                    Diğer Ülkeler
                  </h3>
                </div>
                <div className="space-y-4">
                  {otherCountries.map(([countryKey, universities]) => {
                    const countryName = universities[0]?.href.split('/')[2] || countryKey;
                    return (
                      <div key={countryKey}>
                        <Link
                          href={`/universite/${countryKey}`}
                          className="block px-3 py-2.5 bg-gradient-to-r from-purple-50 to-purple-100/50 border-2 border-purple-300 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-100 hover:to-purple-200 hover:shadow-md transition-all duration-200 mb-2.5 rounded-sm"
                        >
                          <span className="font-black text-sm text-gray-900 uppercase">
                            {countryName.charAt(0).toUpperCase() + countryName.slice(1)}
                          </span>
                        </Link>
                        <ul className="ml-4 space-y-1.5">
                          {universities.slice(0, 3).map((uni, index) => (
                            <li key={index}>
                              <Link
                                href={uni.href}
                                className="block p-2.5 bg-gradient-to-r from-gray-50 to-gray-100/50 border-2 border-gray-300 hover:border-gray-500 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:shadow-sm transition-all duration-200 text-xs font-bold text-gray-800 rounded-sm transform hover:scale-[1.01]"
                              >
                                {uni.title.length > 40 ? `${uni.title.substring(0, 40)}...` : uni.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
    </div>
  );
}

