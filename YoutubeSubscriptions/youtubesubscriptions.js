var channelId;
var downloadArray = [];
var spinner = new Spinner();


$(document).ready(startUp);

function startUp() {
  console.log("Startup complete!");
}

function buttonClick() {
  $('#downloadA').hide();
  if($( "#channelId" ).val().length == 0){
    console.log("no empty channel id!");
    return;
  }
  spin();
  channelId = $( "#channelId" ).val();
  console.log("Button!");
  sendRequest();
}

function sendRequest(pageToken) {
  pageToken = typeof pageToken !== 'undefined' ? pageToken : "";
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId="+channelId+"&maxResults=50&key=AIzaSyDj9YqF_4EZsxucOI8fX1x24S7KTcqPJjM&pageToken="+pageToken,
    "method": "GET",
    "headers": {}
  }
  console.log(settings.url);
  $.ajax(settings).done(handleResponse);
}

function handleResponse(response) {
  $.each(response.items, foreachCallback);
  // downloadArray = $.merge(downloadArray, response.items);
    console.log(response);
    console.log(downloadArray);
    if(typeof response.nextPageToken === 'undefined'){
      console.log("last one :(");
      $('#downloadA').attr("download", "youtubesubscriptions.json");
      $('#downloadA').attr('href', "data:application/json,"+JSON.stringify(downloadArray));
      $('#downloadA').show();
    } else {
      sendRequest(response.nextPageToken);
    }
    console.log(response.nextPageToken);
}

function foreachCallback(key, value) {
  console.log(value.snippet.title + ", " + value.snippet.channelId);
  downloadArray.push({title:value.snippet.title, channelId:value.snippet.channelId});
}

function spin() {
  var opts = {
  lines: 13 // The number of lines to draw
, length: 28 // The length of each line
, width: 14 // The line thickness
, radius: 42 // The radius of the inner circle
, scale: 1 // Scales overall size of the spinner
, corners: 1 // Corner roundness (0..1)
, color: '#fff' // #rgb or #rrggbb or array of colors
, opacity: 0.25 // Opacity of the lines
, rotate: 0 // The rotation offset
, direction: 1 // 1: clockwise, -1: counterclockwise
, speed: 1 // Rounds per second
, trail: 60 // Afterglow percentage
, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
, zIndex: 2e9 // The z-index (defaults to 2000000000)
, className: 'spinner' // The CSS class to assign to the spinner
, top: '50%' // Top position relative to parent
, left: '50%' // Left position relative to parent
, shadow: false // Whether to render a shadow
, hwaccel: false // Whether to use hardware acceleration
, position: 'absolute' // Element positioning
}
var target = document.getElementById('spinTarget')
var spinner = new Spinner(opts).spin(target);
}
