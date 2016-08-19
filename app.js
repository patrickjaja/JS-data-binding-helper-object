var globals = {
  props : {},
  'set' : function(prop,arr) {
    this.props[prop]=arr;
    $(window).triggerHandler({
      type: prop+"Set",
      details: arr
    });
  },
  'push' : function(prop,val) {
    this.props[prop].push(val);
    $(window).triggerHandler({
      type: prop+"Changed",
      details: val
    });
  },
  'pushIfNotExist' : function(prop,valParam) {
    if (!this.exist(prop,valParam)) {
      this.props[prop].push(valParam);
      $(window).triggerHandler({
        type: prop+"Changed",
        details: valParam
      });
    }
  },
  'get' : function(prop) {
    return this.props[prop];
  },
  'delByFilter' : function(prop,filter) {
    this.props[prop].forEach(function (val, key) {
      for (k of val) {
        for (fk of filter) {
          if (k == fk) {
            if (filter[fk] == val[k]) {
              this.props[prop][key] = null;
            }
          }
        }
      }
    }.bind(this));
  },
  'delVal' : function(prop,valParam) {
    var backup;
    this.props[prop].forEach(function(val,key) {
      if(val==valParam) {
        backup=this.props[prop][key];
        this.props[prop].splice(key,this.props[prop].length);
        $(window).triggerHandler({
          type: prop+"Deleted",
          details: backup
        });
      }
    }.bind(this));
  },
  'exist' : function(prop,valParam) {
    var exist=false;
    this.props[prop].forEach(function(val,key) {
      if(val==valParam) {
        exist=true;
      }
    });
    return exist;
  }
};

var test="Test String";
//key - value
globals.set("test",test);

$(window).on("testChanged", function(e){
	console.log("NEW VALUE: "+e.details)
});

//working for arrays aswell
//possible events you find in globals object definition