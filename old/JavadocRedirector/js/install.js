function install()
{
  chrome.webstore.install('https://chrome.google.com/webstore/detail/pkpckmephcfffdfjemgnekclglhpkcom', success, failure);
}

function success()
{
  console.log("Thanks for installing!");
}

function failure()
{
  console.log("Installation failed :(");
}
