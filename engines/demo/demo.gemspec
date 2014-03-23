$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "demo/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "demo"
  s.version     = Demo::VERSION
  s.authors     = ["David Henry"]
  s.email       = ["dw_henry@yahoo.com.au"]
  s.homepage    = ""
  s.summary     = "demo app using the API and angular"
  s.description = "demo app using the API and angular"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails"

end
