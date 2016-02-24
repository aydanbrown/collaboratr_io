var NodeManager = function(){

var manager = {
  nodes: [],
  code: {},
  token: 'a',
  changeCount: 0,
  generateTextFromNodes: function(nds){// generates text from nodes
    var t = '';// final text string
    for(l in nds){// for each line in nodes
      if(t != ''){// if this is not the first line
        t += '\n';// add new line
      }
      for(c in nds[l][3]){// for each char in line
        t += nds[l][3][c][3];// add char
      }
    }
    return t;// return final string
  },
  onCodeChange: function(chg){// code updated
    var t = chg.text;// added text
    var r = chg.removed;// removed text
    if(chg.removed.length > 1 || chg.removed[0].length > 0){// was text removed
      if(chg.removed.length > 1){// was one or more lines removed
        var followingCharacters = [];
        // if there are any characters after the last deleted one, set to following characters
        // Loop middle lines
        // First line
      }else{// no line was removed

      }
    }
    if(chg.text.length > 1 || chg.text[0].length > 0){// was text added
      if(chg.text.length > 1){// was one or more lines added

      }else{// no line was added

      }
    }
  },
  getNodeFromPos: function(line, ch){// get a node reference from code position

  },
  getPosFromNode: function(){// get code position from node reference

  },
  generateID: function(){
  	return this.token + (++this.changeCount);
  }
};
return manager;
}