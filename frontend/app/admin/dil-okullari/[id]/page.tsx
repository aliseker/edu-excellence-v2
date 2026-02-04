'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { API_BASE_URL, API_ENDPOINTS, getAuthHeaders } from '@/config/api';

interface Course {
  name: string;
  description: string;
  hours: string;
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

export default function DilOkuluDuzenlePage() {
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
  const [courses, setCourses] = useState<Course[]>([{ name: '', description: '', hours: '' }]);
  const [accommodation, setAccommodation] = useState<Accommodation[]>([{ type: '', description: '' }]);
  const [facilities, setFacilities] = useState<string[]>(['']);
  const [accreditation, setAccreditation] = useState<string[]>(['']);

  useEffect(() => {
    const fetchDetail = async () => {
      if (id === 'yeni') {
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.languageSchoolById(Number(id))}`);
        const data = await res.json();
        setFormData({
          name: data.name ?? '',
          countryId: data.countryId ?? 0,
          cityId: data.cityId ?? 0,
          flag: data.flag ?? '🇬🇧',
          description: data.description ?? '',
          location: data.location ?? '',
          established: data.established ?? '',
          students: data.students ?? '',
          website: data.website ?? '',
          status: data.status ?? 'active',
        });
        setFeatures(data.features?.length ? data.features : ['']);
        setCourses(data.courses?.length ? data.courses : [{ name: '', description: '', hours: '' }]);
        setAccommodation(data.accommodation?.length ? data.accommodation : [{ type: '', description: '' }]);
        setFacilities(data.facilities?.length ? data.facilities : ['']);
        setAccreditation(data.accreditation?.length ? data.accreditation : ['']);
        if (data.imageBase64) {
          const base64 = data.imageBase64 as string;
          const normalized = base64.startsWith('data:')
            || base64.startsWith('http')
            || base64.startsWith('/')
            ? base64
            : `data:image/jpeg;base64,${base64}`;
          setImagePreview(normalized);
        } else {
          setImagePreview(null);
        }
      } catch (error) {
        console.error('Dil okulu yüklenemedi:', error);
      }
    };
    fetchDetail();
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
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addFeature = () => setFeatures([...features, '']);
  const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));
  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addCourse = () => setCourses([...courses, { name: '', description: '', hours: '' }]);
  const removeCourse = (index: number) => setCourses(courses.filter((_, i) => i !== index));
  const updateCourse = (index: number, field: keyof Course, value: string) => {
    const newCourses = [...courses];
    newCourses[index] = { ...newCourses[index], [field]: value };
    setCourses(newCourses);
  };

  const addAccommodation = () => setAccommodation([...accommodation, { type: '', description: '' }]);
  const removeAccommodation = (index: number) => setAccommodation(accommodation.filter((_, i) => i !== index));
  const updateAccommodation = (index: number, field: keyof Accommodation, value: string) => {
    const newAccommodation = [...accommodation];
    newAccommodation[index] = { ...newAccommodation[index], [field]: value };
    setAccommodation(newAccommodation);
  };

  const addFacility = () => setFacilities([...facilities, '']);
  const removeFacility = (index: number) => setFacilities(facilities.filter((_, i) => i !== index));
  const updateFacility = (index: number, value: string) => {
    const newFacilities = [...facilities];
    newFacilities[index] = value;
    setFacilities(newFacilities);
  };

  const addAccreditation = () => setAccreditation([...accreditation, '']);
  const removeAccreditation = (index: number) => setAccreditation(accreditation.filter((_, i) => i !== index));
  const updateAccreditation = (index: number, value: string) => {
    const newAccreditation = [...accreditation];
    newAccreditation[index] = value;
    setAccreditation(newAccreditation);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = {
        ...formData,
        cityId: formData.cityId || null,
        imageBase64: imagePreview ?? null,
        features: features.filter(f => f.trim() !== ''),
        courses: courses.filter(c => c.name.trim() !== ''),
        accommodation: accommodation.filter(a => a.type.trim() !== ''),
        facilities: facilities.filter(f => f.trim() !== ''),
        accreditation: accreditation.filter(a => a.trim() !== ''),
      };
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.languageSchoolById(Number(id))}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(submitData),
      });
      if (!response.ok) {
        throw new Error('Güncelleme başarısız.');
      }
      router.push('/admin/dil-okullari');
    } catch (error) {
      console.error('Hata:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Dil Okulu Düzenle</h1>
          <p className="text-gray-600 mt-1">Dil okulu bilgilerini güncelleyin</p>
        </div>
        <Link href="/admin/dil-okullari" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">← Geri Dön</Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 space-y-6">
        {/* Temel Bilgiler */}
        <div className="border-b-2 border-gray-200 pb-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Temel Bilgiler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Okul Adı <span className="text-red-500">*</span></label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" required /></div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Ülke <span className="text-red-500">*</span></label>
            <select value={formData.countryId} onChange={(e) => setFormData({ ...formData, countryId: Number(e.target.value), cityId: 0 })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" required>
              <option value={0}>Seçiniz</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>{country.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Şehir <span className="text-red-500">*</span></label>
            <select value={formData.cityId} onChange={(e) => setFormData({ ...formData, cityId: Number(e.target.value) })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" required disabled={!formData.countryId || isCitiesLoading}>
              <option value={0}>{isCitiesLoading ? 'Yükleniyor...' : 'Seçiniz'}</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Bayrak Emoji</label><input type="text" value={formData.flag} onChange={(e) => setFormData({ ...formData, flag: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Kuruluş Yılı</label><input type="text" value={formData.established} onChange={(e) => setFormData({ ...formData, established: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Öğrenci Kapasitesi</label><input type="text" value={formData.students} onChange={(e) => setFormData({ ...formData, students: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Website</label><input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Durum</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"><option value="active">Aktif</option><option value="inactive">Pasif</option></select></div>
          </div>
          <div className="mt-6"><label className="block text-sm font-bold text-gray-700 mb-2">Açıklama <span className="text-red-500">*</span></label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" required /></div>
          <div className="mt-6"><label className="block text-sm font-bold text-gray-700 mb-2">Lokasyon <span className="text-red-500">*</span></label><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" required /></div>
        </div>

        {/* Resim */}
        <div className="border-b-2 border-gray-200 pb-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Resim</h2>
          <div><label className="block text-sm font-bold text-gray-700 mb-2">Okul Resmi</label><input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" />{imagePreview && (<div className="mt-4"><Image src={imagePreview} alt="Preview" width={300} height={200} className="rounded-lg border-2 border-gray-300" /></div>)}</div>
        </div>

        {/* Okul Özellikleri */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Okul Özellikleri</h2><button type="button" onClick={addFeature} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-bold hover:bg-purple-200 transition-colors">+ Özellik Ekle</button></div>
          <div className="space-y-3">{features.map((feature, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={feature} onChange={(e) => updateFeature(index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" />{features.length > 1 && (<button type="button" onClick={() => removeFeature(index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        {/* Kurs Programları */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Kurs Programları</h2><button type="button" onClick={addCourse} className="px-4 py-2 bg-violet-100 text-violet-700 rounded-lg font-bold hover:bg-violet-200 transition-colors">+ Kurs Ekle</button></div>
          <div className="space-y-4">{courses.map((course, index) => (<div key={index} className="p-4 border-2 border-gray-200 rounded-lg space-y-3"><div className="grid grid-cols-1 md:grid-cols-3 gap-3"><input type="text" value={course.name} onChange={(e) => updateCourse(index, 'name', e.target.value)} className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-600" /><input type="text" value={course.hours} onChange={(e) => updateCourse(index, 'hours', e.target.value)} className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-600" /><button type="button" onClick={() => removeCourse(index)} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button></div><textarea value={course.description} onChange={(e) => updateCourse(index, 'description', e.target.value)} rows={2} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-600" /></div>))}</div>
        </div>

        {/* Konaklama */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Konaklama Seçenekleri</h2><button type="button" onClick={addAccommodation} className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg font-bold hover:bg-pink-200 transition-colors">+ Konaklama Ekle</button></div>
          <div className="space-y-4">{accommodation.map((acc, index) => (<div key={index} className="p-4 border-2 border-gray-200 rounded-lg space-y-3"><div className="grid grid-cols-1 md:grid-cols-3 gap-3"><input type="text" value={acc.type} onChange={(e) => updateAccommodation(index, 'type', e.target.value)} className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600" /><textarea value={acc.description} onChange={(e) => updateAccommodation(index, 'description', e.target.value)} rows={2} className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600" /><button type="button" onClick={() => removeAccommodation(index)} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button></div></div>))}</div>
        </div>

        {/* Tesisler */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Tesisler</h2><button type="button" onClick={addFacility} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold hover:bg-blue-200 transition-colors">+ Tesis Ekle</button></div>
          <div className="space-y-3">{facilities.map((facility, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={facility} onChange={(e) => updateFacility(index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" />{facilities.length > 1 && (<button type="button" onClick={() => removeFacility(index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        {/* Akreditasyonlar */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Akreditasyonlar</h2><button type="button" onClick={addAccreditation} className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-bold hover:bg-yellow-200 transition-colors">+ Akreditasyon Ekle</button></div>
          <div className="space-y-3">{accreditation.map((acc, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={acc} onChange={(e) => updateAccreditation(index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600" />{accreditation.length > 1 && (<button type="button" onClick={() => removeAccreditation(index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Link href="/admin/dil-okullari" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">İptal</Link>
          <button type="submit" disabled={isLoading} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? 'Güncelleniyor...' : 'Güncelle'}</button>
        </div>
      </form>
    </div>
  );
}
