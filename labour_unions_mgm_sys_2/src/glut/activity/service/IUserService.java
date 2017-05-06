package glut.activity.service;

import glut.db.auto.Activity;
import glut.db.auto.ActivitySignUp;
import glut.db.auto.Member;

import java.util.List;

public interface IUserService {
	boolean isExist(Member member);

	boolean joinActivity(Activity activity, ActivitySignUp signUp,
			String userType) throws Exception;

	List<Activity> getActivity(String activityStatus, String activityType);
}
