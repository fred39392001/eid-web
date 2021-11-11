function set_page_info(total_weight, list_task_uuid) {
  for (var index = 1; index < 18; index ++) {
    document.getElementById("project_s" + index).innerHTML = total_weight["sdgs-" + index];

    for (var index_task = 0; index_task < list_task_uuid.length;  index_task++) {
      obj = JSON.parse(getCookie(list_task_uuid[index_task]));
      document.getElementById("persion_s" + index).innerHTML = (parseInt(document.getElementById("persion_s" + index).innerHTML) + parseInt(obj.ticket["s" + index ]) ).toString();
    }
  }
}

function task_ticket_submit(uuid_task) {
  obj = JSON.parse(getCookie(uuid_task[0]));
  var dataJSON = {"uuid": uuid_task[0],"sdgs-1":obj.ticket.s1,"sdgs-2":obj.ticket.s2,
	  "sdgs-3":obj.ticket.s3,"sdgs-4":obj.ticket.s4,"sdgs-5":obj.ticket.s5,
	  "sdgs-6":obj.ticket.s6,"sdgs-7":obj.ticket.s7,"sdgs-8":obj.ticket.s8,
	  "sdgs-9":obj.ticket.s9,"sdgs-10":obj.ticket.s10,"sdgs-11":obj.ticket.s11,
	  "sdgs-12":obj.ticket.s12,"sdgs-13":obj.ticket.s13,"sdgs-14":obj.ticket.s14,
	  "sdgs-15":obj.ticket.s15,"sdgs-16":obj.ticket.s16,"sdgs-17":obj.ticket.s17};
   
  $.ajax({
    url: "https://tplanet-backend.townway.com.tw/tasks/submit",
    type: "POST",
    async: false,
    crossDomain: true,
    data: dataJSON,
    success: function(returnData) {
       const obj = JSON.parse(returnData);

       // Set page info
       set_page_info(obj, uuid_task);
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });
}

function submit_weight() {
  var list_issues = [];
  var dataJSON = {};
  dataJSON.username = getCookie("username");
  $.ajax({
    url: "https://eid-backend.townway.com.tw/tasks/list",
    type: "POST",
    async: false,
    crossDomain: true,
    data:  dataJSON,
    success: function(returnData) {
       const obj = JSON.parse(returnData);

       // Submit ticket
       task_ticket_submit(obj.uuid);
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });
}
