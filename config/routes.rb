Rails.application.routes.draw do
  # API routing
  scope module: 'api', defaults: {format: 'json'} do
    namespace :v1 do
      # provide the routes for React here (not all needed; students need to figure out which are useful)
      get 'stores/:id', to: 'stores#detail', as: :stores_detail
      get 'stores/:id/shifts', to: 'stores#shifts', as: :stores_shifts
      post 'stores/:id/add_assignment', to: 'stores#add_assignment', as: :add_assignment
      put 'end_assignment/:id', to: 'stores#end_assignment', as: :end_assignment
      get 'employees_search', to: 'employees#employees_search', as: :search_employees
      get 'pay_grades', to: 'pay_grades#levels', as: :pay_grade_levels
      get 'shifts/:id/jobs_list', to: 'shifts#jobs_list', as: :shift_jobs_list
      post 'shifts/:id/add_job', to: 'shifts#add_job', as: :shift_add_job
      get 'jobs', to: 'jobs#index', as: :jobs
      get 'current_shift', to: 'shifts#current_shift', as: :current_shift
      get 'my_upcoming_shifts', to: 'shifts#my_upcoming_shifts', as: :my_upcoming_shifts
      put 'clock_in', to: 'shifts#clock_in', as: :clock_in
      put 'clock_out', to: 'shifts#clock_out', as: :clock_out
      post 'employees/:id/add_shift', to: 'shifts#add_shift_for_employee', as: :add_shift_for_employee

      delete 'shifts/:id', to: 'shifts#destroy'

      # Student API endpoint routes go here...
      get 'employees',     to: 'employees#index',     as: :api_employees
      get 'spotlight/:id', to: 'employees#spotlight', as: :spotlight

      get 'stores/:id/upcoming', to: 'stores#upcoming', as: :stores_upcoming

      get 'shifts/:id', to: 'shifts#show', as: :v1_shift
      get 'shifts/:id', to: 'shifts#show', as: :v1_shift_show
      

      
      




    end
  end

  # Routes for regular HTML views go here...
  # Semi-static page routes
  get 'home', to: 'home#index', as: :home
  get 'home/about', to: 'home#about', as: :about
  get 'home/contact', to: 'home#contact', as: :contact
  get 'home/privacy', to: 'home#privacy', as: :privacy
  get 'home/search', to: 'home#search', as: :search

  # Authentication routes
  # resources :sessions
  # resources :users

  get 'login', to: 'sessions#new', as: :login
  post 'sessions', to: 'sessions#create', as: :sessions
  get   'logout', to: 'sessions#destroy',  as: :logout

  
  # get 'shifts/:id', to: 'shifts#show', as: :shift_show
  # get 'shifts/:id', to: 'shifts#show', as: :shift_detail


  # Resource routes (maps HTTP verbs to controller actions automatically):
  resource :session, only: [:new, :create, :destroy]
  resources :stores, except: [:destroy]
  resources :employees
  resources :assignments
  resources :shifts
  
  resources :pay_grades, except: [:destroy]

  # Payroll routes

  
  # You can have the root of your site routed with 'root'
  root 'home#index'

end
