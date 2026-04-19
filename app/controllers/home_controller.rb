class HomeController < ApplicationController
  skip_before_action :check_login
  skip_authorization_check

  def index
    # if current_user&.admin_role? || current_user&.manager_role?
    #   render :admin
    # elsif current_user
    #   render :employee
    # else
    #   render :index  # or whatever your default/guest view is
    # end


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