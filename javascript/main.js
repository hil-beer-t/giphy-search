
document.querySelector(".js-go").addEventListener('click', function () {
  let container = document.querySelector(".js-container");
  container.innerHTML = " ";
  let input = document.querySelector("input").value;
  pushToDOM(input);

});

document.querySelector(".js-userinput").addEventListener('keyup', function (e) {

  let input = document.querySelector("input").value;
  // if the key ENTER is pressed...
  if (e.which === 13) {
    let container = document.querySelector(".js-container");
    container.innerHTML = " ";
    pushToDOM(input);
  }

});

function pushToDOM(input) {

  if (input !== "") {
    let newInput = input.split(' ').join('+');
    console.log(newInput)

    const url = "https://api.giphy.com/v1/gifs/search?q=" + newInput + "&api_key=dc6zaTOxFJmzC";

    let GiphyAJAXCall = new XMLHttpRequest();
    GiphyAJAXCall.open('GET', url);
    GiphyAJAXCall.send();
    GiphyAJAXCall.addEventListener('loadend', function (e) {
      let bigData = e.target.response;
      render(bigData);
    });

    function render(bigData) {
      let response = JSON.parse(bigData);
      let imageUrls = response.data;

      imageUrls.forEach((image) => {
        let imageUrl = image.images.fixed_height.url;

        let container = document.querySelector(".js-container");
        container.innerHTML += "<img src=\"" + imageUrl + "\">";
      });

    }
  }
}