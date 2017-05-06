package glut.security.dao.impl;

import glut.activity.daoImp.UserDAOImp;
import glut.db.auto.Users;
import glut.security.dao.UsersDao;
import glut.util.SessionPool;

import java.util.Iterator;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class UsersDaoImpl implements UsersDao {
	private static Logger logger = Logger.getLogger(UserDAOImp.class);

	/* 根据用户名（员工编号，不是姓名）查询Users */
	public Users findByName(String name) {

		String hql = "from Users u where u.member.number=?";
		Session session = SessionPool.getCurrentSession();
		Query query = session.createQuery(hql);
		query.setString(0, name);
		List<Users> users = (List<Users>) query.list();
		Users user = null;
		if (!users.isEmpty()) {
			user = users.get(0);

			logger.debug("登陆成功，获取到会员的信息，姓名：" + user.getMember().getName()
					+ "，部门（简）" + user.getMember().getDpmBrief());
		}
		return user;
	}

	@Override
	public Users get(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void save(Users entity) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void update(Users entity) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void delete(Users entity) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public List<Users> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int count() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Users findByNameUnionMember(String name) {
		// TODO Auto-generated method stub
		// String hql =
		// "select new glut.security.bean.Users(u.account, u.password, g.name, g.sex, g.idCard, g.dpmBrief, g.birthday,r.name,r.id) from Users u, Member g,Roles r where u.account=g.number and (select id from Users where account=?)=r. and u.account =?";
		String hql = "select new glut.db.auto.Users "
				+ "FROM UsersRoles rs " + "JOIN rs.users u "
				+ "JOIN rs.roles r " + "WHERE u.member.number=?";
		Query query = SessionPool.getCurrentSession().createQuery(hql);
		query.setString(0, name);
		logger.debug("这里是findByNameUnionMember的hql:" + hql);

		List<Users> objs = (List<Users>) query.list();

		logger.debug("after query list");

		return (objs.size() == 0 ? null : objs.get(0));
	}

	@Override
	public List findByArgs(String selectArgs, String fromArgs,
			String whereArgs, String groupBy, String orderBy, String having,
			boolean isSQL) {
		// TODO Auto-generated method stub
		return null;
	}

}
