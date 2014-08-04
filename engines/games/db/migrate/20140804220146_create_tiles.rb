class CreateTiles < ActiveRecord::Migration
  def change
    create_table :tiles do |t|
      t.references :game
      t.references :player
      t.string :color
      t.string :value
      t.integer :position

      t.timestamps
    end
  end
end
