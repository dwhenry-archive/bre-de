require "spec_helper"

describe "User Login", js: true do
  let!(:user) do
    User::User.create!(
      name: 'test',
      email: 'test@test.com',
      password: 'tester12',
      password_confirmation: 'tester12',
    )
  end

  it "user can login using the demo app" do
    visit '/demo'
    fill_in 'Email', with: user.email
    fill_in 'Password', with: 'tester12'
    click_on 'Submit'

    expect(page).to have_content("Games For: test")
  end

  xit "user will stay login when coming back to the app (cookie)"
  xit "The cookie should have an expiry (2 weeks?)"
end