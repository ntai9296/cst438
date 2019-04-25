class EmailValidator < ActiveModel::EachValidator
    def validate_each(record, attribute, value)
      record.errors.add attribute, (options[:message] || "is not a valid email") unless
        value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
    end
  end

class User < ApplicationRecord
    before_validation :setup, on: :create

    has_secure_password

    validates :email, presence: true, uniqueness: true, email: true
    validates :password, length: { minimum: 6 }, on: :create

    private
    def setup
        self.admin = admin || false
    end

end
