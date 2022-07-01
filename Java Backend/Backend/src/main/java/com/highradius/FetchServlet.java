package com.highradius;

import java.io.IOException;     
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet implementation class FetchServlet
 */
@WebServlet("/FetchServlet")
public class FetchServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FetchServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		PrintWriter out = response.getWriter();
		
		int rows = 10;
		
		try {
			Connection conn = DBConnection.connectToDB();
			
			String pageInURL = request.getParameter("page");
			int page = Integer.parseInt(pageInURL) * rows;
			
			Statement st = conn.createStatement();
			String query = "SELECT sl_no, business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date,invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id from winter_internship ORDER BY sl_no ASC LIMIT " + page + ", " +rows;
			ResultSet rs = st.executeQuery(query);
			
			ArrayList<InvoiceData> data = new ArrayList<>();
			while(rs.next()) {
				InvoiceData inv = new InvoiceData();
				inv.setSl_no(rs.getInt("sl_no"));
				inv.setBusiness_code(rs.getString("business_code"));
				inv.setCust_number(rs.getLong("cust_number"));
				inv.setClear_date(rs.getString("clear_date"));
				inv.setBuisness_year(rs.getInt("buisness_year"));
				inv.setDoc_id(rs.getLong("doc_id"));
				inv.setPosting_date(rs.getString("posting_date"));
				inv.setDocument_create_date(rs.getString("document_create_date"));
				inv.setDue_in_date(rs.getString("due_in_date"));
				inv.setInvoice_currency(rs.getString("invoice_currency"));
				inv.setDocument_type(rs.getString("document_type"));
				inv.setPosting_id(rs.getInt("posting_id"));
				inv.setTotal_open_amount(rs.getDouble("total_open_amount"));
				inv.setBaseline_create_date(rs.getString("baseline_create_date"));
				inv.setCust_payment_terms(rs.getString("cust_payment_terms"));
				inv.setInvoice_id(rs.getLong("invoice_id"));
				
				data.add(inv);
			}
				Gson gson = new GsonBuilder().serializeNulls().create();
				String invoice = gson.toJson(data);
				out.print(invoice);
				response.setStatus(200);
				out.flush();
			}
			catch(ClassNotFoundException e) {
				e.printStackTrace();
			}
			catch(SQLException e) {
				e.printStackTrace();
			}
			catch(Exception e) {
				e.printStackTrace();
			}
	}	

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
