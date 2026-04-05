class HomeController < ApplicationController
  skip_before_action :check_login
  skip_authorization_check

  def index
  end

  def about
  end

  def contact
  end

  def privacy
  end

  def search
  end
  
end