class OrderItemsController < ApplicationController
    def getUser
        token = request.headers["Authorization"]
        session = Session.find_by(token: token)
  
        if session
          return User.find(session.userId)
        else
          return nil
        end
      end
    def getByOrderId
        user = getUser()
        if user
            render json: OrderItem.where('orderId = ?', params[:id])
        else
            render plain: "Not found", status: 500
        end
    end
    
    def all
        render json: OrderItem.all
    end
    
end
