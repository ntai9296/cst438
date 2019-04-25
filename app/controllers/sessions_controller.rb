class SessionsController < ApplicationController

    def new
    end

    def all
      render json: Session.all
    end
  
    def create
        user = User.find_by_email(params[:email])
        # If the user exists AND the password entered is correct.
        if user && user.authenticate(params[:password])
          # Create a token based on user
          token = SecureRandom.hex
          session = Session.new({
            userId: user.id,
            token: token
          })

          if session.save
            render plain: token
          else
            render plain:"Wrong credentials", status: 401
          end
        else
          # If user's login doesn't work, send them back to the login form.
          render plain:"Wrong credentials", status: 401
        end
      end
    
      def destroy
        session = Session.find_by(
          token: params[:token]
        )
        if session
          session.destroy
          render plain: "OK"
        else
          render plain: "Error", status: 500
        end
      end
end
