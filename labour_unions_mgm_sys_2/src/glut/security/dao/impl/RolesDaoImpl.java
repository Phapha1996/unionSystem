package glut.security.dao.impl;

import glut.db.auto.Roles;
import glut.security.dao.RolesDao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

@Transactional
public class RolesDaoImpl implements RolesDao {

	@Override
	public Roles get(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void save(Roles entity) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void update(Roles entity) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void delete(Roles entity) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public List<Roles> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int count() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List findByArgs(String selectArgs, String fromArgs,
			String whereArgs, String groupBy, String orderBy, String having,
			boolean isSQL) {
		// TODO Auto-generated method stub
		return null;
	}

}
