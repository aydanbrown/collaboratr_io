var NodeManager = function(){

var manager = {
  nodes: [],
  code: {},
  token: 'a',
  changeCount: 0,
  /*
  generateNodesFromText: function(text){
    var nds = [];// nodes
    var nd = [];// node
    var line = 0;// line 
    var ch = 0;
    var newLine = true;
    nd = ['l0', null, null, []];
    for(t in text){
      if(text[t] == '\n'){
        line++;
        nd[2] = 'l' + line;
        nds.push(nd);
        nd = ['l' + line, 'l' + (line - 1), null, []];
        newLine = true;
      }else{
        var c = 'c' + (ch - 1);
        if(newLine){
          c = null;
          newLine = false;
        }else{
          nd[3][nd[3].length - 1][2] = 'c' + ch;
        }
        nd[3].push(['c' + ch, c, null, text[t]]);
        ch++;
      }
    }
    nds.push(nd);
    return nds;
  },
  */
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
    switch(chg.origin){// (origin = type of change)
      case '+input':// when a key is pressed
      	var ln = chg.from.line;// line
      	var ch = chg.from.ch;// ch
        var newID = this.generateID();// generate a new ID
      	if(chg.text.length > 1){// enter key pressed
          if(ch == this.nodes[ln][3].length){// is end of line
            if(ln == this.nodes.length - 1){// is adding to the last line
              this.nodes[ln][2] = newID;// set previous lines ref
              this.nodes.push([newID, this.nodes[ln][0], null, []]);// add line
            }else{
              this.nodes[ln][2] = newID;// set previous lines ref
              this.nodes[ln + 1][1] = newID;// set following lines ref
              this.nodes.splice(ln + 1, 0, [newID, this.nodes[ln][0], this.nodes[ln + 1][0], []]);// insert line
            }
          }else{
            var followingChars = this.nodes[ln][3].splice(ch);// get the characters after the insert location
            followingChars[0][1] = null;// set start reference to blank
            this.nodes[ln][3][this.nodes[ln][3].length - 1][2] = null;// set end reference to blank
            if(ln == this.nodes.length - 1){// is adding to the last line
              this.nodes[ln][2] = newID;// set previous lines ref
              this.nodes.push([newID, this.nodes[ln][0], null, followingChars]);// add line
            }else{
              this.nodes[ln][2] = newID;// set previous lines ref
              this.nodes[ln + 1][1] = newID;// set following lines ref
              this.nodes.splice(ln + 1, 0, [newID, this.nodes[ln][0], this.nodes[ln + 1][0], followingChars]);// insert line
            }
          }
      	}else{
          if(ch == this.nodes[ln][3].length){// is end of line
            if(ch == 0){// is the start of line
              this.nodes[ln][3].push([newID,null, null, chg.text[0]]);// add char
            }else{
              this.nodes[ln][3][ch - 1][2] = newID;// set previous char ref
              this.nodes[ln][3].push([newID, this.nodes[ln][3][ch - 1][0], null, chg.text[0]]);// add char
            }
          }else{
            this.nodes[ln][3][ch][1] = newID;// set following char ref
            if(ch == 0){// is the start of line
              this.nodes[ln][3].splice(ch, 0, [newID, null, this.nodes[ln][3][ch][0], chg.text[0]]);// insert char
            }else{
              this.nodes[ln][3][ch - 1][2] = newID;// set previous char ref
              this.nodes[ln][3].splice(ch, 0, [newID, this.nodes[ln][3][ch - 1][0], this.nodes[ln][3][ch][0], chg.text[0]]);// insert char
            }
          }
        }
      	break;
      case '+delete':// when backspace is pressed (not sure if delete key too, most likely)
      	break;
      case 'paste':// when text is pasted
      	break;
      case 'setValue':// when the function setValue is called on the code object
        break;
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