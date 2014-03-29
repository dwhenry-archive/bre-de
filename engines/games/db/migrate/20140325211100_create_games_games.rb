class CreateGamesGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :max_player
      t.references :creator, index: true
      t.integer :current_turn
      t.string :status

      t.timestamps
    end

    add_index :games, :status
  end
end
