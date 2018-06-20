

  // Load the Visualization API and the controls package.
  // Packages for all the other charts you need will be loaded
  // automatically by the system.
  google.charts.load('current', {'packages':['corechart', 'controls']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawDashboard);

  function drawDashboard() 
  {
  	debugger;
	    // Everything is loaded. Assemble your dashboard...
	  var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard_div'));


	    var donutRangeSlider = new google.visualization.ControlWrapper({
    'controlType': 'NumberRangeFilter',
    'containerId': 'filter_div',
    'options': {
      'filterColumnLabel': 'Donuts eaten',
      'minValue': 1,
      'maxValue': 10
    },
    // Explicitly positions the thumbs at position 3 and 8,
    // out of the possible range of 1 to 10.
    'state': {'lowValue': 3, 'highValue': 8}
  });


	  // Create a pie chart, passing some options
	  var pieChart = new google.visualization.ChartWrapper({
    'chartType': 'PieChart',
    'containerId': 'chart_div',
    'options': {
      'width': 300,
      'height': 300,
      'title': 'Donuts eaten per person'
    },
    // The pie chart will use the columns 'Name' and 'Donuts eaten'
    // out of all the available ones.
    'view': {'columns': [0, 3]}
  });



	   var data = google.visualization.arrayToDataTable([
    ['Name', 'Gender', 'Age', 'Donuts eaten'],
    ['Michael' , 'Male', 12, 5],
    ['Elisa', 'Female', 20, 7],
    ['Robert', 'Male', 7, 3],
    ['John', 'Male', 54, 2],
    ['Jessica', 'Female', 22, 6],
    ['Aaron', 'Male', 3, 1],
    ['Margareth', 'Female', 42, 8]
  ]);


	    // 'pieChart' will update whenever you interact with 'donutRangeSlider'
  // to match the selected range.
  dashboard.bind(donutRangeSlider, pieChart);

  dashboard.draw(data);

  }

