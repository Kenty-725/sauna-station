class Staff < ApplicationRecord
  belongs_to :facility, optional: true

  has_secure_password

  enum :role, { 
    admin: 0, # 管理者
    staff: 1  # スタッフ
  }

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  # 管理者権限でスタッフを作成
  def self.create_admin_staff(staff_params)
    staff = new(staff_params)
    staff.role = :admin
    staff.generate_confirmation_token
    
    if staff.save
      # 確認メールを送信
      AdminMailer.confirmation_email(staff).deliver_now
    end
    
    staff
  end

  # 確認用トークンを生成
  # TODO: メール送信の実装が必要でありその時に調整する
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
