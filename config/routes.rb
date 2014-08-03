Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  BootInquirer.each_active_app do |app|
    mount app.engine => '/', as: app.gem_name
  end
end
