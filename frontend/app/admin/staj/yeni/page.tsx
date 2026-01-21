'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

export default function YeniStajPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    countryId: 0,
    generalInfo: '',
  });
  const [countries, setCountries] = useState<Array<{ id: number; name?: string; label?: string }>>([]);
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
  const [programs, setPrograms] = useState<Array<{
    title: string;
    description: string;
    duration: string;
    areas: string[];
    requirements: string[];
  }>>([
    { title: '', description: '', duration: '', areas: [''], requirements: [''] },
  ]);
  const [advantages, setAdvantages] = useState<string[]>(['']);
  const [applicationSteps, setApplicationSteps] = useState<string[]>(['']);
  const [requiredDocuments, setRequiredDocuments] = useState<string[]>(['']);

  const addItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, '']);
  };
  const removeItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };
  const updateItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const addProgram = () => {
    setPrograms(prev => [...prev, { title: '', description: '', duration: '', areas: [''], requirements: [''] }]);
  };
  const removeProgram = (index: number) => {
    setPrograms(prev => prev.filter((_, i) => i !== index));
  };
  const updateProgram = (index: number, field: 'title' | 'description' | 'duration', value: string) => {
    setPrograms(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };
  const addProgramItem = (index: number, field: 'areas' | 'requirements') => {
    setPrograms(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: [...next[index][field], ''] };
      return next;
    });
  };
  const removeProgramItem = (index: number, field: 'areas' | 'requirements', itemIndex: number) => {
    setPrograms(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: next[index][field].filter((_, i) => i !== itemIndex) };
      return next;
    });
  };
  const updateProgramItem = (index: number, field: 'areas' | 'requirements', itemIndex: number, value: string) => {
    setPrograms(prev => {
      const next = [...prev];
      const list = [...next[index][field]];
      list[itemIndex] = value;
      next[index] = { ...next[index], [field]: list };
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const submitData = {
        ...formData,
        status: 'active',
        programs: programs.map((program) => ({
          ...program,
          areas: program.areas.filter(item => item.trim() !== ''),
          requirements: program.requirements.filter(item => item.trim() !== ''),
        })).filter(program => program.title.trim() !== ''),
        advantages: advantages.filter(item => item.trim() !== ''),
        applicationSteps: applicationSteps.filter(item => item.trim() !== ''),
        requiredDocuments: requiredDocuments.filter(item => item.trim() !== ''),
      };
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.internshipPrograms}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Program eklenemedi.');
      }
      router.push('/admin/staj');
    } catch (error: any) {
      console.error('Program eklenirken hata oluştu:', error);
      alert(`Program eklenirken bir hata oluştu: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-black text-gray-900">Yeni Staj Programı Ekle</h1><p className="text-gray-600 mt-1">Yeni bir staj programı kaydı oluşturun</p></div>
        <Link href="/admin/staj" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">← Geri Dön</Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Ülke <span className="text-red-500">*</span></label>
            <select
              value={formData.countryId}
              onChange={(e) => setFormData({ ...formData, countryId: Number(e.target.value) })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
              required
            >
              <option value={0}>Seçiniz</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name ?? country.label ?? 'Ülke'}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Genel Bilgiler <span className="text-red-500">*</span></label>
          <textarea
            value={formData.generalInfo}
            onChange={(e) => setFormData({ ...formData, generalInfo: e.target.value })}
            rows={5}
            placeholder="Genel açıklama yazın"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
            required
          />
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900">Staj Programları</h2>
            <button type="button" onClick={addProgram} className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg font-bold hover:bg-teal-200 transition-colors">
              + Program Ekle
            </button>
          </div>

          <div className="space-y-4">
            {programs.map((program, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Program Adı <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={program.title}
                      onChange={(e) => updateProgram(index, 'title', e.target.value)}
                      placeholder="Örn: Turizm Stajı"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Süre</label>
                    <input
                      type="text"
                      value={program.duration}
                      onChange={(e) => updateProgram(index, 'duration', e.target.value)}
                      placeholder="Örn: 6-12 ay"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Açıklama</label>
                  <textarea
                    value={program.description}
                    onChange={(e) => updateProgram(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-bold text-gray-700">Alanlar</label>
                      <button type="button" onClick={() => addProgramItem(index, 'areas')} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded font-bold hover:bg-indigo-200 transition-colors">
                        + Ekle
                      </button>
                    </div>
                    {program.areas.map((area, areaIndex) => (
                      <div key={areaIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={area}
                          onChange={(e) => updateProgramItem(index, 'areas', areaIndex, e.target.value)}
                          placeholder="Örn: Otel Yönetimi"
                          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
                        />
                        {program.areas.length > 1 && (
                          <button type="button" onClick={() => removeProgramItem(index, 'areas', areaIndex)} className="px-3 py-2 bg-red-100 text-red-700 rounded font-bold hover:bg-red-200 transition-colors">
                            Sil
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-bold text-gray-700">Gereksinimler</label>
                      <button type="button" onClick={() => addProgramItem(index, 'requirements')} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded font-bold hover:bg-indigo-200 transition-colors">
                        + Ekle
                      </button>
                    </div>
                    {program.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={req}
                          onChange={(e) => updateProgramItem(index, 'requirements', reqIndex, e.target.value)}
                          placeholder="Örn: Temel İngilizce bilgisi"
                          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
                        />
                        {program.requirements.length > 1 && (
                          <button type="button" onClick={() => removeProgramItem(index, 'requirements', reqIndex)} className="px-3 py-2 bg-red-100 text-red-700 rounded font-bold hover:bg-red-200 transition-colors">
                            Sil
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {programs.length > 1 && (
                  <div className="flex justify-end">
                    <button type="button" onClick={() => removeProgram(index)} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">
                      Programı Sil
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900">Program Avantajları</h2>
            <button type="button" onClick={() => addItem(setAdvantages)} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-bold hover:bg-purple-200 transition-colors">
              + Ekle
            </button>
          </div>
          <div className="space-y-3">
            {advantages.map((adv, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={adv}
                  onChange={(e) => updateItem(setAdvantages, index, e.target.value)}
                  placeholder="Örn: J-1 vize desteği"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
                />
                {advantages.length > 1 && (
                  <button type="button" onClick={() => removeItem(setAdvantages, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">
                    Sil
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900">Başvuru Süreci</h2>
            <button type="button" onClick={() => addItem(setApplicationSteps)} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold hover:bg-blue-200 transition-colors">
              + Adım Ekle
            </button>
          </div>
          <div className="space-y-3">
            {applicationSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={step}
                  onChange={(e) => updateItem(setApplicationSteps, index, e.target.value)}
                  placeholder={`Adım ${index + 1}`}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
                />
                {applicationSteps.length > 1 && (
                  <button type="button" onClick={() => removeItem(setApplicationSteps, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">
                    Sil
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900">Gerekli Belgeler</h2>
            <button type="button" onClick={() => addItem(setRequiredDocuments)} className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg font-bold hover:bg-amber-200 transition-colors">
              + Belge Ekle
            </button>
          </div>
          <div className="space-y-3">
            {requiredDocuments.map((doc, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={doc}
                  onChange={(e) => updateItem(setRequiredDocuments, index, e.target.value)}
                  placeholder="Örn: Pasaport"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
                />
                {requiredDocuments.length > 1 && (
                  <button type="button" onClick={() => removeItem(setRequiredDocuments, index)} className="px-4 py-3 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">
                    Sil
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Link href="/admin/staj" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors">İptal</Link>
          <button type="submit" disabled={isLoading} className="px-6 py-3 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? 'Kaydediliyor...' : 'Kaydet'}</button>
        </div>
      </form>
    </div>
  );
}
