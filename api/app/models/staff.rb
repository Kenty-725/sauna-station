class Staff < ApplicationRecord
  belongs_to :facility, optional: true

  has_secure_password

  enum :role, { 
    admin: 0, # 管理者
    staff: 1  # スタッフ
  }

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  # NOTE: モデルはDBアクセス・小さな振る舞いに限定
  # 確認用トークンを生成
  def generate_confirmation_token
    self.confirmation_token = SecureRandom.urlsafe_base64(32)
    self.confirmation_sent_at = Time.current
  end

  # 確認用URLを生成
  def generate_confirmation_url(base_url)
    "#{base_url}/api/v1/confirm?token=#{confirmation_token}"
  end

  # メール確認を完了
  def confirm!
    now = Time.current
    update!(
      email_verified_at: now,
      confirmation_token: nil
    )
  end
end
