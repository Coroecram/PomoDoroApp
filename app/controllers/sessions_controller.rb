class SessionsController < ActionController::Base
  def new_csrf
    debugger
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery? && !current_user
    render nothing: true
  end
end
