class Todo < ActiveRecord::Base

  def complete!
    self.finished = true
  end
end
