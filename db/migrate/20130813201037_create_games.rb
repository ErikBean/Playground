class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :title
      t.integer :numPlayers
      t.integer :size

      t.timestamps
    end
  end
end
