import React from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

interface Step0AccountFormProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onPrev?: () => void;
  step?: number;
}

export default function Step0AccountForm({
  formData,
  onChange,
  onNext,
  onPrev,
  step = 0,
}: Step0AccountFormProps) {
  return (
    <div style={{ maxWidth: '600px', marginRight: '32px' }}>
      <h2 
        style={{
          fontSize: '30px',
          fontWeight: 'bold',
          color: '#FED7AA',
          textAlign: 'center',
          marginBottom: '32px'
        }}
      >
        アカウント作成
      </h2>
        {/* 担当者名 */}
        <div style={{ marginBottom: '24px' }}>
          <label 
            style={{
              display: 'block',
              color: '#D1D5DB',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}
          >
            担当者名
          </label>
          <div style={{ position: 'relative' }}>
            <UserIcon 
              style={{
                height: '20px',
                width: '20px',
                color: '#9CA3AF',
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)'
              }} 
            />
            <input
              type="text"
              name="managerName"
              value={formData.managerName || ""}
              onChange={onChange}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                paddingLeft: '48px',
                paddingRight: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
                border: '1px solid #4B5563',
                backgroundColor: '#1F2937',
                color: 'white',
                borderRadius: '12px',
                outline: 'none',
                fontSize: '16px'
              }}
            />
          </div>
        </div>

        {/* メールアドレス */}
        <div style={{ marginBottom: '24px' }}>
          <label 
            style={{
              display: 'block',
              color: '#D1D5DB',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}
          >
            メールアドレス
          </label>
          <div style={{ position: 'relative' }}>
            <EnvelopeIcon 
              style={{
                height: '20px',
                width: '20px',
                color: '#9CA3AF',
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)'
              }} 
            />
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={onChange}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                paddingLeft: '48px',
                paddingRight: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
                border: '1px solid #4B5563',
                backgroundColor: '#1F2937',
                color: 'white',
                borderRadius: '12px',
                outline: 'none',
                fontSize: '16px'
              }}
            />
          </div>
        </div>

        {/* パスワード */}
        <div style={{ marginBottom: '24px' }}>
          <label 
            style={{
              display: 'block',
              color: '#D1D5DB',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}
          >
            パスワード
          </label>
          <div style={{ position: 'relative' }}>
            <LockClosedIcon 
              style={{
                height: '20px',
                width: '20px',
                color: '#9CA3AF',
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)'
              }} 
            />
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={onChange}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                paddingLeft: '48px',
                paddingRight: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
                border: '1px solid #4B5563',
                backgroundColor: '#1F2937',
                color: 'white',
                borderRadius: '12px',
                outline: 'none',
                fontSize: '16px'
              }}
            />
          </div>
        </div>

      {/* ナビゲーションボタン */}
      <div 
        style={{
          marginTop: '32px'
        }}
      >
        {step > 0 && onPrev && (
          <button
            onClick={onPrev}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#4B5563',
              color: 'white',
              fontWeight: 'bold',
              paddingTop: '12px',
              paddingBottom: '12px',
              paddingLeft: '16px',
              paddingRight: '16px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            戻る
          </button>
        )}
        <button
          onClick={onNext}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            backgroundColor: '#EA580C',
            color: 'white',
            fontWeight: 'bold',
            paddingTop: '12px',
            paddingBottom: '12px',
            paddingLeft: '16px',
            paddingRight: '16px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          次へ
        </button>
      </div>
    </div>
  );
}
