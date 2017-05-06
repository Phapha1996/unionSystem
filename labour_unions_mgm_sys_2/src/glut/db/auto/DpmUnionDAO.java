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
 * DpmUnion entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see glut.db.auto.DpmUnion
 * @author MyEclipse Persistence Tools
 */
@Transactional
public class DpmUnionDAO {
	private static final Logger log = LoggerFactory
			.getLogger(DpmUnionDAO.class);
	// property constants
	public static final String DPM_BRIEF = "dpmBrief";
	public static final String SUB_UNION = "subUnion";

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

	public void save(DpmUnion transientInstance) {
		log.debug("saving DpmUnion instance");
		try {
			getCurrentSession().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(DpmUnion persistentInstance) {
		log.debug("deleting DpmUnion instance");
		try {
			getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public DpmUnion findById(java.lang.Integer id) {
		log.debug("getting DpmUnion instance with id: " + id);
		try {
			DpmUnion instance = (DpmUnion) getCurrentSession().get(
					"glut.db.auto.DpmUnion", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(DpmUnion instance) {
		log.debug("finding DpmUnion instance by example");
		try {
			List results = getCurrentSession()
					.createCriteria("glut.db.auto.DpmUnion")
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
		log.debug("finding DpmUnion instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from DpmUnion as model where model."
					+ propertyName + "= ?";
			Query queryObject = getCurrentSession().createQuery(queryString);
			queryObject.setParameter(0, value);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByDpmBrief(Object dpmBrief) {
		return findByProperty(DPM_BRIEF, dpmBrief);
	}

	public List findBySubUnion(Object subUnion) {
		return findByProperty(SUB_UNION, subUnion);
	}

	public List findAll() {
		log.debug("finding all DpmUnion instances");
		try {
			String queryString = "from DpmUnion";
			Query queryObject = getCurrentSession().createQuery(queryString);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public DpmUnion merge(DpmUnion detachedInstance) {
		log.debug("merging DpmUnion instance");
		try {
			DpmUnion result = (DpmUnion) getCurrentSession().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(DpmUnion instance) {
		log.debug("attaching dirty DpmUnion instance");
		try {
			getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(DpmUnion instance) {
		log.debug("attaching clean DpmUnion instance");
		try {
			getCurrentSession().buildLockRequest(LockOptions.NONE).lock(
					instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static DpmUnionDAO getFromApplicationContext(ApplicationContext ctx) {
		return (DpmUnionDAO) ctx.getBean("DpmUnionDAO");
	}
}