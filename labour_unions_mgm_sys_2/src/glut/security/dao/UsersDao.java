package glut.security.dao;

import glut.dao.IBaseDao;
import glut.db.auto.Users;

public interface UsersDao extends IBaseDao<Users> {
	public Users findByName(String name);

	public Users findByNameUnionMember(String name);

}
