setTimeout(function() {

  if (window.document && document.body) {

    // creates a new html element
    function createNode(element) {
        return document.createElement(element);
      }

    // appends a child element to its parent
    function append(parent, el) {
      return parent.appendChild(el);
    }


    // gets the ul element with ID of photos
    const ul = document.getElementById('photos');


    // saves api endpoint to url variable
    const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e6d07bb9ea1aac040d7a259fcef017dd&user_id=myartmill&tags=panoramic&per_page=10&format=json&nojsoncallback=1';



    fetch(url)
      .then((resp) => resp.json())

      .then(function(data) {
        var photos = data.photos.photo;
        return photos.map(function(photo) {

          var li = createNode('li');
          var img = createNode('img');
          var span = createNode('span');

          li.className = "image-list-item";
          img.className = "image-item";
          span.className = "span-item";
          ul.className = "ul-item";

          var photoId = photo.id;
          var photoSecret = photo.secret;
          var photoServer = photo.server;
          var photoFarm = photo.farm;
          var photoLink = 'https://farm' + photoFarm + '.staticflickr.com/' + photoServer + '/' + photoId + '_' + photoSecret+ '.jpg';

          img.src = photoLink;
          // span.innerHTML = `${photo.user.username}`;

          append(li, img);
          append(li, span);
          append(ul, li);
        })
      })
      .catch(function(error) {
        console.log(error);
      });

    } else {
      // notify the user if the DOM hasn't loaded yet. and style it RED.
      console.log('%c Hey buddy, the DOM is not ready, yet!', "color:red");
    }

},0);
