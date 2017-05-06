package glut.activity.jsonvo;

import glut.db.auto.Activity;

public class UserActResultVO extends Activity{

	private String result;
	private String[] filtered=new String[]{"activitySignUps"};
	
	public String[] getFiltered() {
		return filtered;
	}

	public void setFiltered(String[] filtered) {
		this.filtered = filtered;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public UserActResultVO() {
		// TODO Auto-generated constructor stub
	}
	

}
