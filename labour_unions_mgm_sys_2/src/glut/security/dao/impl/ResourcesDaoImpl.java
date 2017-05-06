package glut.security.dao.impl;

import glut.db.auto.Resources;
import glut.security.dao.ResourcesDao;
import glut.util.SessionPool;

import java.util.List;

import org.hibernate.Session;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

@EnableTransactionManagement
@Transactional
public class ResourcesDaoImpl implements ResourcesDao {

	@Override
	public Resources get(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void save(Resources entity) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void update(Resources entity) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void delete(Resources entity) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public List<Resources> findAll() {
		// TODO Auto-generated method stub
		Session session = SessionPool.getCurrentSession();
		return session.createQuery("from Resources").list();
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
