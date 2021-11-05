function setInfoEid() {
  // Set username
  $("#userid").text(getCookie("username"));
}

function setPageInfo() {
  var path = window.location.pathname;
  var page = path.split("/").pop();
  console.log( page );

  if (page == "eid.html") {
    setInfoEid();
  } else if (page.includes("issues")) {
    $("#nav-issues").addClass("active");
    
    // List issues
    list_issues(getCookie("username"));
    
  } else if (page == "foot_print.html") {
    $("#nav-foot_print").addClass("active");
  } else if (page == "wallet.html") {
    $("#nav-wallet").addClass("active");
  }
}
