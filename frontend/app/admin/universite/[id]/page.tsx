'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

interface Program {
  name: string;
  description: string;
  level: string;
}

interface Accommodation {
  type: string;
  description: string;
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

export default function UniversiteDuzenlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    countryId: 0,
    cityId: 0,
    ranking: '',
    established: '',
    students: '',
    description: '',
    intro: '',
    videoUrl: '',
    location: '',
    status: 'active',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [features, setFeatures] = useState<string[]>(['']);
  const [programs, setPrograms] = useState<Program[]>([{ name: '', description: '', level: '' }]);
  const [requirementsLanguage, setRequirementsLanguage] = useState<string[]>(['']);
  const [requirementsAcademic, setRequirementsAcademic] = useState<string[]>(['']);
  const [requirementsDocuments, setRequirementsDocuments] = useState<string[]>(['']);
  const [campus, setCampus] = useState<string[]>(['']);
  const [accommodation, setAccommodation] = useState<Accommodation[]>([{ type: '', description: '' }]);
  const [scholarships, setScholarships] = useState<string[]>(['']);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [cities, setCities] = useState<CityOption[]>([]);
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);

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

  const addProgram = () => setPrograms([...programs, { name: '', description: '', level: '' }]);
  const removeProgram = (index: number) => setPrograms(programs.filter((_, i) => i !== index));
  const updateProgram = (index: number, field: keyof Program, value: string) => {
    const newPrograms = [...programs];
    newPrograms[index] = { ...newPrograms[index], [field]: value };
    setPrograms(newPrograms);
  };

  const addAccommodation = () => setAccommodation([...accommodation, { type: '', description: '' }]);
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
        programs: programs.filter(p => p.name.trim() !== ''),
        requirements: {
          language: requirementsLanguage.filter(r => r.trim() !== ''),
          academic: requirementsAcademic.filter(r => r.trim() !== ''),
          documents: requirementsDocuments.filter(r => r.trim() !== ''),
        },
        campus: campus.filter(c => c.trim() !== ''),
        accommodation: accommodation.filter(a => a.type.trim() !== ''),
        scholarships: scholarships.filter(s => s.trim() !== ''),
      };
      console.log('Form Data:', submitData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/admin/universite');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-black text-gray-900">Üniversite Düzenle</h1><p className="text-gray-600 mt-1">Üniversite bilgilerini güncelleyin</p></div>
        <Link href="/admin/universite" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">← Geri Dön</Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 space-y-6">
        {/* Temel Bilgiler */}
        <div className="border-b-2 border-gray-200 pb-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Temel Bilgiler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Üniversite Adı <span className="text-red-500">*</span></label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" required /></div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Ülke <span className="text-red-500">*</span></label>
              <select value={formData.countryId} onChange={(e) => setFormData({ ...formData, countryId: Number(e.target.value), cityId: 0 })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" required>
                <option value={0}>Seçiniz</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>{country.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Şehir <span className="text-red-500">*</span></label>
              <select value={formData.cityId} onChange={(e) => setFormData({ ...formData, cityId: Number(e.target.value) })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" required disabled={!formData.countryId || isCitiesLoading}>
                <option value={0}>{isCitiesLoading ? 'Yükleniyor...' : 'Seçiniz'}</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Sıralama</label><input type="text" value={formData.ranking} onChange={(e) => setFormData({ ...formData, ranking: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Kuruluş</label><input type="text" value={formData.established} onChange={(e) => setFormData({ ...formData, established: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Öğrenci</label><input type="text" value={formData.students} onChange={(e) => setFormData({ ...formData, students: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Tanıtım Videosu (YouTube)</label><input type="url" value={formData.videoUrl} onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Durum</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"><option value="active">Aktif</option><option value="inactive">Pasif</option></select></div>
          </div>
          <div className="mt-6"><label className="block text-sm font-bold text-gray-700 mb-2">Açıklama <span className="text-red-500">*</span></label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" required /></div>
          <div className="mt-6"><label className="block text-sm font-bold text-gray-700 mb-2">Tanıtım Yazısı</label><textarea value={formData.intro} onChange={(e) => setFormData({ ...formData, intro: e.target.value })} rows={4} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" /></div>
          <div className="mt-6"><label className="block text-sm font-bold text-gray-700 mb-2">Lokasyon</label><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" /></div>
        </div>

        {/* Resim */}
        <div className="border-b-2 border-gray-200 pb-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Resim</h2>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Üniversite Resmi</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" />
            {imagePreview && (
              <div className="mt-3">
                <Image src={imagePreview} alt="Preview" width={300} height={180} className="rounded-lg border-2 border-gray-300" />
              </div>
            )}
          </div>
        </div>

        {/* Üniversite Özellikleri */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Üniversite Özellikleri</h2><button type="button" onClick={() => addItem(setFeatures)} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold hover:bg-blue-200 transition-colors">+ Özellik Ekle</button></div>
          <div className="space-y-3">{features.map((feature, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={feature} onChange={(e) => updateItem(setFeatures, index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" />{features.length > 1 && (<button type="button" onClick={() => removeItem(setFeatures, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        {/* Programlar */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Programlar</h2><button type="button" onClick={addProgram} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-bold hover:bg-indigo-200 transition-colors">+ Program Ekle</button></div>
          <div className="space-y-4">{programs.map((program, index) => (<div key={index} className="p-4 border-2 border-gray-200 rounded-lg space-y-3"><div className="grid grid-cols-1 md:grid-cols-3 gap-3"><input type="text" value={program.name} onChange={(e) => updateProgram(index, 'name', e.target.value)} className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" /><input type="text" value={program.level} onChange={(e) => updateProgram(index, 'level', e.target.value)} className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" /><button type="button" onClick={() => removeProgram(index)} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button></div><textarea value={program.description} onChange={(e) => updateProgram(index, 'description', e.target.value)} rows={2} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" /></div>))}</div>
        </div>

        {/* Giriş Koşulları */}
        <div className="border-b-2 border-gray-200 pb-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Giriş Koşulları</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-3"><h3 className="font-black text-gray-900">Dil Gereksinimleri</h3><button type="button" onClick={() => addItem(setRequirementsLanguage)} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg font-bold">+</button></div>
              <div className="space-y-2">{requirementsLanguage.map((item, index) => (<div key={index} className="flex items-center gap-2"><input type="text" value={item} onChange={(e) => updateItem(setRequirementsLanguage, index, e.target.value)} className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" />{requirementsLanguage.length > 1 && (<button type="button" onClick={() => removeItem(setRequirementsLanguage, index)} className="px-3 py-2 bg-red-100 text-red-700 rounded-lg font-bold">Sil</button>)}</div>))}</div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3"><h3 className="font-black text-gray-900">Akademik Gereksinimler</h3><button type="button" onClick={() => addItem(setRequirementsAcademic)} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg font-bold">+</button></div>
              <div className="space-y-2">{requirementsAcademic.map((item, index) => (<div key={index} className="flex items-center gap-2"><input type="text" value={item} onChange={(e) => updateItem(setRequirementsAcademic, index, e.target.value)} className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" />{requirementsAcademic.length > 1 && (<button type="button" onClick={() => removeItem(setRequirementsAcademic, index)} className="px-3 py-2 bg-red-100 text-red-700 rounded-lg font-bold">Sil</button>)}</div>))}</div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3"><h3 className="font-black text-gray-900">Gerekli Belgeler</h3><button type="button" onClick={() => addItem(setRequirementsDocuments)} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg font-bold">+</button></div>
              <div className="space-y-2">{requirementsDocuments.map((item, index) => (<div key={index} className="flex items-center gap-2"><input type="text" value={item} onChange={(e) => updateItem(setRequirementsDocuments, index, e.target.value)} className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" />{requirementsDocuments.length > 1 && (<button type="button" onClick={() => removeItem(setRequirementsDocuments, index)} className="px-3 py-2 bg-red-100 text-red-700 rounded-lg font-bold">Sil</button>)}</div>))}</div>
            </div>
          </div>
        </div>

        {/* Kampüsler */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Kampüsler</h2><button type="button" onClick={() => addItem(setCampus)} className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-bold hover:bg-yellow-200 transition-colors">+ Kampüs Ekle</button></div>
          <div className="space-y-3">{campus.map((item, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={item} onChange={(e) => updateItem(setCampus, index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600" />{campus.length > 1 && (<button type="button" onClick={() => removeItem(setCampus, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        {/* Konaklama */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Konaklama</h2><button type="button" onClick={addAccommodation} className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg font-bold hover:bg-pink-200 transition-colors">+ Konaklama Ekle</button></div>
          <div className="space-y-4">{accommodation.map((acc, index) => (<div key={index} className="p-4 border-2 border-gray-200 rounded-lg space-y-3"><div className="grid grid-cols-1 md:grid-cols-3 gap-3"><input type="text" value={acc.type} onChange={(e) => updateAccommodation(index, 'type', e.target.value)} className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600" /><textarea value={acc.description} onChange={(e) => updateAccommodation(index, 'description', e.target.value)} rows={2} className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600" /><button type="button" onClick={() => removeAccommodation(index)} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button></div></div>))}</div>
        </div>

        {/* Burslar */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Burslar</h2><button type="button" onClick={() => addItem(setScholarships)} className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg font-bold hover:bg-teal-200 transition-colors">+ Burs Ekle</button></div>
          <div className="space-y-3">{scholarships.map((item, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={item} onChange={(e) => updateItem(setScholarships, index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600" />{scholarships.length > 1 && (<button type="button" onClick={() => removeItem(setScholarships, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Link href="/admin/universite" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">İptal</Link>
          <button type="submit" disabled={isLoading} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? 'Güncelleniyor...' : 'Güncelle'}</button>
        </div>
      </form>
    </div>
  );
}
