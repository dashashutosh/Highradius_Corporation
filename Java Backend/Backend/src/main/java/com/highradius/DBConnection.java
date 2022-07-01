package com.highradius;

import java.sql.Connection; 
import java.sql.DriverManager;

public class DBConnection {
	
	static final String driver = "com.mysql.jdbc.Driver";
	static final String url = "jdbc:mysql://localhost:3306/grey_goose";
	static final String user = "root";
	static final String pass = "mysql_AD";
	
	public static Connection connectToDB() throws Exception {
		
		Class.forName(driver);
		
		Connection conn = DriverManager.getConnection(url, user, pass);
		
		return conn;
	}
}