'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { API_BASE_URL, API_ENDPOINTS, getAuthHeaders } from '@/config/api';

interface Program {
  name: string;
  type: string;
  duration: string;
  description: string;
  concentrations: string[];
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

export default function YeniMasterMBAPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    programType: 'master',
    university: '',
    countryId: 0,
    cityId: 0,
    duration: '',
    shortDescription: '',
    established: '',
    students: '',
    ranking: '',
    intro: '',
    location: '',
    status: 'active',
    imageBase64: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [features, setFeatures] = useState<string[]>(['']);
  const [programs, setPrograms] = useState<Program[]>([{
    name: '',
    type: 'MBA',
    duration: '',
    description: '',
    concentrations: [''],
  }]);
  const [requirementsLanguage, setRequirementsLanguage] = useState<string[]>(['']);
  const [requirementsAcademic, setRequirementsAcademic] = useState<string[]>(['']);
  const [requirementsDocuments, setRequirementsDocuments] = useState<string[]>(['']);
  const [careerServices, setCareerServices] = useState<string[]>(['']);
  const [campus, setCampus] = useState<string[]>(['']);
  const [accreditation, setAccreditation] = useState<string[]>(['']);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [cities, setCities] = useState<CityOption[]>([]);
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({ ...prev, imageBase64: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

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

  const addProgram = () => setPrograms([...programs, { name: '', type: 'MBA', duration: '', description: '', concentrations: [''] }]);
  const removeProgram = (index: number) => setPrograms(programs.filter((_, i) => i !== index));
  const updateProgram = (index: number, field: keyof Program, value: string) => {
    const newPrograms = [...programs];
    newPrograms[index] = { ...newPrograms[index], [field]: value };
    setPrograms(newPrograms);
  };
  const addConcentration = (programIndex: number) => {
    const newPrograms = [...programs];
    newPrograms[programIndex].concentrations = [...newPrograms[programIndex].concentrations, ''];
    setPrograms(newPrograms);
  };
  const removeConcentration = (programIndex: number, index: number) => {
    const newPrograms = [...programs];
    newPrograms[programIndex].concentrations = newPrograms[programIndex].concentrations.filter((_, i) => i !== index);
    setPrograms(newPrograms);
  };
  const updateConcentration = (programIndex: number, index: number, value: string) => {
    const newPrograms = [...programs];
    const list = [...newPrograms[programIndex].concentrations];
    list[index] = value;
    newPrograms[programIndex].concentrations = list;
    setPrograms(newPrograms);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const submitData = {
        ...formData,
        features: features.filter(f => f.trim() !== ''),
        programs: programs.map(p => ({
          ...p,
          concentrations: p.concentrations.filter(c => c.trim() !== '')
        })).filter(p => p.name.trim() !== ''),
        requirements: {
          language: requirementsLanguage.filter(r => r.trim() !== ''),
          academic: requirementsAcademic.filter(r => r.trim() !== ''),
          documents: requirementsDocuments.filter(r => r.trim() !== ''),
        },
        careerServices: careerServices.filter(c => c.trim() !== ''),
        campus: campus.filter(c => c.trim() !== ''),
        accreditation: accreditation.filter(a => a.trim() !== ''),
      };
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.masterPrograms}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(submitData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Program eklenemedi.');
      }

      router.push('/admin/master-mba');
    } catch (error: any) {
      toast.error(`Program eklenirken bir hata oluştu: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.locationCountries}`);
        const data = await res.json();
        setCountries(data);
      } catch (error) {
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
      } finally {
        setIsCitiesLoading(false);
      }
    };
    fetchCities();
  }, [formData.countryId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-black text-gray-900">Yeni Master/MBA Programı Ekle</h1><p className="text-gray-600 mt-1">Yeni bir program kaydı oluşturun</p></div>
        <Link href="/admin/master-mba" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">← Geri Dön</Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 space-y-6">
        {/* Temel Bilgiler */}
        <div className="border-b-2 border-gray-200 pb-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Temel Bilgiler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Program Adı <span className="text-red-500">*</span></label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" required /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Program Türü <span className="text-red-500">*</span></label><select value={formData.programType} onChange={(e) => setFormData({ ...formData, programType: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" required><option value="master">Master / MBA</option></select></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Üniversite <span className="text-red-500">*</span></label><input type="text" value={formData.university} onChange={(e) => setFormData({ ...formData, university: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" required /></div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Ülke <span className="text-red-500">*</span></label>
              <select value={formData.countryId} onChange={(e) => setFormData({ ...formData, countryId: Number(e.target.value), cityId: 0 })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" required>
                <option value={0}>Seçiniz</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>{country.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Şehir</label>
              <select value={formData.cityId} onChange={(e) => setFormData({ ...formData, cityId: Number(e.target.value) })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" disabled={!formData.countryId || isCitiesLoading}>
                <option value={0}>{isCitiesLoading ? 'Yükleniyor...' : 'Seçiniz'}</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Süre</label><input type="text" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Kısa Açıklama</label><input type="text" value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Kuruluş</label><input type="text" value={formData.established} onChange={(e) => setFormData({ ...formData, established: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Öğrenci Sayısı</label><input type="text" value={formData.students} onChange={(e) => setFormData({ ...formData, students: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Sıralama</label><input type="text" value={formData.ranking} onChange={(e) => setFormData({ ...formData, ranking: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Konum</label><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" /></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-2">Durum</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"><option value="active">Aktif</option><option value="inactive">Pasif</option></select></div>
          </div>
          <div className="mt-6"><label className="block text-sm font-bold text-gray-700 mb-2">Neden Bu Okul?</label><textarea value={formData.intro} onChange={(e) => setFormData({ ...formData, intro: e.target.value })} rows={4} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" /></div>
        </div>

        {/* Resim */}
        <div className="border-b-2 border-gray-200 pb-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Resim</h2>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Program Resmi</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" />
            {imagePreview && (
              <div className="mt-3">
                <Image src={imagePreview} alt="Preview" width={300} height={180} className="rounded-lg border-2 border-gray-300" />
              </div>
            )}
          </div>
        </div>

        {/* Okul Özellikleri */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Okul Özellikleri</h2><button type="button" onClick={() => addItem(setFeatures)} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-bold hover:bg-purple-200 transition-colors">+ Özellik Ekle</button></div>
          <div className="space-y-3">{features.map((feature, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={feature} onChange={(e) => updateItem(setFeatures, index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" />{features.length > 1 && (<button type="button" onClick={() => removeItem(setFeatures, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        {/* Programlar */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Programlar</h2><button type="button" onClick={addProgram} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-bold hover:bg-indigo-200 transition-colors">+ Program Ekle</button></div>
          <div className="space-y-4">{programs.map((program, index) => (
            <div key={index} className="p-4 border-2 border-gray-200 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input type="text" value={program.name} onChange={(e) => updateProgram(index, 'name', e.target.value)} placeholder="Program Adı" className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" />
                <select value={program.type} onChange={(e) => updateProgram(index, 'type', e.target.value)} className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600">
                  <option value="MBA">MBA</option>
                  <option value="Master">Master</option>
                </select>
                <input type="text" value={program.duration} onChange={(e) => updateProgram(index, 'duration', e.target.value)} placeholder="Süre (18-24 ay)" className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" />
                <button type="button" onClick={() => removeProgram(index)} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>
              </div>
              <textarea value={program.description} onChange={(e) => updateProgram(index, 'description', e.target.value)} rows={2} placeholder="Program açıklaması" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600" />
              <div className="mt-2">
                <div className="flex items-center justify-between mb-2"><label className="font-bold text-gray-700">Konsantrasyon Alanları</label><button type="button" onClick={() => addConcentration(index)} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg font-bold">+</button></div>
                <div className="space-y-2">
                  {program.concentrations.map((conc, cIndex) => (
                    <div key={cIndex} className="flex items-center gap-2">
                      <input type="text" value={conc} onChange={(e) => updateConcentration(index, cIndex, e.target.value)} className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" />
                      {program.concentrations.length > 1 && (
                        <button type="button" onClick={() => removeConcentration(index, cIndex)} className="px-3 py-2 bg-red-100 text-red-700 rounded-lg font-bold">Sil</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}</div>
        </div>

        {/* Başvuru Şartları */}
        <div className="border-b-2 border-gray-200 pb-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Başvuru Şartları</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-3"><h3 className="font-black text-gray-900">Dil Yeterliliği</h3><button type="button" onClick={() => addItem(setRequirementsLanguage)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg font-bold">+</button></div>
              <div className="space-y-2">{requirementsLanguage.map((item, index) => (<div key={index} className="flex items-center gap-2"><input type="text" value={item} onChange={(e) => updateItem(setRequirementsLanguage, index, e.target.value)} className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600" />{requirementsLanguage.length > 1 && (<button type="button" onClick={() => removeItem(setRequirementsLanguage, index)} className="px-3 py-2 bg-red-100 text-red-700 rounded-lg font-bold">Sil</button>)}</div>))}</div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3"><h3 className="font-black text-gray-900">Akademik Şartlar</h3><button type="button" onClick={() => addItem(setRequirementsAcademic)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg font-bold">+</button></div>
              <div className="space-y-2">{requirementsAcademic.map((item, index) => (<div key={index} className="flex items-center gap-2"><input type="text" value={item} onChange={(e) => updateItem(setRequirementsAcademic, index, e.target.value)} className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600" />{requirementsAcademic.length > 1 && (<button type="button" onClick={() => removeItem(setRequirementsAcademic, index)} className="px-3 py-2 bg-red-100 text-red-700 rounded-lg font-bold">Sil</button>)}</div>))}</div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3"><h3 className="font-black text-gray-900">Gerekli Belgeler</h3><button type="button" onClick={() => addItem(setRequirementsDocuments)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg font-bold">+</button></div>
              <div className="space-y-2">{requirementsDocuments.map((item, index) => (<div key={index} className="flex items-center gap-2"><input type="text" value={item} onChange={(e) => updateItem(setRequirementsDocuments, index, e.target.value)} className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600" />{requirementsDocuments.length > 1 && (<button type="button" onClick={() => removeItem(setRequirementsDocuments, index)} className="px-3 py-2 bg-red-100 text-red-700 rounded-lg font-bold">Sil</button>)}</div>))}</div>
            </div>
          </div>
        </div>

        {/* Kariyer Hizmetleri */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Kariyer Hizmetleri</h2><button type="button" onClick={() => addItem(setCareerServices)} className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-bold hover:bg-green-200 transition-colors">+ Hizmet Ekle</button></div>
          <div className="space-y-3">{careerServices.map((item, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={item} onChange={(e) => updateItem(setCareerServices, index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600" />{careerServices.length > 1 && (<button type="button" onClick={() => removeItem(setCareerServices, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        {/* Kampüsler */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Kampüsler</h2><button type="button" onClick={() => addItem(setCampus)} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold hover:bg-blue-200 transition-colors">+ Kampüs Ekle</button></div>
          <div className="space-y-3">{campus.map((item, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={item} onChange={(e) => updateItem(setCampus, index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" />{campus.length > 1 && (<button type="button" onClick={() => removeItem(setCampus, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        {/* Akreditasyon */}
        <div className="border-b-2 border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-gray-900">Akreditasyon</h2><button type="button" onClick={() => addItem(setAccreditation)} className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-bold hover:bg-yellow-200 transition-colors">+ Akreditasyon Ekle</button></div>
          <div className="space-y-3">{accreditation.map((item, index) => (<div key={index} className="flex items-center gap-3"><input type="text" value={item} onChange={(e) => updateItem(setAccreditation, index, e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600" />{accreditation.length > 1 && (<button type="button" onClick={() => removeItem(setAccreditation, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>)}</div>))}</div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Link href="/admin/master-mba" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">İptal</Link>
          <button type="submit" disabled={isLoading} className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? 'Kaydediliyor...' : 'Kaydet'}</button>
        </div>
      </form>
    </div>
  );
}
