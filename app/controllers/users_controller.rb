class UsersController < ApplicationController
    def getUser
      token = request.headers["Authorization"]
      session = Session.find_by(token: token)

      if session
        return User.find(session.userId)
      else
        return nil
      end
    end

    def index
      render json: User.all
    end

    def user
      user = getUser()
      if user
        render json: user
      else
        render plain: "Error", status: 401
      end
    end
    
    def signup
      user = User.new({
        email: params[:email],
        password: params[:password],
      })
      if user.save
        # Create session
        token = SecureRandom.hex

        session = Session.new({
          userId: user.id,
          token: token
        })
        if session.save
          render plain: token
        else
          render plain: "Failed generate token", status: 500
        end
      else
        render plain: "Failed to create", status: 500
      end
      
    end
    
      def destroy
        user = getUser()
        if user.admin
          User.destroy(params[:id])
          render plain: "OK"
        else
          render plain: "Authorization Required", status: 401
        end
      
      end
    
      def update
        user = User.find(params[:id])
        user.update_attributes(user_params)
        render json: user
      end
    
      private
      def user_params
        params.require(:user).permit(:id, :email, :password)
      end
  end
