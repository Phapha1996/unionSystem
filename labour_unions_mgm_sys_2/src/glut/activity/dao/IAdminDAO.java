package glut.activity.dao;

import glut.db.auto.Activity;

import java.util.List;

public interface IAdminDAO {
	//	List<Admin> findAdminByIdPwd(Admin admin);

	void add(Object obj);

	void update(Object obj);

	List<Activity> findActivityByName(String activityName);
}
