class CreateGamesPlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.references :game, index: true
      t.integer :position
      t.string :status
      t.references :user, index: true

      t.timestamps
    end
  end
end
