module User
  class Engine < ::Rails::Engine
    isolate_namespace User
  end
end
