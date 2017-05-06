package glut.activity.service;

import glut.db.auto.Activity;
import glut.db.auto.ActivitySignUp;

import java.text.ParseException;
import java.util.List;

public interface UserService {
	// boolean joinActivity(Activity activity, ActivitySignUp signUp,
	// String userType) throws Exception;

	List<Activity> getActivity(String activityStatus, String activityType,
			String mbAcount) throws ParseException;

	void changePwd(String account, String newPwd) throws Exception;

	boolean checkOldPwd(String account, String oldpassword) throws Exception;

	int joinActivity(String actId, String account, String phone, String memo, String fileName2,String sex)
			throws Exception;

	String getResults(String account) throws ParseException;

	List findSpecifiedResults(String account, String status, String name)
			throws Exception;
	
}
