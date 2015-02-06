/* Dependencies */
var http = require("https");

Easy = function(){
  if (!(this instanceof Easy)) return new Easy(); 
  this.defaultOptions = {
    "host": "api.mojang.com",
    "port": 443,
    "path": "/",
    "method":"GET",
    "headers": {
      "Content-Type": "application/json",
    }
  }
}

Easy.prototype.get = function(full, payload, callback){
  parts = full.split(/^.+\:\/\/(.+?)(\/.+)$/);
  this.defaultOptions.host = parts[1];
  this.defaultOptions.path = parts[2];
  this.defaultOptions.method = "GET";
  request = http.request(this.defaultOptions, function(response){
    response.setEncoding('utf8');
    compdata = "";
    
    response.on("data", function(data){
      compdata += data;
    });
    
    response.on("end", function(){
      callback(compdata);
    });
  });
  
  request.write(typeof payload === "object" ? JSON.stringify(payload) : payload.toString());
  request.end();
}

Easy.prototype.post = function(full, payload, callback){
  parts = full.split(/^.+\:\/\/(.+?)(\/.+)$/);
  this.defaultOptions.host = parts[1];
  this.defaultOptions.path = parts[2];
  this.defaultOptions.method = "POST";
  request = http.request(this.defaultOptions, function(response){
    response.setEncoding('utf8');
    compdata = "";
    
    response.on("data", function(data){
      compdata += data;
    });
    
    response.on("end", function(){
      callback(compdata);
    });
  });
  request.write(typeof payload === "object" ? JSON.stringify(payload) : payload.toString());
  request.end();
}

module.exports = Easy();