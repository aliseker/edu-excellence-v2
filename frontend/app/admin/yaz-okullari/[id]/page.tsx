'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

interface Accommodation {
  type: string;
  description: string;
  meals: string;
}

interface CountryOption {
  id: number;
  value: string;
  label: string;
}

interface CityOption {
  id: number;
  name: string;
}

export default function YazOkuluDuzenlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    countryId: 0,
    cityId: 0,
    flag: '🇬🇧',
    description: '',
    ageRange: '',
    duration: '',
    location: '',
    status: 'active',
  });
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [cities, setCities] = useState<CityOption[]>([]);
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);
  const [features, setFeatures] = useState<string[]>(['']);
  const [lessons, setLessons] = useState('');
  const [activities, setActivities] = useState<string[]>(['']);
  const [excursions, setExcursions] = useState<string[]>(['']);
  const [accommodation, setAccommodation] = useState<Accommodation[]>([{ type: '', description: '', meals: '' }]);
  const [included, setIncluded] = useState<string[]>(['']);
  const [dates, setDates] = useState<string[]>(['']);

  useEffect(() => {
    if (id !== 'yeni') {
      // TODO: Backend'den veri çek
    }
  }, [id]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.locationCountries}`);
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error('Ülkeler yüklenemedi:', error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.countryId) {
        setCities([]);
        return;
      }
      setIsCitiesLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.locationCities(formData.countryId)}`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error('Şehirler yüklenemedi:', error);
      } finally {
        setIsCitiesLoading(false);
      }
    };
    fetchCities();
  }, [formData.countryId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => setter(prev => [...prev, '']);
  const removeItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => setter(prev => prev.filter((_, i) => i !== index));
  const updateItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter(prev => { const newItems = [...prev]; newItems[index] = value; return newItems; });
  };

  const addAccommodation = () => setAccommodation([...accommodation, { type: '', description: '', meals: '' }]);
  const removeAccommodation = (index: number) => setAccommodation(accommodation.filter((_, i) => i !== index));
  const updateAccommodation = (index: number, field: keyof Accommodation, value: string) => {
    const newAccommodation = [...accommodation];
    newAccommodation[index] = { ...newAccommodation[index], [field]: value };
    setAccommodation(newAccommodation);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const submitData = {
        ...formData,
        features: features.filter(f => f.trim() !== ''),
        program: { lessons, activities: activities.filter(a => a.trim() !== ''), excursions: excursions.filter(e => e.trim() !== '') },
        accommodation: accommodation.filter(a => a.type.trim() !== ''),
        included: included.filter(i => i.trim() !== ''),
        dates: dates.filter(d => d.trim() !== ''),
      };
      console.log('Form Data:', submitData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/admin/yaz-okullari');
    } catch (error) {
      console.error('Hata:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-black text-gray-900">Yaz Okulu Düzenle</h1><p className="text-gray-600 mt-1">Yaz okulu bilgilerini güncelleyin</p></div>
        <Link href="/admin/yaz-okullari" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">← Geri Dön</Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 space-y-6">
        <div className="border-b-2 border-gray-200 pb-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Temel Bilgiler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Okul Adı <span className="text-red-500">*</span></label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600" required /></div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Ülke <span className="text-red-500">*</span></label>
              <select value={formData.countryId} onChange={(e) => setFormData({ ...formData, countryId: Number(e.target.value), cityId: 0 })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600" required>
                <option value={0}>Seçiniz</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>{country.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Şehir <span className="text-red-500">*</span></label>
              <select value={formData.cityId} onChange={(e) => setFormData({ ...formData, cityId: Number(e.target.value) })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600" required disabled={!formData.countryId || isCitiesLoading}>
                <option value={0}>{isCitiesLoading ? 'Yükleniyor...' : 'Seçiniz'}</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Bayrak Emoji</label><input type="text" value={formData.flag} onChange={(e) => setFormData({ ...formData, flag: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Yaş Grubu <span className="text-red-500">*</span></label><input type="text" value={formData.ageRange} onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600" required /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Program Süresi <span className="text-red-500">*</span></label><input type="text" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600" required /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Lokasyon <span className="text-red-500">*</span></label><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600" required /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Durum</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"><option value="active">Aktif</option><option value="inactive">Pasif</option></select></div>
          </div>
          <div className="mt-6"><label className="block text-sm font-bold text-gray-700 mb-2">Açıklama <span className="text-red-500">*</span></label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600" required /></div>
        </div>

        <div className="border-b-2 border-gray-200 pb-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Resim</h2>
          <div><label className="block text-sm font-bold text-gray-700 mb-2">Okul Resmi</label><input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600" />{imagePreview && (<div className="mt-4"><Image src={imagePreview} alt="Preview" width={300} height={200} className="rounded-lg border-2 border-gray-300" /></div>)}</div>
        </div>

        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Program Tarihleri</h2><button type="button" onClick={() => addItem(setDates)} className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-bold hover:bg-orange-200 transition-colors">+ Tarih Ekle</button></div>
          <div className="space-y-3">{dates.map((date, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={date} onChange={(e) => updateItem(setDates, index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600" />{dates.length > 1 && (<button type="button" onClick={() => removeItem(setDates, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Program Özellikleri</h2><button type="button" onClick={() => addItem(setFeatures)} className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-bold hover:bg-orange-200 transition-colors">+ Özellik Ekle</button></div>
          <div className="space-y-3">{features.map((feature, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={feature} onChange={(e) => updateItem(setFeatures, index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600" />{features.length > 1 && (<button type="button" onClick={() => removeItem(setFeatures, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        <div className="border-b-2 border-gray-200 pb-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Eğitim Programı</h2>
          <div><label className="block text-sm font-bold text-gray-700 mb-2">Dersler</label><input type="text" value={lessons} onChange={(e) => setLessons(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600" /></div>
          <div className="mt-4"><div className="flex items-center justify-between mb-4"><label className="block text-sm font-bold text-gray-700">Günlük Aktiviteler</label><button type="button" onClick={() => addItem(setActivities)} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">+ Aktivite Ekle</button></div><div className="space-y-3">{activities.map((activity, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={activity} onChange={(e) => updateItem(setActivities, index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600" />{activities.length > 1 && (<button type="button" onClick={() => removeItem(setActivities, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div></div>
        </div>

        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Geziler</h2><button type="button" onClick={() => addItem(setExcursions)} className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg font-bold hover:bg-pink-200 transition-colors">+ Gezi Ekle</button></div>
          <div className="space-y-3">{excursions.map((excursion, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={excursion} onChange={(e) => updateItem(setExcursions, index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600" />{excursions.length > 1 && (<button type="button" onClick={() => removeItem(setExcursions, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Konaklama Seçenekleri</h2><button type="button" onClick={addAccommodation} className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-bold hover:bg-yellow-200 transition-colors">+ Konaklama Ekle</button></div>
          <div className="space-y-4">{accommodation.map((acc, index) => (<div key={index} className="p-4 border-2 border-gray-200 rounded-lg space-y-3"><div className="grid grid-cols-1 md:grid-cols-4 gap-3"><input type="text" value={acc.type} onChange={(e) => updateAccommodation(index, 'type', e.target.value)} className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600" /><textarea value={acc.description} onChange={(e) => updateAccommodation(index, 'description', e.target.value)} rows={2} className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600" /><input type="text" value={acc.meals} onChange={(e) => updateAccommodation(index, 'meals', e.target.value)} className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600" /><button type="button" onClick={() => removeAccommodation(index)} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button></div></div>))}</div>
        </div>

        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Dahil Olan Hizmetler</h2><button type="button" onClick={() => addItem(setIncluded)} className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-bold hover:bg-green-200 transition-colors">+ Hizmet Ekle</button></div>
          <div className="space-y-3">{included.map((item, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={item} onChange={(e) => updateItem(setIncluded, index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600" />{included.length > 1 && (<button type="button" onClick={() => removeItem(setIncluded, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Link href="/admin/yaz-okullari" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">İptal</Link>
          <button type="submit" disabled={isLoading} className="px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? 'Güncelleniyor...' : 'Güncelle'}</button>
        </div>
      </form>
    </div>
  );
}
