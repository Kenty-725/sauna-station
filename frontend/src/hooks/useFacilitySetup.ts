import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFacility } from '../api/staff';

type Field =
  | 'name'
  | 'phone'
  | 'addressPrefecture'
  | 'addressLine'
  | 'postalCode'
  | 'description'
  | 'accessInfo'
  | 'baseCapacity'
  | 'basePrice';

export const useFacilitySetup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    addressPrefecture: '',
    addressLine: '',
    postalCode: '',
    description: '',
    accessInfo: '',
    baseCapacity: '10',
    basePrice: '3000',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setField = (field: Field, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.addressPrefecture || !form.addressLine || !form.baseCapacity || !form.basePrice) {
      setError('必須項目を入力してください');
      return;
    }

    setLoading(true);
    try {
      await createFacility({
        name: form.name,
        phone: form.phone || undefined,
        address_prefecture: form.addressPrefecture,
        address_line: form.addressLine,
        postal_code: form.postalCode || undefined,
        description: form.description || undefined,
        access_info: form.accessInfo || undefined,
        base_capacity: Number(form.baseCapacity),
        base_price: Number(form.basePrice),
        status: 'under_review',
      });
      navigate('/', { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '施設情報の作成に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return {
    state: {
      ...form,
      loading,
      error,
    },
    setField,
    submit,
  };
};
