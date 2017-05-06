package glut.activity.service;

import glut.db.auto.Activity;

import java.util.List;

public interface IAdminService {

	void addActivity(Activity activity) throws Exception;

	List<Activity> getActivity(String activityName);

	void updateActivity(Activity activity) throws Exception;

	void deleteActivity(Activity activity) throws Exception;
}
