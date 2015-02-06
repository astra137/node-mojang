/* Dependencies */
var request = require("./http-easy");

MCNode = function(){
  if (!(this instanceof MCNode)) return new MCNode();
}

MCNode.prototype.dataFromUsername = function(data, callback){
  request.get("https://api.mojang.com/users/profiles/minecraft/" + encodeURIComponent(data), "", function(data){
    data = JSON.parse(data);
    request.get("https://sessionserver.mojang.com/session/minecraft/profile/" + data.id, "", function(data){
      callback(JSON.stringify(JSON.parse(data), null, 4));
    });
  });
}

MCNode.prototype.dataFromUUID = function(data, callback){
  request.get("https://sessionserver.mojang.com/session/minecraft/profile/" + data, "", function(data){
    callback(JSON.stringify(JSON.parse(data), null, 4));
  });
}

MCNode.prototype.dataFromUsernames = function(data, callback){
  request.post("https://api.mojang.com/profiles/minecraft", data, function(data){
    data = JSON.parse(data);
    comp = [];
    data.forEach(function(prop){
      request.get("https://sessionserver.mojang.com/session/minecraft/profile/" + prop.id, "", function(single){
        comp.push(JSON.parse(single));
        if (comp.length == data.length) {
          callback(comp);
        }
      });
    });
  });
}

MCNode.prototype.dataFromUUIDs = function(data, callback){
  comp = [];
  i=0;
  data.forEach(function(prop){
    request.get("https://sessionserver.mojang.com/session/minecraft/profile/" + data[i], "", function(single){
      comp.push(JSON.parse(single));
      if (comp.length == data.length) {
        callback(comp);
      }
    });
    i++;
  });
}

module.exports = MCNode();