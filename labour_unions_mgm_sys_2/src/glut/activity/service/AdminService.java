package glut.activity.service;

import glut.db.auto.Activity;

import java.util.List;

public interface AdminService {

	void addActivity(Activity activity,String activityGroupID) throws Exception;

	List<Activity> findActivityByName(String activityName);

	void updateActivity(List<Activity> activities) throws Exception;

	void deleteActivity(Activity activity) throws Exception;

	List<Activity> getAllActivity();
	
	List getAllActivityGroup();

	List<Activity> getAllFinishedActivity();

	List findAllActivityPlayers(String activityId);

	Activity findActivityByID(String activityID);
}
