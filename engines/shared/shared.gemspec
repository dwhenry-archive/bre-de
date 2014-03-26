$:.push File.expand_path("../lib", __FILE__)

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "shared"
  s.version     = "0.0.1"
  s.authors     = ["Brian Leonard"]
  s.email       = ["brian@bleonard.com"]
  s.homepage    = "https://github.com/taskrabbit/rails_engines_example"
  s.summary     = "Stuff shared between engines"
  s.description = "Share it!"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile"]

  s.add_dependency "rails"
  s.add_dependency "slim"
  s.add_dependency "responsible"
end
