//We provide a variety of Text Classification, Sentiment Analysis, Entity Extraction, and Summarization features
//that allow you to extract meaningful insight and understanding from textual content.

var text; //to be analyzed
var token;
var URL;
var sentences = [];
var i = 0;
            //                      input / sentimentality/
//https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=happy&token=10b35ccc61744ae29c367964cc90e895;
$(function() {
  token = '10b35ccc61744ae29c367964cc90e895';
  loadText();

});

function next() {
  if(i < sentences.length -1 ) { //rollover
    text = sentences[++i];
    $('#text').text(text);
    URL = 'https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text='+text+'&token='+token;
    ask(URL);
  } else { i = 0; }
}

function previous() {
  if(i > 0 ) {
    text = sentences[--i];
    $('#text').text(text);
    URL = 'https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text='+text+'&token='+token;
    ask(URL);
  } else { i = sentences.length-1;}
}

function ask(url) {
  $.get(URL, function(data) {
    var type = data.sentiment.type;
    var score = data.sentiment.score;
    $('#type').text("type: " + type);
    $('#score').text("score: " + score);
  });
}

function loadText() {
  $.get('text.txt', function(data) {
    var lines = data.split(".");
    for(var line = 0; line < lines.length; line++) {
      sentences[line] = lines[line] + ".";
    }
    text = sentences[i];
    $('#text').text(data);
  })
}
