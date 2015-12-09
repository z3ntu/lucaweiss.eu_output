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
  //TODO: Error handling
  $.each(response.items, foreachCallback);
  console.log(response);
  console.log(downloadArray);
  if(typeof response.nextPageToken === 'undefined'){
    $('#spinTarget').spin(false);
    console.log("spinner should stop; last one :(");
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
  // var target = document.getElementById('spinTarget')
  // var spinner = new Spinner(opts).spin(target);
  // $('#spinTarget').spin('small', '#fff');
  $('#spinTarget').spin({ lines: 8, length: 4, width: 3, radius: 5, position: 'relative' });
}
