class CreateOrderItems < ActiveRecord::Migration[5.2]
  def change
    create_table :order_items do |t|
      t.string :name
      t.float :price
      t.string :orderId
      t.string :status

      t.timestamps
    end
  end
end
