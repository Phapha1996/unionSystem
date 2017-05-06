package glut.dao;

import glut.util.SessionPool;

import java.util.List;

import org.hibernate.Query;

public abstract class BaseDao<T> implements IBaseDao<T> {
//
	@Override
	public T get(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void save(T entity) throws Exception {
		// TODO Auto-generated method stub
		SessionPool.getCurrentSession().save(entity);
	}

	@Override
	public void update(T entity) throws Exception {
		// TODO Auto-generated method stub
		SessionPool.getCurrentSession().update(entity);
	}

	@Override
	public void delete(T entity) throws Exception {
		// TODO Auto-generated method stub
		SessionPool.getCurrentSession().delete(entity);
	}

	@Override
	public List<T> findAll() {
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
		String queryStr = "";
		List list = null;
		if (isSQL) {
			queryStr += "SELECT "
					+ selectArgs
					+ " FROM "
					+ fromArgs
					+ (whereArgs == null ? "" : " WHERE " + whereArgs)
							+ (groupBy == null ? "" : " GROUP BY " + groupBy)
							+ (orderBy == null ? "" : " ORDER BY " + orderBy)
							+ (having == null ? "" : " HAVING " + having);
			list = SessionPool.getCurrentSession().createSQLQuery(queryStr)
					.list();
		} else {
			queryStr += (selectArgs == null ? "" : "SELECT " + selectArgs)
					+ " FROM "
					+ fromArgs
					+ (whereArgs == null ? "" : " WHERE " + whereArgs)
							+ (groupBy == null ? "" : " GROUP BY " + groupBy)
							+ (orderBy == null ? "" : " ORDER BY " + orderBy)
							+ (having == null ? "" : " HAVING " + having);
			Query query= SessionPool.getCurrentSession().createQuery(queryStr);
			list = query.list();
		}
		return list;
	}
}
