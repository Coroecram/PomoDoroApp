class Todo < ActiveRecord::Base
  belongs_to :user

  validates :user_id, presence: true
  validates :title, length: { in: 3...45 }
  validates :description, length: { maximum: 140 }
  validates :expected_pomos, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 6 }
  validates :completed_pomos, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validate :future_start
  validate :nonoverlapping_times
  before_validation :default_values

  scope :of_user, -> (users) { where user_id: users }

  def complete!
    if !self.started
      self.time_started = Time.now
      self.started = true
    end
    if !self.finished
      self.time_finished = Time.now;
      self.finished = true
    end

    self.save!
  end

  def pomo_completed!
    self.completed_pomos += 1
    self.save!
  end

  def start_now!
    self.time_started = Time.now
    self.started = true
    self.save!
  end

  private
    def default_values
      self.description ||= ''
      self.expected_pomos ||= 1
      self.completed_pomos ||= 0
      self.started ||= false
      self.finished ||= false
      self.priority ||= 0
    end

    def future_start
      self.errors.add(:time_started, 'Start time cannot be in the future') if self.time_started && self.time_started.to_i > Time.now.to_i
    end

    def nonoverlapping_times
      if (self.time_started && self.planned)
        self.errors.add(:planned, 'cannot expect to finish task before it is started.') if self.time_started > self.planned
      else
        true
      end
    end
end
