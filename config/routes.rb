Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post '/api/login' => 'sessions#create'
  delete '/api/logout' => 'sessions#destroy'
  get '/api/sessions' => 'sessions#all'

  post '/api/user' => 'users#signup'
  get '/api/user' => 'users#user'
  delete '/api/user' => 'users#destroy'

  get '/api/items' => 'items#getall'
  get '/api/items_all' => 'items#all'
  get '/api/item/:id' => 'items#index'
  post '/api/item' => 'items#create'
  delete '/api/item/:id' => 'items#delete'
  put '/api/item' => 'items#update'

  get '/api/services' => 'services#getall'
  get '/api/service/:id' => 'services#index'
  post '/api/service' => 'services#create'
  delete '/api/service/:id' => 'services#delete'
  put '/api/service' => 'services#update'

  get '/api/orders' => 'orders#getall'
  get '/api/order/:id' => 'orders#index'
  post '/api/order' => 'orders#create'
  delete '/api/order/:id' => 'orders#delete'

  get '/api/vendors' => 'vendors#getall'
  post '/api/vendor' => 'vendors#create'
  delete '/api/vendor/:id' => 'vendors#delete'
  put '/api/vendor' => 'vendors#update'

  get '/api/orderitems/:id' => 'order_items#getByOrderId'
  get '/api/orderitems' => 'order_items#all'

  root to: 'home#index'

  match '*path' => 'home#index', via: :get

end
