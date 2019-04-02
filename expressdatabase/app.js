var fs = require('fs');
var data = fs.readFileSync('words.json');
var words = JSON.parse(data);
console.log('words');


console.log('the server is running');

var express = require('express');
var app = express();
//two lines above always required 

var server = app.listen(3000, listening);

function listening(){
     console.log('we are hearing everything on port 3000');
    
app.get('/add/:word/:score?', addWord);
function addWord(request, response) {
    var data = request.params;
    var word = data.word;
    var score = Number(data.score);
    var reply;
    if (!score){
        reply = {
            msg: "Score is required."
        }
      response.send(reply);
    }else{
     words[word] = score;
     var data = JSON.stringify(words, null, 2);
     fs.writeFile('words.json', data, finished)
     function finished(err) {
         console.log('all set.');
         reply ={
            word: word,
            score: score,
            status: 'works'
     }
    resonse.send(reply);
}
    }
    
