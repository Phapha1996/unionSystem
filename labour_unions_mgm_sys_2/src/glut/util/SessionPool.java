package glut.util;

import javax.annotation.Resource;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
@Component
public class SessionPool {

	private static SessionFactory sessionFactory;

	//用于没有事务的地方，需要显式关闭session，不建议使用。
/*	public static Session openSession() {
		return sessionFactory.openSession();
	}*/

	//用于需要事务的地方
	public static Session getCurrentSession() {
		return sessionFactory.getCurrentSession();
	}

	@Resource
	public void setSessionFactory(SessionFactory sessionFactory) {
		SessionPool.sessionFactory = sessionFactory;
	}

}
