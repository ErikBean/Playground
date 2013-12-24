class GamesController < ApplicationController

before_action :set_game, only: [:show, :edit, :update, :destroy]

  def index
    @games=Game.all
  end
  
  def show

  end
  
  def new
      @game=Game.new
        @board= Board.new
  end
  def create
    
    @game = Game.new(game_params)
    @board= Board.new(1)
    
    respond_to do |format|
      if @game.save
        format.html { redirect_to @game, notice: 'game was successfully created.' }
        format.json { render action: 'show', status: :created, location: @game }
      else
        format.html { render action: 'new' }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end
    def destroy
        @game.destroy
        respond_to do |format|
          format.html { redirect_to games_url }
          format.json { head :no_content }
        end
    end
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end
    
    def game_params
        params.require(:game).permit(:title, :numPlayers, :size)
    end
end