package com.highradius;

import java.io.IOException;   
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
//import java.sql.SQLException;
//import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
//import com.google.gson.GsonBuilder;

/**
 * Servlet implementation class SearchInvoice
 */
@WebServlet("/SearchInvoice")
public class SearchInvoice extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SearchInvoice() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		
		long cust_number = Long.parseLong(request.getParameter("cust_number"));
	    PrintWriter out = response.getWriter();
	    try {
	      
	    InvoiceData pojo = null;
	    ArrayList<InvoiceData> data=new ArrayList<InvoiceData>();
	    String SELECT_SQL = "SELECT sl_no, business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id FROM grey_goose.winter_internship WHERE cust_number = ?";
	    
	    Integer sl_no;
	    String business_code;
	    //Long cust_number;
	    String clear_date;
	    Integer buisness_year;
	    Long doc_id;
	    String posting_date;
	    String document_create_date;
	    String due_in_date;
	    String invoice_currency;
	    String document_type;
	    Integer posting_id;
	    Double total_open_amount;
	    String baseline_create_date;
	    String cust_payment_terms;
	    Long invoice_id;

	    
	    Connection conn = DBConnection.connectToDB();
	    PreparedStatement preparedStatement = conn.prepareStatement(SELECT_SQL);
	    preparedStatement.setLong(1, cust_number);
	    System.out.println(preparedStatement);
	    ResultSet rs = preparedStatement.executeQuery();

	    while (rs.next()) {
	        pojo = new InvoiceData();
	        sl_no=rs.getInt("sl_no");
	        business_code = rs.getString("business_code");
	        cust_number = rs.getLong("cust_number");
	        clear_date = rs.getString("clear_date");
	        buisness_year = rs.getInt("buisness_year");
	        doc_id = rs.getLong("doc_id");
	        posting_date = rs.getString("posting_date");
	        document_create_date = rs.getString("document_create_date");
	        due_in_date = rs.getString("due_in_date");
	        invoice_currency = rs.getString("invoice_currency");
	        document_type = rs.getString("document_type");
	        posting_id = rs.getInt("posting_id");
	        total_open_amount = rs.getDouble("total_open_amount");
	        baseline_create_date = rs.getString("baseline_create_date");
	        cust_payment_terms = rs.getString("cust_payment_terms");
	        invoice_id = rs.getLong("invoice_id");
	        
	        pojo.setSl_no(sl_no);
	        pojo.setBusiness_code(business_code);
	        pojo.setCust_number(cust_number);
	        pojo.setClear_date(clear_date);
	        pojo.setBuisness_year(buisness_year);
	        pojo.setDoc_id(doc_id);
	        pojo.setPosting_date(posting_date);
	        pojo.setDocument_create_date(document_create_date);
	        pojo.setDue_in_date(due_in_date);
	        pojo.setInvoice_currency(invoice_currency);
	        pojo.setDocument_type(document_type);
	        pojo.setPosting_id(posting_id);
	        pojo.setTotal_open_amount(total_open_amount);
	        pojo.setBaseline_create_date(baseline_create_date);
	        pojo.setCust_payment_terms(cust_payment_terms);
	        pojo.setInvoice_id(invoice_id);
	        
	        data.add(pojo);
	      }
	    

	      Gson gson = new Gson();
	      String respData = gson.toJson(data);
	      out.print(respData);
	      response.setStatus(200);
	      out.flush();
	      
	    } catch(Exception e) {
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
