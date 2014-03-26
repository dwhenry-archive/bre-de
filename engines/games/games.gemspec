$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "games/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "games"
  s.version     = Games::VERSION
  s.authors     = ["David Henry"]
  s.email       = ["dw_henry@yahoo.com.au"]
  s.homepage    = ""
  s.summary     = "Creation and Management of Games."
  s.description = "Creation and Management of Games."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]

  s.add_dependency "rails"
end
