class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :omniauthable, :confirmable, :lockable, :timeoutable
  has_many :todos

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :email, :username, :password, :password_confirmation, presence: true
  validates :email, :username, uniqueness: true
  validates :username, length: { in: 6..30 }
  validates :email, length: { maximum: 50 }
  validates :email, email: true, :if => Proc.new {|entry| !entry.email.blank? }
  validate :check_email_and_password
  validate :check_username_and_password

  def check_email_and_password
    if email.present? && password.present? && password.length >= 8
      errors.add(:password, "can't be the same as Email") if email == password
    end
  end

  def check_username_and_password
    if username.present? && password.present? && password.length >= 8
      errors.add(:password, "can't be the same as Username") if username == password
    end
  end
end
