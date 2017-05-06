package glut.db.auto;

import java.util.List;
import org.hibernate.LockOptions;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Example;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.transaction.annotation.Transactional;

/**
 * A data access object (DAO) providing persistence and search support for
 * RolesResources entities. Transaction control of the save(), update() and
 * delete() operations can directly support Spring container-managed
 * transactions or they can be augmented to handle user-managed Spring
 * transactions. Each of these methods provides additional information for how
 * to configure it for the desired type of transaction control.
 * 
 * @see glut.db.auto.RolesResources
 * @author MyEclipse Persistence Tools
 */
@Transactional
public class RolesResourcesDAO {
	private static final Logger log = LoggerFactory
			.getLogger(RolesResourcesDAO.class);
	// property constants

	private SessionFactory sessionFactory;

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	private Session getCurrentSession() {
		return sessionFactory.getCurrentSession();
	}

	protected void initDao() {
		// do nothing
	}

	public void save(RolesResources transientInstance) {
		log.debug("saving RolesResources instance");
		try {
			getCurrentSession().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(RolesResources persistentInstance) {
		log.debug("deleting RolesResources instance");
		try {
			getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public RolesResources findById(java.lang.Integer id) {
		log.debug("getting RolesResources instance with id: " + id);
		try {
			RolesResources instance = (RolesResources) getCurrentSession().get(
					"glut.db.auto.RolesResources", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(RolesResources instance) {
		log.debug("finding RolesResources instance by example");
		try {
			List results = getCurrentSession()
					.createCriteria("glut.db.auto.RolesResources")
					.add(Example.create(instance)).list();
			log.debug("find by example successful, result size: "
					+ results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}

	public List findByProperty(String propertyName, Object value) {
		log.debug("finding RolesResources instance with property: "
				+ propertyName + ", value: " + value);
		try {
			String queryString = "from RolesResources as model where model."
					+ propertyName + "= ?";
			Query queryObject = getCurrentSession().createQuery(queryString);
			queryObject.setParameter(0, value);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findAll() {
		log.debug("finding all RolesResources instances");
		try {
			String queryString = "from RolesResources";
			Query queryObject = getCurrentSession().createQuery(queryString);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public RolesResources merge(RolesResources detachedInstance) {
		log.debug("merging RolesResources instance");
		try {
			RolesResources result = (RolesResources) getCurrentSession().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(RolesResources instance) {
		log.debug("attaching dirty RolesResources instance");
		try {
			getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(RolesResources instance) {
		log.debug("attaching clean RolesResources instance");
		try {
			getCurrentSession().buildLockRequest(LockOptions.NONE).lock(
					instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static RolesResourcesDAO getFromApplicationContext(
			ApplicationContext ctx) {
		return (RolesResourcesDAO) ctx.getBean("RolesResourcesDAO");
	}
}