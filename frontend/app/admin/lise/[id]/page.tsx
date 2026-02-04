'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { API_BASE_URL, API_ENDPOINTS, getAuthHeaders } from '@/config/api';

interface CountryOption {
  id: number;
  value?: string;
  label?: string;
  name?: string;
}

interface CityOption {
  id: number;
  name: string;
}

interface TitledOption {
  title: string;
  description: string;
}

interface HighSchoolDto {
  id: number;
  name: string;
  countryId: number;
  cityId?: number | null;
  description?: string | null;
  whySchool?: string | null;
  location?: string | null;
  established?: string | null;
  students?: string | null;
  website?: string | null;
  status: string;
  features?: string[];
  programOptions?: TitledOption[];
  accommodationOptions?: TitledOption[];
  facilities?: string[];
  requirements?: string[];
  accreditation?: string[];
}

export default function LiseDuzenlePage() {
  const router = useRouter();
  const params = useParams();
  const idParam = (params as any)?.id as string | string[] | undefined;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    countryId: 0,
    cityId: 0,
    description: '',
    whySchool: '',
    location: '',
    established: '',
    students: '',
    website: '',
    status: 'active',
  });
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [cities, setCities] = useState<CityOption[]>([]);
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);
  const [features, setFeatures] = useState<string[]>(['']);
  const [programOptions, setProgramOptions] = useState<TitledOption[]>([{ title: '', description: '' }]);
  const [accommodationOptions, setAccommodationOptions] = useState<TitledOption[]>([{ title: '', description: '' }]);
  const [facilities, setFacilities] = useState<string[]>(['']);
  const [requirements, setRequirements] = useState<string[]>(['']);
  const [accreditation, setAccreditation] = useState<string[]>(['']);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id || id === 'yeni') {
        return;
      }

      setIsFetching(true);
      try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.highSchoolById(Number(id))}`);
        if (!res.ok) {
          throw new Error('Lise detayı yüklenemedi.');
        }

        const data = (await res.json()) as HighSchoolDto;

        setFormData(prev => ({
          ...prev,
          name: data.name ?? '',
          countryId: data.countryId ?? 0,
          cityId: data.cityId ?? 0,
          description: data.description ?? '',
          whySchool: data.whySchool ?? '',
          location: data.location ?? '',
          established: data.established ?? '',
          students: data.students ?? '',
          website: data.website ?? '',
          status: data.status ?? 'active',
        }));

        setFeatures(data.features && data.features.length ? data.features : ['']);
        setProgramOptions(data.programOptions && data.programOptions.length ? data.programOptions : [{ title: '', description: '' }]);
        setAccommodationOptions(data.accommodationOptions && data.accommodationOptions.length ? data.accommodationOptions : [{ title: '', description: '' }]);
        setFacilities(data.facilities && data.facilities.length ? data.facilities : ['']);
        setRequirements(data.requirements && data.requirements.length ? data.requirements : ['']);
        setAccreditation(data.accreditation && data.accreditation.length ? data.accreditation : ['']);
      } catch (error) {
        console.error('Lise detayı yüklenemedi:', error);
        alert('Lise detayı yüklenemedi.');
      } finally {
        setIsFetching(false);
      }
    };

    fetchItem();
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

  const addTitledOption = (setter: React.Dispatch<React.SetStateAction<TitledOption[]>>) => {
    setter(prev => [...prev, { title: '', description: '' }]);
  };
  const removeTitledOption = (setter: React.Dispatch<React.SetStateAction<TitledOption[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };
  const updateTitledOption = (
    setter: React.Dispatch<React.SetStateAction<TitledOption[]>>,
    index: number,
    field: keyof TitledOption,
    value: string
  ) => {
    setter(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const submitData = {
        ...formData,
        cityId: formData.cityId || null,
        features: features.filter(f => f.trim() !== ''),
        programOptions: programOptions
          .map((p) => ({ title: p.title.trim(), description: p.description.trim() }))
          .filter((p) => p.title !== ''),
        accommodationOptions: accommodationOptions
          .map((a) => ({ title: a.title.trim(), description: a.description.trim() }))
          .filter((a) => a.title !== ''),
        facilities: facilities.filter(f => f.trim() !== ''),
        requirements: requirements.filter(r => r.trim() !== ''),
        accreditation: accreditation.filter(a => a.trim() !== ''),
      };

      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.highSchoolById(Number(id))}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(submitData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Lise güncellenemedi.');
      }

      router.push('/admin/lise');
    } catch (error) {
      console.error('Lise güncellenirken hata oluştu:', error);
      alert('Lise güncellenirken bir hata oluştu.');
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
        {isFetching && (
          <div className="text-center text-gray-600 font-semibold">
            Yükleniyor...
          </div>
        )}
        {/* Temel Bilgiler */}
        <div className="border-b-2 border-gray-200 pb-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Temel Bilgiler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Lise Adı <span className="text-red-500">*</span></label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600" required /></div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Ülke <span className="text-red-500">*</span></label>
              <select
                value={formData.countryId}
                onChange={(e) => setFormData({ ...formData, countryId: Number(e.target.value), cityId: 0 })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600"
                required
              >
                <option value={0}>Seçiniz</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.label ?? country.name ?? country.value ?? 'Ülke'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Şehir <span className="text-red-500">*</span></label>
              <select
                value={formData.cityId}
                onChange={(e) => setFormData({ ...formData, cityId: Number(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600"
                required
                disabled={!formData.countryId || isCitiesLoading}
              >
                <option value={0}>{isCitiesLoading ? 'Yükleniyor...' : 'Seçiniz'}</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Konum <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Örn: Beverly Hills, Los Angeles, California"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600"
                required
              />
            </div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Kuruluş</label><input type="text" value={formData.established} onChange={(e) => setFormData({ ...formData, established: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Öğrenci Sayısı</label><input type="text" value={formData.students} onChange={(e) => setFormData({ ...formData, students: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Website</label><input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Durum</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600"><option value="active">Aktif</option><option value="inactive">Pasif</option></select></div>
          </div>
          <div className="mt-6"><label className="block text-sm font-bold text-gray-700 mb-2">Açıklama <span className="text-red-500">*</span></label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600" required /></div>
          <div className="mt-6"><label className="block text-sm font-bold text-gray-700 mb-2">Neden Bu Lise?</label><textarea value={formData.whySchool} onChange={(e) => setFormData({ ...formData, whySchool: e.target.value })} rows={4} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600" /></div>
        </div>

        {/* Okul Özellikleri */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Okul Özellikleri</h2><button type="button" onClick={() => addItem(setFeatures)} className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-bold hover:bg-emerald-200 transition-colors">+ Özellik Ekle</button></div>
          <div className="space-y-3">{features.map((item, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={item} onChange={(e) => updateItem(setFeatures, index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600" />{features.length > 1 && (<button type="button" onClick={() => removeItem(setFeatures, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        {/* Program Seçenekleri */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Program Seçenekleri</h2><button type="button" onClick={() => addTitledOption(setProgramOptions)} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-bold hover:bg-indigo-200 transition-colors">+ Program Ekle</button></div>
          <div className="space-y-4">
            {programOptions.map((item, index) => (
              <div key={index} className="p-4 border-2 border-gray-200 rounded-lg space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateTitledOption(setProgramOptions, index, 'title', e.target.value)}
                    placeholder="Başlık (Örn: 9-12. Sınıf Programı)"
                    className="md:col-span-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                  />
                  <textarea
                    value={item.description}
                    onChange={(e) => updateTitledOption(setProgramOptions, index, 'description', e.target.value)}
                    placeholder="Açıklama (Örn: Tam lise eğitimi, 4 yıllık diploma programı)"
                    rows={2}
                    className="md:col-span-2 w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                  />
                </div>
                {programOptions.length > 1 && (
                  <div className="flex justify-end">
                    <button type="button" onClick={() => removeTitledOption(setProgramOptions, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Konaklama Seçenekleri */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Konaklama Seçenekleri</h2><button type="button" onClick={() => addTitledOption(setAccommodationOptions)} className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg font-bold hover:bg-pink-200 transition-colors">+ Konaklama Ekle</button></div>
          <div className="space-y-4">
            {accommodationOptions.map((item, index) => (
              <div key={index} className="p-4 border-2 border-gray-200 rounded-lg space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateTitledOption(setAccommodationOptions, index, 'title', e.target.value)}
                    placeholder="Başlık (Örn: Aile Yanı Konaklama)"
                    className="md:col-span-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600"
                  />
                  <textarea
                    value={item.description}
                    onChange={(e) => updateTitledOption(setAccommodationOptions, index, 'description', e.target.value)}
                    placeholder="Açıklama (Örn: Yerel ailelerin yanında konaklama, kahvaltı ve akşam yemeği dahil)"
                    rows={2}
                    className="md:col-span-2 w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600"
                  />
                </div>
                {accommodationOptions.length > 1 && (
                  <div className="flex justify-end">
                    <button type="button" onClick={() => removeTitledOption(setAccommodationOptions, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>
                  </div>
                )}
              </div>
            ))}
          </div>
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
