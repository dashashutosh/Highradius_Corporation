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
 * Servlet implementation class AddInvoice
 */
@WebServlet("/AddInvoice")
public class AddInvoice extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddInvoice() {
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
		
			String query = "INSERT INTO winter_internship (business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			
			try  {
				
				String business_code =  request.getParameter("business_code");
			    Long cust_number = Long.parseLong(request.getParameter("cust_number"));
			    String clear_date = request.getParameter("clear_date");
			    Integer buisness_year = Integer.parseInt(request.getParameter("buisness_year"));
			    Long doc_id = Long.parseLong(request.getParameter("doc_id"));
			    String posting_date = request.getParameter("posting_date");
			    String document_create_date = request.getParameter("document_create_date");
			    String due_in_date = request.getParameter("due_in_date");
			    String invoice_currency = request.getParameter("invoice_currency");
			    String document_type = request.getParameter("document_type");
			    Integer posting_id = Integer.parseInt(request.getParameter("posting_id"));
			    Double total_open_amount = Double.parseDouble(request.getParameter("total_open_amount"));
			    String baseline_create_date = request.getParameter("baseline_create_date");
			    String cust_payment_terms = request.getParameter("cust_payment_terms");
			    Long invoice_id = Long.parseLong(request.getParameter("invoice_id"));
			    
				Connection conn = DBConnection.connectToDB();
				
				PreparedStatement preparedStatement = conn.prepareStatement(query);	
		    	
		    	preparedStatement.setString(1, business_code);
		    	preparedStatement.setLong(2, cust_number);
		    	preparedStatement.setString(3, clear_date);
		    	preparedStatement.setInt(4, buisness_year);
		    	preparedStatement.setLong(5, doc_id);
		    	preparedStatement.setString(6, posting_date);
		    	preparedStatement.setString(7, document_create_date);
		    	preparedStatement.setString(8, due_in_date);
		    	preparedStatement.setString(9, invoice_currency);
		    	preparedStatement.setString(10, document_type);
		    	preparedStatement.setInt(11, posting_id);
		    	preparedStatement.setDouble(12, total_open_amount);
		    	preparedStatement.setString(13, baseline_create_date);
		    	preparedStatement.setString(14, cust_payment_terms);
		    	preparedStatement.setLong(15, invoice_id);
		    
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
	
	
	
