'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LiseDuzenlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    city: '',
    description: '',
    whySchool: '',
    established: '',
    students: '',
    website: '',
    status: 'active',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [features, setFeatures] = useState<string[]>(['']);
  const [programOptions, setProgramOptions] = useState<string[]>(['']);
  const [accommodationOptions, setAccommodationOptions] = useState<string[]>(['']);
  const [facilities, setFacilities] = useState<string[]>(['']);
  const [requirements, setRequirements] = useState<string[]>(['']);
  const [accreditation, setAccreditation] = useState<string[]>(['']);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (id !== 'yeni') {
      // TODO: API'den veri çek
    }
  }, [id]);

  const addItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, '']);
  };
  const removeItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };
  const updateItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter(prev => {
      const newItems = [...prev];
      newItems[index] = value;
      return newItems;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const submitData = {
        ...formData,
        features: features.filter(f => f.trim() !== ''),
        programOptions: programOptions.filter(p => p.trim() !== ''),
        accommodationOptions: accommodationOptions.filter(a => a.trim() !== ''),
        facilities: facilities.filter(f => f.trim() !== ''),
        requirements: requirements.filter(r => r.trim() !== ''),
        accreditation: accreditation.filter(a => a.trim() !== ''),
      };
      console.log('Form Data:', submitData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/admin/lise');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-black text-gray-900">Lise Programı Düzenle</h1><p className="text-gray-600 mt-1">Lise programı bilgilerini güncelleyin</p></div>
        <Link href="/admin/lise" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">← Geri Dön</Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 space-y-6">
        {/* Temel Bilgiler */}
        <div className="border-b-2 border-gray-200 pb-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Temel Bilgiler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Lise Adı <span className="text-red-500">*</span></label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600" required /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Ülke <span className="text-red-500">*</span></label><select value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600" required><option value="">Seçiniz</option><option value="ingiltere">İngiltere</option><option value="amerika">Amerika</option><option value="kanada">Kanada</option><option value="almanya">Almanya</option></select></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Şehir <span className="text-red-500">*</span></label><input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600" required /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Kuruluş</label><input type="text" value={formData.established} onChange={(e) => setFormData({ ...formData, established: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Öğrenci Sayısı</label><input type="text" value={formData.students} onChange={(e) => setFormData({ ...formData, students: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Website</label><input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Durum</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600"><option value="active">Aktif</option><option value="inactive">Pasif</option></select></div>
          </div>
          <div className="mt-6"><label className="block text-sm font-bold text-gray-700 mb-2">Açıklama <span className="text-red-500">*</span></label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600" required /></div>
          <div className="mt-6"><label className="block text-sm font-bold text-gray-700 mb-2">Neden Bu Lise?</label><textarea value={formData.whySchool} onChange={(e) => setFormData({ ...formData, whySchool: e.target.value })} rows={4} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600" /></div>
        </div>

        {/* Resim */}
        <div className="border-b-2 border-gray-200 pb-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Resim</h2>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Program Resmi</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600" />
            {imagePreview && (
              <div className="mt-3">
                <Image src={imagePreview} alt="Preview" width={300} height={180} className="rounded-lg border-2 border-gray-300" />
              </div>
            )}
          </div>
        </div>

        {/* Okul Özellikleri */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Okul Özellikleri</h2><button type="button" onClick={() => addItem(setFeatures)} className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-bold hover:bg-emerald-200 transition-colors">+ Özellik Ekle</button></div>
          <div className="space-y-3">{features.map((item, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={item} onChange={(e) => updateItem(setFeatures, index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600" />{features.length > 1 && (<button type="button" onClick={() => removeItem(setFeatures, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        {/* Program Seçenekleri */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Program Seçenekleri</h2><button type="button" onClick={() => addItem(setProgramOptions)} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-bold hover:bg-indigo-200 transition-colors">+ Program Ekle</button></div>
          <div className="space-y-3">{programOptions.map((item, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={item} onChange={(e) => updateItem(setProgramOptions, index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" />{programOptions.length > 1 && (<button type="button" onClick={() => removeItem(setProgramOptions, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        {/* Konaklama Seçenekleri */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Konaklama Seçenekleri</h2><button type="button" onClick={() => addItem(setAccommodationOptions)} className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg font-bold hover:bg-pink-200 transition-colors">+ Konaklama Ekle</button></div>
          <div className="space-y-3">{accommodationOptions.map((item, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={item} onChange={(e) => updateItem(setAccommodationOptions, index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600" />{accommodationOptions.length > 1 && (<button type="button" onClick={() => removeItem(setAccommodationOptions, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        {/* Okul Olanakları */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Okul Olanakları</h2><button type="button" onClick={() => addItem(setFacilities)} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold hover:bg-blue-200 transition-colors">+ Olanak Ekle</button></div>
          <div className="space-y-3">{facilities.map((item, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={item} onChange={(e) => updateItem(setFacilities, index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" />{facilities.length > 1 && (<button type="button" onClick={() => removeItem(setFacilities, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        {/* Başvuru Gereksinimleri */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Başvuru Gereksinimleri</h2><button type="button" onClick={() => addItem(setRequirements)} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">+ Gereksinim Ekle</button></div>
          <div className="space-y-3">{requirements.map((item, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={item} onChange={(e) => updateItem(setRequirements, index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600" />{requirements.length > 1 && (<button type="button" onClick={() => removeItem(setRequirements, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        {/* Akreditasyon */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Akreditasyon Alanları</h2><button type="button" onClick={() => addItem(setAccreditation)} className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-bold hover:bg-yellow-200 transition-colors">+ Akreditasyon Ekle</button></div>
          <div className="space-y-3">{accreditation.map((item, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={item} onChange={(e) => updateItem(setAccreditation, index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600" />{accreditation.length > 1 && (<button type="button" onClick={() => removeItem(setAccreditation, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Link href="/admin/lise" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">İptal</Link>
          <button type="submit" disabled={isLoading} className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-bold hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? 'Güncelleniyor...' : 'Güncelle'}</button>
        </div>
      </form>
    </div>
  );
}
