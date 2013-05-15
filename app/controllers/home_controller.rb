class HomeController < ApplicationController
  def index
  end

  def test
    render :layout => false
  end

  def new_score
    user = User.find_by_username(params[:username])
    if user.nil?
      render :json => "User does not exist", :status => 403
    else
      user.update_attribute(:score, params[:score])
      render :json => user.score_representation
    end
  end

  def scores
    respond_to do |format|
      format.json {
        render :json => User.order("score DESC").offset(params[:offset]).limit(params[:limit]).map(&:score_representation)
      }
      format.html do |format|
        render :action => :index
      end
    end
  end
end
