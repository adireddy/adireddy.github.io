/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("yql-nodejs",function(e,t){var n=require("request");e.YQLRequest.prototype._send=function(e,t){n(e,{method:"GET",timeout:t.timeout||3e4},function(e,n){e?t.on.success({error:e}):t.on.success(JSON.parse(n.body))})}},"3.9.1");
