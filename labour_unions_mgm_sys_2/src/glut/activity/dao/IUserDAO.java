package glut.activity.dao;

import glut.db.auto.Activity;
import glut.db.auto.Member;

import java.util.List;

public interface IUserDAO {
	List<Member> findMemberByIdPwd(Member member);

	void update(Object obj);

	void add(Object obj);

	List<Activity> findActivityByStatusType(String activityStatus,
			String activityType);

	int getAvailableCount(String activityID);
}
