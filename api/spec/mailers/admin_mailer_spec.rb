require 'rails_helper'

RSpec.describe AdminMailer, type: :mailer do
  describe '#welcome_email' do
    let(:staff) do
      Staff.new(
        id: 1,
        name: 'テスト管理者',
        email: 'admin@example.com',
        role: 'admin'
      )
    end
    
    let(:mail) { AdminMailer.welcome_email(staff) }

    it 'メールが正しく設定される' do
      expect(mail.subject).to eq('【Sauna Station】管理者アカウントが作成されました')
      expect(mail.to).to eq(['admin@example.com'])
      expect(mail.from).to eq(['noreply@sauna-station.com'])
    end

    it 'HTMLメール本文にスタッフ情報が含まれる' do
      expect(mail.html_part.body.encoded).to match('テスト管理者')
      expect(mail.html_part.body.encoded).to match('admin@example.com')
      expect(mail.html_part.body.encoded).to match('Sauna Station')
      expect(mail.html_part.body.encoded).to match('http://localhost:5173/login')
    end

    it 'テキストメール本文にスタッフ情報が含まれる' do
      expect(mail.text_part.body.encoded).to match('テスト管理者')
      expect(mail.text_part.body.encoded).to match('admin@example.com')
      expect(mail.text_part.body.encoded).to match('Sauna Station')
      expect(mail.text_part.body.encoded).to match('http://localhost:5173/login')
    end

    it 'HTMLとテキストの両方の形式が含まれる' do
      expect(mail.html_part).to be_present
      expect(mail.text_part).to be_present
    end
  end
end