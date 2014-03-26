$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "user/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "user"
  s.version     = User::VERSION
  s.authors     = ["David Henry"]
  s.email       = ["dw_henry@yahoo.com.au"]
  s.homepage    = "http://github.com/dwhenry"
  s.summary     = "Engine to manage user creation and login"
  s.description = "Engine to manage user creation and login"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]

  s.add_dependency "rails"
  s.add_dependency "devise"
end
