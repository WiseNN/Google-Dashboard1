

  // Load the Visualization API and the controls package.
  // Packages for all the other charts you need will be loaded
  // automatically by the system.
  google.charts.load('current', {'packages':['corechart', 'controls', 'table']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawDashboard);

  //create dashboard variable
  var dashboard;

  //initialize all controls and charts  ** WILL NOT DISPLAY CHART **
  function drawDashboard() 
  {
  	debugger;
	    // Everything is loaded. Assemble your dashboard...
	  	dashboard = new google.visualization.Dashboard(document.getElementById('dashboard_div'));


	    //create control to filter numeric ranges
	    var numberRangeSlider = new google.visualization.ControlWrapper({
    'controlType': 'NumberRangeFilter',
    'containerId': 'filter_div',
    options: {
      filterColumnIndex: 0,
      minValue: 13000,
      maxValue: 15000
    },
    // Explicitly positions the thumbs at position 3 and 8,
    // out of the possible range of 1 to 10.
    'state': {'lowValue': 13383, 'highValue': 13630}
  });


	  // Create a pie chart, passing some options
	  var pieChart = new google.visualization.ChartWrapper({
    'chartType': 'PieChart',
    'containerId': 'chart_div',
	options: {
	      width: 600,
	      height: 600,
	      title: 'Used Cars',
	      hAxis: {
	      	title: 'Vehicle Type'
	      }
	},
	//column 3 will be shown a filtered view, based on column 0
    view: {'columns': [3, 0]}
  });

	//chart range filter does not seem to be working
	  // var chartRangeFilterControl = new google.visualization.ControlWrapper({
	  // 	'chartType': 'ChartRangeFilter',
	  // 	'containerId': 'range_filter',
	  // 	'options': {
	  // 		'filterColumnLabel': 'Make'
	  // 	}
	  // });


	   var stringFilterControl = new google.visualization.ControlWrapper({
      controlType: 'StringFilter',
      containerId: 'range_filter',
      options: {
        filterColumnIndex: 5,
        matchType: 'any',
        caseSensitive: false,
        ui:{
        	label: 'Vehicle Type',
        	labelSeparator: ':'
        }
      }
    });

	  var comboChart = new google.visualization.ChartWrapper({
	  	'chartType': 'ComboChart',
	  	'containerId': 'line_chart',
	  	'view': {'columns': [5,0]},
	  	options: {
	  		  // seriesType: 'bars',
      	// 	series: {5: {type: 'line'}}
	      	animation: {
	      		duration: 500,
	      		easing: 'inAndout'
	      	},
	      	// chartArea: {
	      	// 	left: ,
	      	// 	right: ,
	      	// 	top: ,
	      	// 	bottom
	      	// }

	  	}

	  });

	  var sankeyChart = new google.visualization.ChartWrapper({

	  	'chartType': 'Sankey',
	  	'containerId': 'donut_chart',
	  	'view': {'columns': [2,4,1]},
	  	options: {
	      	animation: {
	      		duration: 500,
	      		easing: 'inAndout'
	      	},
	      //chart positioning
	      	// chartArea: {
	      	// 	left: ,
	      	// 	right: ,
	      	// 	top: ,
	      	// 	bottom
	      	// }

	  	}

	  });


	 // Bindings
	 // --------
	 // numberRangeSlider --> will change display of pieChart
	 // stringFilterControl --> will change display of comboChart
	 // stringFilterControl --> will change display of sankeyChart
	 // numberRangeSlider --> will change value of stringFilterControl
	 // stringFilterControl --> will change display of pieChart

  	dashboard.bind(numberRangeSlider, pieChart)
  			 .bind(stringFilterControl, comboChart)
  			 .bind(stringFilterControl,sankeyChart)
  			 .bind(numberRangeSlider, stringFilterControl)
  			 .bind(stringFilterControl, pieChart);
  }



  /* -------------------------- GOOGLE SHEETS INTEGRATION ------------------------------------*/



   // Client ID and API key from the Developer Console
      var CLIENT_ID = '454777045211-4hhtkh2uu2mk5rgkk8085f0gu0nnbv26.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyAstQqkUc1qwREAa6NOCmq46t1TZpgR9eY';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

      var authorizeButton = document.getElementById('authorize-button');
      var signoutButton = document.getElementById('signout-button');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
        	debugger;
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
          updateDataTable()
          
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
   
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

      /**
       * 
       * 
       * Prints the first, and third column of your dataset onto the screen.
       * Used to verify that the data sheet is infact operational.
       * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
       */
      function listMajors() 
      {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1yxuh-ZSgdX9zNCiMGdug1otxxpgD0pNwD6oVWNWjJVo',
          //specify what selection will be return (rows/columns)
          range: 'Cars Lab Data!A:F',
        }).then(function(response) {
        	
	          var range = response.result;
	          if (range.values.length > 0) 
	          {
	            for (i = 0; i < range.values.length; i++) 
	            {
	              var row = range.values[i];
	              // Print columns A and C, which correspond to indices 0 and 2.
	              appendPre(row[0] + ', ' + row[2]);
	            }

	          } 
	          else 
	          {
	            appendPre('No data found.');
	            alert('No data found');
	          }
        },
         function(response) {
          appendPre('Error: ' + response.result.error.message);
        });
      }


      //called when the google sheets client has been initialized
      // used to pipe the data from google sheets into google charts
      function updateDataTable()
      {
      	 
        
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1yxuh-ZSgdX9zNCiMGdug1otxxpgD0pNwD6oVWNWjJVo',
          range: 'Cars Lab Data!A:F',
        }).then(function(response) {
        	debugger;
          
          var dataAry = response.result.values;
          
          //create labels objects to enforce data types in the columns
          dataAry[0] = [
          	 {label: dataAry[0][0], type: 'number'},
          	 {label: dataAry[0][1], type: 'number'},
          	 {label: dataAry[0][2], type: 'string'},
          	 {label: dataAry[0][3], type: 'string'},
      	     {label: dataAry[0][4], type: 'string'},
      	     {label: dataAry[0][5], type: 'string'}
          ]

          //if there is data, 
          //1. add column labels & data types
          //2. convert 2D array into google charts DataTable
          //3. draw dashboard on the screem
          if (dataAry.length > 0) 
          {
          	
          	for(var i=1;i<dataAry.length;i++)
          	{
          		//turn price string into number
          		dataAry[i][0] = parseInt(dataAry[i][0].replace('$','').replace(',',''));
          	}
		debugger;
		

			//convert 2D array to a google charts DataTable 
           	var data = google.visualization.arrayToDataTable(dataAry);
            
            //draw the dashboard on the screen
            dashboard.draw(data);
          } 
          else  //if no data, alert user that nothing will be displayed
          {
          	alert("There is no data to load, charts will not be displayed.")
          }
        }, function(response) {//show Error on alert
        	alert('Error: ' + response.result.error.message);
          
        });
      }


      
	





