<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>

<link href="resources/css/authentication.css" rel="stylesheet" type="text/css" />
        <link href="resources/css/loading_mask.css" rel="stylesheet" type="text/css" />
<script src="resources/javascript/jquery-1.11.3.js"></script>

<script src="resources/javascript/authentication.js"></script>
</head>
<body>
        <div class="authenticate_window">
            
            <div class="content">
            	<div id="logo">
            	<div id="logo_name">Gym Management System</div>
            	</div>
                
                
                <div class="authenticate_block">
                    <h3>Please enter your details to login:</h3>
                    
                    <div id="username_password_block">
                        <form >
                        <div id="username_block">
                            <label id="authenticate_username_label">Username:</label>
                            <input type="text" name="authenticate_username_field" id="authenticate_username_field" placeholder="Please type in your username..." />
                        </div>
                        <div id="password_block">
                            <label id="authenticate_password_label">Password:</label>
                            <input type="password" name="authenticate_password_field" id="authenticate_password_field" placeholder="Please type in password..." />
                        </div>
                        <div id="button_block">
                            <button type="submit" id="submit_authentication">Login</button>
                            <!--<input type="submit" value="Submit" id=submit_authentication" />-->
                        </div>
                        </form>
                    </div>
                    
                    <div id="error_message">
                        <h4></h4>
                    </div>
                </div>
                
            </div>
            
        </div>
    </body>
</html>