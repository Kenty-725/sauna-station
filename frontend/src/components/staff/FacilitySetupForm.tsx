import { useFacilitySetup } from '../../hooks/useFacilitySetup';
import { ErrorAlert } from '../shared/ErrorAlert';

type InputFieldProps = {
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  required?: boolean;
};

const InputField = ({ label, value, type = 'text', placeholder, onChange, required = false }: InputFieldProps) => (
  <div>
    <label className="form-label">
      {label}
      {required ? ' *' : ''}
    </label>
    <input
      className="form-control signup"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

type TextAreaFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

const TextAreaField = ({ label, value, placeholder, onChange }: TextAreaFieldProps) => (
  <div>
    <label className="form-label">{label}</label>
    <textarea
      className="form-control"
      rows={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

export const FacilitySetupForm = () => {
  const { state, setField, submit } = useFacilitySetup();

  return (
    <div className="glass-panel w-100 mx-3 mx-lg-5 p-4 p-lg-4">
      <div className="mb-4">
        <div className="small text-uppercase fw-semibold text-secondary mb-2">Facility Setup</div>
        <h2 className="signup-title mb-2">施設情報の初期設定</h2>
        <p className="signup-subtitle mb-0">
          管理者アカウントに紐づける最初の施設情報を入力してください。
        </p>
      </div>

      <form className="d-flex flex-column gap-3" onSubmit={submit}>
        {state.error && <ErrorAlert message={state.error} />}
        <InputField
          label="施設名"
          value={state.name}
          placeholder="Sauna Station"
          onChange={(value) => setField('name', value)}
          required
        />
        <InputField
          label="都道府県"
          value={state.addressPrefecture}
          placeholder="東京都"
          onChange={(value) => setField('addressPrefecture', value)}
          required
        />
        <InputField
          label="住所"
          value={state.addressLine}
          placeholder="渋谷区神南 1-2-3"
          onChange={(value) => setField('addressLine', value)}
          required
        />
        <div className="row g-3">
          <div className="col-md-6">
            <InputField
              label="定員"
              value={state.baseCapacity}
              type="number"
              placeholder="10"
              onChange={(value) => setField('baseCapacity', value)}
              required
            />
          </div>
          <div className="col-md-6">
            <InputField
              label="基本料金"
              value={state.basePrice}
              type="number"
              placeholder="3000"
              onChange={(value) => setField('basePrice', value)}
              required
            />
          </div>
        </div>
        <InputField
          label="電話番号"
          value={state.phone}
          placeholder="0312345678"
          onChange={(value) => setField('phone', value)}
        />
        <InputField
          label="郵便番号"
          value={state.postalCode}
          placeholder="1500041"
          onChange={(value) => setField('postalCode', value)}
        />
        <TextAreaField
          label="施設説明"
          value={state.description}
          placeholder="施設の特徴やサービス内容"
          onChange={(value) => setField('description', value)}
        />
        <TextAreaField
          label="アクセス情報"
          value={state.accessInfo}
          placeholder="最寄駅からの導線や駐車場情報"
          onChange={(value) => setField('accessInfo', value)}
        />
        <button className="btn btn-gradient w-100 py-2" type="submit" disabled={state.loading}>
          {state.loading ? '作成中...' : '施設を作成する'}
        </button>
      </form>
    </div>
  );
};
