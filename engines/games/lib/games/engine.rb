module Games
  class Engine < ::Rails::Engine
    isolate_namespace Games

    initializer 'account.append_migrations' do |app|
      unless app.root.to_s == root.to_s
        config.paths["db/migrate"].expanded.each do |path|
          app.config.paths["db/migrate"] << path
        end
      end
    end

    initializer 'account.asset_precompile_paths' do |app|
      app.config.assets.precompile += ["games/manifests/*"]
    end
  end
end
