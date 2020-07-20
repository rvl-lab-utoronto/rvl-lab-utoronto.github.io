
        var clientId = '997719740599-pa5dognuv0nkd02i8uqk2f5cb565999t.apps.googleusercontent.com';
        var apiKey = 'AIzaSyBQG4_qSUAo2b9Mtr_L_KhODLOYgneRlgc';
        var scopes = 'https://www.googleapis.com/auth/calendar';
        var numAfter = 3;
        var numBefore = 3;
        var numIncrement = 4;
        var oldtable = false;
        var evtable = document.createElement('table');
                                   
        var before = Date.now() - 10184000000; // four months
        var after = Date.now() + 10184000000; // four months
        var increment = 5184000000; // two months

function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  // window.setTimeout(checkAuth,1);
  checkAuth();
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
      handleAuthResult);
}


function handleAuthResult(authResult) {
    if (authResult) { makeApiCall(); }
     else {
                $('#sched').append('<iframe src="https://www.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=275&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=cs.washington.edu_8lig741eg18lu8huhvc960hvr8%40group.calendar.google.com&amp;color=%23691426&amp;ctz=America%2FLos_Angeles" style=" border-width:0 " width="720" height="275" frameborder="0" scrolling="no"></iframe>');
     }
}


function padZero(s) {
        var q = s.toString();
        if (q.length == 1) {
                return '0' + q;
        }
        else {
                return q;
        }
}

function earlierEvents() {
        numBefore += numIncrement; //
        before -= increment;
        oldtable = evtable;
        evtable = document.createElement('table');
                evtable.className = 'evtab';
                evtable.id = 'eventsTab';
        makeApiCall();
        pushEventTable();
}

function laterEvents() {
        numAfter += numIncrement;
        after += increment;
        oldtable = evtable;
        evtable = document.createElement('table');
                evtable.className = 'evtab';
                evtable.id = 'eventsTab';
        makeApiCall();
        pushEventTable();
}

function pushEventTable() {
        var mydiv = document.getElementById('accordionCal');
        if (oldtable) { mydiv.removeChild(oldtable); }
        mydiv.appendChild(evtable);
}

function makeApiCall() {

        nowDate = new Date();
        beforeDate = new Date(before);
        afterDate = new Date(after);

	gapi.client.load('calendar', 'v3', function() {

    var request = gapi.client.calendar.events.list({
      'calendarId': '21jc1bfgri142rqq91i43lt6jo@group.calendar.google.com',
      'singleEvents': true,
      'timeMin':  beforeDate.toISOString(),
      'timeMax': afterDate.toISOString(),
      'orderBy': 'startTime',
      'maxResults': 250
    });


    request.execute(
	
	    function(resp) {
	
	     // var table = document.getElementById('eventsTab');
	
	     var numitems = resp.items.length;
	     var nextindex = numitems;
	     var j = 0;
	
	         // get index of next date
	       while (nextindex == numitems && j < numitems) {
	             var itemDate = new Date(resp.items[j].start.date || resp.items[j].start.dateTime);
	             if (nowDate < itemDate) {
	                 nextindex = j;
	             }
	             else {
	                 j=j+1;
	             }
	       }
	
	       var eventclass = 'events';
	
	       var maxindex = Math.min(numitems, nextindex+numAfter+1);
	       var minindex = Math.max(nextindex-numBefore,0);
	
	       var i = 0;
	
	
	       for (i = minindex; i < maxindex; i++) {
	
	         //---------nodes for html elements
	         // var title = document.createTextNode(resp.items[i].summary);
		 // titles are undefined so I'm using the summary as title instead
	         // var description = document.createTextNode(resp.items[i].description);
	         var startdate = resp.items[i].start.date;
	         var startdatetime = resp.items[i].start.dateTime;
	
	         currdate = startdate || startdatetime;
	
	        mydate = new Date(currdate);
	        var timetxt = false;
	
	         if (startdatetime) {
	                 options = {
	                        hour: "2-digit", minute: "2-digit"
	                 };
	                timetxt = document.createTextNode(mydate.toLocaleTimeString("en-US",options));
	         }
	
	         var options = {
	                 weekday: "short", month: "short", day: "numeric"
	         };
	
	         if (i == nextindex) {
	                 eventclass = 'current events';
	         }
	
	
	         var tddatespan = document.createElement('span');
	         if (i != nextindex) { tddatespan.className = "pbody"; } else { tddatespan.className ="curr"; }
	         var tddate = document.createElement('td');
	         tddate.className = eventclass + ' ' + 'date';
	         var datetxt = document.createTextNode(mydate.toLocaleDateString("en-US",options));
	         tddatespan.appendChild(datetxt);
	         tddate.appendChild(tddatespan);
	
	        var tdtimespan = document.createElement('span');
	        if (i != nextindex) { tdtimespan.className = "pbody"; } else { tdtimespan.className ="curr"; }
	        var tdtime = document.createElement('td');
	        tdtime.className = eventclass + ' ' + 'time';
	        if (timetxt) { tdtimespan.appendChild(timetxt); }
	        tdtime.appendChild(tdtimespan);
	
	        eventclass = 'events'
	
	        var tr = document.createElement('tr');
	        tr.className = eventclass;
	
	        var description = resp.items[i].description;
	        var location = resp.items[i].location;
	
	
	         var tdtitle = document.createElement('td');
	         tdtitle.className = eventclass;
	         var titlestr = resp.items[i].summary;
	
//                   If you want to extract the speaker/title separately
//                   var speaker = titlestr.match(/\(([^)]+)\)/)[1];
//                   titlestr.replace(/\(.*\)/g,"");
// 
//                   var titlespan = document.createElement('span');
//                   var titletxt = document.createTextNode(titlestr);
//                   titlespan.appendChild(titletxt);
//                   var speakerspan = document.createElement('span);
//                   var speakertxt = document.createTextNode(speaker);
//                   speakerspan.className = "nowrap";
//                   speakerspan.appendChild(speakertxt);
//                   titlespan.appendChild(speakerspan);

	         if (description || location) {


	                 titlestr = titlestr + ' »';
	                 var titletxt = document.createTextNode(titlestr);
	
	                 var phead = document.createElement('div');
	                 var ptitle = document.createElement('div');
	                 var pdefault = document.createElement('div');
	                 phead.className = "panel-heading";
	                 ptitle.className = "panel-title";
	                 pdefault.className = "panel panel-default";
	                 ptitle.appendChild(pdefault);
	                 phead.appendChild(ptitle);
	
	                 var desca = document.createElement('a');
	                        desca.className = "accordion-toggle event cal";
	                        desca.setAttribute('data-toggle','collapse');
	                        desca.setAttribute('data-parent','#accordionCal');
	                        desca.href = '#desc' + i;
	
	                pdefault.appendChild(desca);
	                desca.appendChild(titletxt);
	
	                tdtitle.appendChild(phead);
	
	                var pcollapse = document.createElement('div');
	                var pbody = document.createElement('div');
	                        pbody.className ="panel-body"
	                        pcollapse.id = "desc" + i;
	                        pcollapse.className ="panel-collapse collapse pbody";
	
	                pcollapse.appendChild(pbody);
	                var desctxt = document.createElement('span');
	                desctxt.className = 'description';
	
	                if (description && location) {
	                        desctxt.innerHTML = location + '<br>' + description;
	                }
	                else if (description) {
	                        desctxt.innerHTML = description;
	                }
	                else if (location) {
	                        desctxt.innerHTML = location;
	                }
	
	                pbody.appendChild(desctxt);
	                phead.appendChild(pcollapse);
	
	        }
	        else {
	                tdtitle.appendChild(document.createTextNode(titlestr));
	        }
	
	        // try out new format with time under date
	        // var br = document.createElement('br');
	        // tddate.appendChild(br);
	        // tddate.appendChild(tdtimespan);
	
	         tr.appendChild(tddate);
	         tr.appendChild(tdtime);
	         tr.appendChild(tdtitle);
	
	         evtable.appendChild(tr);
	         evtable.className = 'evtab';
	
      		}

    	});
  });
}

