package com.highradius;

import java.io.IOException; 
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class EditInvoice
 */
@WebServlet("/EditInvoice")
public class EditInvoice extends HttpServlet{
	private static final long serialVersionUID = 1L;
    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EditInvoice() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		doPost(request,response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String query = "UPDATE winter_internship SET invoice_currency = ?, cust_payment_terms = ? WHERE sl_no = ?";
	
		try  {
			
			Integer sl_no = Integer.parseInt(request.getParameter("sl_no"));
			String invoice_currency = request.getParameter("invoice_currency");
		    String cust_payment_terms = request.getParameter("cust_payment_terms");
		    
			Connection conn = DBConnection.connectToDB();
			
			PreparedStatement preparedStatement = conn.prepareStatement(query);
			
			preparedStatement.setString(1, invoice_currency);
	    	preparedStatement.setString(2, cust_payment_terms);
	    	preparedStatement.setInt(3, sl_no);
	    	
	    	System.out.println(preparedStatement);
	    	preparedStatement.executeUpdate();
		}
		catch (IOException e) {
			e.printStackTrace();
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		catch (Exception e) {
			e.printStackTrace();
		}

	}
}
