<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<meta charset="utf-8">
      <title>jQuery UI ProgressBar functionality</title>
      
      <style>
         .ui-widget-header {
            background: #cedc98;
            border: 1px solid #DDDDDD;
            color: #333333;
            font-weight: bold;
         }
         .progress-label {
            position: absolute;
            left: 50%;
            top: 13px;
            font-weight: bold;
            text-shadow: 1px 1px 0 #fff;
         }
      </style>
      <script>
      $(function() {
         var progressbar = $( "#progressbar-5" );
         progressLabel = $( ".progress-label" );
         $( "#progressbar-5" ).progressbar({
            value: false,
            change: function() {
               progressLabel.text( 
                  progressbar.progressbar( "value" ) + "%" );
            },
            complete: function() {
               progressLabel.text( "Loading Completed!" );
            }
         });
         function progress() {
            var val = progressbar.progressbar( "value" ) || 0;
            progressbar.progressbar( "value", val + 1 );
            if ( val < 99 ) {
               setTimeout( progress, 100 );
            }
         }
         setTimeout( progress, 3000 );
      });
   </script>
   </head>
   <body>
      <div id="progressbar-5">
         <div class="progress-label">
            Loading...
         </div>
      </div>
   </body>
</html>