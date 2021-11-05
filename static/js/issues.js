function set_task_in_page(obj) {
  var elem_issues_list = document.getElementById("issues-list");
  
  var col_md_4 = document.createElement("div");
  col_md_4.className = "col-md-4";

  var card_p_3_mb_2 = document.createElement("div");
  card_p_3_mb_2.className = "card p-3 mb-2";

  var img = document.createElement("img");
  img.src = obj.thumbnail;
  img.setAttribute("width", "350");
  img.setAttribute("height", "350");

  var a = document.createElement("a"); 
  a.src = obj.thumbnail;
  a.href = "/eid-web/issues-1.html?uuid=" + obj.uuid;
  
  // Append
  elem_issues_list.appendChild(col_md_4);
  col_md_4.appendChild(card_p_3_mb_2);
  card_p_3_mb_2.appendChild(a);
  a.appendChild(img);
}

function get_task_info(req_uuid_task) {
  $.ajax({
    url: "https://tplanet-backend.townway.com.tw/tasks/" + req_uuid_task,
    type: "GET",
    async: false,
    crossDomain: true,
    success: function(returnData) {
       var obj = JSON.parse(returnData);
       setCookie(obj.uuid, JSON.stringify(obj), 1);

       // Set tasks in weg page
       set_task_in_page(JSON.parse(getCookie(obj.uuid)));

    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });
}

function get_user_uuid_tasks(username) {
  var list_issues = [];
  var dataJSON = {};
  dataJSON.username = username;
  $.ajax({
    url: "https://eid-backend.townway.com.tw/tasks/list",
    type: "POST",
    async: false,
    crossDomain: true,
    data:  dataJSON,
    success: function(returnData) {
       const obj = JSON.parse(returnData);
       console.log(typeof(obj.uuid));

       // Set task info
       for (var i = 0; i < obj.uuid.length; i++)  {
         get_task_info(obj.uuid[i]);
       }
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });
}

function list_issues(username) {
  get_user_uuid_tasks(username);
}
